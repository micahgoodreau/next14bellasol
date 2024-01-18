"use server";


import { ZodError } from "zod";
import { addEmailAddressFormSchema, addLeaseFormSchema, addPhoneNumberFormSchema } from "./validation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

  export async function getFullName(
    prevState: State | null,
    formdata: FormData,
  ): Promise<State> {
    try {
      // Artificial delay; don't forget to remove that!
      //await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Validate our data
      const { email_address, contact_id } = addEmailAddressFormSchema.parse(formdata);
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //const var_created_by = user?.id;
      const { data, error } = await supabase.from("email_addresses").insert({
        email_address: email_address,
        contact_id: contact_id,
      });
      revalidatePath('/');
      
      return {
        status: "success",
        message: `Welcome, ${email_address} added!`,
      };
    } catch (e) {
      // In case of a ZodError (caused by our validation) we're adding issues to our response
      if (e instanceof ZodError) {
        return {
          status: "error",
          message: "Invalid form data",
          errors: e.issues.map((issue) => ({
            path: issue.path.join("."),
            message: `Server validation: ${issue.message}`,
          })),
        };
      }
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }
  }
  export async function addPhoneNumber(
    prevState: State | null,
    formdata: FormData,
  ): Promise<State> {
    try {
      // Artificial delay; don't forget to remove that!
      //await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Validate our data
      const { phone_number, phone_type, contact_id } = addPhoneNumberFormSchema.parse(formdata);
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //const var_created_by = user?.id;
      const { data, error } = await supabase.from("phone_numbers").insert({
        phone_number: phone_number,
        phone_type: phone_type,
        contact_id: contact_id,
      });
      revalidatePath('/');
      
      return {
        status: "success",
        message: `${phone_number} added!`,
      };
    } catch (e) {
      // In case of a ZodError (caused by our validation) we're adding issues to our response
      if (e instanceof ZodError) {
        return {
          status: "error",
          message: "Invalid form data",
          errors: e.issues.map((issue) => ({
            path: issue.path.join("."),
            message: `Server validation: ${issue.message}`,
          })),
        };
      }
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }
  }
  export async function addLease(
    prevState: State | null,
    formdata: FormData,
  ): Promise<State> {
    try {
      // Artificial delay; don't forget to remove that!
      //await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Validate our data
      const { start_date, end_date, property_id } = addLeaseFormSchema.parse(formdata);
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //const var_created_by = user?.id;
      const { data, error } = await supabase.from("leases").insert({
        start_date: start_date,
        end_date: end_date,
        property_id: property_id,
      });
      revalidatePath('/');
      
      return {
        status: "success",
        message: `Lease added!`,
      };
    } catch (e) {
      // In case of a ZodError (caused by our validation) we're adding issues to our response
      if (e instanceof ZodError) {
        return {
          status: "error",
          message: "Invalid form data",
          errors: e.issues.map((issue) => ({
            path: issue.path.join("."),
            message: `Server validation: ${issue.message}`,
          })),
        };
      }
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }
  }