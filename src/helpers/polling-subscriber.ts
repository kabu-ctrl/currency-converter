export class PollingSubscriber {

  polling: any

  subscribe(pollingFn: any, duration: number) {
    this.polling = setInterval(() => pollingFn(), duration)
  }

  unsubscribe() {
    clearInterval(this.polling)
  }
}
