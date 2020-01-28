import { Currency, ExchangeAccount } from '../../types/typings'

function getState (state: any): any {
  return state?.calculator
}

export const getCalculatorCurrencies = (state: any): any => {
  const { fromAccountId, toAccountId } = getSelectedAccountIds(state)
  return {
    fromCurrency: findAccountById(state, fromAccountId)?.currency,
    toCurrency: findAccountById(state, toAccountId)?.currency
  }
}

export const getCalculatorRates = (state: any): any => {
  return getState(state)?.rates
}

export const getExchangeRate = (state: any, currency: string): any => {
  return getState(state)?.rates[currency]
}

export const getSelectedAccountIds = (state: any): any => {
  const { fromAccount, toAccount } = getSelectedAccounts(state)
  return {
    fromAccountId: fromAccount?.id,
    toAccountId: toAccount?.id
  }
}

export const getSelectedAccounts = (state: any): any => {
  return {
    fromAccount: findAccountById(state, state.calculator.fromAccountId),
    toAccount: findAccountById(state, state.calculator.toAccountId)
  }
}

export const getCalculatorAmounts = (state: any): any => {
  return {
    amountFrom: getState(state)?.amountFrom,
    amountTo: getState(state)?.amountTo
  }
}

export const findAccountById = (state: any, accountId: string): ExchangeAccount => {
  return getState(state)?.accounts?.find((account: ExchangeAccount) => account.id === accountId)
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

export const findCurrencyByCode = (state: any, currencyCode: string): Currency => {
  return getState(state)?.currencies?.find((currency: Currency) => currency.code === currencyCode)
}
