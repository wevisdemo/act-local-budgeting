export function parseToNumber(input: string): number {
  return Number(input.split(',').join(''))
}

export function parseEmptyStringToUndefined(input: string): string | undefined {
  if (!input || input === '') {
    return undefined
  }
  return input
}
