import uuid from 'uuid'
import { ExchangeAccount } from '../types/typings'

const DATA_KEY = 'exchange-accounts'

export const accounts = [
  { id: uuid.v4(), currency: 'EUR', balance: 100.01 },
  { id: uuid.v4(), currency: 'USD', balance: 29.88 },
  { id: uuid.v4(), currency: 'GBP', balance: 0.57 }
]

saveToLocalStorage(accounts)

export const fetchAllAccounts = () => {
  try {
    const accounts = fromLocalStorage()
    return Promise.resolve<ExchangeAccount[]>(accounts)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const updateAccountBalance = (accountId: string, balanceChange: number): Promise<void> => {
  try {
    const accounts = fromLocalStorage()
    const updatedAccounts = accounts.map((account: ExchangeAccount) => {
      return accountId === account.id ? {
        ...account,
        balance: account.balance + balanceChange
      } : account
    })
    saveToLocalStorage(updatedAccounts)
    return Promise.resolve<void>(undefined)
  } catch (e) {
    return Promise.reject(e)
  }
}

function saveToLocalStorage (accounts: ExchangeAccount[]) {
  localStorage.setItem(DATA_KEY, JSON.stringify(accounts))
}

function fromLocalStorage (): ExchangeAccount[] {
  const jsonString = localStorage.getItem(DATA_KEY)
  if (jsonString) {
    return JSON.parse(jsonString)
  }
  throw new Error('Accounts not found')
}
