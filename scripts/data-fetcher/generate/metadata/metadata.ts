import { PaoBudgetFileData } from "../pao/pao";
import { getUnique } from "../utils";
import { Metadata } from "./types";

export function generateMetadata(paos: PaoBudgetFileData[]): Metadata {
  const years = getUnique(paos.map(file => file.year))
  const provinces = getUnique(paos.map(file => file.province))
  const updatedAt = (new Date()).toISOString().split('T')[0]
  const provincesByYears = generateProvincesByYears(paos, years, provinces)

  return {
    years,
    provinces,
    updatedAt,
    provincesByYears,
  }
}

function generateProvincesByYears(paos: PaoBudgetFileData[], years: number[], provinces: string[]): {[year: string]: string[]} {
  const result: { [year: string]: string[] } = {}
  for (const year of years) {
    result[String(year)] = []
    for (const province of provinces) {
      if (paos.some(pao => pao.year === year && pao.province == province)) {
        result[String(year)].push(province)
      }
    }
  }

  return result
}