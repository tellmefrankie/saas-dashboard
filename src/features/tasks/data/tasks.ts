import { type Order } from './schema'

const customerNames = [
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
  '배성훈',
  '류다은',
  '신우진',
  '문채원',
  '황지호',
]

const products = [
  '무선 블루투스 이어폰 Pro',
  '프리미엄 가죽 노트북 파우치',
  '스테인리스 텀블러 500ml',
  'USB-C 멀티 허브 7포트',
  '인체공학 메시 사무용 의자',
  '4K 웹캠 HD Pro',
  '기계식 키보드 청축',
  '무선 충전 마우스패드',
  '27인치 QHD 모니터',
  '포터블 SSD 1TB',
  '노이즈캔슬링 헤드폰',
  '스마트워치 밴드 세트',
  'LED 데스크 램프',
  '에르고 마우스 버티컬',
  '노트북 거치대 알루미늄',
  'HDMI 케이블 2m',
  '미니 프로젝터 FHD',
  '전동 스탠딩 데스크',
  '공기청정기 필터 세트',
  '스마트 체중계',
]

const addresses = [
  '서울특별시 강남구 테헤란로 123',
  '서울특별시 서초구 반포대로 45',
  '서울특별시 마포구 월드컵북로 67',
  '경기도 성남시 분당구 판교역로 89',
  '경기도 수원시 영통구 광교로 101',
  '인천광역시 연수구 송도대로 234',
  '부산광역시 해운대구 센텀중앙로 56',
  '대전광역시 유성구 대학로 78',
  '대구광역시 수성구 달구벌대로 90',
  '광주광역시 서구 상무중앙로 12',
]

const statusValues = [
  '결제완료',
  '배송준비',
  '배송중',
  '배송완료',
  '취소',
] as const

const paymentMethodValues = ['카드', '계좌이체', '간편결제'] as const

function generateOrders(): Order[] {
  const orders: Order[] = []

  for (let i = 0; i < 50; i++) {
    const customerIndex = i % customerNames.length
    const productIndex = i % products.length
    const addressIndex = i % addresses.length
    const name = customerNames[customerIndex]

    // Distribute statuses: 40% 배송완료, 20% 배송중, 20% 결제완료, 10% 배송준비, 10% 취소
    const statusWeights = [2, 1, 2, 4, 1] // 결제완료, 배송준비, 배송중, 배송완료, 취소
    const totalWeight = statusWeights.reduce((a, b) => a + b, 0)
    const statusRand = (i * 7 + 3) % totalWeight // deterministic pseudo-random
    let cumulative = 0
    let statusIndex = 0
    for (let s = 0; s < statusWeights.length; s++) {
      cumulative += statusWeights[s]
      if (statusRand < cumulative) {
        statusIndex = s
        break
      }
    }

    const paymentIndex = i % 3
    const day = ((i * 3 + 1) % 28) + 1
    const month = ((i * 2) % 3) + 1 // 1~3월
    const amount =
      [
        45000, 89000, 23000, 67000, 450000, 129000, 158000, 35000, 890000,
        189000, 349000, 29000, 78000, 99000, 65000, 15000, 1290000, 780000,
        45000, 59000, 125000, 234000, 67000, 89000, 345000, 56000, 178000,
        92000, 1450000, 38000, 249000, 145000, 78000, 55000, 890000, 43000,
        167000, 289000, 112000, 76000, 520000, 88000, 199000, 67000, 345000,
        234000, 78000, 156000, 445000, 93000,
      ][i] ?? 50000

    const orderNum = String(20250000 + (50 - i)).padStart(8, '0')

    orders.push({
      id: String(i + 1),
      orderNumber: `ORD-${orderNum}`,
      customerName: name,
      customerEmail: `${['minji', 'junhyuk', 'seoyeon', 'hyunwoo', 'sua', 'doyun', 'yerin', 'siwoo', 'haeun', 'jaemin', 'soyul', 'taehyun', 'jian', 'minseo', 'yujin', 'sunghun', 'daeun', 'woojin', 'chaewon', 'jiho'][customerIndex]}@email.com`,
      customerPhone: `010-${String(1000 + ((i * 137 + 42) % 9000)).padStart(4, '0')}-${String(1000 + ((i * 251 + 17) % 9000)).padStart(4, '0')}`,
      product: products[productIndex],
      amount,
      paymentMethod: paymentMethodValues[paymentIndex],
      status: statusValues[statusIndex],
      orderDate: `2025.0${month}.${String(day).padStart(2, '0')}`,
      shippingAddress: addresses[addressIndex],
      approvalNumber: `AP${String(100000000 + i * 7919).slice(0, 9)}`,
    })
  }

  return orders
}

export const tasks = generateOrders()
