const AmountRegex = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/i)

export const isInputValid = (value: string) => {
  return AmountRegex.test(value)
}
