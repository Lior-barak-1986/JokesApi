import React from 'react'

interface InnerCardProps {
  data: any;
}

export default function InnerCard({data}:InnerCardProps) {
  return (
    <div>
      {data}
    </div>
  )
}
