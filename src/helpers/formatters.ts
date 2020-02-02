export const formatAmount = (value: number, fractionDigits: number): string => {
  return value > 0 ? value.toFixed(fractionDigits) : '' + value
}
