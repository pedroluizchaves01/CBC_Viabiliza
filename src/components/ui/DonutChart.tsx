// DMC: VIA-00-00-00-400A | Título: Núcleo — DonutChart

type Segmento = { rotulo: string; valor: number; cor: string }

type DonutChartProps = {
  segmentos: Segmento[]
  centroRotulo: string
  centroValor: string
}

const RAIO = 50
const CIRCUNFERENCIA = 2 * Math.PI * RAIO

export function DonutChart({ segmentos, centroRotulo, centroValor }: DonutChartProps) {
  const total = segmentos.reduce((soma, s) => soma + s.valor, 0)
  let acumulado = 0

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative h-[120px] w-[120px] flex-shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <g transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" r={RAIO} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="16" />
            {total > 0 &&
              segmentos.map((s) => {
                const comprimento = (s.valor / total) * CIRCUNFERENCIA
                const offset = -acumulado
                acumulado += comprimento
                return (
                  <circle
                    key={s.rotulo}
                    cx="60"
                    cy="60"
                    r={RAIO}
                    fill="none"
                    stroke={s.cor}
                    strokeWidth="16"
                    strokeDasharray={`${comprimento} ${CIRCUNFERENCIA}`}
                    strokeDashoffset={offset}
                  />
                )
              })}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[13px] font-bold text-[#f5f3ef]">{centroValor}</div>
          <div className="text-[10px] text-[#76726a]">{centroRotulo}</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2" style={{ minWidth: 180 }}>
        {segmentos.map((s) => {
          const pct = total > 0 ? Math.round((s.valor / total) * 100) : 0
          return (
            <div key={s.rotulo} className="flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-2 text-[#f5f3ef]">
                <span className="inline-block h-[9px] w-[9px] rounded-full" style={{ background: s.cor }} />
                {s.rotulo}
              </span>
              <span className="text-[#9c988c]">
                {s.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} · {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
