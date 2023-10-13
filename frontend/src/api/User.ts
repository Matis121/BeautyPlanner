import axios from "axios";

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
