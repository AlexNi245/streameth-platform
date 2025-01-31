'use client'
import { useState, useContext } from 'react'
import { MobileContext } from '../context/MobileContext'
export default function PluginBar({
  bottomOffset,
  tabs,
}: {
  bottomOffset: number
  tabs: {
    id: string
    header: JSX.Element
    content: JSX.Element
  }[]
}) {
  const { isMobile } = useContext(MobileContext)
  const [selectedId, setSelectedId] = useState(tabs[0].id)
  const selectedTab = tabs.find((tab) => tab.id === selectedId)

  if (!selectedTab) {
    return null
  }

  return (
    <div className=" flex flex-col rounded-xl p-2 md:p-4  h-full bg-base ">
      <div
        style={{ top: isMobile ? bottomOffset : 'unset' }}
        className="bg-base z-20 pb-0 sticky md:relative rounded md:top-[unset] flex flex-row w-full bg-secondary mb-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setSelectedId(tab.id)}
            className="m-2 w-full ">
            <div
              className={`${
                selectedId === tab.id
                  ? 'bg-accent text-white  font-bold'
                  : 'hover:bg-accent hover:text-white cursor-pointer text-main-text font-bold'
              } p-2 uppercase w-full rounded text-center text-sm `}>
              {tab.id}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col w-full flex-grow overflow-scroll"
        key={selectedId}>
        {selectedTab.content}
      </div>
    </div>
  )
}
