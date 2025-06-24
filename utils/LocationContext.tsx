import { createContext, useContext, useState } from "react";

export const LocationContext = createContext<any>(null);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  return (
    <LocationContext.Provider
      value={{ startLocation, setStartLocation, endLocation, setEndLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
