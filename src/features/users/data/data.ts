import { Crown, Star, User } from 'lucide-react'
import { type MemberStatus } from './schema'

export const callTypes = new Map<MemberStatus, string>([
  ['활성', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['휴면', 'bg-neutral-300/40 border-neutral-300'],
  [
    '탈퇴',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const roles = [
  {
    label: 'VVIP',
    value: 'VVIP',
    icon: Crown,
  },
  {
    label: 'VIP',
    value: 'VIP',
    icon: Star,
  },
  {
    label: '일반',
    value: '일반',
    icon: User,
  },
] as const
