export const required = (value) => {
    if (!value)
        return 'This field is required';
}

export const maxLengthCreator = (length) => (value) => {
    if (value && value.length > length)
        return `Max length is ${length} symbols`;
}