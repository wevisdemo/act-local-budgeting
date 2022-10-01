
import { parseRemote } from './csv'
import { parseEmptyStringToUndefined, parseToNumber } from './parsers'
import { BudgetRow, AssetRow, ActAiLinkRow, ByYearLinkRow } from './types'

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
      spouseAsset: parseEmptyStringToUndefined(row[10]) ? parseToNumber(row[10]) : undefined,
      ownDebt: parseToNumber(row[11]),
      spouseDebt: parseEmptyStringToUndefined(row[12]) ? parseToNumber(row[12]) : undefined,
      ownIncome: parseToNumber(row[13]),
      spouseIncome: parseEmptyStringToUndefined(row[14]) ? parseToNumber(row[14]) : undefined,
      ownExpense: parseToNumber(row[15]),
      spouseExpense: parseEmptyStringToUndefined(row[16]) ? parseToNumber(row[16]) : undefined,
      ownTaxed: parseToNumber(row[17]),
      spouseTaxed: parseEmptyStringToUndefined(row[18]) ? parseToNumber(row[18]) : undefined,
      fillingUrl: row[19],
    }
  })
}

export async function getActAiLinkRows(csvUrl: string): Promise<ActAiLinkRow[]> {
  let parsed = await parseRemote(csvUrl)

  if (parsed.length < 2) {
    throw new Error('ActAiLinkRow: no content to process')
  }

  if (parsed[0].length !== 2) {
    throw new Error('ActAiLinkRow: invalid amount of columns')
  }

  // Remove header row
  parsed.splice(0, 1)

  // Remove possible empty rows
  parsed = parsed.filter(row => parseEmptyStringToUndefined(row[0]))

  return parsed.map(row => ({
    province: row[0],
    url: row[1],
  }))
}

export async function getByYearLinkRows(csvUrl: string): Promise<ByYearLinkRow[]> {
  let parsed = await parseRemote(csvUrl)

  if (parsed.length < 2) {
    throw new Error('ByYearLinkRow: no content to process')
  }

  if (parsed[0].length !== 6) {
    throw new Error('ByYearLinkRow: invalid amount of columns')
  }

  // Remove header row
  parsed.splice(0, 1)

  // Remove possible empty rows
  parsed = parsed.filter(row => parseEmptyStringToUndefined(row[0]))

  return parsed.map(row => ({
    year: parseToNumber(row[0]),
    province: row[1],
    url: row[2],
    population: parseToNumber(row[3]),
  }))
}
