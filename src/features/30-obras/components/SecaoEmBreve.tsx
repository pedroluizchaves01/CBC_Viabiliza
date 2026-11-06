// DMC: VIA-30-00-00-400B | Título: Obras › seção ainda não construída (placeholder)
// BREX: VIA-00-00-00-022A

import { Card } from '@/components/ui'

type SecaoEmBreveProps = {
  id: string
  titulo: string
}

export function SecaoEmBreve({ id, titulo }: SecaoEmBreveProps) {
  return (
    <Card id={id} title={titulo}>
      <p className="text-[13px] text-[#76726a]">Esta seção entra numa próxima fatia de construção.</p>
    </Card>
  )
}
