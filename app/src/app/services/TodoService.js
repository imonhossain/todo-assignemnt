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
