import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import AddNewServices from "../components/AddNewServices"
import { useServiceStore } from "../stores/store"
import NotivicationBar from "@/components/NotivicationBar"
import { Button } from "@/components/ui/button"

const Services = () => {
  const removeService = useServiceStore(state => state.removeService)
  const services = useServiceStore(state => state.services)
  const [showAddServiceBox, setShowAddServiceBox] = useState(false)

  const handleDeleteService = id => {
    removeService(id)
  }

  return (
    <>
      <section className="flex">
        <Sidebar />
        <div className="w-full">
          <NotivicationBar />
          <div className="flex flex-col w-full h-full items-center justify-center">
            <AddNewServices
              showAddServiceBox={showAddServiceBox}
              setShowAddServiceBox={setShowAddServiceBox}
            />
            <div className="h-full w-full flex flex-col justify-start items-start bg-gray-50">
              <div className="flex items-center justify-center w-full border-2 py-4">
                <p className="p-4 font-bold text-2xl text-center uppercase"></p>
                {services.length > 0 ? (
                  <Button
                    onClick={() => setShowAddServiceBox(!showAddServiceBox)}
                  >
                    Dodaj usługę
                  </Button>
                ) : null}
              </div>
              {services.length === 0 ? (
                <span className="flex flex-col gap-8 self-center mt-48 p-12 rounded-xl">
                  You dont have any services yet
                  <Button
                    onClick={() => setShowAddServiceBox(!showAddServiceBox)}
                  >
                    Dodaj usługę
                  </Button>
                </span>
              ) : (
                <div className="relative overflow-x-auto shadow-md w-full">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          LP
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Service name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, idx) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4">{idx + 1}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {service.name}
                          </th>
                          <td className="px-6 py-4">{service.duration} min</td>
                          <td className="px-6 py-4">{service.price} zł</td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href="#"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
