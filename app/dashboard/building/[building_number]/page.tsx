import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/database.types";
import PropertyDetail from "@/app/ui/dashboard/PropertyDetail";

export default async function Page({
  params: { building_number },
}: {
  params: { building_number: string };
}) {
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
      `id, unit_number, building_number, leepa_owners(owner_name, address1, address2, address3, address4, country)`
    )
    .match({ building_number: building_number })
    .order("unit_number", { ascending: true });

  if (properties === null || properties.length === 0)
    return <p>No propertys to show or not logged in.</p>;

  return (
    <>
      <div className="grid grid-cols-2 gap-2 h-screen p-2">
        <div className="">
          {properties.map((property) => (
            <p key={property.id} className="py-2 border-b">
              {property.unit_number} {property.leepa_owners?.owner_name}{" "}
            </p>
          ))}
        </div>
        <PropertyDetail property_id="0d0362b7-3b5d-4229-bd64-cbafd5288245" />
      </div>
    </>
  );
}
