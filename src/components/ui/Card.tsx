// DMC: VIA-00-00-00-400A | Título: Núcleo — Card

import type { ReactNode } from 'react'

type CardProps = {
  id?: string
  icon?: ReactNode
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ id, icon, title, children, className }: CardProps) {
  return (
    <section
      id={id}
      className={['rounded-[20px] bg-[#1c1c1e] p-[22px] shadow-[0_1px_2px_rgba(0,0,0,.3)]', className]
        .filter(Boolean)
        .join(' ')}
    >
      {title && (
        <div className="mb-[18px] flex items-center gap-[10px]">
          {icon && (
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[9px] bg-[rgba(171,165,148,.14)] text-[#aba594]">
              {icon}
            </div>
          )}
          <h2 className="m-0 text-[17px] font-semibold text-[#f5f3ef]">{title}</h2>
        </div>
      )}
      {children}
    </section>
  )
}
