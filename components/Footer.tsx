import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

export interface Iitems {
  items: string[],
  mt: boolean
}

const List = ({ items, mt }: Iitems) => {
  return (
    <div className={`flex flex-wrap gap-3 ${mt && 'mt-5'}`}>
      {items.map((item) => {
        return <p key={item} className="text-gray-400 hover:underline cursor-pointer">{item}</p>
      })
      }
    </div>
  )
}
const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2022 TikTik</p>
    </div>
  )
}

export default Footer