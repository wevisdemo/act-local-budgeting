import { BudgetRow } from "../../read/types"
import { NationWideBudget } from "./nation-wide.types"
import { getUnique } from "../utils"
import { getGroupedByArea, getGroupedByType } from "../group-budget"

export function generateNationWide(budgets: BudgetRow[]): { year: number, budget: NationWideBudget }[] {
  const expenseRows = budgets.filter(row => row.type === 'expense')
  const years = getUnique(expenseRows.map(row => row.year))

  return years.map(year => {
    const filteredBudgets = expenseRows.filter(row => row.year === Number(year))
    return { year, budget: getNationWide(filteredBudgets) }
  })
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
