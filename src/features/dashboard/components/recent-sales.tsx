import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type OrderStatus = '결제완료' | '배송중' | '배송완료' | '취소'

type RecentOrder = {
  name: string
  email: string
  avatar: string
  fallback: string
  amount: string
  status: OrderStatus
}

const statusVariant: Record<
  OrderStatus,
  'default' | 'secondary' | 'outline' | 'destructive'
> = {
  결제완료: 'default',
  배송중: 'secondary',
  배송완료: 'outline',
  취소: 'destructive',
}

const recentOrders: RecentOrder[] = [
  {
    name: '김민지',
    email: 'minji.kim@email.com',
    avatar: '/avatars/01.png',
    fallback: '김',
    amount: '₩1,250,000',
    status: '결제완료',
  },
  {
    name: '이준혁',
    email: 'junhyuk.lee@email.com',
    avatar: '/avatars/02.png',
    fallback: '이',
    amount: '₩890,000',
    status: '배송중',
  },
  {
    name: '박서연',
    email: 'seoyeon.park@email.com',
    avatar: '/avatars/03.png',
    fallback: '박',
    amount: '₩2,340,000',
    status: '배송완료',
  },
  {
    name: '최현우',
    email: 'hyunwoo.choi@email.com',
    avatar: '/avatars/04.png',
    fallback: '최',
    amount: '₩560,000',
    status: '결제완료',
  },
  {
    name: '정수아',
    email: 'sua.jung@email.com',
    avatar: '/avatars/05.png',
    fallback: '정',
    amount: '₩1,780,000',
    status: '취소',
  },
]

export function RecentSales() {
  return (
    <div className='space-y-8'>
      {recentOrders.map((order) => (
        <div key={order.email} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={order.avatar} alt={order.name} />
            <AvatarFallback>{order.fallback}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
            <div className='space-y-1'>
              <p className='text-sm leading-none font-medium'>{order.name}</p>
              <p className='text-sm text-muted-foreground'>{order.email}</p>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant={statusVariant[order.status]}>
                {order.status}
              </Badge>
              <div className='font-medium'>{order.amount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
