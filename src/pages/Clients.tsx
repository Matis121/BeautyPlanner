import { useClientStore } from "../stores/store";
import BasicLayout from "@/layout/BasicLayout";
import CustomForm from "@/components/client/ClientForm";
import ClientTable from "@/components/client/ClientTable";

const Clients = () => {
  const clients = useClientStore(state => state.clients);

  console.log(clients);

  return (
    <>
      <BasicLayout>
        <section
          className={`flex flex-col w-full h-full bg-neutral-100 ${
            clients.length === 0 ? "items-center justify-center" : ""
          }`}
        >
          {clients.length > 0 ? <CustomForm /> : null}
          {clients.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-12 rounded-xl">
              <p className=" text-2xl font-light text-neutral-600">
                Dodaj pierwszego klienta do bazy
              </p>
              <CustomForm />
            </div>
          ) : (
            <ClientTable />
          )}
        </section>
      </BasicLayout>
    </>
  );
};

export default Clients;
