import { createFileRoute } from '@tanstack/react-router'
import { OrderDetail } from '@/features/tasks/components/order-detail'

export const Route = createFileRoute('/_authenticated/tasks/$id')({
  component: OrderDetail,
})
