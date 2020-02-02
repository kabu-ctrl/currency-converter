import puppeteer from 'puppeteer'
import { pageDriver } from './drivers'

describe('Calculator', () => {
  let browser: any, page: any, drv: any

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    })
    page = await browser.newPage()

    page.emulate({
      viewport: {
        width: 800,
        height: 600,
      },
      userAgent: '',
    })

    drv = pageDriver(page)
  })

  beforeEach(async () => {
    await page.goto('http://localhost:3000/')
  })

  afterAll(() => {
    browser.close()
  })

  describe('Initially', () => {
    it('should have header text rendered', async () => {
      expect(await drv.getHeader()).toBe('Currency Exchange')
    })

    it('should have rate panel rendered', async () => {
      expect(await drv.getRatePanel()).toBeTruthy()
    })

    it('should have swap button rendered', async () => {
      expect(await drv.getSwapButton()).toBeTruthy()
    })

    it('should have a disabled button rendered', async () => {
      const button = await drv.getExchangeButton()
      expect(button.label).toBe('Exchange')
      expect(button.disabled).toBeTruthy()
    })

    describe('Currency selectors', () => {
      it('should have Euro selected as primary currency', async () => {
        expect(await drv.getPrimaryCurrency()).toBe('Euro')
      })

      it('should have EUR balance rendered', async () => {
        expect(await drv.getPrimaryBalance()).toBe('Balance: €100.01')
      })

      it('should have US Dollar selected as secondary currency', async () => {
        expect(await drv.getSecondaryCurrency()).toBe('US Dollar')
      })

      it('should have USD balance rendered', async () => {
        expect(await drv.getSecondaryBalance()).toBe('Balance: $29.88')
      })
    })

    describe('Amount input fields', () => {
      it('should have primary amount rendered', async () => {
        expect(await drv.getPrimaryInput()).toBeTruthy()
      })

      it('should have secondary amount rendered', async () => {
        expect(await drv.getSecondaryInput()).toBeTruthy()
      })

      it('should not render insufficient funds label', async () => {
        expect(await drv.getInsufficientFundsLabel()).toBeFalsy()
      })
    })
  })

  describe('Currency exchange flow', () => {
    it('should be empty secondary amount input before calculation', async () => {
      expect(await drv.getSecondaryInputValue()).toBe('')
    })

    it('should calculate exchanged amount after entering primary amount', async () => {
      await drv.enterInputAmount('50')
      expect(await drv.getSecondaryInputValue()).not.toBe('')
    })

    it('should enable exchange button if correct exchange amount is entered', async () => {
      await drv.enterInputAmount('50')
      const button = await drv.getExchangeButton()
      expect(button.disabled).toBeFalsy()
    })

    it('should make conversion and reset input fields, when exchange button clicked', async () => {
      await drv.enterInputAmount('50')
      await drv.clickExchangeButton()

      expect(await drv.getPrimaryInputValue()).toBe('')
      expect(await drv.getSecondaryInputValue()).toBe('')

      const button = await drv.getExchangeButton()
      expect(button.disabled).toBeTruthy()
    })

    it('should disable button and show insufficient funds, when trying to exchange too big amount', async () => {
      await drv.enterInputAmount('10000')
      const button = await drv.getExchangeButton()

      expect(button.disabled).toBeTruthy()
      expect(await drv.getInsufficientFundsLabel()).toBe('Insufficient funds')
    })
  })

  describe('Currency swap flow', () => {
    it('should swap currencies and balances when clicking buttons', async () => {
      const primaryBalance = await drv.getPrimaryBalance()
      const secondaryBalance = await drv.getSecondaryBalance()
      const primaryCurrency = await drv.getPrimaryCurrency()
      const secondaryCurrency = await drv.getSecondaryCurrency()

      await drv.clickSwapButton()

      expect(await drv.getPrimaryBalance()).toBe(secondaryBalance)
      expect(await drv.getSecondaryBalance()).toBe(primaryBalance)
      expect(await drv.getPrimaryCurrency()).toBe(secondaryCurrency)
      expect(await drv.getSecondaryCurrency()).toBe(primaryCurrency)
    })

    it('should swap currencies and balances when selecting primary currency same as the secondary', async () => {
      const SECOND_OPTION_IDX = 1
      const primaryCurrency = await drv.getPrimaryCurrency()
      const secondaryCurrency = await drv.getSecondaryCurrency()

      await drv.selectCurrency(SECOND_OPTION_IDX)

      expect(await drv.getPrimaryCurrency()).toBe(secondaryCurrency)
      expect(await drv.getSecondaryCurrency()).toBe(primaryCurrency)
    })

    it('should swap input values when swapping currencies', async () => {
      await drv.enterInputAmount('50')
      const secondaryAmount = await drv.getSecondaryInputValue()

      await drv.clickSwapButton()

      expect(await drv.getSecondaryInputValue()).toBe('50')
      expect(await drv.getPrimaryInputValue()).toBe(secondaryAmount)
    })
  })
})
