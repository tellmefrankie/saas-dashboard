import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, CircleArrowUp, Download } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { statuses } from '../data/data'
import { type Order } from '../data/schema'
import { TasksMultiDeleteDialog } from './tasks-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: string) => {
    const selectedOrders = selectedRows.map((row) => row.original as Order)
    toast.promise(sleep(2000), {
      loading: '상태 변경 중...',
      success: () => {
        table.resetRowSelection()
        return `${selectedOrders.length}건의 주문 상태가 "${status}"(으)로 변경되었습니다.`
      },
      error: '오류가 발생했습니다.',
    })
    table.resetRowSelection()
  }

  const handleBulkExport = () => {
    const selectedOrders = selectedRows.map((row) => row.original as Order)
    toast.promise(sleep(2000), {
      loading: '내보내기 중...',
      success: () => {
        table.resetRowSelection()
        return `${selectedOrders.length}건의 주문을 CSV로 내보냈습니다.`
      },
      error: '오류가 발생했습니다.',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='주문'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label='상태 변경'
                >
                  <CircleArrowUp />
                  <span className='sr-only'>상태 변경</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>상태 변경</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                defaultValue={status.value}
                onClick={() => handleBulkStatusChange(status.value)}
              >
                {status.icon && (
                  <status.icon className='size-4 text-muted-foreground' />
                )}
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkExport()}
              className='size-8'
              aria-label='내보내기'
            >
              <Download />
              <span className='sr-only'>내보내기</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>내보내기</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='선택 주문 삭제'
            >
              <Trash2 />
              <span className='sr-only'>선택 주문 삭제</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>선택 주문 삭제</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <TasksMultiDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        table={table}
      />
    </>
  )
}
