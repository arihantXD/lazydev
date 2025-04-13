"use client";
import axoisInstance from "@/util/axiosInstance";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type User = {
  id: number;
  email: string;
};
interface CustomContextType {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  userLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

export const MyContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const { data } = await axoisInstance.get(`/user/me`);
      setUser(data.data);
      setUserLoading(false);
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  return (
    <CustomContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        user,
        setUser,
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error("Custom context should be within context provider");
  }
  return context;
};
