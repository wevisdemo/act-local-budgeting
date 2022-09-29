import { BudgetRow } from "../../read/types"
import { NationWideBudget } from "./nation-wide.types"
import { getUnique } from "../utils"
import { getGroupedByArea, getGroupedByType } from "../group-budget"

export function generateNationWide(budgets: BudgetRow[]): { [year: string]: NationWideBudget } {
  const expenseRows = budgets.filter(row => row.type === 'expense')
  const years = getUnique(expenseRows.map(row => row.year))

  return years.reduce((result, year) => {
    const filteredBudgets = expenseRows.filter(row => row.year === Number(year))
    result[year] = getNationWide(filteredBudgets)
    return result
  }, {} as { [year: string]: NationWideBudget })
}

function getNationWide(filteredBudgets: BudgetRow[]): NationWideBudget {
  return {
    total: filteredBudgets
      .reduce((sum, row) => sum + row.amount, 0),
    groupedByArea: getGroupedByArea(filteredBudgets),
    groupedByType: getGroupedByType(filteredBudgets),
    budgetPerCapita: [],
  }
}
