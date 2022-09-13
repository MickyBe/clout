import moment from "moment";

export const formattedTripDates = (date) => {
    const dateArr = date.split("-");
    return moment(dateArr[0]).format("MM/DD/YYYY HH A")
} 