import React from 'react'
import { connect } from 'react-redux'
import { Icon, Label, Loader } from 'semantic-ui-react'
import { getCalculatorCurrencies, getExchangeRate, isRatesLoading } from '../../store/calculator/selectors'
import { formatAmount } from '../../helpers/formatters'
import css from './styles.module.css'

interface InjectedProps {
  isRatesLoading: boolean
  fromCurrency?: string
  toCurrency?: string
  exchangeRate: number
}

interface ConversionRatePanelProps {
  fromAccountId: string
  toAccountId: string
}

class ConversionRatePanel extends React.Component <ConversionRatePanelProps & InjectedProps> {
  render () {
    if (this.props.isRatesLoading) {
      return (
        <Label color='blue' className={css.rate}>
          <Loader active inline />
        </Label>
      )
    }

    const { fromCurrency, toCurrency, exchangeRate } = this.props

    return (
      <Label color='blue' className={css.rate}>
        <Icon name='currency'/> 1 {fromCurrency} = {formatAmount(exchangeRate, 4)} {toCurrency}
      </Label>
    )
  }
}

function mapStateToProps (state: any) {
  const { fromCurrency, toCurrency } = getCalculatorCurrencies(state)
  return {
    fromCurrency,
    toCurrency,
    exchangeRate: getExchangeRate(state, toCurrency),
    isRatesLoading: isRatesLoading(state)
  }
}

export default connect(mapStateToProps, {})(ConversionRatePanel)
