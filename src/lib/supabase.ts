// DMC: VIA-00-00-00-900A | Título: Núcleo — cliente Supabase

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

if (!url || !publishableKey) {
  throw new Error('VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY são obrigatórios (ver .env.example)')
}

export const supabase = createClient(url, publishableKey)
