import * as React from 'react'
import { connect } from 'react-redux'
import { ConversionRatePanelProps } from './conversion-rate-panel'
import { RATE_POLL_INTERVAL_MILLIS } from '../../config'

interface WithPollingProps extends ConversionRatePanelProps {
  pollingAction: () => void
}

export const withPolling = <T extends WithPollingProps>(pollingAction: () => void, duration = RATE_POLL_INTERVAL_MILLIS) =>
  (Component: React.ComponentType<WithPollingProps>) => {

  const Wrapper = () => (
    class extends React.Component<WithPollingProps> {
      dataPolling: any
      componentDidMount() {
        this.dataPolling = setInterval(
          () => {
            this.props.pollingAction()
          },
          duration)
      }
      componentWillUnmount() {
        clearInterval(this.dataPolling)
      }
      render() {
        return <Component {...this.props}/>
      }
    })
  return connect(null, {pollingAction})(Wrapper())
}
