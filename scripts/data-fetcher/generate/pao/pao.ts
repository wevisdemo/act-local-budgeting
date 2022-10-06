import { logc } from "../../log-collector/log-collector";
import { ActAiLinkRow, AssetRow, BudgetRow, ByYearLinkRow } from "../../read/types";
import { getGroupedByArea, getGroupedByType } from "../group-budget";
import { getUnique, sum } from "../utils";
import { BudgetByTask, ChiefExecutive, IncomeByType, PaoBudget } from "./pao.types";

export type PaoBudgetFileData = { year: number, province: string, budget: PaoBudget }

export function generatePaoBudgets(
  budgetRows: BudgetRow[],
  assetRows: AssetRow[],
  actAiLinkRows: ActAiLinkRow[],
  byYearkLinkRows: ByYearLinkRow[],
): PaoBudgetFileData[] {
  const allYears = getUnique(budgetRows.map(row => row.year))
  const allProvinces = getUnique(budgetRows.map(row => row.province))
  const chiefExecutiveDirectory = generateChiefExecutiveDirectory(assetRows)

  const result: PaoBudgetFileData[] = []
  for (const year of allYears) {
    for (const province of allProvinces) {
      const targetedBudgetRows = budgetRows
        .filter(row => row.year === year && row.province === province)
      const expenseRows = targetedBudgetRows
        .filter(row => row.type === 'expense')
      const incomeRows = targetedBudgetRows
        .filter(row => row.type === 'income')

      const actAiLinkRow = actAiLinkRows
        .find(row => row.province === province)
      if (actAiLinkRow === undefined) {
        logc.warn(`Generate PAO: cannot find ACT AI link for ${province}`, {
          source: `ActAiLink`,
        })
      }

      const byYearkLinkRow = byYearkLinkRows
        .find(row => row.year === year && row.province === province)
      if (byYearkLinkRow === undefined) {
        logc.warn(`Generate PAO: cannot find ByYear link for ${province}, ${year}`, {
          source: `ByYearLink`,
        })
      }

      result.push(getPaoBudgetFileData({
        year,
        province,
        expenseRows,
        incomeRows,
        chiefExecutives: chiefExecutiveDirectory.get(
          chiefExecutiveDirectoryKey(province, year)
        ) ?? [],
        actAiUrl: actAiLinkRow?.url ?? '',
        budgetingDocUrl: byYearkLinkRow?.url ?? '',
        population: byYearkLinkRow?.population ?? NaN,
      }))
    }
  }

  return result
}

function getPaoBudgetFileData({
  year,
  province,
  expenseRows,
  incomeRows,
  chiefExecutives,
  actAiUrl,
  budgetingDocUrl,
  population,
}: {
  year: number
  province: string
  expenseRows: BudgetRow[]
  incomeRows: BudgetRow[]
  chiefExecutives: ChiefExecutive[]
  actAiUrl: string
  budgetingDocUrl: string
  population: number
}): PaoBudgetFileData {
  return {
    year,
    province,
    budget: {
    total: expenseRows.map(row => row.amount).reduce(sum, 0),
    groupedByArea: getGroupedByArea(expenseRows),
    groupedByType: getGroupedByType(expenseRows),
    tasks: expenseRows.map(mapTask),
    pao: {
      name: province,
      incomes: getIncomeByType(incomeRows),
      population,
      chiefExecutives,
      budgetingDocUrl,
      actAiUrl,
    }
  }}
}

function mapTask(row: BudgetRow): BudgetByTask {
  return {
    task: row.expenseTask!,
    area: row.expenseArea!,
    plan: row.expensePlan!,
    type: row.expenseType!,
    total: row.amount,
  }
}

function getIncomeByType(incomeRows: BudgetRow[]): IncomeByType[] {
  const result: IncomeByType[] = []
  const types = getUnique(incomeRows.map(row => row.incomeType!))
  for (const type of types) {
    const rowsOfType = incomeRows.filter(row => row.incomeType === type)
    const categories = getUnique(rowsOfType.map(row => row.incomeCategory!))

    result.push({
      type,
      total: rowsOfType.map(row => row.amount).reduce(sum, 0),
      categories: categories.map(cat => {
        return {
          category: cat,
          total: rowsOfType.find(row => row.incomeType === type && row.incomeCategory === cat)?.amount ?? 0
        }
      })
    })
  }

  return result
}

function chiefExecutiveDirectoryKey(province: string, year: number) {
  return `${province}-${year}`
}

function generateChiefExecutiveDirectory(assetRows: AssetRow[]): Map<string, ChiefExecutive[]>{
  const result = new Map<string, ChiefExecutive[]>()

  for (const i in assetRows) {
    const row = assetRows[i]
    const years = getInOfficeYears(row, i)
    const chiefExecutive = mapChiefExecutive(row)

    for (const year of years) {
      const key = `${row.province}-${year}`
      const existing = result.get(key)

      if (existing) {
        existing.push(chiefExecutive)
      } else {
        result.set(key, [chiefExecutive])
      }
    }
  }

  return result
}

function getInOfficeYears(assetRow: AssetRow, line: string): number[] {
  const { inOffice } = assetRow
  const [ startDate, endDate ] = inOffice.split('-').map(splited => splited.trim())

  const startYear = (startDate ?? '').split('/').at(2)
  let endYear = (endDate ?? '').split('/').at(2)

  if (startYear === undefined) {
    logc.warn(
      `Generate PAO: start year not found for entry: ${JSON.stringify(assetRow)}`,
      {
        source: 'Asset',
        line,
      }
    )
    return []
  }

  if (endYear === undefined) {
    endYear = `${(new Date().getFullYear()) + 543}`
  }


  const result: number[] = []
  for (let i = Number(startYear); i <= Number(endYear); i++) {
    result.push(i)
  }

  return result
}

function mapChiefExecutive(row: AssetRow): ChiefExecutive {
  return {
    name: `${row.title} ${row.firstName} ${row.lastName}`,
    inOffice: row.inOffice,
    photoUrl: row.photoUrl,
    ownAccount: {
      asset: row.ownAsset,
      debt: row.ownDebt,
      income: row.ownIncome,
      expense: row.ownExpense,
      taxed: row.ownTaxed,
    },
    spouseAccount: row.spouseAsset !== undefined ? {
      asset: row.spouseAsset ?? 0,
      debt: row.spouseDebt ?? 0,
      income: row.spouseIncome ?? 0,
      expense: row.spouseExpense ?? 0,
      taxed: row.spouseTaxed ?? 0,
    } : undefined,
    fillingUrl: row.fillingUrl,
  }
}
