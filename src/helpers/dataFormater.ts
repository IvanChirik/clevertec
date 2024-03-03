export const formatDate = (date: string): string => {
    const formatDate = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    return formatDate.format(new Date(date));
}