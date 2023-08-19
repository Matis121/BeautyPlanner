import React from "react"
import Sidebar from "../components/Sidebar"
import { useClientStore } from "../stores/store"
import NotivicationBar from "@/components/NotivicationBar"

const Home = () => {
  const clients = useClientStore(state => state.clients)
  console.log(clients)

  return (
    <>
      <section className="flex">
        <Sidebar />
        <div className="w-full">
          <NotivicationBar />
          <p>this is homepage</p>
        </div>
      </section>
    </>
  )
}

export default Home
