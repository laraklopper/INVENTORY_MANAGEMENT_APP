export const dateDisplay = (dateString) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

// Format time as hh:mm:ss
export const timeDisplay = (dateObj) => {
    return dateObj.toLocaleTimeString('en-ZA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
};

export const formatDate = (value) =>
    value
        ? new Date(value).toLocaleDateString
            ('en-ZA', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            }) : '—';