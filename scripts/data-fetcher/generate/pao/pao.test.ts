import { ActAiLinkRow, AssetRow, BudgetRow, ByYearLinkRow } from "../../read/types"
import { BudgetByArea } from "../types"
import { generatePaoBudgets } from "./pao"
import { BudgetByTask, ChiefExecutive } from "./pao.types"

describe('generate > pao > budget', () => {
  test('Get all PAO budgets for years by provinces', () => {
    const chiangMai2564 = getExpenseRow()
    const chiangMai2563 = { ...getExpenseRow(), year: 2563 }
    const saraburi2564 = { ...getExpenseRow(), province: 'สระบุรี' }

    const paos = generatePaoBudgets(
      [
        chiangMai2564,
        chiangMai2563,
        saraburi2564,
      ],
      [],
      [
        getActAiLinkRow(),
        { ...getActAiLinkRow(), province: 'สระบุรี' }],
      [
        getByYearLinkRow(2563),
        getByYearLinkRow(2564),
        { ...getByYearLinkRow(2563), province: 'สระบุรี' },
        { ...getByYearLinkRow(2564), province: 'สระบุรี' },
      ]
    )

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
    ], [], [getActAiLinkRow()], [getByYearLinkRow(2563), getByYearLinkRow(2564)])

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
    ], [], [getActAiLinkRow()], [getByYearLinkRow(2563), getByYearLinkRow(2564)])

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
    ], [], [getActAiLinkRow()], [getByYearLinkRow(2563), getByYearLinkRow(2564)])

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
    ], [], [getActAiLinkRow()], [getByYearLinkRow(2564)])

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

describe('generate > pao > incomes', () => {
  test('Group income by types', () => {
    const collectTaxIncome = getIncomeRow()
    const collectCapitalIncome = {
      ...getIncomeRow(),
      incomeCategory: 'หมวดรายได้จากทุน',
      amount: 25,
    }
    const subsidyIncome = {
      ...getIncomeRow(),
      incomeType: 'รายได้ที่รัฐบาลอุดหนุนให้แก่องค์กรปกครองส่วนท้องถิ่น',
      incomeCategory: 'หมวดเงินอุดหนุนทั่วไป',
      amount: 30,
    }

    const paos = generatePaoBudgets(
      [collectTaxIncome, collectCapitalIncome, subsidyIncome],
      [], [getActAiLinkRow()], [getByYearLinkRow(2564)],
    )

    expect(paos[0].budget.pao.incomes.length).toBe(2)
    expect(paos[0].budget.pao.incomes).toContainEqual({
      type: 'รายได้จัดเก็บเอง',
      total: 40,
      categories: [
        { category: 'หมวดภาษีอากร', total: 15 },
        { category: 'หมวดรายได้จากทุน', total: 25 },
      ]
    })
    expect(paos[0].budget.pao.incomes).toContainEqual({
      type: 'รายได้ที่รัฐบาลอุดหนุนให้แก่องค์กรปกครองส่วนท้องถิ่น',
      total: 30,
      categories: [
        { category: 'หมวดเงินอุดหนุนทั่วไป', total: 30 },
      ]
    })
  })
})

describe('generate > pao > chiefExecutive', () => {
  test('Get executives for the right year', () => {
    const mrUdorn = getAssetRow()
    const mrBurapa = {
      ...getAssetRow(),
      firstName: 'บูรพา',
      inOffice: '01/01/2564 - 01/01/2565',
    }

    const expectedUdorn = {
      name: 'พันตำรวจโท อุดร แปลกโบสถ์',
      inOffice: '01/01/2563 - 01/01/2564',
      photoUrl: 'https://ele.dla.go.th',
      ownAccount: {
        asset: 1,
        debt: 3,
        income: 5,
        expense: 7,
        taxed: 9,
      },
      spouseAccount: {
        asset: 2,
        debt: 4,
        income: 6,
        expense: 8,
        taxed: 10,
      },
      fillingUrl: 'https://drive.google.com',
    }
    const expectedBurapa = {
      ...expectedUdorn,
      name: 'พันตำรวจโท บูรพา แปลกโบสถ์',
      inOffice: '01/01/2564 - 01/01/2565',
    }

    const expense2563 = {
      ...getExpenseRow(),
      year: 2563,
    }
    const expense2564 = getExpenseRow()

    const paos = generatePaoBudgets(
      [expense2563, expense2564],
      [mrUdorn, mrBurapa],
      [getActAiLinkRow()],
      [getByYearLinkRow(2563), getByYearLinkRow(2564)],
    )

    const pao2563 = paos.find(p => p.year === 2563)
    const pao2564 = paos.find(p => p.year === 2564)
    expect(pao2563?.budget.pao.chiefExecutives.length).toEqual(1)
    expect(pao2564?.budget.pao.chiefExecutives.length).toEqual(2)
    expect(pao2564?.budget.pao.chiefExecutives).toContainEqual(expectedUdorn)
    expect(pao2564?.budget.pao.chiefExecutives).toContainEqual(expectedBurapa)
  })

  test('Use present day for executive who is still in office', () => {
    const mrUdorn = {
      ...getAssetRow(),
      inOffice: '01/01/2563',
    }
    const expense2563 = {
      ...getExpenseRow(),
      year: 2563,
    }
    const expense2564 = getExpenseRow()

    const paos = generatePaoBudgets(
      [expense2563, expense2564],
      [mrUdorn],
      [getActAiLinkRow()],
      [getByYearLinkRow(2563), getByYearLinkRow(2564)],
      )

    expect(paos.length).toBe(2)
    expect(paos[0].budget.pao.chiefExecutives[0].name).toEqual('พันตำรวจโท อุดร แปลกโบสถ์')
    expect(paos[1].budget.pao.chiefExecutives[0].name).toEqual('พันตำรวจโท อุดร แปลกโบสถ์')
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

function getIncomeRow(): BudgetRow {
  return {
    year: 2564,
    province: 'เชียงใหม่',
    type: 'income',
    incomeType: 'รายได้จัดเก็บเอง',
    incomeCategory: 'หมวดภาษีอากร',
    amount: 15,
  }
}

function getAssetRow(): AssetRow {
  return {
    firstName: 'อุดร',
    lastName: 'แปลกโบสถ์',
    title: 'พันตำรวจโท',
    province: 'เชียงใหม่',
    position: '',
    inOffice: '01/01/2563 - 01/01/2564',
    photoUrl: 'https://ele.dla.go.th',
    fillingReason: '',
    fillingDate: '',
    ownAsset: 1,
    spouseAsset: 2,
    ownDebt: 3,
    spouseDebt: 4,
    ownIncome: 5,
    spouseIncome: 6,
    ownExpense: 7,
    spouseExpense: 8,
    ownTaxed: 9,
    spouseTaxed: 10,
    fillingUrl: 'https://drive.google.com',
  }
}

function getActAiLinkRow(): ActAiLinkRow {
  return {
    province: 'เชียงใหม่',
    url: '',
  }
}

function getByYearLinkRow(year: number): ByYearLinkRow {
  return {
    year,
    province: 'เชียงใหม่',
    url: '',
    population: 0,
  }
}
