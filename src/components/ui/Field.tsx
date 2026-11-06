// DMC: VIA-00-00-00-400A | Título: Núcleo — Field

import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Field({ label, error, className, ...rest }: FieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-[6px] block text-xs font-semibold text-[#9c988c]">
        {label}
      </label>
      <input id={id} className={['field-input', className].filter(Boolean).join(' ')} {...rest} />
      {error && <p className="mt-1 text-xs text-[#ff453a]">{error}</p>}
    </div>
  )
}

type SelectFieldProps = {
  label: string
  id?: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
  className?: string
}

export function SelectField({ label, value, onChange, children, className }: SelectFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-[6px] block text-xs font-semibold text-[#9c988c]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={['field-input', className].filter(Boolean).join(' ')}
      >
        {children}
      </select>
    </div>
  )
}
