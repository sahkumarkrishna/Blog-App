import axios from "axios";
import { showToast } from "@/helpers/showToast";

export const deleteData = async (endpoint) => {
  const confirmed = confirm("Are you sure you want to delete this data?");

  if (confirmed) {
    try {
      const response = await axios.delete(endpoint);
      showToast("success", response.data.message);
      return true; // Indicate successful deletion
    } catch (error) {
      showToast("error", error.message);
      return false; // Indicate failure
    }
  }
};
