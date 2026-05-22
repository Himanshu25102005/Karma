'use client'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts'
import React from 'react'

const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    product2: 2400
  },
  {
    name: 'Feb',
    product1: 3500,
    product2: 2800
  },
  {
    name: 'Mar',
    product1: 4200,
    product2: 3100
  },
  {
    name: 'Apr',
    product1: 4800,
    product2: 2900
  },
  {
    name: 'May',
    product1: 5100,
    product2: 3400
  },
  {
    name: 'Jun',
    product1: 4600,
    product2: 4100
  },
  {
    name: 'Jul',
    product1: 4300,
    product2: 3900
  },
  {
    name: 'Aug',
    product1: 4900,
    product2: 4300
  },
  {
    name: 'Sep',
    product1: 5500,
    product2: 4700
  },
  {
    name: 'Oct',
    product1: 6200,
    product2: 5200
  },
  {
    name: 'Nov',
    product1: 7500,
    product2: 6100
  },
  {
    name: 'Dec',
    product1: 8900,
    product2: 7400
  }
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart width={200} height={200} data={productSales} margin={{right:30, top:10}}>
      <YAxis/>
      <XAxis dataKey="name" />
      <CartesianGrid strokeDasharray="5,5" stroke='#111111'/>
      <Legend/>
      <Tooltip/>
        <Bar
          type="monotone"
          stroke='#111111'
          fill='#3b82f6 '
          dataKey="product1"
        />

        <Bar
          type="monotone"
          stroke='#222222'
          fill='#3b82f0 '
          dataKey="product2"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}



export default BarChartComponent



