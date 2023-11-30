import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
//import Messages from "@/app/login/messages";

export default function AddContact(props: any) {
  const addContact = async (formData: FormData) => {
    "use server";
    //const requestUrl = new URL(request.url)
    const var_first_name = String(formData.get("first_name"));
    const var_last_name = String(formData.get("last_name"));
    const var_business_name = String(formData.get("business_name"));
    const var_contact_type = String(formData.get("contact_type"));
    const var_property_id = String(formData.get("property_id"));
    const unit_number = formData.get("unit_number") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    // await supabase.auth.signOut()
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const var_created_by = user?.id;
    console.log(user, var_created_by);
    const { data, error } = await supabase.rpc("insert_contact", {
      var_first_name,
      var_last_name,
      var_business_name,
      var_contact_type,
      var_property_id,
      var_created_by,
    });

    if (error) {
      console.log(error);
      return redirect(`/login/login?error=Could not create contact`);
    }

    return redirect(`/dashbard/building/1/unit/${var_property_id}`);
  };

  return (
    <>
      {/*The bottom code should toggle on and off when the button is pressed*/}
      <div>
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
          action={addContact}
        >
          <label className="text-md" htmlFor="first_name">
            First Name
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="first_name"
            placeholder="Fred"
          />
          <label className="text-md" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="last_name"
            placeholder="Smith"
          />
          <label className="text-md" htmlFor="business_name">
            Business Name
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="business_name"
            placeholder="ACME CORP"
          />
          <label className="text-md" htmlFor="contact_type">
            Contact Type
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="contact_type"
            placeholder="OWNER/TENANT/PROPERTY MANAGER"
            required
          />
          <input name="property_id" type="hidden" value={props.property_id} />
          <button className="mb-2 rounded bg-green-700 px-4 py-2 text-white">
            Add Contact
          </button>

          {/* <Messages /> */}
        </form>
      </div>
    </>
  );
}
