import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  { name: '1월', total: 18500000 },
  { name: '2월', total: 21200000 },
  { name: '3월', total: 19800000 },
  { name: '4월', total: 24300000 },
  { name: '5월', total: 22100000 },
  { name: '6월', total: 28700000 },
  { name: '7월', total: 31500000 },
  { name: '8월', total: 27900000 },
  { name: '9월', total: 33200000 },
  { name: '10월', total: 29400000 },
  { name: '11월', total: 35800000 },
  { name: '12월', total: 38100000 },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          direction='ltr'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            `${(value / 10000).toLocaleString('ko-KR')}만`
          }
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
