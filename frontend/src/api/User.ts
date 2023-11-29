import axios from "axios";

// LOGIN AND REGISTER
export async function registerUser(user) {
  let response = await axios.post("http://localhost:5000/register", user);
  let data = response.data;
  return data;
}
export async function postLogin(user) {
  try {
    let response = await axios.post("http://localhost:5000/login", user);
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

// SERVICES
export async function addNewService(username, service) {
  try {
    const obj = {
      username,
      service,
    };
    let response = await axios.post("http://localhost:5000/addService", obj);
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserServices(username) {
  try {
    const response = await axios.get(`http://localhost:5000/getServices`, {
      params: { username: username },
    });
    console.log(response.data);
    return response.data.services; // Assuming the response contains a 'services' field
  } catch (error) {
    console.error("Error while fetching user services:", error);
    throw error;
  }
}
export async function removeService(username, serviceId) {
  try {
    const response = await axios.delete("http://localhost:5000/removeService", {
      data: { username, serviceId },
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing service:", error);
    throw error;
  }
}
export async function editService(username, serviceId, updatedValue) {
  try {
    const response = await axios.post("http://localhost:5000/editService", {
      username,
      serviceId,
      updatedValue,
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing service:", error);
    throw error;
  }
}

// CLIENTS
export async function addNewClient(username, client) {
  try {
    const obj = {
      username,
      client,
    };
    let response = await axios.post("http://localhost:5000/addClient", obj);
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getClients(username) {
  try {
    const response = await axios.get(`http://localhost:5000/getClients`, {
      params: { username: username },
    });
    console.log(response.data);
    return response.data.clients; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user clients:", error);
    throw error;
  }
}
export async function removeClient(username, clientId) {
  try {
    const response = await axios.delete("http://localhost:5000/removeClient", {
      data: { username, clientId },
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing service:", error);
    throw error;
  }
}
export async function editClient(username, clientId, updatedValue) {
  try {
    const response = await axios.post("http://localhost:5000/editClient", {
      username,
      clientId,
      updatedValue,
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing service:", error);
    throw error;
  }
}

// ACTIVE HOURS
export async function editActiveHours(username, updatedValue) {
  try {
    const response = await axios.post("http://localhost:5000/editActiveHours", {
      username,
      updatedValue,
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing active hours:", error);
    throw error;
  }
}
export async function getHours(username) {
  try {
    const response = await axios.get(`http://localhost:5000/getHours`, {
      params: { username: username },
    });
    console.log(response.data);
    return response.data.activeHours; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user clients:", error);
    throw error;
  }
}

// EVENTS
export async function addEvent(username, event) {
  try {
    const obj = {
      username,
      event,
    };
    let response = await axios.post("http://localhost:5000/addEvent", obj);
    console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getEvents(username) {
  try {
    const response = await axios.get(`http://localhost:5000/getEvents`, {
      params: { username: username },
    });
    console.log(response.data);
    return response.data.events; // Assuming the response contains a 'clients' field
  } catch (error) {
    console.error("Error while fetching user events:", error);
    throw error;
  }
}
export async function removeEvent(username, eventId) {
  try {
    const response = await axios.delete("http://localhost:5000/removeEvent", {
      data: { username, eventId },
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while removing event:", error);
    throw error;
  }
}
export async function finalizeEvent(username, eventId, finalizedEventData) {
  try {
    const response = await axios.post("http://localhost:5000/finalizeEvent", {
      username,
      eventId,
      finalizedEventData,
    });
    console.log(response.data);
    return response.data.message; // Assuming the response contains a 'message' field
  } catch (error) {
    console.error("Error while editing event:", error);
    throw error;
  }
}
