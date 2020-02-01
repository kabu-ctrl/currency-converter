import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { performExchange } from '../../store/calculator/actions'
import { getCalculatorAmounts, getSelectedAccounts } from '../../store/calculator/selectors'

const ExchangeButton = () => {

  const { fromAccount } = useSelector(getSelectedAccounts, shallowEqual)
  const { amountFrom } = useSelector(getCalculatorAmounts, shallowEqual)
  const isValidAmount = amountFrom > 0 && fromAccount.balance >= amountFrom
  const dispatch = useDispatch()

  return (
    <Button
      size='medium'
      color='pink'
      data-testid='exchange-button'
      disabled={!isValidAmount}
      onClick={() => dispatch(performExchange())}
    >
      Exchange
    </Button>
  )
}

export default ExchangeButton
