"use client";

import {
  FieldErrors,
  FieldPath,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { addLease, addPhoneNumber, State } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import {
  addEmailAddressFormSchema,
  addLeaseFormSchema,
  addPhoneNumberFormSchema,
} from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { revalidatePath } from "next/cache";

// Interface for our form values that drastically improves type safety for our form
export interface FormValues {
  start_date: string;
  end_date: string;
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
    <>
      <input
        {...register("property_id", { value: property_id })}
        placeholder="contact id"
        type="hidden"
      />
      <input
        {...register("start_date")}
        placeholder="Start Date"
        className="mr-2 border border-black"
      />
      <ErrorMessage name="start_date" errors={errors} />
      <input
        {...register("end_date")}
        placeholder="End Date"
        className="mr-2 border border-black"
      />
      <ErrorMessage name="end_date" errors={errors} />
      <input type="submit" disabled={pending || !isValid} />
      {pending && <span>Loading...</span>}
    </>
  );
}
export function AddLeaseForm(props: any) {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(addLeaseFormSchema),
  });

  const [state, formAction] = useFormState<State, FormData>(addLease, null);

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
