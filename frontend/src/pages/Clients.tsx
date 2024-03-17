import BasicLayout from "@/layout/BasicLayout";
import ClientForm from "@/components/client/ClientForm";
import ClientTable from "@/components/client/ClientTable";
import { getClients } from "../api/User";
import { useQuery } from "react-query";
import { UserDataContext } from "@/Contexts/UserDataContext";
import { useContext } from "react";

const Clients = () => {
  // USER DATA CONTEXT
  const { userData }: any = useContext(UserDataContext);

  // FETCH DATA
  const { data } = useQuery(["clients"], () => getClients(userData));

  if (!data) {
    return null;
  }

  return (
    <BasicLayout>
      <section
        className={`flex flex-col w-full gap-6 ${
          data.length > 0 ? null : "h-[calc(100vh-110px)] justify-center"
        }`}
      >
        {data.length > 0 ? (
          <div className="px-1 rounded-md  flex items-center">
            <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
              Klienci
            </span>
            <ClientForm />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-6">
            <h1>Dodaj pierwszego klienta do bazy</h1>
            <ClientForm />
          </div>
        )}
        {data.length > 0 ? <ClientTable /> : ""}
      </section>
    </BasicLayout>
  );
};

export default Clients;
