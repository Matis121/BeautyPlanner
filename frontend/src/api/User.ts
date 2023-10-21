import axios from "axios";
import { type } from "os";

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
  console.log(username);
  try {
    let response = await axios.get(
      "http://localhost:5000/getServices",
      username
    );

    console.log(response); // You can display the data in the console or perform other operations on it
    return response.data.services; // Return the retrieved services
  } catch (error) {
    console.error("Error while fetching data:", error);
    // You can handle the error here, for example, displaying a message to the user
    throw error; // Rethrow the error to handle it outside this function if necessary
  }
}
