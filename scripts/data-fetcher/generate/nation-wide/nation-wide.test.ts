import { BudgetRow } from "../../read/types";
import { generateNationWide } from "./nation-wide";
import { BudgetByArea } from "../types";

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

    const nationWideBudgets = generateNationWide([expense2564Row, income2564Row, expense2565Row])

    expect(nationWideBudgets['2564'].total).toBe(10)
    expect(nationWideBudgets['2563'].total).toBe(1)
  })

  test('Group by area; not use income row', () => {
    const communityEducation: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'การศึกษา',
      expenseTask: 'งบบุคลากร',
      expenseType: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
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

    const nationWideBudgets = generateNationWide([communityEducation, income2564Row])

    expect(nationWideBudgets['2564'].groupedByArea.length).toBe(1)
    expect(nationWideBudgets['2564'].groupedByArea).toContainEqual({
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

    const nationWideBudgets = generateNationWide([personnel, operation, incomeRow])

    expect(nationWideBudgets['2564'].groupedByType.length).toBe(1)
    expect(nationWideBudgets['2564'].groupedByType).toContainEqual(
      { type: 'งบบุคลากร', total: 30 },
    )
  })
})

function getExpenseRow(): BudgetRow {
  return {
    year: 2564,
    province: 'เชียงใหม่',
    type: 'expense',
    expenseArea: 'ด้านบริการชุมชนและสังคม',
    expensePlan: 'การศึกษา',
    expenseTask: 'งบบุคลากร',
    expenseType: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
    amount: 10,
  }
}