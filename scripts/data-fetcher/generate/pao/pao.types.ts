import { Area, BudgetByArea, BudgetByType, Plan, Type } from "../types"

export type PaoBudget = {
  total: number
  groupedByArea: BudgetByArea[]
  groupedByType: BudgetByType[]
  tasks: BudgetByTask[]
  pao: PAO
}

export type IncomeType = string
export type IncomeCategory = string

export type BudgetByTask = {
  task: string
  area: Area
  plan: Plan
  type: Type
  total: number
}

export type PAO = {
  name: string
  incomes: IncomeByType[]
  population: number
  budgetingDocUrl: string
  ActAiUrl: string
  chiefExecutives: ChiefExecutive[]
}

export type IncomeByType = {
  type: IncomeType
  total: number
  categories: IncomeByCategory[]
}

export type IncomeByCategory = {
  category: IncomeCategory
  total: number
}

export type ChiefExecutive = {
  name: string
  inOffice: string
  photoUrl: string
  ownAccount: Account
  spouseAccount?: Account
  fillingUrl: string
}

export type Account = {
  asset: number
  debt: number
  income: number
  expense: number
  taxed: number
}
