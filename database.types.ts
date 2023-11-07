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
      _property_id: {
        Row: {
          id: string | null
        }
        Insert: {
          id?: string | null
        }
        Update: {
          id?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          active: boolean | null
          business_name: string | null
          contact_type: string | null
          created_at: string
          created_by: string | null
          excel_import_number: number | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          active?: boolean | null
          business_name?: string | null
          contact_type?: string | null
          created_at?: string
          created_by?: string | null
          excel_import_number?: number | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          active?: boolean | null
          business_name?: string | null
          contact_type?: string | null
          created_at?: string
          created_by?: string | null
          excel_import_number?: number | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      email_addresses: {
        Row: {
          active: boolean | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          default: boolean | null
          email_address: string | null
          id: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          active?: boolean | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          default?: boolean | null
          email_address?: string | null
          id?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          active?: boolean | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          default?: boolean | null
          email_address?: string | null
          id?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_addresses_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
      leepa_owners: {
        Row: {
          address1: string | null
          address2: string | null
          address3: string | null
          address4: string | null
          country: string | null
          created_at: string
          created_by: string | null
          owner_name: string | null
          property_id: string
          unit_number: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          address3?: string | null
          address4?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          owner_name?: string | null
          property_id: string
          unit_number?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          address3?: string | null
          address4?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          owner_name?: string | null
          property_id?: string
          unit_number?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leepa_owners_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      leepa_sales: {
        Row: {
          column4: string
          column5: string | null
          column6: string | null
          column7: string | null
          created_at: string
          id: string
          property_id: string
          sale_date: string
          sale_price: number | null
          unit_number: number | null
        }
        Insert: {
          column4?: string
          column5?: string | null
          column6?: string | null
          column7?: string | null
          created_at?: string
          id?: string
          property_id: string
          sale_date: string
          sale_price?: number | null
          unit_number?: number | null
        }
        Update: {
          column4?: string
          column5?: string | null
          column6?: string | null
          column7?: string | null
          created_at?: string
          id?: string
          property_id?: string
          sale_date?: string
          sale_price?: number | null
          unit_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leepa_sales_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      phone_numbers: {
        Row: {
          active: boolean | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          default: boolean | null
          id: string
          phone_number: string | null
          phone_type: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          default?: boolean | null
          id?: string
          phone_number?: string | null
          phone_type?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          default?: boolean | null
          id?: string
          phone_number?: string | null
          phone_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_numbers_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
      properties: {
        Row: {
          association_number: number | null
          building_number: number | null
          city: string | null
          created_at: string
          folio: string | null
          id: string
          next_building_id: string | null
          next_id: string | null
          previous_building_id: string | null
          previous_id: string | null
          state: string | null
          strap: string | null
          street_address_1: string | null
          street_address_2: string | null
          unit_number: number | null
          zip: string | null
        }
        Insert: {
          association_number?: number | null
          building_number?: number | null
          city?: string | null
          created_at?: string
          folio?: string | null
          id?: string
          next_building_id?: string | null
          next_id?: string | null
          previous_building_id?: string | null
          previous_id?: string | null
          state?: string | null
          strap?: string | null
          street_address_1?: string | null
          street_address_2?: string | null
          unit_number?: number | null
          zip?: string | null
        }
        Update: {
          association_number?: number | null
          building_number?: number | null
          city?: string | null
          created_at?: string
          folio?: string | null
          id?: string
          next_building_id?: string | null
          next_id?: string | null
          previous_building_id?: string | null
          previous_id?: string | null
          state?: string | null
          strap?: string | null
          street_address_1?: string | null
          street_address_2?: string | null
          unit_number?: number | null
          zip?: string | null
        }
        Relationships: []
      }
      property_contact: {
        Row: {
          contact_id: string
          created_at: string
          created_by: string
          property_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          created_by: string
          property_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          created_by?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_contact_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_contact_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_contact_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      todos: {
        Row: {
          created_at: string
          id: string
          is_complete: boolean | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_contact: {
        Args: {
          var_first_name: string
          var_last_name: string
          var_business_name: string
          var_contact_type: string
          var_property_id: string
          var_created_by: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
