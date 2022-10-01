export type CsvUrls = {
  budget: string
  actAiLink: string
  byYearLink: string
  asset: string
  keyword: string
}

export type BudgetRow = {
  year: number // ปีงบประมาณ
  province: string // จังหวัด
  type: 'income' | 'expense' // ประเภท
  incomeType?: string // ประเภทรายรับ
  incomeCategory?: string // หมวดรายได้
  expenseArea?: string // ด้านรายจ่าย
  expensePlan?: string // แผนงานรายจ่าย
  expenseType?: string // ประเภทรายจ่าย
  expenseTask?: string // งานรายจ่าย
  amount: number // จำนวนเงิน
}

export type ActAiLinkRow = {
  province: string
  url: string // link ACT AI
}

export type ByYearLinkRow = {
  year: number // fiscal
  province: string // province
  url: string // doc
  population: number // population
}

export type AssetRow = {
  firstName: string // ชื่อ
  lastName: string // นามสกุล
  title: string // คำนำหน้า
  province: string // จังหวัด
  position: string // ตำแหน่ง
  inOffice: string // ระยะเวลาดำรงตำแหน่ง
  photoUrl: string // Photo
  fillingReason: string // กรณีที่ยื่น
  fillingDate: string // เมื่อวันที่
  ownAsset: number // รวมทรัพย์สินผู้ยื่น
  spouseAsset?: number // รวมทรัพย์สินคู่สมรส
  ownDebt: number // รวมหนี้สินผู้ยื่น
  spouseDebt?: number // รวมหนี้สินคู่สมรส
  ownIncome: number // รายได้รวมผู้ยื่น
  spouseIncome?: number // รายได้รวมคู่สมรส
  ownExpense: number // รายจ่ายรวมผู้ยื่น
  spouseExpense?: number // รายจ่ายรวมคู่สมรส
  ownTaxed: number // เงินได้พึงประเมินผู้ยื่น
  spouseTaxed?: number // เงินได้พึงประเมินคู่สมรส
  fillingUrl: string // PDF Link
}
