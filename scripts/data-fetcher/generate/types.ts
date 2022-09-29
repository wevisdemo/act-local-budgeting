export type Area = string
export type Plan = string
export type Type = string

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