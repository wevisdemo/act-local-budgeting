import { BudgetRow } from "../../read/types"
import { NationWideBudget } from "./nation-wide.types"
import { BudgetByArea, BudgetByType } from "../types"
import { Area, Plan } from "../types"

type AreaStructure = { area: Area, plans: Plan[] }

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

function getGroupedByArea(filteredBudgets: BudgetRow[]): BudgetByArea[] {
  return getAreaWithPlanStructure(filteredBudgets)
      .map(structure => getBudgetByAreaFromStructure(structure, filteredBudgets))
}

function getAreaWithPlanStructure(expenseRows: BudgetRow[]): AreaStructure[] {
  const areas = getUnique(expenseRows.map(row => row.expenseArea!))
  return areas.map(area => {
    return {
      area,
      plans: getUnique(
        expenseRows
          .filter(row => row.expenseArea === area)
          .map(row => row.expensePlan!),
        ),
    }
  })
}

function getBudgetByAreaFromStructure(structure: AreaStructure, expenseRows: BudgetRow[]): BudgetByArea {
  const plans = structure.plans.map(plan => ({
    plan,
    total: expenseRows
      .filter(row => row.expensePlan === plan)
      .map(row => row.amount)
      .reduce(sum, 0)
  }))

  return {
    area: structure.area,
    total: plans.map(p => p.total).reduce(sum, 0),
    plans,
  }
}

function getGroupedByType(filteredBudgets: BudgetRow[]): BudgetByType[] {
  return getUnique(filteredBudgets.map(row => row.expenseType!))
      .map(expenseType => ({
        type: expenseType,
        total: filteredBudgets
          .filter(row => row.expenseType === expenseType)
          .map(row => row.amount)
          .reduce(sum, 0)
      })
    )
}

function getUnique<T>(input: T[]): T[] {
  return [...new Set(input)]
}

function sum(acc: number, amount: number) {
  return acc + amount
} 