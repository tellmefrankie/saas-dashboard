export type ReservationStatus = '확정' | '대기' | '취소'

export type Reservation = {
  id: string
  customerName: string
  date: string
  time: string
  service: string
  status: ReservationStatus
  phone: string
  note: string
}

const services = [
  '프리미엄 컨설팅',
  '기본 상담',
  '데이터 분석 리포트',
  '마케팅 전략 수립',
  'UI/UX 디자인 리뷰',
  'SEO 최적화 진단',
  '브랜드 아이덴티티 컨설팅',
  '퍼포먼스 마케팅 셋업',
]

const names = [
  '김민지',
  '이준혁',
  '박서연',
  '최현우',
  '정수아',
  '강도윤',
  '조예린',
  '윤시우',
  '장하은',
  '임재민',
  '한소율',
  '오태현',
  '서지안',
  '권민서',
  '홍유진',
]

const times = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
]

const statusWeights: ReservationStatus[] = [
  '확정',
  '확정',
  '확정',
  '확정',
  '대기',
  '대기',
  '취소',
]

export const reservations: Reservation[] = Array.from(
  { length: 40 },
  (_, i) => {
    const day = ((i * 3 + 1) % 28) + 1
    const month = ((i * 2) % 3) + 1

    return {
      id: String(i + 1),
      customerName: names[i % names.length],
      date: `2025.0${month}.${String(day).padStart(2, '0')}`,
      time: times[i % times.length],
      service: services[i % services.length],
      status: statusWeights[i % statusWeights.length],
      phone: `010-${String(1000 + ((i * 137 + 42) % 9000)).padStart(4, '0')}-${String(1000 + ((i * 251 + 17) % 9000)).padStart(4, '0')}`,
      note: i % 5 === 0 ? '첫 방문 고객' : i % 7 === 0 ? 'VIP 고객' : '',
    }
  }
)

// Calendar helper: count reservations per date
export function getReservationCountByDate(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const r of reservations) {
    counts[r.date] = (counts[r.date] ?? 0) + 1
  }
  return counts
}

// Today's reservations summary
export function getTodaySummary() {
  const today = reservations.filter((r) => r.date === '2025.03.23')
  return {
    total: today.length,
    confirmed: today.filter((r) => r.status === '확정').length,
    pending: today.filter((r) => r.status === '대기').length,
    cancelled: today.filter((r) => r.status === '취소').length,
  }
}
