import axios from "axios";
import { toastSuccess } from "./ToasterService";

export const updateTodo = async (todo) => {
  const result = await axios.put(
    `/todo/update/${todo._id}`,
    todo,
  );
  if (result && result.data && result.data.status) {
    return true;
  } else {
    toastSuccess("Faild to vote");
    return false;
  }
}

export const addTodo = async (todo) => {
  const result = await axios.post(
    `/todo/add`,
    todo,
  );
  if (result && result.data && result.data.status) {
    return result;
  } else {
    return false;
  }
}


export const removeTodo = async (id) => {
  const result = await axios.delete(
    `/todo/delete/${id}`
  );
  if (result && result.data && result.data.status === true) {
    return result;
  } else {
    return false;
  }
}

export const getTodos = () => {
  return axios.get("/todo");
}

