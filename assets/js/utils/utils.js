export function isValidPrice(price) {
    return !isNaN(parseFloat(price)) && parseFloat(price) >= 0
}

export function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}