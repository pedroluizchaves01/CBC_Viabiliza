// DMC: VIA-20-00-00-100A | Título: Cadastros base › Investidor › schema
// BREX: VIA-00-00-00-022A

import { z } from 'zod'

export const investidorSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(2, 'Informe o nome do investidor'),
  contato: z.string().optional(),
})

export type Investidor = z.infer<typeof investidorSchema>
