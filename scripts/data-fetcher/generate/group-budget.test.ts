import { BudgetRow } from "../read/types"
import { getGroupedByArea, getGroupedByType } from "./group-budget"
import { BudgetByArea } from "./types"

describe('generate > group-budget', () => {
  test('Group by area', () => {
    const communityEducation: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'การศึกษา',
      expenseType: 'งบบุคลากร',
      expenseTask: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
      amount: 10,
    }

    const communityHealth: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านบริการชุมชนและสังคม',
      expensePlan: 'สาธารณสุข',
      expenseType: 'งบบุคลากร',
      expenseTask: 'บริการสาธารณสุขและงานสาธารณสุขอื่น',
      amount: 20,
    }

    const economicArgiculture: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านการเศรษฐกิจ',
      expensePlan: 'การเกษตร',
      expenseType: 'งบบุคลากร',
      expenseTask: 'สิ่งแวดล้อมและทรัพยากรธรรมชาติ',
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

  test('Group by area; should not include same plan in other areas', () => {
    const otherCentral: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านการดำเนินงานอื่น ๆ ',
      expensePlan: 'งบกลาง',
      expenseType: 'งบกลาง',
      expenseTask: 'งบกลาง',
      amount: 10,
    }

    const financialCentral: BudgetRow = {
      ...getExpenseRow(),
      expenseArea: 'ด้านการเศรษฐกิจ',
      expensePlan: 'งบกลาง',
      expenseType: 'งบกลาง',
      expenseTask: 'งบกลาง',
      amount: 20,
    }

    const groupedByAreas = getGroupedByArea([otherCentral, financialCentral])

    expect(groupedByAreas).toContainEqual({
      area: "ด้านการดำเนินงานอื่น ๆ ",
      total: 10,
      plans: [{
        plan: "งบกลาง",
        total: 10,
      }]
    } as BudgetByArea)

    expect(groupedByAreas).toContainEqual({
      area: "ด้านการเศรษฐกิจ",
      total: 20,
      plans: [{
        plan: "งบกลาง",
        total: 20,
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
    expenseType: 'งบบุคลากร',
    expenseTask: 'บริหารทั่วไปเกี่ยวกับการศึกษา',
    amount: 10,
  }
}