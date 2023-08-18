import React from 'react'
import Sidebar from '../components/Sidebar';
import { useClientStore } from "../stores/store";


const Home = () => {
  const clients = useClientStore((state) => state.clients);
  console.log(clients);

  return (
   <>
   <section className='flex'>
    <Sidebar />
    <p>This is our homepage</p>
   </section>
   </>
  )
}

export default Home;