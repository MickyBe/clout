export const isSameDate = (date) => {
  var now = new Date();
  var date1 = new Date(date);
  if (
    `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}` ===
    `${date1.getFullYear()}-${date1.getMonth()}-${date1.getDate()}`
  )
    return true;
  return false;
};

export const isNotSameDate = (date) => {
  var now = new Date();
  var date1 = new Date(date);
  if (
    `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}` !==
    `${date1.getFullYear()}-${date1.getMonth()}-${date1.getDate()}`
  )
    return true;
  return false;
};
