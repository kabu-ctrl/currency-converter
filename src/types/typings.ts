export interface Currency {
  code: string
  title: string
  symbol: string
}

export interface ExchangeAccount {
  id: string
  currency: string
  balance: number
}
