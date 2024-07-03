import axiosInstance from "./axiosConfig";

export const getAuthors = async () => {
  try {
    const response = await axiosInstance.get("/admin/Authors");
    return response.data.value;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
