import "./BookCard.css";

import { Card, CardHeader, List } from "@ui5/webcomponents-react";

import { Book } from "../../types/Book";
import { useAppContext } from "../../contexts/AppContexts";
import { useNavigate } from "react-router";

export const BookCard = ({ book }: { book: Book }) => {
  const {
    value: { currencies, genres },
  } = useAppContext();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/details?ID=${book.ID}`);
  };

  return (
    <Card key={book.title} className="book-card">
      <CardHeader slot="header" titleText={book.title}></CardHeader>
      <div className="book-card-contnet">
        <List title={book.author} className="info-list">
          <li className="card-list-item">Author: {book.author}</li>
          <li className="card-list-item">Gnere: {genres[book.genre_ID]}</li>
          <li className="card-list-item">
            Stock: {book.stock !== 0 ? book.stock : "SOLD OUT"}
          </li>
          <li className="card-list-item">
            Price: {currencies[book.currency_code]}
            {book.price}
          </li>
        </List>
        <div className="details-button">
          <button onClick={handleButtonClick}>See details</button>
        </div>
      </div>
    </Card>
  );
};
