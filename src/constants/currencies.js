// using two endpoint as we dont have support for bitcoin and currencies in single api endpoint
export const API_ENDPOINTS = {
    CURRENCIES: 'https://api.frankfurter.app/latest',
    CRYPTO: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
};


//as our min value is 0.1  and for this value of bitcoin will be 0.000017... so lets us 10
export const DECIMAL_PLACES = {
    CURRENCIES: 2,
    BITCOIN: 10,
};


export const CURRENCIES_OPTIONS = [
    { symbol: "$ USD", name: "USD (United States Dollar)" },
    { symbol: "£ GBP", name: "GBP (British Pound Sterling)" },
    { symbol: "¥ JPY", name: "JPY (Japanese Yen)" },
    { symbol: "$ CAD", name: "CAD (Canadian Dollar)" },
    { symbol: "$ AUD", name: "AUD (Australian Dollar)" },
    { symbol: "$ SGD", name: "SGD (Singapore Dollar)" },
    { symbol: "¥ CNY", name: "CNY (Chinese Renminbi)" },
    { symbol: "₿ BTC", name: "BTC (Bitcoin)" },
];

export const BASE_CURRENCY = "$ USD";
export const BITCOIN_CURRENCY = "BTC";


export const DUMMYEXCHANGERATES = {
    AUD: 1.5347,
    BGN: 1.8051,
    BRL: 5.7748,
    CAD: 1.3876,
    CHF: 0.8706,
    CNY: 7.2058,
    CZK: 23.323,
    DKK: 6.887,
    EUR: 0.92293,
    GBP: 0.78449,
    HKD: 7.8103,
    HUF: 366.16,
    IDR: 16210,
    ILS: 3.8035,
    INR: 83.74,
    ISK: 138.9,
    JPY: 148.93,
    KRW: 1365.73,
    MXN: 18.994,
    MYR: 4.4975,
    NOK: 11.0097,
    NZD: 1.6794,
    PHP: 58.039,
    PLN: 3.9585,
    RON: 4.5922,
    SEK: 10.6916,
    SGD: 1.3312,
    THB: 35.345,
    TRY: 33.172,
    ZAR: 18.1862,
    BTC: 0.000019 // Mocked Bitcoin rate
}
