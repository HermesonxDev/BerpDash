const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    const year = dateFormatted.getFullYear();
    const month = dateFormatted.getMonth() + 1 > 9 ? dateFormatted.getMonth() + 1 : `0${dateFormatted.getMonth() + 1 }`;
    const day = dateFormatted.getDate() > 9 ? dateFormatted.getDate() : `0${dateFormatted.getDate()}`;

    return `${day}/${month}/${year}`;
}

export default formatDate