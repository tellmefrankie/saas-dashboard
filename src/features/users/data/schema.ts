import { z } from 'zod'

const memberGradeSchema = z.union([
  z.literal('일반'),
  z.literal('VIP'),
  z.literal('VVIP'),
])
export type MemberGrade = z.infer<typeof memberGradeSchema>

const memberStatusSchema = z.union([
  z.literal('활성'),
  z.literal('휴면'),
  z.literal('탈퇴'),
])
export type MemberStatus = z.infer<typeof memberStatusSchema>

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: memberStatusSchema,
  role: memberGradeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  orderCount: z.number(),
  totalSpent: z.number(),
})
export type User = z.infer<typeof userSchema>

// Keep backward compat
export type UserStatus = MemberStatus

export const userListSchema = z.array(userSchema)
