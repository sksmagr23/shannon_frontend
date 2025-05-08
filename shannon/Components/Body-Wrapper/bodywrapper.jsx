"use client"

export default function BodyWrapper({children, className}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}