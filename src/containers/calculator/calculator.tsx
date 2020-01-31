import React from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Header, Icon, Loader, Message } from 'semantic-ui-react'
import SelectCurrency from '../../components/currency-selector'
import ConversionRatePanel from '../../components/conversion-rate-panel'
import { getSelectedAccountIds, isCalculatorLoading, isError } from '../../store/calculator/selectors'
import { initializeCalculator, swapPockets } from '../../store/calculator/actions'
import ConversionButton from '../../components/convertion-button'
import css from './styles.module.css'

interface CalculatorPanelProps {
  fromAccountId: string
  toAccountId: string
  initializeCalculator: () => void
  isLoading: boolean
  swapPockets: () => void
  isError: boolean
}

class Calculator extends React.Component <CalculatorPanelProps> {
  componentDidMount () {
    this.props.initializeCalculator()
  }

  render () {
    if (this.props.isError) {
      return (
        <div>
          <Message color='red'>
            We are sorry, there was an error while loading calculator. Please, try again later.
          </Message>
        </div>
      )
    }
    if (this.props.isLoading) {
      return (
        <Loader active size='big'/>
      )
    }

    const { fromAccountId, toAccountId, swapPockets } = this.props

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
              <SelectCurrency primary accountId={fromAccountId}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div className={css.centerContainer}>
                <Button
                  data-testid='swap-button'
                  size='small'
                  icon
                  onClick={swapPockets}
                  className={css.swapButton}
                  circular
                >
                  <Icon rotated='clockwise' name='exchange'/>
                </Button>
                <ConversionRatePanel
                  fromAccountId={fromAccountId}
                  toAccountId={toAccountId}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <SelectCurrency primary={false} accountId={toAccountId}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <ConversionButton/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state: any) {
  const { fromAccountId, toAccountId } = getSelectedAccountIds(state)
  return {
    fromAccountId,
    toAccountId,
    isLoading: isCalculatorLoading(state),
    isError: isError(state)
  }
}

export default connect(
  mapStateToProps,
  {
    initializeCalculator,
    swapPockets
  }
)(Calculator)
