import {
  LayoutDashboard,
  Monitor,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  ShoppingCart,
  CalendarDays,
  Command,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: '박재현',
    email: 'admin@adminpro.co.kr',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Admin Pro',
      logo: Command,
      plan: 'SaaS 어드민',
    },
  ],
  navGroups: [
    {
      title: '메뉴',
      items: [
        {
          title: '대시보드',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: '주문관리',
          url: '/tasks',
          icon: ShoppingCart,
        },
        {
          title: '회원관리',
          url: '/users',
          icon: Users,
        },
        {
          title: '예약관리',
          url: '/apps',
          icon: CalendarDays,
        },
      ],
    },
    {
      title: '설정',
      items: [
        {
          title: '설정',
          icon: Settings,
          items: [
            {
              title: '프로필',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: '계정',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: '테마',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: '알림',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: '화면',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
      ],
    },
  ],
}
