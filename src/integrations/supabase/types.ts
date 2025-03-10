export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      block_agent: {
        Row: {
          id: number
          n_contact: string | null
        }
        Insert: {
          id?: number
          n_contact?: string | null
        }
        Update: {
          id?: number
          n_contact?: string | null
        }
        Relationships: []
      }
      chatlogs: {
        Row: {
          id: number
          input: string | null
          latency: string | null
          messageid: string | null
          output: string | null
          projectid: string | null
          sessionid: string | null
          source: string | null
          timestamp: string | null
          totalcost: number | null
          userid: string | null
        }
        Insert: {
          id?: number
          input?: string | null
          latency?: string | null
          messageid?: string | null
          output?: string | null
          projectid?: string | null
          sessionid?: string | null
          source?: string | null
          timestamp?: string | null
          totalcost?: number | null
          userid?: string | null
        }
        Update: {
          id?: number
          input?: string | null
          latency?: string | null
          messageid?: string | null
          output?: string | null
          projectid?: string | null
          sessionid?: string | null
          source?: string | null
          timestamp?: string | null
          totalcost?: number | null
          userid?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          annual_bill: number
          created_at: string | null
          expected_meeting_date: string | null
          IA_contact: string | null
          IA_new_contact: string | null
          id: string
          id_converse: number | null
          installation_type: string
          meeting_date: string | null
          name: string | null
          phone: number
          power_capacity: number | null
          qualify_lead: string | null
          state: string
          status: string
          status_card: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          annual_bill: number
          created_at?: string | null
          expected_meeting_date?: string | null
          IA_contact?: string | null
          IA_new_contact?: string | null
          id?: string
          id_converse?: number | null
          installation_type: string
          meeting_date?: string | null
          name?: string | null
          phone: number
          power_capacity?: number | null
          qualify_lead?: string | null
          state: string
          status?: string
          status_card?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          annual_bill?: number
          created_at?: string | null
          expected_meeting_date?: string | null
          IA_contact?: string | null
          IA_new_contact?: string | null
          id?: string
          id_converse?: number | null
          installation_type?: string
          meeting_date?: string | null
          name?: string | null
          phone?: number
          power_capacity?: number | null
          qualify_lead?: string | null
          state?: string
          status?: string
          status_card?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      temp: {
        Row: {
          created_at: string
          id: number
          n8n_active: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          n8n_active?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          n8n_active?: string | null
        }
        Relationships: []
      }
      teste123: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      teste12345: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          atendente: string | null
          conversationid: number | null
          lastupdated: string | null
          pushname: string | null
          sessionid: string | null
          userid: string
          usertype: string | null
        }
        Insert: {
          atendente?: string | null
          conversationid?: number | null
          lastupdated?: string | null
          pushname?: string | null
          sessionid?: string | null
          userid: string
          usertype?: string | null
        }
        Update: {
          atendente?: string | null
          conversationid?: number | null
          lastupdated?: string | null
          pushname?: string | null
          sessionid?: string | null
          userid?: string
          usertype?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      lead_installation_types: {
        Row: {
          count: number | null
          installation_type: string | null
        }
        Relationships: []
      }
      lead_states: {
        Row: {
          count: number | null
          state: string | null
        }
        Relationships: []
      }
      lead_status_counts: {
        Row: {
          count: number | null
          status_card: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      create_lead_status_counts_view: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_view_function: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
