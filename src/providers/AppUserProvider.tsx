import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { AppUser } from "../types/AppUser";
import { api } from "../utils/api";

interface AppUserContextValue {
  appUser: AppUser | undefined;
}

const AppUserContext = createContext<AppUserContextValue | undefined>(
  undefined,
);
export const useAppUser = (): AppUserContextValue => {
  const context = useContext(AppUserContext);
  if (context == null) {
    throw new Error("Este hook deve ser usado dentro de um AppUserProvider");
  }
  return context;
};

export const AppUserProvider = (props: PropsWithChildren) => {
  const [loggedAppUser, setLoggedAppUser] = useState<AppUser | undefined>(
    undefined,
  );

  const getLoggedUser = async () => {
    await api.get(`/users/current`).then((response) => {
      setLoggedAppUser(response.data.data as AppUser);
    });
  };

  getLoggedUser();

  return (
    <AppUserContext.Provider value={{ appUser: loggedAppUser }}>
      {props.children}
    </AppUserContext.Provider>
  );
};
