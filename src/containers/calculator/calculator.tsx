import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Header, Icon, Loader, Message } from 'semantic-ui-react'
import CurrencySelector from '../../components/currency-selector'
import ConversionRatePanel from '../../components/conversion-rate-panel'
import { getSelectedAccountIds, isCalculatorLoading, isError } from '../../store/calculator/selectors'
import { initializeCalculator, swapPockets } from '../../store/calculator/actions'
import ExchangeButton from '../../components/exchange-button'
import css from './styles.module.css'

const Calculator = () => {
  const error = useSelector(isError, shallowEqual)
  const loading = useSelector(isCalculatorLoading, shallowEqual)
  const { fromAccountId, toAccountId } = useSelector(getSelectedAccountIds, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeCalculator())
  }, [dispatch])

  if (error) {
    return (
      <div>
        <Message color='red'>
          We are sorry, there was an error while loading calculator. Please, try again later.
        </Message>
      </div>
    )
  }

  if (loading) {
    return (
      <Loader active size='big'/>
    )
  }

  return (
    <div className={css.content}>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header data-testid={'header'} as='h1'>Currency Exchange</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <CurrencySelector primary accountId={fromAccountId}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <div className={css.centerContainer}>
              <Button
                data-testid='swap-button'
                size='small'
                icon
                onClick={() => dispatch(swapPockets())}
                className={css.swapButton}
                circular
              >
                <Icon rotated='clockwise' name='exchange'/>
              </Button>
              <ConversionRatePanel/>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <CurrencySelector primary={false} accountId={toAccountId}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <ExchangeButton/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Calculator
