export const formatAmount = (value: number, fractionDigits: number) => {
  return value > 0 ? value.toFixed(fractionDigits) : '' + value
}
