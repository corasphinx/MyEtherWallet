import { sha3 } from 'web3-utils';
import axios from 'axios';
const API = 'https://mainnet.mewwallet.dev';

export default class MoonPayHandler {
  constructor() {}

  buy(tokenSymbol, fiatCurrency, amount, address) {
    const hash = sha3(address);
    const id = `WEB|${hash.substring(0, 42)}`;
    return new Promise(resolve => {
      let link = `${API}/v3/purchase/moonpay/order?address=${address}&id=${id}&cryptoCurrency=${tokenSymbol}&fiatCurrency=${fiatCurrency}`;
      if (amount) {
        link += `${link}&requestedAmount=${amount}`;
      }
      const parsedUrl = encodeURI(link);
      // eslint-disable-next-line
      window.open(parsedUrl, '_blank');
      resolve();
    });
  }

  sell(tokenSymbol, amount, address) {
    const hash = sha3(address);
    const id = `WEB|${hash.substring(0, 42)}`;
    return new Promise(resolve => {
      const parsedUrl = encodeURI(
        `${API}/v3/sell/moonpay/order?address=${address}&id=${id}&cryptoCurrency=${tokenSymbol}&requestedAmount=${amount}`
      );
      // eslint-disable-next-line
      window.open(parsedUrl, '_blank');
      resolve();
    });
  }

  getSupportedFiatToBuy(symbol) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API}/v3/purchase/providers/web?iso=us&cryptoCurrency=${symbol}`)
        .then(res => {
          const supportedFiat = res.data;
          resolve(supportedFiat);
        })
        .catch(reject);
    });
  }

  getFiatRatesForBuy() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API}/v3/purchase/moonpay/quotes`)
        .then(res => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }

  getSupportedFiatToSell(symbol) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API}/v3/sell/providers/web?iso=us&cryptoCurrency=${symbol}`)
        .then(res => {
          const supportedFiat = res.data;
          resolve(supportedFiat);
        })
        .catch(reject);
    });
  }
  // this won't be used for awhile but is setup here
  getHistory() {}
}
