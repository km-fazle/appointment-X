import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { StatusIcon } from '@/constants'

const StatusBadge = ({status}: {status: Status}) => {
  return (

    <div className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
})}>
    <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
    /><p>
        {status}
    </p>
   </div>
  )
}

export default StatusBadge