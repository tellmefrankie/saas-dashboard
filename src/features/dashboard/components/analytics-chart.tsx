import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  { name: '월', clicks: 420, uniques: 310 },
  { name: '화', clicks: 580, uniques: 430 },
  { name: '수', clicks: 650, uniques: 490 },
  { name: '목', clicks: 510, uniques: 380 },
  { name: '금', clicks: 720, uniques: 540 },
  { name: '토', clicks: 380, uniques: 280 },
  { name: '일', clicks: 290, uniques: 210 },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Area
          type='monotone'
          dataKey='clicks'
          stroke='currentColor'
          className='text-primary'
          fill='currentColor'
          fillOpacity={0.15}
        />
        <Area
          type='monotone'
          dataKey='uniques'
          stroke='currentColor'
          className='text-muted-foreground'
          fill='currentColor'
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
