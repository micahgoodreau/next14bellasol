import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/database.types";

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

  const { data: leepa_sales } = await supabase
    .from("leepa_sales")
    .select()
    .order("sale_date", { ascending: false })
    .limit(25);

  if (leepa_sales === null || leepa_sales.length === 0)
    return <p>No sales to show or not logged in.</p>;

  return leepa_sales.map((sale) => (
    <p key={sale.id} className="py-2 border-b">
      {sale.sale_date} {sale.unit_number}{" "}
      {Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // Change this
      }).format(Number(sale.sale_price))}
    </p>
  ));
}
