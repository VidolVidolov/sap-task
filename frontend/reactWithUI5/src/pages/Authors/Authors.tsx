import "./Authors.css";

import { useEffect, useState } from "react";

import { Author } from "../../types/Author";
import { Page } from "@ui5/webcomponents-react";
import { getAuthors } from "../../api/authorsService";

export const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    try {
      const authors = await getAuthors();
      setAuthors(authors);
    } catch (error) {
      setError("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);
  console.log(authors);

  return (
    <Page header={<h1>{error ? error : "SAP Bookshop"}</h1>}>
      <div className="inner-page-wrapper">
        <div className="author-cards">
          {authors ? (
            authors.map((author) => (
              <div className="card" key={author.ID}>
                <h2>{author.name}</h2>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(author.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Date of Death:</strong>{" "}
                  {new Date(author.dateOfDeath).toLocaleDateString()}
                </p>
                <p>
                  <strong>Place of Birth:</strong> {author.placeOfBirth}
                </p>
                <p>
                  <strong>Place of Death:</strong> {author.placeOfDeath}
                </p>
              </div>
            ))
          ) : (
            <div>...Loading</div>
          )}
        </div>
      </div>
    </Page>
  );
};
