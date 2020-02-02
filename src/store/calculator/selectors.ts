import { Currency, ExchangeAccount } from '../../types/typings'

function getState(state: any): any {
  return state?.calculator
}

export const findAccountById = (accountId: string) => (state: any): ExchangeAccount => {
  return getState(state)?.accounts?.find((account: ExchangeAccount) => account.id === accountId)
}

export const getSelectedAccounts = (state: any): any => {
  return {
    fromAccount: findAccountById(state.calculator.fromAccountId)(state),
    toAccount: findAccountById(state.calculator.toAccountId)(state),
  }
}

export const getCalculatorCurrencies = (state: any): any => {
  const { fromAccount, toAccount } = getSelectedAccounts(state)
  return {
    fromCurrency: fromAccount.currency,
    toCurrency: toAccount.currency,
  }
}

export const getCalculatorRates = (state: any): any => {
  return getState(state)?.rates
}

export const getExchangeRate = (currency: string) => (state: any): any => {
  return getState(state)?.rates[currency]
}

export const getSelectedAccountIds = (state: any): any => {
  const { fromAccount, toAccount } = getSelectedAccounts(state)
  return {
    fromAccountId: fromAccount?.id,
    toAccountId: toAccount?.id,
  }
}

export const getCalculatorAmounts = (state: any): any => {
  return {
    amountFrom: getState(state)?.amountFrom,
    amountTo: getState(state)?.amountTo,
  }
}

export const findAccountByCurrency = (state: any, currencyCode: string): ExchangeAccount => {
  return getState(state).accounts?.find((account: ExchangeAccount) => account.currency === currencyCode)
}

export const isCalculatorLoading = (state: any): boolean => {
  return getState(state)?.isCalculatorLoading
}

export const isRatesLoading = (state: any): boolean => {
  return getState(state)?.isRatesLoading
}

export const getCurrencies = (state: any): Currency[] => {
  return getState(state)?.currencies
}

export const findCurrencyByCode = (currencyCode: string) => (state: any): Currency => {
  return getState(state)?.currencies?.find((currency: Currency) => currency.code === currencyCode)
}

export const isError = (state: any): boolean => {
  return getState(state)?.isError
}
