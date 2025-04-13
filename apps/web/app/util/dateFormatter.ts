import { convertToLocalDate } from "./convertDateToString";

const dateFormatter = (date: string) => {
  const myDate = convertToLocalDate(date)
    .substring(0, 7)
    .replace("-", "/")
    .split("/");
  if (myDate[0] && myDate[1]) {
    const final = myDate[1] + "/" + myDate[0];
    return final;
  }
  return null;
};

export default dateFormatter;
