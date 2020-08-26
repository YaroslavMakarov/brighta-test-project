export const intermediateFiltration = (day, filterDatesArr) => {
    // last filtering day variables
    const lastFilteringDayNewDate = filterDatesArr[filterDatesArr.length - 1];
    const yearOfLastFilteringDay = lastFilteringDayNewDate.getFullYear();
    const monthOfLastFilteringDay = lastFilteringDayNewDate.getMonth();
    const dateOfLastFilteringDay = lastFilteringDayNewDate.getDate();

    // first filtering day variables
    const firstFilteringDayNewDate = filterDatesArr[0];

    if (
        yearOfLastFilteringDay === day.date.getFullYear()
        && monthOfLastFilteringDay === day.date.getMonth()
        && dateOfLastFilteringDay === day.date.getDate()
    ) {
        return {
            ...day,
            lastFilterDate: true,
        }
    } else if (
        firstFilteringDayNewDate.getFullYear() === day.date.getFullYear()
        && firstFilteringDayNewDate.getMonth() === day.date.getMonth()
        && firstFilteringDayNewDate.getDate() === day.date.getDate()
    ) {
        return {
            ...day,
            firstFilterDate: true,
        }
    } else if (
        lastFilteringDayNewDate < day.date
        && day.date < firstFilteringDayNewDate
    ) {
        return {
            ...day,
            filteringDate: true,
        }
    } else {
        return day;
    }
};

export const singleFiltration = (day, date) => {
    if (
        date.getFullYear() === day.date.getFullYear()
        && date.getMonth() === day.date.getMonth()
        && date.getDate() === day.date.getDate()
    ) {

        return {
            ...day,
            singleFilterDate: true
        }
    }

    return day;
};
