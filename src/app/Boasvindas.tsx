// DMC: VIA-30-00-00-400B | Título: Boas-vindas
// BREX: VIA-00-00-00-022A

import { Link } from 'react-router-dom'

const DESTAQUES = [
  {
    rotulo: 'Terreno, custos e financiamento num único estudo',
    icone: (
      <path d="M3 11l9-8 9 8M5 10v10h14V10" />
    ),
  },
  {
    rotulo: 'VPL, TIR, payback e cenários calculados na hora',
    icone: <path d="M3 3v18h18M7 14l4-4 3 3 5-6" />,
  },
  {
    rotulo: 'Pesquisa de preços de mercado com IA',
    icone: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  },
]

export function Boasvindas() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-10 text-[#f5f3ef]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)',
          maskImage: 'radial-gradient(circle at 50% 42%, #000 0%, transparent 72%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 -top-36 h-[480px] w-[480px] rounded-full blur-[10px]"
        style={{ background: 'radial-gradient(circle, rgba(171,165,148,.18), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-28 h-[520px] w-[520px] rounded-full blur-[10px]"
        style={{ background: 'radial-gradient(circle, rgba(94,91,81,.4), transparent 70%)' }}
      />

      <div className="relative z-10 flex max-w-[540px] flex-col items-center text-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,.4)]"
          style={{ background: 'radial-gradient(135% 135% at 25% 20%, rgba(255,255,255,.4), transparent 55%), #5E5B51' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18" /><path d="M6 20V10" /><path d="M12 20V4" /><path d="M18 20v-7" />
          </svg>
        </div>

        <h1 className="m-0 mb-[10px] text-[42px] font-bold tracking-tight">Viabiliza</h1>
        <p className="m-0 mb-[10px] text-[19px] font-semibold text-[#d8d4cb]">
          Clareza financeira para decisões de investimento.
        </p>
        <p className="m-0 mb-9 text-sm text-[#76726a]">
          Do terreno ao financiamento, tudo pronto para apresentar.
        </p>

        <Link to="/obras" className="btn-primary px-7 py-[14px] text-[15px]">
          Entrar no dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        <div className="mt-[52px] flex flex-wrap justify-center gap-7">
          {DESTAQUES.map((d) => (
            <div key={d.rotulo} className="flex max-w-[140px] flex-col items-center gap-[10px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(171,165,148,.14)]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ABA594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {d.icone}
                </svg>
              </div>
              <div className="text-xs leading-snug text-[#9c988c]">{d.rotulo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
