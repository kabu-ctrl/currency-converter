import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Icon, Label, Loader } from 'semantic-ui-react'
import { getCalculatorCurrencies, getExchangeRate, isRatesLoading } from '../../store/calculator/selectors'
import { formatAmount } from '../../helpers/formatters'
import { loadRates } from '../../store/calculator/actions'
import { RATE_POLL_INTERVAL_MILLIS } from '../../config'
import { PollingSubscriber } from '../../helpers/polling-subscriber'
import css from './styles.module.css'

const ConversionRatePanel = () => {
  const isLoading = useSelector(isRatesLoading, shallowEqual)
  const { fromCurrency, toCurrency } = useSelector(getCalculatorCurrencies, shallowEqual)
  const exchangeRate = useSelector(getExchangeRate(toCurrency), shallowEqual)
  const rateAPIPolling = new PollingSubscriber()
  const dispatch = useDispatch()

  useEffect(() => {
    rateAPIPolling.subscribe(() => dispatch(loadRates()), RATE_POLL_INTERVAL_MILLIS)
    return () => {
      rateAPIPolling.unsubscribe()
    }
  }, [exchangeRate, rateAPIPolling, dispatch])

  if (isLoading) {
    return (
      <Label color="blue" className={css.rate}>
        <Loader active inline />
      </Label>
    )
  }

  return (
    <Label data-testid="rate-panel" color="blue" className={css.rate}>
      <Icon name="currency" /> 1 {fromCurrency} = {formatAmount(exchangeRate, 4)} {toCurrency}
    </Label>
  )
}

export default ConversionRatePanel
