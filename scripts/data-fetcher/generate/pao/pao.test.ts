import { BudgetRow } from "../../read/types"
import { BudgetByArea } from "../types"
import { generatePaoBudgets } from "./pao"
import { BudgetByTask } from "./pao.types"

describe('generate > pao', () => {
  test('Get all PAO budgets for years by provinces', () => {
    const chiangMai2564 = getExpenseRow()
    const chiangMai2563 = { ...getExpenseRow(), year: 2563 }
    const saraburi2564 = { ...getExpenseRow(), province: 'สระบุรี' }
    
    const paos = generatePaoBudgets([
      chiangMai2564,
      chiangMai2563,
      saraburi2564,
    ], [])

    expect(paos).toContainEqual(
      { year: 2564, province: 'เชียงใหม่', budget: expect.anything() },
    )
    // Seperate province correctly
    expect(paos).toContainEqual(
      { year: 2564, province: 'สระบุรี', budget: expect.anything() },
    )
    // Seperate years with same province correctly
    expect(paos).toContainEqual(
      { year: 2563, province: 'เชียงใหม่', budget: expect.anything() },
    )
  })

  test('Calculate total for each province correctly', () => {
    const chiangMai2564_1 = getExpenseRow()
    const chiangMai2564_2 = {
      ...getExpenseRow(),
      amount: 20,
    }
    const chiangMai2563 = {
      ...getExpenseRow(),
      year: 2563,
      amount: 15,
    }
    
    const paos = generatePaoBudgets([
      chiangMai2564_1,
      chiangMai2564_2,
      chiangMai2563,
    ], [])

    expect(paos.find(e => e.year === 2564)?.budget.total).toBe(30)
    expect(paos.find(e => e.year === 2563)?.budget.total).toBe(15)
  })

  test('Group budget by area using only year given', () => {
    const chiangMai2564_1 = getExpenseRow()
    const chiangMai2564_2 = {
      ...getExpenseRow(),
      amount: 20,
    }
    const chiangMai2563 = {
      ...getExpenseRow(),
      year: 2563,
      amount: 15,
    }

    const paos = generatePaoBudgets([
      chiangMai2564_1,
      chiangMai2564_2,
      chiangMai2563,
    ], [])
    
    expect(
      paos.find(e => e.year === 2564)?.budget.groupedByArea[0]
    ).toEqual({
      area: 'ด้านบริการชุมชนและสังคม',
      total: 30,
      plans: [{
        plan: "การศึกษา",
        total: 30,
      }]
    } as BudgetByArea)

    expect(
      paos.find(e => e.year === 2563)?.budget.groupedByArea[0]
    ).toEqual({
      area: 'ด้านบริการชุมชนและสังคม',
      total: 15,
      plans: [{
        plan: "การศึกษา",
        total: 15,
      }]
    } as BudgetByArea)
  })

  test('Group budget by type using only year given', () => {
    const chiangMai2564_1 = getExpenseRow()
    const chiangMai2564_2 = {
      ...getExpenseRow(),
      amount: 20,
    }
    const chiangMai2563 = {
      ...getExpenseRow(),
      year: 2563,
      amount: 15,
    }

    const paos = generatePaoBudgets([
      chiangMai2564_1,
      chiangMai2564_2,
      chiangMai2563,
    ], [])
    
    expect(
      paos.find(e => e.year === 2564)?.budget.groupedByType[0]
    ).toEqual({ type: 'งบบุคลากร', total: 30 } as BudgetByTask)

    expect(
      paos.find(e => e.year === 2563)?.budget.groupedByType[0]
    ).toEqual({ type: 'งบบุคลากร', total: 15 } as BudgetByTask)
  })

  test('Map tasks', () => {
    const educationGeneralAdministration = getExpenseRow()
    const preSchoolAndPrimarySchool = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'การศึกษา',
      expenseType: 'งบบุคลากร',
      expenseTask: 'ระดับก่อนวัยเรียนและประถมศึกษา',
      amount: 20,
    }

    const paos = generatePaoBudgets([
      educationGeneralAdministration,
      preSchoolAndPrimarySchool,
    ], [])

    const targetedPao = paos.find(e => e.year === 2564)?.budget
    
    expect(targetedPao).not.toBeUndefined()
    expect(targetedPao?.tasks).toContainEqual({
      task: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
      area: 'ด้านบริการชุมชนและสังคม',
      plan: 'การศึกษา',
      type: 'งบบุคลากร',
      total: 10,
    } as BudgetByTask)
    expect(targetedPao?.tasks).toContainEqual({
      task: 'ระดับก่อนวัยเรียนและประถมศึกษา',
      area: 'ด้านบริการชุมชนและสังคม',
      plan: 'การศึกษา',
      type: 'งบบุคลากร',
      total: 20,
    } as BudgetByTask)
  })
})

function getExpenseRow(): BudgetRow {
  return {
    year: 2564,
    province: 'เชียงใหม่',
    type: 'expense',
    expenseArea: 'ด้านบริการชุมชนและสังคม',
    expensePlan: 'การศึกษา',
    expenseType: 'งบบุคลากร',
    expenseTask: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
    amount: 10,
  }
}