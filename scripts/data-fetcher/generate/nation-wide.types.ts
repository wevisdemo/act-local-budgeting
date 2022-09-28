import { Area, Plan, Type } from "./types"

export type NationWideBudget = {
  total: number
  groupedByArea: BudgetByArea[]
  groupedByType: BudgetByType[]
  budgetPerCapita: ProviceBudgetPerCapita[]
}


export type BudgetByArea = {
  area: Area
  total: number
  plans: BudgetByPlan[]
}

export type BudgetByPlan = {
  plan: Plan
  total: number
}

export type BudgetByType = {
  type: Type
  total: number
}

export type ProviceBudgetPerCapita = {
  name: string
  amount: number
}