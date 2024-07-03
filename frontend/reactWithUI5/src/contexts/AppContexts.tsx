import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrencies } from "../api/currencyService";
import { getGenres } from "../api/genresService";
import { whoAmI } from "../api/authService";

type AppContextType = {
  value: {
    currencies: { [key: string]: string };
    genres: { [key: number]: string };
    user: { locale: string; id: string; tenant: string };
    token: string;
  };
  setValue: Dispatch<SetStateAction<AppContextType["value"]>>;
};

const AppContext = createContext<AppContextType>({
  value: {
    currencies: {},
    genres: {},
    user: { locale: "", id: "", tenant: "" },
    token: "",
  },
  setValue: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<AppContextType["value"]>({
    currencies: {},
    genres: {},
    user: { locale: "", id: "", tenant: "" },
    token: "",
  });

  const fetchCurrUser = async () => {
    try {
      const user = await whoAmI();
      setValue((curr) => ({ ...curr, user }));
      sessionStorage.setItem("tokenSAP", "YWxpY2U6");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const currencies = await getCurrencies();

      const mappedCurrencies: { [key: string]: string } = {};
      currencies.forEach((curr: { code: string; symbol: string }) => {
        mappedCurrencies[curr.code] = curr.symbol;
      });

      setValue((curr) => ({
        ...curr,
        currencies: mappedCurrencies,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const genres = await getGenres();
      const mappedGenres: { [key: string]: string } = {};
      genres.forEach((genre: { name: string; ID: number }) => {
        mappedGenres[genre.ID] = genre.name;
      });
      setValue((curr) => ({
        ...curr,
        genres: mappedGenres,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurrUser();
    fetchCurrencies();
    fetchGenres();
  }, []);

  return (
    <AppContext.Provider value={{ value, setValue }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };
