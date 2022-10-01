import { KeywordRow } from "../../read/types";
import { KeywordMap, Lookup } from "./types";

export function generateKeywords(keywordRows: KeywordRow[]): KeywordMap {
  const map: KeywordMap = {}

  for (const row of keywordRows) {
    const lookup = {
      plan: row.plan,
      type: row.type,
      task: row.task,
    }

    for (const keyword of row.keywords) {
      const existing = map[keyword]
      if (existing) {
        existing.push(lookup)
      } else {
        map[keyword] = [lookup]
      }
    }
  }

  return map
}
