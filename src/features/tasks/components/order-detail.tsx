import { useNavigate, useParams } from '@tanstack/react-router'
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Phone,
  User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { tasks } from '../data/tasks'

const statusVariant: Record<
  string,
  'default' | 'secondary' | 'outline' | 'destructive'
> = {
  결제완료: 'default',
  배송준비: 'secondary',
  배송중: 'secondary',
  배송완료: 'outline',
  취소: 'destructive',
}

const statusSteps = ['결제완료', '배송준비', '배송중', '배송완료']

export function OrderDetail() {
  const { id } = useParams({ from: '/_authenticated/tasks/$id' })
  const navigate = useNavigate()
  const order = tasks.find((t) => t.id === id)

  if (!order) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>
        <Main className='flex flex-1 items-center justify-center'>
          <p className='text-muted-foreground'>주문을 찾을 수 없습니다.</p>
        </Main>
      </>
    )
  }

  const currentStepIndex = statusSteps.indexOf(order.status)

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-6'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => navigate({ to: '/tasks' })}
          >
            <ArrowLeft className='size-4' />
          </Button>
          <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                {order.orderNumber}
              </h2>
              <p className='text-sm text-muted-foreground'>
                주문일: {order.orderDate}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant={statusVariant[order.status] ?? 'outline'}>
                {order.status}
              </Badge>
              {order.status !== '취소' && order.status !== '배송완료' && (
                <Button size='sm' variant='destructive'>
                  주문 취소
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Status Progress */}
        {order.status !== '취소' && (
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>주문 진행 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between'>
                {statusSteps.map((step, i) => (
                  <div key={step} className='flex flex-1 items-center'>
                    <div className='flex flex-col items-center gap-1'>
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                          i <= currentStepIndex
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className='text-xs'>{step}</span>
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 ${
                          i < currentStepIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>주문자 정보</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3'>
                <User className='size-4 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>{order.customerName}</p>
                  <p className='text-xs text-muted-foreground'>
                    {order.customerEmail}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='size-4 text-muted-foreground' />
                <p className='text-sm'>{order.customerPhone}</p>
              </div>
              <div className='flex items-start gap-3'>
                <MapPin className='mt-0.5 size-4 text-muted-foreground' />
                <p className='text-sm'>{order.shippingAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info - Toss Style */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>결제 정보</CardTitle>
              <CardDescription>토스페이먼츠</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>결제수단</span>
                <div className='flex items-center gap-1.5'>
                  <CreditCard className='size-3.5' />
                  <span className='text-sm font-medium'>
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>결제금액</span>
                <span className='text-lg font-bold'>
                  ₩{order.amount.toLocaleString('ko-KR')}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>승인번호</span>
                <span className='font-mono text-sm'>
                  {order.approvalNumber}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>결제일시</span>
                <span className='text-sm'>{order.orderDate} 14:23:45</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>상품 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='flex items-center gap-3'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-muted'>
                  <Package className='size-5 text-muted-foreground' />
                </div>
                <div>
                  <p className='text-sm font-medium'>{order.product}</p>
                  <p className='text-xs text-muted-foreground'>수량: 1개</p>
                </div>
              </div>
              <p className='text-sm font-bold'>
                ₩{order.amount.toLocaleString('ko-KR')}
              </p>
            </div>
            <div className='mt-4 flex justify-end'>
              <div className='space-y-1 text-right'>
                <div className='flex items-center justify-between gap-8'>
                  <span className='text-sm text-muted-foreground'>
                    상품금액
                  </span>
                  <span className='text-sm'>
                    ₩{order.amount.toLocaleString('ko-KR')}
                  </span>
                </div>
                <div className='flex items-center justify-between gap-8'>
                  <span className='text-sm text-muted-foreground'>배송비</span>
                  <span className='text-sm'>무료</span>
                </div>
                <Separator className='my-2' />
                <div className='flex items-center justify-between gap-8'>
                  <span className='text-sm font-medium'>총 결제금액</span>
                  <span className='text-lg font-bold'>
                    ₩{order.amount.toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
