import axiosInstance from "./axiosConfig";

export const getBooks = async (search: string) => {
  try {
    const response = await axiosInstance.get(
      "/browse/ListOfBooks" + (search ? `?$search=${search}` : "")
    );
    return response.data.value;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookDetails = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/browse/Books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const orderBook = async (bookId: number, quantity: number) => {
  try {
    const response = await axiosInstance.post("browse/submitOrder", {
      book: bookId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
