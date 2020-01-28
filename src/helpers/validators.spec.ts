import { isInputValid } from './validators'

describe('Input validators', () => {
  describe('Valid inputs', () => {
    it('should validate 0', () => {
      expect(isInputValid('0')).toBeTruthy()
    })

    it('should validate 0.00', () => {
      expect(isInputValid('0.00')).toBeTruthy()
    })

    it('should validate 3.00', () => {
      expect(isInputValid('3.00')).toBeTruthy()
    })
  })

  describe('Invalid inputs', () => {
    it('should return false for 0.001', () => {
      expect(isInputValid('0.001')).toBeFalsy()
    })

    it('should return false for non-numeric input', () => {
      expect(isInputValid('word')).toBeFalsy()
    })

    it('should return false for 0.000d', () => {
      expect(isInputValid('0.000d')).toBeFalsy()
    })

    it('should return false when incomplete decimal 0.', () => {
      expect(isInputValid('0.')).toBeFalsy()
    })
  })
})
