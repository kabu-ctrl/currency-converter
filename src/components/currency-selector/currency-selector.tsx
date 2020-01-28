import React from 'react'
import { connect } from 'react-redux'
import { Grid, Input, Select } from 'semantic-ui-react'
import { Currency } from '../../types/typings'
import css from './styles.module.css'
import {
  findAccountById,
  findCurrencyByCode,
  getCalculatorAmounts,
  getCurrencies
} from '../../store/calculator/selectors'
import { pocketCurrencyChanged, pocketAmountChanged } from '../../store/calculator/actions'
import { isInputValid } from '../../helpers/validators'
import { formatAmount } from '../../helpers/formatters'

interface InjectedProps {
  currency: Currency
  currencyList: Currency[]
  availableAmount: number
  exchangeAmount: number
  pocketCurrencyChanged: (id: string, currency: string) => void
  pocketAmountChanged: (id: string, amount: string) => void
  insufficientFunds: boolean
}

interface SelectCurrencyProps {
  accountId: string
  primary: boolean
}

class SelectCurrency extends React.Component<SelectCurrencyProps & InjectedProps> {
  onCurrencyChangeEvent = (currency: string): void => {
    const { accountId, pocketCurrencyChanged } = this.props
    pocketCurrencyChanged(accountId, currency)
  }

  onExchangeAmountChangeEvent = (e: any): any => {
    const { accountId, pocketAmountChanged } = this.props
    const input = e.target.value
    if (input === '' || isInputValid(e.target.value)) {
      pocketAmountChanged(accountId, input)
    }
  }

  toCurrencyOption = ({ code, title }: Currency) => ({
    key: code, value: code, text: title
  })

  render () {
    const {
      currency,
      availableAmount,
      exchangeAmount,
      currencyList,
      insufficientFunds
    } = this.props

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Select
              options={currencyList.map(this.toCurrencyOption)}
              value={currency.code}
              onChange={(_, { value }: any) => { this.onCurrencyChangeEvent(value) }}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              placeholder='0'
              type='number'
              value={exchangeAmount}
              onChange={this.onExchangeAmountChangeEvent}
            />
          </Grid.Column>
          <Grid.Column>
            <label className={insufficientFunds ? css.error : ''}>
              Balance: {currency.symbol}{formatAmount(availableAmount, 2)}
            </label>
          </Grid.Column>
          <Grid.Column>
            {insufficientFunds &&
              <label className={insufficientFunds ? css.invalid : ''}>
                Insufficient funds
              </label>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps (state: any, props: SelectCurrencyProps) {
  const { balance, currency } = findAccountById(state, props.accountId)
  const { amountFrom, amountTo } = getCalculatorAmounts(state)
  const exchangeAmount = props.primary ? amountFrom : amountTo
  return {
    exchangeAmount,
    availableAmount: balance,
    currency: findCurrencyByCode(state, currency),
    currencyList: getCurrencies(state),
    insufficientFunds: props.primary && exchangeAmount > balance
  }
}

export default connect(
  mapStateToProps, {
    pocketCurrencyChanged,
    pocketAmountChanged
  })(SelectCurrency)
