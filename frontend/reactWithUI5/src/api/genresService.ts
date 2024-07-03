import axiosInstance from "./axiosConfig";

export const getGenres = async () => {
  try {
    const response = await axiosInstance.get("/browse/Genres");
    return response.data.value;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
