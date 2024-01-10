import BasicLayout from "@/layout/BasicLayout";
import ServiceTable from "@/components/service/ServiceTable";
import ServiceForm from "@/components/service/ServiceForm";
import { getUserServices } from "../api/User";
import { useQuery } from "react-query";

const Services = () => {
  // USER DATA
  const userToken: string | null = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["services"], () => getUserServices(userData));

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
          <div className="px-1 flex items-center">
            <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
              Usługi
            </span>
            <ServiceForm />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-6">
            <h1>Dodaj pierwszą usługę do bazy</h1>
            <ServiceForm />
          </div>
        )}
        {data.length > 0 ? <ServiceTable /> : ""}
      </section>
    </BasicLayout>
  );
};

export default Services;
