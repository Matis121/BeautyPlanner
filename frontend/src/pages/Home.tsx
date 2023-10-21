import BasicLayout from "@/layout/BasicLayout";
import { getUserServices } from "../api/User";
import { useEffect } from "react";

const Home = () => {
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;
  console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      const getServices = await getUserServices(userData);
      console.log(getServices);
    };

    fetchData();
  }, []);

  return (
    <BasicLayout>
      <p>Homepage</p>
    </BasicLayout>
  );
};

export default Home;
