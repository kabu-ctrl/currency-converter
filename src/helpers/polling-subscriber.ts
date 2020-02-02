export class PollingSubscriber {
  polling: any

  subscribe(pollingFn: any, duration: number): void {
    console.log('subscribe')
    this.polling = setInterval(() => pollingFn(), duration)
  }

  unsubscribe(): void {
    console.log('unsubscribe')
    clearInterval(this.polling)
  }
}
