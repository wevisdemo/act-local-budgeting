import { BudgetRow, ByYearLinkRow } from "../../read/types"
import { NationWideBudget, ProviceBudgetPerCapita } from "./nation-wide.types"
import { getUnique, sum } from "../utils"
import { getGroupedByArea, getGroupedByType } from "../group-budget"
import { logc } from "../../log-collector/log-collector"

export type NationWideFileData = { year: number, budget: NationWideBudget }

export function generateNationWide(
  budgets: BudgetRow[],
  byYearLinks: ByYearLinkRow[],
  ): NationWideFileData[] {
    const years = getUnique(budgets.map(row => row.year))
  const expenseRows = budgets.filter(row => row.type === 'expense')
  const incomeRows = budgets.filter(row => row.type === 'income')

  return years.map(year => {
    const yearScopedBudgets = expenseRows.filter(row => row.year === year)
    const yearScopedIncomes = incomeRows.filter(row => row.year === year)
    const yearScopedByYearLinks = byYearLinks.filter(row => row.year === year)
    const budgetPerCapitas = getBudgetPerCapitas(yearScopedIncomes, yearScopedByYearLinks, year)

    return { year, budget: getNationWide(yearScopedBudgets, budgetPerCapitas) }
  })
}

function getBudgetPerCapitas(
  incomes: BudgetRow[],
  yearByYearLinks: ByYearLinkRow[],
  year: number,
  ): ProviceBudgetPerCapita[] {
  const provinces = getUnique(incomes.map(row => row.province))
  const budgetPerCapitas = provinces
    .map(province => {
      const population = yearByYearLinks.find(row => row.province === province)?.population
      logc.warn(`Generate Nation-wide: cannot find population info for ${province} - ${year}, skipping its BudgetPerCapita`, { source: 'ByYearLink' })
      if (population === undefined) {
        return undefined
      }

      const budget = incomes
        .filter(row => row.province === province)
        .map(row => row.amount)
        .reduce(sum, 0)
      return { name: province, amount: budget / population }
    })
  return budgetPerCapitas.filter(e => e !== undefined) as ProviceBudgetPerCapita[]
}

function getNationWide(filteredBudgets: BudgetRow[], budgetPerCapita: ProviceBudgetPerCapita[]): NationWideBudget {
  return {
    total: filteredBudgets
      .reduce((sum, row) => sum + row.amount, 0),
    groupedByArea: getGroupedByArea(filteredBudgets),
    groupedByType: getGroupedByType(filteredBudgets),
    budgetPerCapita,
  }
}
