// using two endpoint as we dont have support for bitcoin and currencies in single api endpoint
export const API_ENDPOINTS = {
    FRANKFURTER: 'https://api.frankfurter.app/latest',
    COINGECKO: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
};


//as our min value is 0.1  and for this value of bitcoin will be 0.000017 so we need 6 point precision for bitcoin
export const DECIMAL_PLACES = {
    CURRENCIES: 2,
    BITCOIN: 6,
};


export const CURRENCIES_OPTIONS = [
    { symbol: "$ USD", name: "USD (United States Dollar)" },
    { symbol: "£ GBP", name: "GBP (British Pound Sterling)" },
    { symbol: "¥ JPY", name: "JPY (Japanese Yen)" },
    { symbol: "CAD $", name: "CAD (Canadian Dollar)" },
    { symbol: "AUD $", name: "AUD (Australian Dollar)" },
    { symbol: "SGD $", name: "SGD (Singapore Dollar)" },
    { symbol: "¥ CNY", name: "CNY (Chinese Renminbi)" },
    { symbol: "₿ BTC", name: "BTC (Bitcoin)" },
];