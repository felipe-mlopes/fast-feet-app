import { getSession } from "@/data/actions/auth";
import { logoutAction } from "@/data/actions/login";

import { DeliverymanInfo } from "@/components/order/deliveryman-info";
import { ButtonStatus } from "@/components/deliveries/button-status";
import { SearchInput } from "@/components/global/search-input";
import { OrdersPendingWrapper } from "@/components/deliveries/orders-pending-wrapper";
import { OrdersDoneWrapper } from "@/components/deliveries/orders-done-wrapper";

import { ExistIcon } from "@/components/icons/exist-icon";

export default async function Deliveries({
  params,
  searchParams,
}: {
  params: { status: "pending" | "done" };
  searchParams: { city: string };
}) {
  const { token } = await getSession();

  const arrayToken = token?.split(".")!;
  const tokenPayload = JSON.parse(atob(arrayToken[1]));

  const deliverymanCity = !searchParams.city
    ? ""
    : searchParams.city.toLowerCase();

  return (
    <div className="flex flex-col justify-between items-center mt-20 relative min-h-screen lg:grid lg:grid-col-2 lg:grid-row-3 lg:justify-normal">
      <header className="space-y-8 w-full px-6 pb-16">
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-lilac-smooth">
            <p>Bem vindo,</p>
            <p className="capitalize">{token ? tokenPayload.name : ""}</p>
          </div>
          <form action={logoutAction}>
            <button type="submit">
              <ExistIcon />
            </button>
          </form>
        </div>
        <DeliverymanInfo />
      </header>
      <section className="flex justify-center px-6 w-full absolute top-40 z-10">
        <SearchInput content="Filtrar por bairro" />
      </section>
      <main className="px-6 pt-[3.25rem] pb-8 w-full min-h-screen bg-gray-light">
        {params.status === "pending" && (
          <OrdersPendingWrapper city={deliverymanCity} />
        )}
        {params.status === "done" && (
          <OrdersDoneWrapper city={deliverymanCity} />
        )}
      </main>
      <ButtonStatus status={params.status} />
    </div>
  );
}
