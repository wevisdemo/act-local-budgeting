import { BudgetRow } from "../read/types"
import { Area, BudgetByArea, BudgetByType, Plan } from "./types"
import { getUnique, sum } from "./utils"

export type AreaStructure = { area: Area, plans: Plan[] }

export function getGroupedByArea(filteredBudgets: BudgetRow[]): BudgetByArea[] {
  return getAreaWithPlanStructure(filteredBudgets)
      .map(structure => getBudgetByAreaFromStructure(structure, filteredBudgets))
}

export function getAreaWithPlanStructure(expenseRows: BudgetRow[]): AreaStructure[] {
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

export function getBudgetByAreaFromStructure(structure: AreaStructure, expenseRows: BudgetRow[]): BudgetByArea {
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

export function getGroupedByType(filteredBudgets: BudgetRow[]): BudgetByType[] {
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