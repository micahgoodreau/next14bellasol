import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/database.types";
import Link from "next/link";

export default async function Page() {
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

  interface Dbresults {
    id: string;
    unit_number: string;
    sale_date: string;
    sale_price: number;
    property_id: string;
    building_number: string;
    leepa_owners: LeepaOwner;
  }
  interface LeepaOwner {
    owner_name: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    country: string;
  }

  const { data: leepa_sales } = await supabase
    .from("leepa_sales")
    .select(
      `id, sale_date, sale_price, unit_number, property_id, building_number, leepa_owners(owner_name, address1)`
    )
    .order("sale_date", { ascending: false })
    .limit(25)
    .returns<Dbresults[]>();

  if (leepa_sales === null || leepa_sales.length === 0)
    return <p>No sales to show or not logged in.</p>;

  return (
    <table>
      <tbody>
        {leepa_sales.map((sale) => (
          <tr className="border-b">
            <Link
              href={`/dashboard/building/${sale.building_number}/${sale.property_id}`}
            >
              <td className="p-2">{sale.sale_date}</td>
              <td className="p-2">{sale.unit_number}</td>
              <td className="p-2">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD", // Change this
                }).format(Number(sale.sale_price))}
              </td>
              <td className="p-2">
                {sale.leepa_owners.owner_name} {sale.leepa_owners.address1}
              </td>
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
