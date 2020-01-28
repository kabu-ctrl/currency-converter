import { RATE_SERVICE_URL } from '../config'

export const fetchRates = async (baseCurrency: string) => {
  const request = await fetch(`${RATE_SERVICE_URL}?base=${baseCurrency}`)
  return request.json()
}
