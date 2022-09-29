import { Area, BudgetByArea, BudgetByType, Plan, Type } from "../types"

export type NationWideBudget = {
  total: number
  groupedByArea: BudgetByArea[]
  groupedByType: BudgetByType[]
  budgetPerCapita: ProviceBudgetPerCapita[]
}

export type ProviceBudgetPerCapita = {
  name: string
  amount: number
}