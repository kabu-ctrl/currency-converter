import { Currency } from '../types/typings'

export const toCurrencyOption = ({ code, title }: Currency) => ({
  key: code, value: code, text: title
})
