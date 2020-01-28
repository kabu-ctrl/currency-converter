import { Currency } from '../types/typings'

export const currencies = [
  { code: 'EUR', title: 'Euro', symbol: '€' },
  { code: 'USD', title: 'US Dollar', symbol: '$' },
  { code: 'GBP', title: 'British Pound', symbol: '£' }
]

// Currencies should be retrieved from external service.
// Therefore I wrap result into Promise.

export const fetchCurrencies = (): Promise<Currency[]> => {
  return Promise.resolve<Currency[]>(currencies)
}
