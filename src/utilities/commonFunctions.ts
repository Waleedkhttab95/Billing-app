export const addDays = (days: number, date = new Date()) => {
  date.setDate(date.getDate() + days);

  return date;
};


export const addDaysByDate = (days: number, date : Date) => {
    date.setDate(date.getDate() + days);
  
    return date;
  };