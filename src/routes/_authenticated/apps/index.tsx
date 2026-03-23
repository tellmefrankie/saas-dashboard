import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Apps } from '@/features/apps'

const reservationSearchSchema = z.object({
  status: z.enum(['all', '확정', '대기', '취소']).optional().catch(undefined),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/apps/')({
  validateSearch: reservationSearchSchema,
  component: Apps,
})
