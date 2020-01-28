const RATES_SERVICE_URL = 'https://api.exchangeratesapi.io/latest'

export const fetchRates = async (baseCurrency: string) => {
  const request = await fetch(`${RATES_SERVICE_URL}?base=${baseCurrency}`)
  return request.json()
}
