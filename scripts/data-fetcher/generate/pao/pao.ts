import { AssetRow, BudgetRow } from "../../read/types";
import { getGroupedByArea, getGroupedByType } from "../group-budget";
import { getUnique, sum } from "../utils";
import { BudgetByTask, PaoBudget } from "./pao.types";

type PaoBudgetFileData = {year: number, province: string, budget: PaoBudget}

export function generatePaoBudgets(
  budgetRows: BudgetRow[],
  assetRows: AssetRow[],
): PaoBudgetFileData[] {
  const allYears = getUnique(budgetRows.map(row => row.year))
  const allProvinces = getUnique(budgetRows.map(row => row.province))

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
        executives: [],
      }))
    }
  }

  return result
}

function getPaoBudgetFileData({
  year,
  province,
  expenseRows
}: {
  year: number,
  province: string,
  expenseRows: BudgetRow[]
  incomeRows: BudgetRow[]
  executives: AssetRow[]
}): PaoBudgetFileData {
  return {
    year,
    province,
    budget: {
    total: expenseRows.map(row => row.amount).reduce(sum, 0),
    groupedByArea: getGroupedByArea(expenseRows),
    groupedByType: getGroupedByType(expenseRows),
    tasks: expenseRows.map(mapTask)
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