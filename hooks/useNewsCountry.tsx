import newsCategoryList from "@/constants/Categories";
import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountry = () => {
  const [countries, setCountries] = useState(CountryList);

  const toggleNewsCountry = useCallback((id: number) => {
    setCountries((prevNewsCountries) => {
      return prevNewsCountries.map((item,index) => {
        if (index === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
    });
  }, []);

  return {
    countries,
    toggleNewsCountry,
  };
};