import React from 'react'
import { RangeCalendar } from '../components/RangeCalendar'
import { today, getLocalTimeZone } from "@internationalized/date";

function Calendar() {
  return (
    <div className='flex flex-wrap justify-around px-4 pt-4 row-span-4 h-full relative flex-row'>
        <RangeCalendar className='w-fit h-fit sticky top-0'
        minValue={today(getLocalTimeZone())}
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone())
        }}
      />
      <div className='h-auto pt-4 w-[50%]'>
        <h1 className='p-2 text-xl font-bold'>Upcoming Events</h1>
        <div className='px-2'>List of events</div>
      </div>
    </div>
  )
}

export default Calendar