import "./Home.css";

import {
  CheckBox,
  Icon,
  Input,
  InputDomRef,
  Page,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { useEffect, useMemo, useState } from "react";

import { Book } from "../../types/Book";
import { BookCard } from "../../components/BookCard/BookCard";
import { getBooks } from "../../api/bookService";
import { useAppContext } from "../../contexts/AppContexts";

export const Home = () => {
  const [books, setBooks] = useState<Book[]>();
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<number[]>([]);

  const {
    value: { genres },
  } = useAppContext();

  const handleSearch = (event: Ui5CustomEvent<InputDomRef, never>) => {
    fetchBooks(event.target.value);
  };
  const fetchBooks = async (search = "") => {
    try {
      const booksData = await getBooks(search);
      setBooks(booksData);
    } catch (error) {
      setError("Failed to fetch books");
    }
  };

  const booksToShow = useMemo(() => {
    if (!filters.length) {
      return books;
    }
    return books?.filter((book) => filters.includes(book.genre_ID));
  }, [filters, books]);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Page header={<h1>{error ? error : "SAP Bookshop"}</h1>}>
      <div className="search-bar-wrapper">
        <Input
          icon={<Icon name="search" />}
          onChange={handleSearch}
          type="Text"
        />
        <div>
          {Object.entries(genres).map((genre) => (
            <CheckBox
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters((curr) => [...curr, Number(genre[0])]);
                } else {
                  setFilters((curr) =>
                    curr.filter((currGenre) => currGenre !== Number(genre[0]))
                  );
                }
              }}
              text={genre[1]}
              valueState="None"
              key={genre[0]}
            />
          ))}
        </div>
      </div>
      <div className="inner-page-wrapper">
        {booksToShow?.length ? (
          <div className="books-grid">
            {booksToShow.map((book) => (
              <BookCard book={book} key={book.title} />
            ))}
          </div>
        ) : (
          <div>No Results</div>
        )}
      </div>
    </Page>
  );
};
