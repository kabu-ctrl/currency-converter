import {
  ACCOUNTS_UPDATED,
  CALCULATOR_ERROR,
  INIT_CALCULATOR, IS_CALCULATOR_LOADING,
  RATES_LOADED, RATES_LOADING,
  UPDATE_CALCULATOR_AMOUNTS,
  UPDATE_CALCULATOR
} from '../action-types'
import { Currency } from '../../types/typings'

export interface CalculatorState {
  amountFrom?: string
  amountTo?: string
  fromAccountId?: string
  toAccountId?: string
  rates: any
  currencies: Currency[]
  accounts: Account[]
  isCalculatorLoading: boolean
  isRatesLoading: boolean
  errorMessage?: string
}

const initialState: CalculatorState = {
  amountFrom: '',
  amountTo: '',
  fromAccountId: undefined,
  toAccountId: undefined,
  rates: [],
  currencies: [],
  accounts: [],
  isCalculatorLoading: true,
  isRatesLoading: true,
  errorMessage: undefined
}

export default function (state = initialState, action: any): any {
  switch (action.type) {
    case IS_CALCULATOR_LOADING: {
      return {
        ...state,
        isCalculatorLoading: true
      }
    }
    case INIT_CALCULATOR: {
      const { rates, currencies, accounts, fromAccountId, toAccountId } = action.payload
      return {
        ...state,
        rates,
        isCalculatorLoading: false,
        isRatesLoading: false,
        currencies,
        accounts,
        fromAccountId,
        toAccountId
      }
    }
    case UPDATE_CALCULATOR: {
      const { fromAccountId, toAccountId, amountFrom, amountTo } = action.payload
      return {
        ...state,
        fromAccountId,
        toAccountId,
        amountFrom,
        amountTo
      }
    }
    case UPDATE_CALCULATOR_AMOUNTS: {
      const { amountFrom, amountTo } = action.payload
      return {
        ...state,
        amountFrom,
        amountTo
      }
    }
    case CALCULATOR_ERROR: {
      const { errorMessage } = action.payload
      return {
        ...state,
        isCalculatorLoading: false,
        errorMessage
      }
    }
    case RATES_LOADING: {
      return {
        ...state,
        isRatesLoading: true
      }
    }
    case RATES_LOADED: {
      const { rates } = action.payload
      return {
        ...state,
        rates,
        isRatesLoading: false
      }
    }
    case ACCOUNTS_UPDATED: {
      const { accounts } = action.payload
      return {
        ...state,
        accounts,
        amountFrom: '',
        amountTo: ''
      }
    }
    default:
      return state
  }
}
