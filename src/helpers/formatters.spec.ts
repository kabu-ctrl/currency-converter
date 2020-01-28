import { formatAmount } from './formatters'

describe('Amount formatters', () => {
  it('should format zero', () => {
    expect(formatAmount(0, 2)).toBe('0')
  })

  it('should format whole number without trailing digits', () => {
    expect(formatAmount(10, 2)).toBe('10.00')
  })

  it('should trim decimal trailing numbers to two', () => {
    expect(formatAmount(1.2222223, 2)).toBe('1.22')
  })

  it('should round trailing numbers correctly', () => {
    expect(formatAmount(1.225, 2)).toBe('1.23')
  })
})
