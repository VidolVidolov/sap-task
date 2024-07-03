import axiosInstance from "./axiosConfig";

//TODO
export const getToken = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.headers["x-csrf-token"];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const login = async () => {
  try {
    const response = await axiosInstance.post("/user/login", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const whoAmI = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
