import { RATE_SERVICE_URL } from '../config'

export const fetchRates = async (baseCurrency: string): Promise<any> => {
  const response = await fetch(`${RATE_SERVICE_URL}?base=${baseCurrency}`)
  if (response.ok) {
    return response.json()
  }
  throw new Error('There was an error fetching exchange rates')
}
