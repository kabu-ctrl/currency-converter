import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { performExchange } from '../../store/calculator/actions'
import { getCalculatorAmounts, getSelectedAccounts } from '../../store/calculator/selectors'

interface ConversionButtonProps {
  performExchange: () => void
  isValidAmount: boolean
}

export const ConversionButton = ({ performExchange, isValidAmount }: ConversionButtonProps) => {
  return (
    <Button
      size='medium'
      color='pink'
      disabled={!isValidAmount}
      onClick={performExchange}
    >
        Exchange
    </Button>
  )
}

function mapStateToProps (state: any) {
  const { fromAccount } = getSelectedAccounts(state)
  const { amountFrom } = getCalculatorAmounts(state)
  return {
    isValidAmount: amountFrom > 0 && fromAccount.balance >= amountFrom
  }
}

export default connect(
  mapStateToProps,
  { performExchange }
)(ConversionButton)
