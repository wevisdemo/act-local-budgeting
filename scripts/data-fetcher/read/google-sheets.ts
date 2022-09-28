
import { parseRemote } from './csv'
import { parseEmptyStringToUndefined, parseToNumber } from './parsers'
import { BudgetRow } from './types'

export async function getBudgetRows(csvUrl: string): Promise<BudgetRow[]> {
  let parsed = await parseRemote(csvUrl)
  
  if (parsed.length < 2) {
    throw new Error('BudgetRow: no content to process')
  }

  if (parsed[0].length !== 11) {
    throw new Error('BudgetRow: invalid amount of columns')
  }
  
  parsed.splice(0, 1)
  parsed = parsed.filter(row => parseEmptyStringToUndefined(row[0]))

  return parsed.map(row => ({
    year: parseToNumber(row[0]),
    province: row[1],
    type: row[2] === 'รายรับ' ? 'income' : 'expense',
    incomeType: parseEmptyStringToUndefined(row[3]),
    incomeCategory: parseEmptyStringToUndefined(row[4]),
    expenseArea: parseEmptyStringToUndefined(row[5]),
    expensePlan: parseEmptyStringToUndefined(row[6]),
    expenseType: parseEmptyStringToUndefined(row[7]),
    expenseTask: parseEmptyStringToUndefined(row[8]),
    amount: parseToNumber(row[9]),
  }))
}
