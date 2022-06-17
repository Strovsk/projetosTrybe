export default function getDateObj() {
  const timeStamp = new Date();
  return {
    day: timeStamp.getDate(),
    month: timeStamp.getMonth(),
    year: timeStamp.getFullYear(),
  };
}
