"use client";

import {
  FieldErrors,
  FieldPath,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { addContact, addPhoneNumber, State } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import {
  addContactFormSchema,
  addEmailAddressFormSchema,
  addPhoneNumberFormSchema,
} from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { revalidatePath } from "next/cache";

// Interface for our form values that drastically improves type safety for our form
export interface FormValues {
  first_name: string;
  last_name: string;
  business_name: string;
  contact_type: string;
  property_id: string;
}

// Everything within our <form> tag
function FormContent({
  register,
  isValid,
  errors,
  property_id,
}: {
  register: UseFormRegister<FormValues>;
  isValid: boolean;
  errors: FieldErrors<FormValues>;
  property_id: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="w-1/2 flex-col-2 mb-2 text-black">
      <input
        {...register("property_id", { value: property_id })}
        placeholder="property id"
        type="hidden"
      />
      <div className="w-full mb-2">
        <input
          {...register("first_name")}
          placeholder="Email Address"
          className="mr-2 border border-black text-black"
        />
        <ErrorMessage name="first_name" errors={errors} />
      </div>
      <div className="w-full mb-2">
        <input
          {...register("last_name")}
          placeholder="Last Name"
          className="mr-2 border border-black text-black flex"
        />
        <ErrorMessage name="last_name" errors={errors} />
      </div>
      <div className="w-full mb-2">
        <input
          {...register("business_name")}
          placeholder="Business Name"
          className="mr-2 border border-black text-black flex"
        />
        <ErrorMessage name="business_name" errors={errors} />
      </div>
      <div className="w-full mb-2">
        <input
          {...register("contact_type")}
          placeholder="OWNER | TENANT | RELATIVE"
          className="mr-2 border border-black text-black flex"
        />
        <ErrorMessage name="contact_type" errors={errors} />
      </div>
      <input className="flex" type="submit" disabled={pending || !isValid} />
      {pending && <span>Loading...</span>}
    </div>
  );
}
export function AddEmailForm2(props: any) {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(addContactFormSchema),
  });

  const [state, formAction] = useFormState<State, FormData>(addContact, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    // In case our form action returns `error` we can now `setError`s
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      //alert(state.message);
      reset();
      //revalidatePath("/");
    }
  }, [state, setError]);

  return (
    <form action={formAction}>
      <FormContent
        register={register}
        isValid={isValid}
        errors={errors}
        property_id={props.property_id}
      />
    </form>
  );
}
