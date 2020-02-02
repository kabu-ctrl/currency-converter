const selectors = {
  HEADER: '[data-testid="header"]',
  PRIMARY_CURRENCY: '[data-testid="primary-selector"] div',
  SECONDARY_CURRENCY: '[data-testid="secondary-selector"] div',
  PRIMARY_BALANCE: '[data-testid="primary-balance"]',
  SECONDARY_BALANCE: '[data-testid="secondary-balance"]',
  PRIMARY_INPUT: '[data-testid="primary-input"]',
  PRIMARY_INPUT_VAL: '[data-testid="primary-input"] input',
  SECONDARY_INPUT: '[data-testid="secondary-input"]',
  SECONDARY_INPUT_VAL: '[data-testid="secondary-input"] input',
  EXCHANGE_BUTTON: '[data-testid="exchange-button"]',
  SWAP_BUTTON: '[data-testid="swap-button"]',
  INSUFFICIENT_FUNDS_LABEL: '[data-testid="insufficient-funds"]',
  EXCHANGE_RATE_PANEL: '[data-testid="rate-panel"]',
  CURRENCY_SELECT_OPTION: 'div [role="option"]',
}

export function pageDriver(page: any) {
  const waitAndEvalElement = async (selector: string) => {
    await page.waitForSelector(selector)
    return page.$eval(selector, ({ value, innerHTML, disabled, placeHolder }: any) => ({
      value,
      innerHTML,
      disabled,
      placeHolder,
    }))
  }

  const waitAndEvalInnerHtml = async (selector: string) => {
    const { innerHTML } = await waitAndEvalElement(selector)
    return innerHTML
  }

  const getVisibleField = (selector: string) => {
    return page.waitForSelector(selector, { visible: true })
  }

  const getButton = async (selector: string) => {
    const { disabled, innerHTML } = await waitAndEvalElement(selector)
    return {
      disabled,
      label: innerHTML,
    }
  }

  return {
    getHeader: async () => {
      return waitAndEvalInnerHtml(selectors.HEADER)
    },
    getPrimaryCurrency: async () => {
      return waitAndEvalInnerHtml(selectors.PRIMARY_CURRENCY)
    },
    getPrimaryBalance: async () => {
      return waitAndEvalInnerHtml(selectors.PRIMARY_BALANCE)
    },
    getSecondaryCurrency: async () => {
      return waitAndEvalInnerHtml(selectors.SECONDARY_CURRENCY)
    },
    getSecondaryBalance: async () => {
      return waitAndEvalInnerHtml(selectors.SECONDARY_BALANCE)
    },
    getPrimaryInput: async () => {
      return getVisibleField(selectors.PRIMARY_INPUT)
    },
    getPrimaryInputValue: async () => {
      const { value } = await waitAndEvalElement(selectors.PRIMARY_INPUT_VAL)
      return value
    },
    getSecondaryInput: async () => {
      return getVisibleField(selectors.SECONDARY_INPUT)
    },
    getSecondaryInputValue: async () => {
      const { value } = await waitAndEvalElement(selectors.SECONDARY_INPUT_VAL)
      return value
    },
    getExchangeButton: async () => {
      return getButton(selectors.EXCHANGE_BUTTON)
    },
    getSwapButton: async () => {
      return getButton(selectors.SWAP_BUTTON)
    },
    getRatePanel: async () => {
      return getVisibleField(selectors.EXCHANGE_RATE_PANEL)
    },
    getInsufficientFundsLabel: async () => {
      const elem = await page.$$(selectors.INSUFFICIENT_FUNDS_LABEL)
      return elem && elem.length > 0 && waitAndEvalInnerHtml(selectors.INSUFFICIENT_FUNDS_LABEL)
    },
    enterInputAmount: async (value: string, primary = true) => {
      const inputSelector = primary ? selectors.PRIMARY_INPUT_VAL : selectors.SECONDARY_INPUT_VAL
      await page.waitForSelector(inputSelector)
      await page.click(inputSelector)
      await page.type(inputSelector, value)
    },
    clickExchangeButton: async () => {
      await page.click(selectors.EXCHANGE_BUTTON)
    },
    clickSwapButton: async () => {
      await page.click(selectors.SWAP_BUTTON)
    },
    selectCurrency: async (optionIndex: number, primary = true) => {
      const selector = primary ? selectors.PRIMARY_CURRENCY : selectors.SECONDARY_CURRENCY
      await page.click(selector)
      const options = await page.$$(selectors.CURRENCY_SELECT_OPTION)
      await options[optionIndex].click()
    },
  }
}
