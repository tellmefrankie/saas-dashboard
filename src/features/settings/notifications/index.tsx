import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export function SettingsNotifications() {
  return (
    <ContentSection title='알림' desc='알림 수신 방법을 설정합니다.'>
      <NotificationsForm />
    </ContentSection>
  )
}
