import { useState } from 'react'
import {
  CalendarDays,
  CheckCircle,
  Clock,
  CircleOff,
  List,
  Calendar,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  reservations,
  getReservationCountByDate,
  type ReservationStatus,
} from './data/reservations'

const statusVariant: Record<
  ReservationStatus,
  'default' | 'secondary' | 'destructive'
> = {
  확정: 'default',
  대기: 'secondary',
  취소: 'destructive',
}

const statusIcon: Record<ReservationStatus, typeof CheckCircle> = {
  확정: CheckCircle,
  대기: Clock,
  취소: CircleOff,
}

// Summary counts
const totalCount = reservations.length
const confirmedCount = reservations.filter((r) => r.status === '확정').length
const pendingCount = reservations.filter((r) => r.status === '대기').length
const cancelledCount = reservations.filter((r) => r.status === '취소').length

// Calendar data
const reservationCounts = getReservationCountByDate()

export function Apps() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const filtered = reservations
    .filter((r) => (statusFilter === 'all' ? true : r.status === statusFilter))
    .filter(
      (r) =>
        r.customerName.includes(searchTerm) ||
        r.service.includes(searchTerm) ||
        r.phone.includes(searchTerm)
    )
    .filter((r) => (selectedDate ? r.date === selectedDate : true))

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>예약관리</h1>
          <p className='text-muted-foreground'>
            총 {totalCount}건의 예약을 관리합니다.
          </p>
        </div>

        {/* Summary Cards */}
        <div className='my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>전체 예약</CardTitle>
              <CalendarDays className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalCount}건</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>확정</CardTitle>
              <CheckCircle className='size-4 text-teal-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{confirmedCount}건</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>대기</CardTitle>
              <Clock className='size-4 text-amber-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{pendingCount}건</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>취소</CardTitle>
              <CircleOff className='size-4 text-destructive' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{cancelledCount}건</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: List / Calendar */}
        <Tabs defaultValue='list' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='list'>
              <List className='mr-1.5 size-4' />
              목록
            </TabsTrigger>
            <TabsTrigger value='calendar'>
              <Calendar className='mr-1.5 size-4' />
              캘린더
            </TabsTrigger>
          </TabsList>

          <TabsContent value='list' className='space-y-4'>
            {/* Filters */}
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Input
                placeholder='예약자, 서비스, 전화번호 검색...'
                className='h-9 w-full sm:w-[250px]'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-36'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>전체 상태</SelectItem>
                  <SelectItem value='확정'>확정</SelectItem>
                  <SelectItem value='대기'>대기</SelectItem>
                  <SelectItem value='취소'>취소</SelectItem>
                </SelectContent>
              </Select>
              {selectedDate && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSelectedDate(null)}
                >
                  날짜 필터 해제 ({selectedDate})
                </Button>
              )}
            </div>

            {/* Table */}
            <div className='overflow-hidden rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>예약자</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>시간</TableHead>
                    <TableHead>서비스</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>비고</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length ? (
                    filtered.map((r) => {
                      const StatusIcon = statusIcon[r.status]
                      return (
                        <TableRow key={r.id}>
                          <TableCell className='font-medium'>
                            {r.customerName}
                          </TableCell>
                          <TableCell>{r.date}</TableCell>
                          <TableCell>{r.time}</TableCell>
                          <TableCell>{r.service}</TableCell>
                          <TableCell className='text-sm'>
                            {r.phone}
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[r.status]}>
                              <StatusIcon className='mr-1 size-3' />
                              {r.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-sm text-muted-foreground'>
                            {r.note}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className='h-24 text-center'>
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value='calendar' className='space-y-4'>
            <MonthCalendar
              reservationCounts={reservationCounts}
              selectedDate={selectedDate}
              onDateSelect={(date) => setSelectedDate(date)}
            />
            {selectedDate && (
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>
                  {selectedDate} 예약 목록
                </h3>
                <div className='space-y-2'>
                  {reservations
                    .filter((r) => r.date === selectedDate)
                    .map((r) => (
                      <div
                        key={r.id}
                        className='flex items-center justify-between rounded-lg border p-3'
                      >
                        <div className='flex items-center gap-3'>
                          <Badge variant={statusVariant[r.status]}>
                            {r.status}
                          </Badge>
                          <span className='font-medium'>
                            {r.customerName}
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {r.time}
                          </span>
                        </div>
                        <span className='text-sm'>{r.service}</span>
                      </div>
                    ))}
                  {reservations.filter((r) => r.date === selectedDate)
                    .length === 0 && (
                    <p className='text-sm text-muted-foreground'>
                      이 날짜에 예약이 없습니다.
                    </p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

// Simple month calendar component
function MonthCalendar({
  reservationCounts,
  selectedDate,
  onDateSelect,
}: {
  reservationCounts: Record<string, number>
  selectedDate: string | null
  onDateSelect: (date: string) => void
}) {
  const [currentMonth, setCurrentMonth] = useState(2) // March (0-indexed: 2 = March)
  const year = 2025
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ]
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, currentMonth, 1).getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))}
        >
          ←
        </Button>
        <CardTitle className='text-base'>
          {year}년 {monthNames[currentMonth]}
        </CardTitle>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))}
        >
          →
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-7 gap-1'>
          {dayNames.map((d) => (
            <div
              key={d}
              className='py-2 text-center text-xs font-medium text-muted-foreground'
            >
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} />
            }
            const dateStr = `${year}.${String(currentMonth + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`
            const count = reservationCounts[dateStr] ?? 0
            const isSelected = selectedDate === dateStr
            return (
              <button
                key={dateStr}
                onClick={() => onDateSelect(dateStr)}
                className={`flex flex-col items-center rounded-lg p-2 transition-colors hover:bg-accent ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
              >
                <span className='text-sm'>{day}</span>
                {count > 0 && (
                  <span
                    className={`mt-0.5 text-xs font-medium ${isSelected ? 'text-primary-foreground' : 'text-primary'}`}
                  >
                    {count}건
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
