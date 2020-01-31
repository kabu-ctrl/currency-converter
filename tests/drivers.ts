export function pageDriver(page: any) {

  const waitAndEvalElement = async (selector : string) => {
    await page.waitForSelector(selector)
    return page.$eval(selector, ({value, innerHTML, disabled, placeHolder}: any) =>
      ({ value, innerHTML, disabled, placeHolder }))
  }

  const waitAndEvalInnerHtml = async (selector : string) => {
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
      label: innerHTML
    }
  }

  return {
    getHeader: async () => {
      return waitAndEvalInnerHtml('[data-testid="header"]')
    },
    getPrimaryCurrency: async () => {
      return waitAndEvalInnerHtml('[data-testid="primary-selector"] div')
    },
    getPrimaryBalance: async () => {
      return waitAndEvalInnerHtml('[data-testid="primary-balance"]')
    },
    getSecondaryCurrency: async () => {
      return waitAndEvalInnerHtml('[data-testid="secondary-selector"] div')
    },
    getSecondaryBalance: async () => {
      return waitAndEvalInnerHtml('[data-testid="secondary-balance"]')
    },
    getPrimaryInput: async () => {
      return getVisibleField('[data-testid="primary-input"]')
    },
    getSecondaryInput: async () => {
      return getVisibleField('[data-testid="secondary-input"]')
    },
    getSecondaryInputValue: async () => {
      const {value} = await waitAndEvalElement('[data-testid="secondary-input"] input')
      return value
    },
    getExchangeButton: async () => {
      return getButton('[data-testid="exchange-button"]')
    },
    getSwapButton: async () => {
      return getButton('[data-testid="swap-button"]')
    },
    getRatePanel: async () => {
      return getVisibleField('[data-testid="rate-panel"]')
    },
    getInsufficientFundsLabel: async () => {
      const elem = await page.$$('[data-testid="insufficient-funds"]')
      return elem && elem.length > 0 && waitAndEvalInnerHtml('[data-testid="insufficient-funds"]')
    },
    enterInputAmount: async (primary: boolean, value: string) => {
      const inputSelector = `[data-testid="${primary ? 'primary' : 'secondary'}-input"] input`
      await page.waitForSelector(inputSelector)
      await page.click(inputSelector)
      await page.type(inputSelector, value)
    },
  }
}
