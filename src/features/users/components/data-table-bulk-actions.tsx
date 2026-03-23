import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type User } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: '활성' | '휴면') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: `회원 상태 변경 중...`,
      success: () => {
        table.resetRowSelection()
        return `${selectedUsers.length}명의 회원 상태가 "${status}"(으)로 변경되었습니다.`
      },
      error: '오류가 발생했습니다.',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='회원'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('활성')}
              className='size-8'
              aria-label='활성화'
            >
              <UserCheck />
              <span className='sr-only'>활성화</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>활성화</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('휴면')}
              className='size-8'
              aria-label='휴면 처리'
            >
              <UserX />
              <span className='sr-only'>휴면 처리</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>휴면 처리</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='선택 회원 삭제'
            >
              <Trash2 />
              <span className='sr-only'>선택 회원 삭제</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>선택 회원 삭제</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
