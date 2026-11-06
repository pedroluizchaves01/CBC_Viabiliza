// DMC: VIA-00-00-00-400A | Título: Núcleo — Button

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <button className={[base, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  )
}
