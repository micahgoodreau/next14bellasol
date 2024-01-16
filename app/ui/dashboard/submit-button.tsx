"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return <button>{pending ? "Creating Email . . ." : "Create Email"}</button>;
}
