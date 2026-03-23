import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export function SettingsAppearance() {
  return (
    <ContentSection
      title='테마'
      desc='앱의 외관을 설정합니다. 라이트/다크 테마를 선택하세요.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
