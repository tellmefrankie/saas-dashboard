import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { paymentMethods, statuses } from '../data/data'
import { type Order } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

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

export const tasksColumns: ColumnDef<Order>[] = [
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
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='주문번호' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px] font-mono text-xs'>
        {row.getValue('orderNumber')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='주문일' />
    ),
    cell: ({ row }) => (
      <div className='w-[90px] text-sm'>{row.getValue('orderDate')}</div>
    ),
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='주문자' />
    ),
    cell: ({ row }) => (
      <div className='w-[70px] text-sm'>{row.getValue('customerName')}</div>
    ),
  },
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='상품명' />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-1/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='truncate text-sm font-medium'>
        {row.getValue('product')}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='금액' />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return (
        <div className='w-[100px] text-right text-sm font-medium tabular-nums'>
          ₩{amount.toLocaleString('ko-KR')}
        </div>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='결제수단' />
    ),
    cell: ({ row }) => {
      const method = paymentMethods.find(
        (m) => m.value === row.getValue('paymentMethod')
      )
      if (!method) return null
      return (
        <div className='flex w-[80px] items-center gap-1.5'>
          <method.icon className='size-3.5 text-muted-foreground' />
          <span className='text-sm'>{method.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='상태' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (s) => s.value === row.getValue('status')
      )
      if (!status) return null
      return (
        <Badge variant={statusVariant[status.value] ?? 'outline'}>
          {status.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
