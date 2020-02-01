import React from 'react'
import { useSelector } from 'react-redux'
import { Icon, Label, Loader } from 'semantic-ui-react'
import {
  getCalculatorCurrencies, getExchangeRate,
  isRatesLoading
} from '../../store/calculator/selectors'
import { formatAmount } from '../../helpers/formatters'
import { withPolling } from './with-polling';
import { loadRates } from '../../store/calculator/actions';
import css from './styles.module.css'

export interface ConversionRatePanelProps {
  fromAccountId: string
  toAccountId: string
}

const ConversionRatePanel = () => {
  const isLoading = useSelector(isRatesLoading)
  const { fromCurrency, toCurrency } = useSelector(getCalculatorCurrencies)
  const exchangeRate = useSelector(getExchangeRate(toCurrency))
  if (isLoading) {
    return (
      <Label color='blue' className={css.rate}>
        <Loader active inline />
      </Label>
    )
  }

  return (
    <Label data-testid='rate-panel' color='blue' className={css.rate}>
      <Icon name='currency'/> 1 {fromCurrency} = {formatAmount(exchangeRate, 4)} {toCurrency}
    </Label>
  )
}

export default withPolling(loadRates)(ConversionRatePanel);

