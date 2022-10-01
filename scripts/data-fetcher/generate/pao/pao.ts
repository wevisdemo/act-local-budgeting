import { AssetRow, BudgetRow } from "../../read/types";
import { getGroupedByArea, getGroupedByType } from "../group-budget";
import { getUnique, sum } from "../utils";
import { BudgetByTask, ChiefExecutive, PaoBudget } from "./pao.types";

type PaoBudgetFileData = {year: number, province: string, budget: PaoBudget}

export function generatePaoBudgets(
  budgetRows: BudgetRow[],
  assetRows: AssetRow[],
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

      result.push(getPaoBudgetFileData({
        year,
        province,
        expenseRows,
        incomeRows,
        chiefExecutives: chiefExecutiveDirectory.get(
          chiefExecutiveDirectoryKey(province, year)
        ) ?? [],
      }))
    }
  }

  return result
}

function getPaoBudgetFileData({
  year,
  province,
  expenseRows,
  chiefExecutives,
}: {
  year: number,
  province: string,
  expenseRows: BudgetRow[]
  incomeRows: BudgetRow[]
  chiefExecutives: ChiefExecutive[]
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
      chiefExecutives,
    }
  } as PaoBudget }
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

function chiefExecutiveDirectoryKey(province: string, year: number) {
  return `${province}-${year}`
}

function generateChiefExecutiveDirectory(assetRows: AssetRow[]): Map<string, ChiefExecutive[]>{
  const result = new Map<string, ChiefExecutive[]>()

  for (const row of assetRows) {
    const years = getInOfficeYears(row)
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

function getInOfficeYears(assetRow: AssetRow): number[] {
  const { inOffice } = assetRow
  const [ startDate, endDate ] = inOffice.split('-').map(splited => splited.trim())

  const startYear = (startDate ?? '').split('/').at(2)
  let endYear = (endDate ?? '').split('/').at(2)

  if (startYear === undefined) {
    throw new Error(`Generate PAO: start year not found for entry: ${JSON.stringify(assetRow)}`)
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
    spouseAccount: row.spouseAsset ? {
      asset: row.spouseAsset ?? 0,
      debt: row.spouseDebt ?? 0,
      income: row.spouseIncome ?? 0,
      expense: row.spouseExpense ?? 0,
      taxed: row.spouseTaxed ?? 0,
    } : undefined,
    fillingUrl: row.fillingUrl,
  }
}
