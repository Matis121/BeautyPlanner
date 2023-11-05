import BasicLayout from "@/layout/BasicLayout";
import ClientForm from "@/components/client/ClientForm";
import ClientTable from "@/components/client/ClientTable";
import { getClients } from "../api/User";
import { useQuery } from "react-query";

const Clients = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["clients"], () => getClients(userData));

  if (!data) {
    return null;
  }

  return (
    <>
      <BasicLayout>
        <section
          className={`flex flex-col w-full h-full bg-neutral-100 ${
            data.length === 0 ? "items-center justify-center" : ""
          }`}
        >
          {data.length > 0 ? <ClientForm /> : null}
          {data.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-12 rounded-xl">
              <p className=" text-2xl font-light text-neutral-600">
                Dodaj pierwszego klienta do bazy
              </p>
              <ClientForm />
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
