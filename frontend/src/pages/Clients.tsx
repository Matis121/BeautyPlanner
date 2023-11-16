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
    <BasicLayout>
      <section className="flex flex-col w-full h-full gap-6">
        <div className="py-2 px-12 bg-white rounded-xl shadow-sm flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Klienci
          </span>
          <ClientForm />
        </div>
        {data.length > 0 ? <ClientTable /> : ""}
      </section>
    </BasicLayout>
  );
};

export default Clients;
