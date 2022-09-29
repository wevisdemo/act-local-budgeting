export function getUnique<T>(input: T[]): T[] {
  return [...new Set(input)]
}

export function sum(acc: number, amount: number) {
  return acc + amount
} 