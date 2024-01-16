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
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddEmailAddressForm } from "./add-email-address-form";
import { AddPhoneNumberForm } from "./add-phone-number-form";
import { revalidatePath } from "next/cache";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

export default async function PropertyDetail(props: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const revalidate = 0;

  const deletePhoneNumber = async (id: string) => {
    "use server";
    //const requestUrl = new URL(request.url)

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    // await supabase.auth.signOut()
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const var_created_by = user?.id;
    //console.log(user, var_created_by);
    const { error } = await supabase
      .from("phone_numbers")
      .delete()
      .eq("id", id);
    //console.log(id, error);
    revalidatePath("/");

    if (error) {
      console.log(error);
      return redirect(`/login/login?error=Could not create contact`);
    }

    return; //redirect(`/dashbard/building/1/unit/${var_property_id}`);
  };
  const deleteEmail = async (id: string) => {
    "use server";
    //const requestUrl = new URL(request.url)

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    // await supabase.auth.signOut()
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const var_created_by = user?.id;
    //console.log(user, var_created_by);
    const { error } = await supabase
      .from("email_addresses")
      .delete()
      .eq("id", id);
    //console.log(id, error);
    revalidatePath("/");

    if (error) {
      console.log(error);
      return redirect(`/login/login?error=Could not create contact`);
    }

    return; //redirect(`/dashbard/building/1/unit/${var_property_id}`);
  };

  const { data: properties } = await supabase
    .from("properties")
    .select(
      `id, unit_number, folio, building_number, contacts(id, first_name, last_name, contact_type, phone_numbers(id, phone_number, phone_type), email_addresses(id, email_address))`
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
            <Link
              href={`https://www.leepa.org/Display/DisplayParcel.aspx?FolioID=${properties?.folio}`}
            >
              View on LeePA
            </Link>
          </div>
          <div className="border-b border-black mb-2">
            <p>Contacts:</p>
            {properties?.contacts.map((contact) => (
              <div className="mb-2 border-b border-black" key={contact.id}>
                <p>
                  <span>{contact.contact_type}: </span>
                  {contact.first_name} {contact.last_name}{" "}
                </p>
                {contact?.phone_numbers?.map((phone) => (
                  <div className="flex" key={phone.id}>
                    {phone.phone_number} {phone.phone_type}{" "}
                    <form action={deletePhoneNumber.bind(null, phone.id)}>
                      <button className="mr-4">
                        <TrashIcon className="h-4 w-4 text-red-700" />
                      </button>
                    </form>
                  </div>
                ))}

                {contact?.email_addresses?.map((email) => (
                  <div className="flex" key={email.id}>
                    {email.email_address}
                    <form action={deleteEmail.bind(null, email.id)}>
                      <button className="mr-4">
                        <TrashIcon className="h-4 w-4 text-red-700" />
                      </button>
                    </form>
                  </div>
                ))}
                <div className="p-2">
                  <AddEmailAddressForm contact_id={contact.id} />
                  <AddPhoneNumberForm contact_id={contact.id} />
                </div>
              </div>
            ))}

            <AddContact property_id={props.property_id} />
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
