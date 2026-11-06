// DMC: VIA-00-00-00-400A | Título: Núcleo — Avatar

type AvatarProps = {
  nome: string
  size?: number
}

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? '') : ''
  return (primeira + ultima).toUpperCase()
}

export function Avatar({ nome, size = 40 }: AvatarProps) {
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-[28%] font-bold text-[#1c1c1e]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: 'linear-gradient(165deg, rgba(171,165,148,.95), rgba(94,91,81,.95))',
      }}
      aria-hidden="true"
    >
      {iniciais(nome)}
    </div>
  )
}
