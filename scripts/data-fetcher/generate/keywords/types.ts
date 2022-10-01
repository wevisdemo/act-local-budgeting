import { Plan, Type } from "../types"

export type KeywordMap = { [keyword: string] : Lookup[] }

export type Lookup = {
  plan: Plan
  type: Type
  task: string
}
