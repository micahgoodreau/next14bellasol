import { Database } from "@/database.types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function PropertyDetail(props: any) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore?.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore?.delete({ name, ...options });
        },
      },
    }
  );

  const { data: properties } = await supabase
    .from("properties")
    .select(
      `id, unit_number, building_number, contacts(id, first_name, last_name), leepa_owners(owner_name, address1, address2, address3, address4, country)`
    )
    .match({ id: props.property_id })
    .single();

  const { data: leepa_owners } = await supabase
    .from("leepa_owners")
    .select()
    .match({ property_id: props.property_id })
    .single();

  return (
    <>
      <div>
        <p>Property Detail for Unit {properties?.unit_number} </p>
        <p>{leepa_owners?.owner_name}</p>
        {properties?.contacts.map((contact) => (
          <p key={contact.id}>
            {contact.first_name} {contact.last_name}
          </p>
        ))}
      </div>
    </>
  );
}
