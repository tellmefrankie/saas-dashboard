import {
  CheckCircle,
  Package,
  Truck,
  PackageCheck,
  CircleOff,
  CreditCard,
  Landmark,
  Smartphone,
} from 'lucide-react'

export const statuses = [
  {
    label: '결제완료',
    value: '결제완료' as const,
    icon: CheckCircle,
  },
  {
    label: '배송준비',
    value: '배송준비' as const,
    icon: Package,
  },
  {
    label: '배송중',
    value: '배송중' as const,
    icon: Truck,
  },
  {
    label: '배송완료',
    value: '배송완료' as const,
    icon: PackageCheck,
  },
  {
    label: '취소',
    value: '취소' as const,
    icon: CircleOff,
  },
]

export const paymentMethods = [
  {
    label: '카드',
    value: '카드' as const,
    icon: CreditCard,
  },
  {
    label: '계좌이체',
    value: '계좌이체' as const,
    icon: Landmark,
  },
  {
    label: '간편결제',
    value: '간편결제' as const,
    icon: Smartphone,
  },
]

// Keep backward compatibility
export const labels = paymentMethods.map((m) => ({
  value: m.value,
  label: m.label,
}))
export const priorities = paymentMethods
