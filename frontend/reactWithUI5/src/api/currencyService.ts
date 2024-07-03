import axiosInstance from "./axiosConfig";

export const getCurrencies = async () => {
  try {
    const response = await axiosInstance.get("/browse/Currencies");
    return response.data.value;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
