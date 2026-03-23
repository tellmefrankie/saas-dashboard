import { z } from 'zod'

export const orderStatusValues = [
  '결제완료',
  '배송준비',
  '배송중',
  '배송완료',
  '취소',
] as const

export const paymentMethodValues = [
  '카드',
  '계좌이체',
  '간편결제',
] as const

export const orderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  product: z.string(),
  amount: z.number(),
  paymentMethod: z.enum(paymentMethodValues),
  status: z.enum(orderStatusValues),
  orderDate: z.string(),
  shippingAddress: z.string(),
  approvalNumber: z.string(),
})

export type Order = z.infer<typeof orderSchema>

// Keep backward compatibility alias
export const taskSchema = orderSchema
export type Task = Order
