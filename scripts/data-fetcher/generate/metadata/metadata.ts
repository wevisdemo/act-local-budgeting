import { PaoBudgetFileData } from "../pao/pao";
import { getUnique } from "../utils";
import { Metadata } from "./types";

export function generateMetadata(paos: PaoBudgetFileData[]): Metadata {
  const years = getUnique(paos.map(file => file.year))
  const provinces = getUnique(paos.map(file => file.province))
  const updatedAt = (new Date()).toISOString().split('T')[0]

  return {
    years,
    provinces,
    updatedAt,
  }
}
