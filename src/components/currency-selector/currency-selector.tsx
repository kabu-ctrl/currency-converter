import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Grid, Input, Select } from 'semantic-ui-react'
import { Currency } from '../../types/typings'
import css from './styles.module.css'
import {
  findAccountById,
  findCurrencyByCode,
  getCalculatorAmounts,
  getCurrencies,
} from '../../store/calculator/selectors'
import { pocketCurrencyChanged, pocketAmountChanged } from '../../store/calculator/actions'
import { isInputValid } from '../../helpers/validators'
import { formatAmount } from '../../helpers/formatters'

interface CurrencySelectorProps {
  accountId: string
  primary: boolean
}

const toCurrencyOption = ({ code, title }: Currency) => ({
  key: code,
  value: code,
  text: title,
})

const handleExchangeAmountChangeEvent = (accountId: string, dispatch: any) => (e: any) => {
  const input = e.target.value
  if (input === '' || isInputValid(input)) {
    dispatch(pocketAmountChanged(accountId, input))
  }
}

const handleCurrencyChangeEvent = (accountId: string, dispatch: any) => (_: any, { value }: any) => {
  dispatch(pocketCurrencyChanged(accountId, value))
}

const CurrencySelector = ({ accountId, primary }: CurrencySelectorProps) => {
  const { balance, currency: currencyCode } = useSelector(findAccountById(accountId), shallowEqual)
  const { amountFrom, amountTo } = useSelector(getCalculatorAmounts, shallowEqual)
  const currencyList = useSelector(getCurrencies, shallowEqual)
  const exchangeAmount = primary ? amountFrom : amountTo
  const insufficientFunds = primary && exchangeAmount > balance
  const currency = useSelector(findCurrencyByCode(currencyCode), shallowEqual)
  const dispatch = useDispatch()

  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <Select
            options={currencyList.map(toCurrencyOption)}
            data-testid={`${primary ? 'primary' : 'secondary'}-selector`}
            value={currency.code}
            onChange={handleCurrencyChangeEvent(accountId, dispatch)}
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            placeholder="0"
            type="number"
            value={exchangeAmount}
            data-testid={`${primary ? 'primary' : 'secondary'}-input`}
            onChange={handleExchangeAmountChangeEvent(accountId, dispatch)}
          />
        </Grid.Column>
        <Grid.Column>
          <label
            className={insufficientFunds ? css.error : ''}
            data-testid={`${primary ? 'primary' : 'secondary'}-balance`}
          >
            Balance: {currency.symbol}
            {formatAmount(balance, 2)}
          </label>
        </Grid.Column>
        <Grid.Column>
          {insufficientFunds && (
            <label data-testid="insufficient-funds" className={insufficientFunds ? css.invalid : ''}>
              Insufficient funds
            </label>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default CurrencySelector
