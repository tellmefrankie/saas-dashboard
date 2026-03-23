import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'

export function SettingsDisplay() {
  return (
    <ContentSection
      title='화면'
      desc='앱에 표시할 항목을 설정합니다.'
    >
      <DisplayForm />
    </ContentSection>
  )
}
