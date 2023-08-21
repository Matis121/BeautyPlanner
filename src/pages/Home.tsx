import React from "react";
import Sidebar from "../components/Sidebar";
import { useClientStore } from "../stores/store";
import NotivicationBar from "@/components/NotivicationBar";
import BasicLayout from "@/layout/BasicLayout";

const Home = () => {
  const clients = useClientStore(state => state.clients);
  console.log(clients);

  return (
    <BasicLayout>
      <p>this is homepage</p>
    </BasicLayout>
  );
};

export default Home;
