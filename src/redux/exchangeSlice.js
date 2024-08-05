import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, DECIMAL_PLACES } from "../constants/currencies";


/**
 * Using two api endpoints as no single endpoint was providing the currencies and bitcoin combined
 * the res from currencies api look like this : {
                                                    amount: 1,
                                                    base: "USD",
                                                    date: "2024-08-02",
                                                    rates: {
                                                    AUD: 1.5347,
                                                    BGN: 1.8051,
                                                    BRL: 5.7748,
                                                }
 * the crypto api look like this : {
                                        bitcoin: {
                                        usd: 58325
                                        }
                                    }

    Hence we need to convert it keeping USD as base 
 */
export const getCurrencyExchangeRates = createAsyncThunk("exchange/getExchangeRates", async () => {
    const CurrencyRatesResponse = await fetch(API_ENDPOINTS.CURRENCIES);
    const CurrencyRatesData = await CurrencyRatesResponse.json();

    const BitcoinRatesResponse = await fetch(API_ENDPOINTS.CRYPTO);
    const cryptoData = await BitcoinRatesResponse.json();

    const USDtoBITCOINRate = parseFloat(1 / cryptoData.bitcoin.usd).toFixed(DECIMAL_PLACES.BITCOIN);

    return {
        ...CurrencyRatesData.rates,
        "BTC": USDtoBITCOINRate
    }
});


const initialState = {
    loading: false,
    rates: null,
    error: null,
}

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCurrencyExchangeRates.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getCurrencyExchangeRates.fulfilled, (state, action) => {
            state.loading = false;
            state.rates = action.payload;
        }).addCase(getCurrencyExchangeRates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }
})


export const selectExchange = (state) => state.exchange;
export default exchangeSlice.reducer;