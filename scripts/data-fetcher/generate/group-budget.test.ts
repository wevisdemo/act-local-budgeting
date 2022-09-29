import { BudgetRow } from "../read/types"
import { getGroupedByArea, getGroupedByType } from "./group-budget"
import { BudgetByArea } from "./types"

describe('generate > group-budget', () => {
  test('Group by area', () => {
    const communityEducation: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'การศึกษา',
      expenseTask: 'งบบุคลากร',
      expenseType: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
      amount: 10,
    }

    const communityHealth: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'สาธารณสุข',
      expenseTask: 'งบบุคลากร',
      expenseType: 'บริการสาธารณสุขและงานสาธารณสุขอื่น',
      amount: 20,
    }

    const economicArgiculture: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านการเศรษฐกิจ',
      expensePlan: 'การเกษตร',
      expenseTask: 'งบบุคลากร',
      expenseType: 'สิ่งแวดล้อมและทรัพยากรธรรมชาติ',
      amount: 50,
    }

    const groupedByAreas = getGroupedByArea([communityEducation, communityHealth, economicArgiculture])

    expect(groupedByAreas).toContainEqual({
      area: "ด้านบริการชุมชนและสังคม",
      total: 30,
      plans: [{
        plan: "การศึกษา",
        total: 10,
      }, {
        plan: "สาธารณสุข",
        total: 20,
      }]
    } as BudgetByArea)

    expect(groupedByAreas).toContainEqual({
      area: "ด้านการเศรษฐกิจ",
      total: 50,
      plans: [{
        plan: "การเกษตร",
        total: 50,
      }]
    } as BudgetByArea)
  })

  test('Group by type', () => {
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

    const capital: BudgetRow = {
      ...getExpenseRow(),
      expenseType: 'งบดำเนินการ',
      amount: 25,
    }

    const groupedByTypes = getGroupedByType([personnel, operation, capital])

    expect(groupedByTypes).toContainEqual(
      { type: 'งบบุคลากร', total: 30 },
    )
    expect(groupedByTypes).toContainEqual(
      { type: 'งบดำเนินการ', total: 25 },
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