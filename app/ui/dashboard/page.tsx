import { Payment, columns } from "@/app/ui/dashboard/column";
import { DataTable } from "@/app/ui/dashboard/DataTable";

async function getData(): Promise<Payment[]> {
  // and this Payment[] is imported from .columns which will again controll the type of that data that is passed from the server component to the client component

  // Fetch data from your API here.

  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
