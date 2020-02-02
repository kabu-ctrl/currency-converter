const AmountRegex = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/i)

export const isInputValid = (value: string): boolean => {
  return AmountRegex.test(value)
}
