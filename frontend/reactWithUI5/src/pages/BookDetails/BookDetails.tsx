import "./BookDetails.css";

import { Option, Page, Select } from "@ui5/webcomponents-react";
import { getBookDetails, orderBook } from "../../api/bookService";
import { useEffect, useState } from "react";

import { Book } from "../../types/Book";
import { useLocation } from "react-router";

export const BookDetails = () => {
  const [book, setBook] = useState<Book>();
  const [message, setMessage] = useState("");
  const location = useLocation();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const handleOrderSubmit = async (e: any) => {
    e.preventDefault();
    if (!book) {
      return;
    }

    try {
      const submittedOrder: { stock: number } = await orderBook(
        book.ID,
        Number(quantity)
      );
      if (!submittedOrder.stock && submittedOrder.stock !== 0) {
        throw Error(`${quantity} exceeds stock for"${book.title}"`);
      }
      //@ts-ignore
      setBook((curr) => ({ ...curr, stock: submittedOrder.stock }));
      setQuantity(1);
      setMessage(`Ordered ${quantity} copies of "${book.title}"`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const bookId = Number(location.search.split("=").pop());
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBookDetails(bookId);
        setBook(booksData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Page header={<h1>SAP Bookshp</h1>}>
      <div className="inner-page-wrapper">
        {book ? (
          <div className="book-container">
            <div className="book-image">
              <img src={book.image} alt={book.title} />
            </div>
            <div className="book-details">
              <h2>{book.title}</h2>
              <p className="book-author">By: {book.author}</p>
              <p className="book-descr">{book.descr}</p>
              <div className="book-meta">
                <p>Genre ID: {book.genre_ID}</p>
                <p>Stock: {book.stock}</p>
                <p>
                  Price: {book.price} {book.currency_code}
                </p>
              </div>
              <p>{message}</p>
              {book.stock === 0 ? (
                <div>SOLD OUT</div>
              ) : (
                <form className="order-form" onSubmit={handleOrderSubmit}>
                  <label htmlFor="quantity">Quantity:</label>
                  <Select
                    id="quantity"
                    value={quantity.toString()}
                    onChange={handleQuantityChange}
                  >
                    {[...Array(book.stock).keys()].map((i) => (
                      <Option key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                  <button type="submit" className="order-button">
                    Order
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div>...Loading</div>
        )}
      </div>
    </Page>
  );
};
