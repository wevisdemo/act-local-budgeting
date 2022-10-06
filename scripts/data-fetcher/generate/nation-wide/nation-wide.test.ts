import { BudgetRow, ByYearLinkRow } from "../../read/types";
import { generateNationWide } from "./nation-wide";
import { BudgetByArea } from "../types";
jest.mock('../../log-collector/log-collector', () => {
  return {
    logc: {
      warn: () => {},
    }
  }
})

describe('generate > nation-wide', () => {
  test('Sum total based on year with only expenses', () => {
    const expense2564Row: BudgetRow = {
      ...getExpenseRow(),
      year: 2564,
      amount: 10,
    }

    const income2564Row: BudgetRow = {
      year: 2564,
      province: 'เชียงใหม่',
      type: 'income',
      incomeCategory: 'รายได้จัดเก็บเอง',
      incomeType: 'หมวดภาษีอากร',
      amount: 20,
    }

    const expense2565Row: BudgetRow = {
      ...getExpenseRow(),
      year: 2563,
      amount: 1,
    }

    const nationWideBudgets = generateNationWide([expense2564Row, income2564Row, expense2565Row], [])

    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.total).toBe(10)
    expect(nationWideBudgets.find(b => b.year === 2563)?.budget.total).toBe(1)
  })

  test('Group by area; not use income row', () => {
    const communityEducation: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'การศึกษา',
      expenseType: 'งบบุคลากร',
      expenseTask: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
      amount: 10,
    }

    const income2564Row: BudgetRow = {
      year: 2564,
      province: 'เชียงใหม่',
      type: 'income',
      incomeCategory: 'รายได้จัดเก็บเอง',
      incomeType: 'หมวดภาษีอากร',
      amount: 20,
    }

    const nationWideBudgets = generateNationWide([communityEducation, income2564Row], [])

    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.groupedByArea.length).toBe(1)
    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.groupedByArea).toContainEqual({
      area: "ด้านบริการชุมชนและสังคม",
      total: 10,
      plans: [{
        plan: "การศึกษา",
        total: 10,
      }]
    } as BudgetByArea)
  })

  test('Group by type; not use income row', () => {
    const personnel: BudgetRow = {
      ...getExpenseRow(),
      expenseType: 'งบบุคลากร',
      amount: 10,
    }

    const operation: BudgetRow = {
      ...getExpenseRow(),
      expensePlan: 'การเกษตร',
      expenseType: 'งบบุคลากร',
      amount: 20,
    }

    const incomeRow: BudgetRow = {
      year: 2564,
      province: 'เชียงใหม่',
      type: 'income',
      incomeCategory: 'รายได้จัดเก็บเอง',
      incomeType: 'หมวดภาษีอากร',
      amount: 20,
    }

    const nationWideBudgets = generateNationWide([personnel, operation, incomeRow], [])

    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.groupedByType.length).toBe(1)
    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.groupedByType).toContainEqual(
      { type: 'งบบุคลากร', total: 30 },
    )
  })

  test('Budget per capita; use sum of income divided by population of the province', () => {
    const expense2564Row: BudgetRow = {
      ...getExpenseRow(),
      year: 2564,
      // Intentional to be different from income - to prove that we use incomes per the requirement
      amount: 300,
    }

    const income2564Row: BudgetRow = {
      year: 2564,
      province: 'เชียงใหม่',
      type: 'income',
      incomeCategory: 'รายได้จัดเก็บเอง',
      incomeType: 'หมวดภาษีอากร',
      amount: 200,
    }

    const income2565Row: BudgetRow = {
      ...getExpenseRow(),
      year: 2565,
      province: 'เชียงใหม่',
      type: 'income',
      incomeCategory: 'รายได้จัดเก็บเอง',
      incomeType: 'หมวดภาษีอากร',
      amount: 100,
    }

    const chiangMai2564: ByYearLinkRow = {
      year: 2564,
      province: 'เชียงใหม่',
      url: '',
      population: 100,
    }

    const chiangMai2565: ByYearLinkRow = {
      year: 2565,
      province: 'เชียงใหม่',
      url: '',
      population: 25,
    }

    const nationWideBudgets = generateNationWide(
      [expense2564Row, income2564Row, income2565Row],
      [chiangMai2564, chiangMai2565]
    )

    expect(nationWideBudgets.find(b => b.year === 2564)?.budget.budgetPerCapita).toEqual([
      { name: 'เชียงใหม่', amount: 2 },
    ])
    expect(nationWideBudgets.find(b => b.year === 2565)?.budget.budgetPerCapita).toEqual([
      { name: 'เชียงใหม่', amount: 4 },
    ])
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
