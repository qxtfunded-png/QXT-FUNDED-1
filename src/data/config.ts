export interface Plan {
  id: string;
  size: number;
  price: number;
  type: 'challenge' | 'instant';
  target?: number;
  dailyLossLimit: number;
  maxDrawdown?: number;
  withdrawalDays: number;
  payoutRatio: string;
}

// EDIT ACCOUNT PLANS HERE
export const PLANS: Plan[] = [
  // Challenge Plans (Daily Loss Limit = ~27.67% of size)
  { id: 'ch-3k', size: 3000, price: 30, type: 'challenge', target: 999, dailyLossLimit: 830, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-5k', size: 5000, price: 45, type: 'challenge', target: 1500, dailyLossLimit: 1385, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-10k', size: 10000, price: 85, type: 'challenge', target: 3000, dailyLossLimit: 2770, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-20k', size: 20000, price: 160, type: 'challenge', target: 6000, dailyLossLimit: 5540, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-30k', size: 30000, price: 230, type: 'challenge', target: 9000, dailyLossLimit: 8310, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-50k', size: 50000, price: 350, type: 'challenge', target: 15000, dailyLossLimit: 13850, withdrawalDays: 7, payoutRatio: '93%' },
  { id: 'ch-100k', size: 100000, price: 650, type: 'challenge', target: 30000, dailyLossLimit: 27700, withdrawalDays: 7, payoutRatio: '93%' },
  
  // Instant Plans (Daily Loss Limit = ~23.3% of size)
  { id: 'in-3k', size: 3000, price: 42, type: 'instant', dailyLossLimit: 699, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-5k', size: 5000, price: 65, type: 'instant', dailyLossLimit: 1165, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-10k', size: 10000, price: 120, type: 'instant', dailyLossLimit: 2330, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-20k', size: 20000, price: 230, type: 'instant', dailyLossLimit: 4660, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-30k', size: 30000, price: 340, type: 'instant', dailyLossLimit: 6990, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-50k', size: 50000, price: 550, type: 'instant', dailyLossLimit: 11650, withdrawalDays: 0, payoutRatio: '93%' },
  { id: 'in-100k', size: 100000, price: 990, type: 'instant', dailyLossLimit: 23300, withdrawalDays: 0, payoutRatio: '93%' },
];

// EDIT WALLET ADDRESSES HERE
const TEMPORARY_EXPIRY = new Date('2026-03-19T18:53:09Z').getTime();
const IS_TEMPORARY_ACTIVE = Date.now() < TEMPORARY_EXPIRY;

export const WALLETS = {
  usdt_bep20: IS_TEMPORARY_ACTIVE ? "0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad" : "0x09192e228e2a9fc37be759b79b652989f912363d",
  usdt_trc20: IS_TEMPORARY_ACTIVE ? "TZDeaPnUcBRPvkpDQmkBEHeRd6D1aX4Gve" : "TUTYn3YM5PgBiax8DauKSku7csuRFnAczv",
  usdt_erc20: "0x09192e228e2a9fc37be759b79b652989f912363d",
  btc: "33iPbGRwsFEndmvAWk3G927yegGsgLTWNZ"
};

export const BROKERS = [
  { id: 'quotex', name: 'Quotex', initial: 'Q', color: '#00e676', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Quotex_Logo.png/600px-Quotex_Logo.png' },
  { id: 'pocket-option', name: 'Pocket Option', initial: 'P', color: '#2196f3', logo: 'https://pocketoption.com/themes/pocketoption/assets/img/logo-white.png' },
  { id: 'olymp-trade', name: 'Olymp Trade', initial: 'O', color: '#ff9800', logo: 'https://static.olymptrade.com/v3/assets/logo/logo_white.svg' },
  { id: 'iq-option', name: 'IQ Option', initial: 'I', color: '#f44336', logo: 'https://iqoption.com/static/images/logo/logo.png' },
];

export const PAYMENT_LOGOS = {
  usdt: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=029',
  bep20: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=029',
  trc20: 'https://cryptologos.cc/logos/tron-trx-logo.png?v=029',
  erc20: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029',
  btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029'
};

export const SUPPORT_EMAIL = "qxtfunded@gmail.com";
