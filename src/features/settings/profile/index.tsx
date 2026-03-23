import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  return (
    <ContentSection
      title='프로필'
      desc='다른 사용자에게 표시되는 내 정보입니다.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
