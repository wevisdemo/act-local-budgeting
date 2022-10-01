// These type aliases are in case we want to change them to a more concreted types
export type Area = string
export type Plan = string
export type Type = string

// Shared types by PAOs and Nation-wide
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
