import AddContact from "@/components/AddContact";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function PropertyDetail(props: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: properties } = await supabase
    .from("properties")
    .select(
      `id, unit_number, building_number, contacts(id, first_name, last_name, contact_type, phone_numbers(id, phone_number, phone_type)), leepa_owners(owner_name, address1, address2, address3, address4, country)`
    )
    .match({ id: props.property_id })
    .single();

  const { data: leepa_owners } = await supabase
    .from("leepa_owners")
    .select()
    .match({ property_id: props.property_id })
    .single();

  const { data: leepa_sales } = await supabase
    .from("leepa_sales")
    .select(`id, sale_price, sale_date`)
    .match({ property_id: props.property_id })
    .order("sale_date", { ascending: false });

  return (
    <>
      <div className="rounded-xl bg-gray-700 p-2 shadow-sm">
        <div className="flex p-4">
          {/*Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null */}
          <h3 className="ml-2 text-sm font-medium">
            Property Detail for Unit {properties?.unit_number}
          </h3>
        </div>
        <div className="truncate rounded-xl bg-gray-300 px-4 py-8 text-blue-800 text-left">
          <div className="border-b border-black mb-2">
            <p>{leepa_owners?.owner_name}</p>
            <p>{leepa_owners?.address1}</p>
            <p>{leepa_owners?.address2}</p>
            <p>{leepa_owners?.address3}</p>
            <p>{leepa_owners?.address4}</p>
            <p>{leepa_owners?.country}</p>
          </div>
          <div className="border-b border-black mb-2">
            <p>Contacts:</p>
            {properties?.contacts.map((contact) => (
              <div className="mb-2" key={contact.id}>
                <p>
                  <span>{contact.contact_type}: </span>
                  {contact.first_name} {contact.last_name}
                </p>
                <p>
                  {contact.phone_numbers[0]?.phone_number}{" "}
                  {contact.phone_numbers[0]?.phone_type}
                </p>
              </div>
            ))}
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Sale Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leepa_sales?.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell> {sale.sale_date}</TableCell>
                    <TableCell>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD", // Change this
                      }).format(Number(sale.sale_price))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
