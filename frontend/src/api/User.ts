import axios from "axios";

// LOGIN AND REGISTER
export async function registerUser(user: any) {
  let response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/register`,
    user
  );
  let data = response.data;
  return data;
}
export async function postLogin(user: any) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/login`,
      user
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function logout() {
  let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`);
  let data = response.data;
  console.log(data);
}

export async function forgotPassword(email: string) {
  let response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/forgotPassword`,
    email
  );
  let data = response.data;
  return data;
}
export async function resetPassword(passwords: string, token: string) {
  let response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/resetPassword`,
    {
      passwords,
      token,
    }
  );
  let data = response.data;
  return data;
}
export async function googleAuth() {
  let response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/auth/google`
  );
  let data = response.data;
  return data;
}

// SERVICES
export async function addNewService(username: string, service: any) {
  try {
    const obj = {
      username,
      service,
    };
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/addService`,
      obj
    );
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserServices(username: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getServices`,
      {
        params: { username: username },
      }
    );
    console.log(response.data);
    return response.data.services; // Assuming the response contains a 'services' field
  } catch (error) {
    console.error("Error while fetching user services:", error);
    throw error;
  }
}
export async function removeService(username: string, serviceId: number) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/removeService`,
      {
        data: { username, serviceId },
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing service:", error);
    throw error;
  }
}
export async function editService(
  username: string,
  serviceId: number,
  updatedValue: any
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/editService`,
      {
        username,
        serviceId,
        updatedValue,
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing service:", error);
    throw error;
  }
}

// CLIENTS
export async function addNewClient(username: string, client: any) {
  try {
    const obj = {
      username,
      client,
    };
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/addClient`,
      obj
    );
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getClients(username: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getClients`,
      {
        params: { username: username },
      }
    );
    return response.data.clients; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user clients:", error);
    throw error;
  }
}
export async function removeClient(username: string, clientId: number) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/removeClient`,
      {
        data: { username, clientId },
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing service:", error);
    throw error;
  }
}
export async function editClient(
  username: string,
  clientId: number,
  updatedValue: any
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/editClient`,
      {
        username,
        clientId,
        updatedValue,
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing service:", error);
    throw error;
  }
}
export async function addVisitToClient(username: string, event: any) {
  try {
    const obj = {
      username,
      event,
    };
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/addVisitToClient`,
      obj
    );
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function removeVisitFromClient(
  username: string,
  eventId: number,
  clientId: number
) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/removeVisitFromClient`,
      {
        data: { username, eventId, clientId },
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing service:", error);
    throw error;
  }
}

// ACTIVE HOURS
export async function editActiveHours(username: string, updatedValue: any) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/editActiveHours`,
      {
        username,
        updatedValue,
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing active hours:", error);
    throw error;
  }
}
export async function getHours(username: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getHours`,
      {
        params: { username: username },
      }
    );
    console.log(response.data);
    return response.data.activeHours; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user clients:", error);
    throw error;
  }
}

// EVENTS
export async function addEvent(username: string, event: any) {
  try {
    const obj = {
      username,
      event,
    };
    let response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/addEvent`,
      obj
    );
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getEvents(username: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getEvents`,
      {
        params: { username: username },
      }
    );
    return response.data.events; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user events:", error);
    throw error;
  }
}
export async function removeEvent(username: string, eventId: number) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/removeEvent`,
      {
        data: { username, eventId },
      }
    );
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing event:", error);
    throw error;
  }
}
export async function finalizeEvent(
  username: string,
  eventId: number,
  finalizedEventData: any
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/finalizeEvent`,
      {
        username,
        eventId,
        finalizedEventData,
      }
    );
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing event:", error);
    throw error;
  }
}
export async function editEvent(
  username: string,
  eventId: number,
  updatedValue: any
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/editEvent`,
      {
        username,
        eventId,
        updatedValue,
      }
    );
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing service:", error);
    throw error;
  }
}
