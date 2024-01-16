import { zfd } from "zod-form-data";
import { z } from "zod";

export const addEmailAddressFormSchema = zfd.formData({
  contact_id: zfd.text(),
  email_address: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
});

export const addPhoneNumberFormSchema = zfd.formData({
  contact_id: zfd.text(),
  phone_number: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  phone_type: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
});