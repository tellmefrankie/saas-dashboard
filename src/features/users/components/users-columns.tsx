import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { callTypes, roles } from '../data/data'
import { type User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const gradeVariant: Record<string, string> = {
  VVIP: 'bg-amber-100/50 text-amber-900 dark:text-amber-200 border-amber-300',
  VIP: 'bg-violet-100/50 text-violet-900 dark:text-violet-200 border-violet-300',
  일반: '',
}

export const usersColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='전체 선택'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='행 선택'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이름' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return (
        <div className='ps-3 text-sm font-medium'>
          {lastName}
          {firstName}
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이메일' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-sm text-nowrap'>
        {row.getValue('email')}
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='전화번호' />
    ),
    cell: ({ row }) => (
      <div className='text-sm'>{row.getValue('phoneNumber')}</div>
    ),
    enableSorting: false,
  },
  {
    id: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='가입일' />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt
      return (
        <div className='text-sm'>
          {date.getFullYear()}.{String(date.getMonth() + 1).padStart(2, '0')}.
          {String(date.getDate()).padStart(2, '0')}
        </div>
      )
    },
  },
  {
    id: 'orderCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='주문횟수' />
    ),
    cell: ({ row }) => (
      <div className='text-right text-sm tabular-nums'>
        {row.original.orderCount}회
      </div>
    ),
  },
  {
    id: 'totalSpent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='누적결제' />
    ),
    cell: ({ row }) => (
      <div className='text-right text-sm font-medium tabular-nums'>
        ₩{row.original.totalSpent.toLocaleString('ko-KR')}
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='등급' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const gradeInfo = roles.find(({ value }) => value === role)
      if (!gradeInfo) return null
      return (
        <Badge variant='outline' className={cn(gradeVariant[role] ?? '')}>
          {gradeInfo.icon && <gradeInfo.icon size={12} className='mr-1' />}
          {gradeInfo.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='상태' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <Badge variant='outline' className={cn(badgeColor)}>
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
