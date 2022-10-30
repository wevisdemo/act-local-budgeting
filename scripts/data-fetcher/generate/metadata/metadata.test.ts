import { PaoBudgetFileData } from "../pao/pao"
import { generateMetadata } from "./metadata"

describe('generate > metadata', () => {
  test('Map provinces by years based on given PAOs', () => {
    const chiangMai2564 = getPaoBudgetFileData()
    const chiangMai2563 = { ...getPaoBudgetFileData(), year: 2563 }
    const saraburi2564 = { ...getPaoBudgetFileData(), province: 'สระบุรี' }


    const metadata = generateMetadata([
      chiangMai2564,
      chiangMai2563,
      saraburi2564,
    ])
    
    expect(metadata.years).toContain(2563)
    expect(metadata.years).toContain(2564)
    expect(metadata.provinces).toContain('เชียงใหม่')
    expect(metadata.provinces).toContain('สระบุรี')
    expect(metadata.provincesByYears).toEqual({
      '2563': expect.arrayContaining(['เชียงใหม่']),
      '2564': expect.arrayContaining(['เชียงใหม่', 'สระบุรี']),
    })
  })
})

function getPaoBudgetFileData(): PaoBudgetFileData {
  return {
    year: 2564,
    province: 'เชียงใหม่',
    budget: {
      total: 0,
      groupedByArea: [],
      groupedByType: [],
      tasks: [],
      pao: {
        name: '',
        incomes: [],
        population: 0,
        budgetingDocUrl: '',
        actAiUrl: '',
        chiefExecutives: [],
      }
    }
  }
}