import _ from 'lodash'
import { Dispatch } from 'redux'
import {
  CALCULATOR_ERROR,
  INIT_CALCULATOR,
  RATES_LOADED,
  UPDATE_CALCULATOR_AMOUNTS,
  UPDATE_CALCULATOR,
  IS_CALCULATOR_LOADING, ACCOUNTS_UPDATED
} from '../action-types'
import { fetchRates } from '../../api/rates'
import { fetchCurrencies } from '../../api/currencies'
import {
  findAccountByCurrency, getCalculatorAmounts,
  getCalculatorCurrencies, getCalculatorRates, getExchangeRate,
  getSelectedAccountIds, getSelectedAccounts
} from './selectors'
import { fetchAllAccounts, updateAccountBalance } from '../../api/acounts'
import { formatAmount } from '../../helpers/formatters'
import { RATE_POLL_INTERVAL_MILLIS } from '../../config'

export function initializeCalculator() {
  return async (dispatch: any) => {
    try {
      dispatch({ type: IS_CALCULATOR_LOADING })
      const currencies = await fetchCurrencies()
      const accounts = await fetchAllAccounts()
      const [fromAccount, toAccount] = accounts.slice(1)
      const { rates } = await fetchRates(fromAccount.currency)

      dispatch({
        type: INIT_CALCULATOR,
        payload: {
          rates,
          currencies,
          accounts,
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id
        }
      })

      setInterval(() => dispatch(loadRates()), RATE_POLL_INTERVAL_MILLIS)

    } catch (error) {
      console.log('ERROR', error)
      dispatch({
        type: CALCULATOR_ERROR,
        payload: {
          errorMessage: 'Problem while loading calculator'
        }
      })
    }
  }
}

export const pocketAmountChanged = (pocketId: string, enteredValue: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    const amount = parseFloat(enteredValue)
    const { fromAccountId, toAccountId } = getSelectedAccountIds(getState())
    const { toCurrency } = getCalculatorCurrencies(getState())
    const rate = getExchangeRate(getState(), toCurrency)
    const newAmountFrom = pocketId === fromAccountId ? enteredValue : formatAmount(amount / rate, 2)
    const newAmountTo = pocketId === toAccountId ? enteredValue : formatAmount(amount * rate, 2)

    dispatch({
      type: UPDATE_CALCULATOR_AMOUNTS,
      payload: {
        amountFrom: newAmountFrom,
        amountTo: newAmountTo
      }
    })
  }
}

export function loadRates() {
  return async (dispatch: Dispatch, getState: any) => {
    const { fromCurrency } = getCalculatorCurrencies(getState())
    const oldRates = getCalculatorRates(getState())
    const { rates } = await fetchRates(fromCurrency)

    if (!_.isEqual(oldRates, rates)) {
      dispatch({
        type: RATES_LOADED,
        payload: {
          rates
        }
      })
    }
  }
}

export function swapPockets() {
  return async (dispatch: any, getState: any) => {
    const { fromAccountId, toAccountId } = getSelectedAccountIds(getState())
    const { amountFrom, amountTo } = getCalculatorAmounts(getState())
    dispatch({
      type: UPDATE_CALCULATOR,
      payload: {
        fromAccountId: toAccountId,
        toAccountId: fromAccountId,
        amountFrom: amountTo,
        amountTo: amountFrom
      }
    })
    dispatch(loadRates())
  }
}

export function pocketCurrencyChanged (pocketId: string, currency: string) {
  return async (dispatch: any, getState: any) => {
    const { id } = findAccountByCurrency(getState(), currency)
    const { fromAccountId, toAccountId } = getSelectedAccountIds(getState())
    const { amountFrom, amountTo } = getCalculatorAmounts(getState())

    const newFromAccountId = pocketId === fromAccountId ? id : (id === fromAccountId ? toAccountId : fromAccountId)
    const newToAccountId = pocketId === toAccountId ? id : (id === toAccountId ? fromAccountId : toAccountId)

    if (id === toAccountId) {
      dispatch(swapPockets())
    } else {
      dispatch({
        type: UPDATE_CALCULATOR,
        payload: {
          fromAccountId: newFromAccountId,
          toAccountId: newToAccountId,
          amountFrom,
          amountTo
        }
      })
      dispatch(loadRates())
    }
  }
}

export function performExchange() {
  return async (dispatch: Dispatch, getState: any) => {
    const { amountFrom, amountTo } = getCalculatorAmounts(getState())
    const { fromAccount, toAccount } = getSelectedAccounts(getState())
    const deductedAmount = -parseFloat(amountFrom)
    const addedAmount = parseFloat(amountTo)

    // This should be done on server with all necessary checking, rate re-fetch (probably).
    await updateAccountBalance(fromAccount.id, deductedAmount)
    await updateAccountBalance(toAccount.id, addedAmount)

    dispatch({
      type: ACCOUNTS_UPDATED,
      payload: {
        accounts: await fetchAllAccounts()
      }
    })
  }
}
