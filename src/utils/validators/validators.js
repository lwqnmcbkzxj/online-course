export const required = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const minLength = (minLength) => (value) => {
    if (value.length < minLength) return `Max length is ${minLength} symbols`;
    return undefined;
}
// export const isEmail = (value) => {
//     let regExp = new RegExp('/.+@.+\..+/i');
//     if (!regExp.test(value)) return `Incorrect email`;
//     return undefined;
// }