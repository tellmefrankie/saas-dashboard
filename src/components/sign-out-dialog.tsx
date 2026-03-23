import { useNavigate, useLocation } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuthStore()

  const handleSignOut = () => {
    auth.reset()
    // Preserve current location for redirect after sign-in
    const currentPath = location.href
    navigate({
      to: '/sign-in',
      search: { redirect: currentPath },
      replace: true,
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='로그아웃'
      desc='정말 로그아웃 하시겠습니까? 다시 로그인해야 계정에 접근할 수 있습니다.'
      confirmText='로그아웃'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
