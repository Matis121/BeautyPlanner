import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AddNewClient from '../components/AddNewClient';
import { useClientStore } from "../stores/store";


const Clients = () => {

  const clients = useClientStore((state) => state.clients);
  const removeClient = useClientStore((state) => state.removeClient);
  const [showAddClientBox, setShowAddClientBox] = useState(false);

  const handleDeleteClient = (id) => {
    removeClient(id);
  }

  return (
    <>
        <section className='flex'>
        <Sidebar />
        <div className='flex flex-col w-screen items-center justify-center'>
        <AddNewClient showAddClientBox={showAddClientBox} setShowAddClientBox={setShowAddClientBox} />
          <div className='h-full w-full flex flex-col justify-start items-start bg-gray-50'>
            <div className='flex items-center justify-center w-full border-2 py-4'>
              <p className='p-4 font-bold text-2xl text-center uppercase'></p>
              {clients.length > 0 ? <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 absolute right-20' onClick={() => setShowAddClientBox(!showAddClientBox)}>Add new client</button> : null}
            </div>
            {clients.length === 0 ? <span className='flex flex-col gap-8 self-center mt-48 p-12 rounded-xl'>You dont have any clients yet<button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setShowAddClientBox(!showAddClientBox)}>Add new client</button></span> :             
            <div className="relative overflow-x-auto shadow-md w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                LP
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Firstname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Surname 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, idx) => 
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                            <td className="px-6 py-4">
                            {idx + 1}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {client.firstName}
                            </th>
                            <td className="px-6 py-4">
                            {client.surName}
                            </td>
                            <td className="px-6 py-4">
                            {client.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4" onClick={() => handleDeleteClient(client.id)}>Edit</a>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDeleteClient(client.id)}>Delete</a>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>}
          </div>
        </div>
    </section>
</>
  )
}

export default Clients;