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
      aulas: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          questoes_ids: string[] | null
          status: string | null
          titulo: string
          topicos_ids: string[] | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          questoes_ids?: string[] | null
          status?: string | null
          titulo: string
          topicos_ids?: string[] | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          questoes_ids?: string[] | null
          status?: string | null
          titulo?: string
          topicos_ids?: string[] | null
        }
        Relationships: []
      }
      disciplinas: {
        Row: {
          aulas_ids: string[] | null
          created_at: string | null
          descricao: string | null
          id: string
          status: string | null
          titulo: string
        }
        Insert: {
          aulas_ids?: string[] | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo: string
        }
        Update: {
          aulas_ids?: string[] | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          foto_perfil: string | null
          id: string
          nome: string | null
          role: string | null
        }
        Insert: {
          email?: string | null
          foto_perfil?: string | null
          id: string
          nome?: string | null
          role?: string | null
        }
        Update: {
          email?: string | null
          foto_perfil?: string | null
          id?: string
          nome?: string | null
          role?: string | null
        }
        Relationships: []
      }
      questoes: {
        Row: {
          aiexplanation: string | null
          content: string
          created_at: string | null
          difficulty: string
          discipline: string
          expandablecontent: string | null
          id: string
          institution: string
          level: string
          options: Json | null
          organization: string
          questiontype: string
          role: string
          teacherexplanation: string
          topicos: string[] | null
          updated_at: string | null
          user_id: string
          year: string
        }
        Insert: {
          aiexplanation?: string | null
          content: string
          created_at?: string | null
          difficulty: string
          discipline: string
          expandablecontent?: string | null
          id: string
          institution: string
          level: string
          options?: Json | null
          organization: string
          questiontype: string
          role: string
          teacherexplanation: string
          topicos?: string[] | null
          updated_at?: string | null
          user_id: string
          year: string
        }
        Update: {
          aiexplanation?: string | null
          content?: string
          created_at?: string | null
          difficulty?: string
          discipline?: string
          expandablecontent?: string | null
          id?: string
          institution?: string
          level?: string
          options?: Json | null
          organization?: string
          questiontype?: string
          role?: string
          teacherexplanation?: string
          topicos?: string[] | null
          updated_at?: string | null
          user_id?: string
          year?: string
        }
        Relationships: []
      }
      topicos: {
        Row: {
          created_at: string | null
          disciplina: string
          id: string
          nome: string
          patrocinador: string | null
          questoes_ids: string[] | null
        }
        Insert: {
          created_at?: string | null
          disciplina: string
          id?: string
          nome: string
          patrocinador?: string | null
          questoes_ids?: string[] | null
        }
        Update: {
          created_at?: string | null
          disciplina?: string
          id?: string
          nome?: string
          patrocinador?: string | null
          questoes_ids?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "aluno" | "professor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
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
