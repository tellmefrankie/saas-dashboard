import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'

export function SettingsAccount() {
  return (
    <ContentSection
      title='계정'
      desc='계정 설정을 업데이트합니다. 언어 및 시간대를 설정하세요.'
    >
      <AccountForm />
    </ContentSection>
  )
}
