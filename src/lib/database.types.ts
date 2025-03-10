
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          installation_type: 'residential' | 'business'
          state: string
          annual_bill: number
          phone: string
          created_at: string
          status: 'new' | 'contacted' | 'qualified' | 'closed'
          qualify_lead: 'qualified' | 'desqualificado'
        }
        Insert: {
          id?: string
          installation_type: 'residential' | 'business'
          state: string
          annual_bill: number
          phone: string
          created_at?: string
          status?: 'new' | 'contacted' | 'qualified' | 'closed'
          qualify_lead?: 'qualified' | 'desqualificado'
        }
        Update: {
          id?: string
          installation_type?: 'residential' | 'business'
          state?: string
          annual_bill?: number
          phone?: string
          created_at?: string
          status?: 'new' | 'contacted' | 'qualified' | 'closed'
          qualify_lead?: 'qualified' | 'desqualificado'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
