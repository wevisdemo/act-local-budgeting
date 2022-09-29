
import { parseRemote } from './csv'
import { parseEmptyStringToUndefined, parseToNumber } from './parsers'
import { BudgetRow, AssetRow } from './types'

export async function getBudgetRows(csvUrl: string): Promise<BudgetRow[]> {
  let parsed = await parseRemote(csvUrl)
  
  if (parsed.length < 2) {
    throw new Error('BudgetRow: no content to process')
  }

  if (parsed[0].length !== 11) {
    throw new Error('BudgetRow: invalid amount of columns')
  }
  
  // Remove header row
  parsed.splice(0, 1)

  // Remove possible empty rows
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

export async function getAssetRows(csvUrl: string): Promise<AssetRow[]> {
  let parsed = await parseRemote(csvUrl)
  
  if (parsed.length < 3) {
    throw new Error('AssetRow: no content to process')
  }

  if (parsed[0].length !== 21) {
    throw new Error('AssetRow: invalid amount of columns')
  }
  
  // Remove header rows
  parsed.splice(0, 2)

  // Remove possible empty rows
  parsed = parsed.filter(row => parseEmptyStringToUndefined(row[0]))

  return parsed.map(row => {
    return {
      firstName: row[0],
      lastName: row[1],
      title: row[2],
      province: row[3],
      position: row[4],
      inOffice: row[5],
      photoUrl: row[6],
      fillingReason: row[7],
      fillingDate: row[8],
      ownAsset: parseToNumber(row[9]),
      spouseAsset: row[10] === '' ? undefined : parseToNumber(row[10]),
      ownDebt: parseToNumber(row[11]),
      spouseDebt: row[12] === '' ? undefined : parseToNumber(row[12]),
      ownIncome: parseToNumber(row[13]),
      spouseIncome: row[14] === '' ? undefined : parseToNumber(row[14]),
      ownExpense: parseToNumber(row[15]),
      spouseExpense: row[16] === '' ? undefined : parseToNumber(row[16]),
      ownTaxed: parseToNumber(row[17]),
      spouseTaxed: row[18] === '' ? undefined : parseToNumber(row[18]),
      fillingUrl: row[19],
    }
  })
}