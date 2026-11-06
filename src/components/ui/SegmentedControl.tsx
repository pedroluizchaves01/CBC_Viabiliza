// DMC: VIA-00-00-00-400A | Título: Núcleo — SegmentedControl

type Option<T extends string> = { value: T; label: string }

type SegmentedControlProps<T extends string> = {
  name: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  name,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="seg" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          data-active={value === opt.value}
          className="seg-opt-btn"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
