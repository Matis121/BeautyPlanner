import BasicLayout from "@/layout/BasicLayout";
import ServiceTable from "@/components/service/ServiceTable";
import ServiceForm from "@/components/service/ServiceForm";
import { getUserServices } from "../api/User";
import { useQuery } from "react-query";

const Services = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["services"], () => getUserServices(userData));

  if (!data) {
    return null;
  }

  return (
    <BasicLayout>
      <section className="flex flex-col w-full h-full gap-6">
        <div className="px-1 flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Usługi
          </span>
          <ServiceForm />
        </div>
        {data.length > 0 ? <ServiceTable /> : ""}
      </section>
    </BasicLayout>
  );
};

export default Services;
