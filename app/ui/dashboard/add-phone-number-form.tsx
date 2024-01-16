"use client";

import {
  FieldErrors,
  FieldPath,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { addPhoneNumber, State } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import {
  addEmailAddressFormSchema,
  addPhoneNumberFormSchema,
} from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { revalidatePath } from "next/cache";

// Interface for our form values that drastically improves type safety for our form
export interface FormValues {
  phone_number: string;
  phone_type: string;
  contact_id: string;
}

// Everything within our <form> tag
function FormContent({
  register,
  isValid,
  errors,
  contact_id,
}: {
  register: UseFormRegister<FormValues>;
  isValid: boolean;
  errors: FieldErrors<FormValues>;
  contact_id: string;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        {...register("contact_id", { value: contact_id })}
        placeholder="contact id"
        type="hidden"
      />
      <input
        {...register("phone_number")}
        placeholder="Phone Number"
        className="mr-2 border border-black"
      />
      <ErrorMessage name="phone_number" errors={errors} />
      <input
        {...register("phone_type")}
        placeholder="CELL | HOME | WORK"
        className="mr-2 border border-black"
      />
      <ErrorMessage name="phone_type" errors={errors} />
      <input type="submit" disabled={pending || !isValid} />
      {pending && <span>Loading...</span>}
    </>
  );
}
export function AddPhoneNumberForm(props: any) {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(addPhoneNumberFormSchema),
  });

  const [state, formAction] = useFormState<State, FormData>(
    addPhoneNumber,
    null
  );

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
        contact_id={props.contact_id}
      />
    </form>
  );
}
