# ACT Local Budgeting / Data Fetcher
The script to fetch Google Sheets in CSV format and aggregate to useful JSON data files.

- [ACT Local Budgeting / Data Fetcher](#act-local-budgeting--data-fetcher)
- [Development Guide](#development-guide)
  - [Build](#build)
  - [Run](#run)
  - [Test](#test)
  - [Seperations](#seperations)
- [Data Interfaces](#data-interfaces)
  - [Keywords](#keywords)
  - [Data File Structure](#data-file-structure)
  - [Data File Formats](#data-file-formats)
    - [Metadata](#metadata)
      - [File Name Path](#file-name-path)
      - [Data Type](#data-type)
    - [Nation-wide Budget](#nation-wide-budget)
      - [File Name Path](#file-name-path-1)
      - [Data Type](#data-type-1)
    - [PAO Budget Per Year](#pao-budget-per-year)
      - [File Name Path](#file-name-path-2)
      - [Data Type](#data-type-2)
    - [Keywords](#keywords-1)
      - [File Name Path](#file-name-path-3)
      - [Data Type](#data-type-3)

# Development Guide
## Build
All dependencies are added with parent's `package.json`. Simply run:
```
npm i
```

## Run
This sub-project uses `typescript` with `ts-node`. You can run the fetcher with:

```
npm run fetch
```

Which will kick-start the command in `index.ts`

## Test
We do unit testing in some crucial parts. All of them are now in the `generate` path since most of conditions and calculations are done there.

To run test:
```
npm run test-fetch
```

## Seperations
This sub-project are split into three layers:

1. Read: data from data sources
   - Result -> rows as data sources but with data type transformations
2. Generate: meaningful data for interfacing
   - Result -> transformed data into use cases
3. Write: to destination (in this case, json files)
   - Result -> deliver generated data to desired destination



# Data Interfaces
## Keywords
| In Sheets        | In Data File                                 |
|------------------|----------------------------------------------|
| ด้านรายจ่าย        | Area                                         |
| แผนงาน           | Plan                                         |
| ประเภทงบ/รายจ่าย  | Type                                         |
| งาน/รายการ       | Task                                         |
| หมวด             | Category                                     |
| อบจ.             | PAO (Provincial Administrative Organization) |

## Data File Structure
Output files from this script will be automatically created/updated to `/static/data`. Within this path, files are put in a year-named directory indicated the data for a corresponding year.

Example:
```
/static
  /data
    metadata.json
    keywords.json
    /2564
      nation-wide.json
      pao-เชียงใหม่.json
```

## Data File Formats

### Metadata
A root file indicates years and provinces provided in the data set.

#### File Name Path
```
/static/data/metadata.json
```

#### Data Type
```ts
// This type is the root type for this file
type Metadata = {
  years: number[]
  provinces: string[]
  updatedAt: string   // ISO 8601 Date - YYYY-MM-DD
}
```

Example
```json
{
  "years": [2563, 2564],
  "provinces": ["เชียงใหม่", "เชียงราย"],
  "updatedAt": "2022-10-27"
}
```

### Nation-wide Budget

#### File Name Path
```
/static/data/${year}/nation-wide.json
```
Example: `/static/data/2564/nation-wide.json`
#### Data Type
```ts
// This type is the root type for this file
type NationWideBudget = {
  total: number
  groupedByArea: BudgetByArea[]
  groupedByType: BudgetByType[]
  budgetPerCapita: ProviceBudgetPerCapita[]
}

type Area = string
type Plan = string
type Type = string

type BudgetByArea = {
  area: Area
  total: number
  plans: BudgetByPlan[]
}

type BudgetByPlan = {
  plan: Plan
  total: number
}

type BudgetByType = {
  type: Type
  total: number
}

type ProviceBudgetPerCapita = {
  name: string
  amount: number
}
```

Example
```json
{
  "total": 56005000000,
  "groupedByArea": [{
      "area": "ด้านบริการชุมชนและสังคม",
      "total": 3000000000,
      "plans": [{
        "plan": "การศึกษา",
        "total": 1000000000 
      }, {
        "plan": "สาธารณสุข",
        "total": 2000000000 
      }]
  }],
  "groupedByType": [
    { "type": "งบบุคลากร", "total": 35000000000 }
  ],
  "budgetPerCapita": [
    { "name": "เชียงใหม่", "amount": 898 }
  ]
}
```

### PAO Budget Per Year

#### File Name Path
```
/static/data/${year}/pao-${name}.json
```
Example: `/static/data/2564/pao-เชียงใหม่.json`
#### Data Type
```ts
// This type is the root type for this file
type PaoBudget = {
  total: number
  groupedByArea: BudgetByArea[]
  groupedByType: BudgetByType[]
  tasks: BudgetByTask[]
  pao: PAO
}

type Area = string
type Plan = string
type Type = string
type IncomeType = string
type IncomeCategory = string

type BudgetByArea = {
  area: Area
  total: number
  plans: BudgetByPlan[]
}

type BudgetByPlan = {
  plan: Plan
  total: number
}

type BudgetByType = {
  type: Type
  total: number
}

type BudgetByTask = {
  task: string
  area: Area
  plan: Plan
  type: Type
  total: number
}

type PAO = {
  name: string
  incomes: IncomeByType[]
  population: number
  budgetingDocUrl: string
  actAiUrl: string
  chiefExecutives: ChiefExecutive[]
}

type IncomeByType = {
  type: IncomeType
  total: number
  categories: IncomeByCategory[]
}

type IncomeByCategory = {
  category: IncomeCategory
  total: number
}

type ChiefExecutive = {
  name: string
  inOffice: string
  photoUrl: string
  ownAccount: Account
  spouseAccount?: Account
  fillingUrl: string
  remark?: string
}

type Account = {
  asset: number
  debt: number
  income: number
  expense: number
  taxed: number
}

```

Example
```json
{
  "total": 500000000,
  "groupedByArea": [{
      "area": "ด้านบริการชุมชนและสังคม",
      "total": 30000000,
      "plans": [{
        "plan": "การศึกษา",
        "total": 10000000 
      }, {
        "plan": "สาธารณสุข",
        "total": 20000000 
      }]
  }],
  "groupedByType": [
    { "type": "งบบุคลากร", "total": 350000000 }
  ],
  "tasks": [{
    "task": "บริหารทั่วไปเกี่ยวกับการศึกษา",
    "area": "ด้านบริการชุมชนและสังคม",
    "plan": "การศึกษา",
    "type": "งบบุคลากร",
    "total": 7000000
  }],
   "pao": {
      "name": "เชียงใหม่",
      "incomes": [{
        "type": "รายได้จัดเก็บเอง",
        "total": 1000000000,
        "categories": [
          { "category": "หมวดภาษีอากร", "total": 4000000 }
        ]
      }],
      "population": 1495741,
      "budgetingDocUrl": "https://drive.google.com",
      "actAiUrl": "https://tinyurl.com",
      "chiefExecutives": [{
        "name": "พันตำรวจโท อุดร แปลกโบสถ์",
        "inOffice": "20/12/2563 - 19/12/2567",
        "photoUrl": "https://ele.dla.go.th",
        "ownAccount": {
          "asset": 300000,
          "debt": 5000000,
          "income": 300000,
          "expense": 200000,
          "taxed": 0
        },
        "spouseAccount": {
          "asset": 700000,
          "debt": 0,
          "income": 1000000,
          "expense": 100000,
          "taxed": 0
        },
        "fillingUrl": "https://drive.google.com",
        "remark": "แสดงผลคู่สมรสลำดับที่ 1 เท่านั้น"
      }],
  }
}
```

### Keywords

#### File Name Path
```
/static/data/keywords.json
```
#### Data Type
```ts
// This type is the root type for this file
type KeywordMap = { [keyword: string] : Lookup[] }

type Area = string
type Plan = string
type Type = string

type Lookup = {
  plan: Plan
  type: Type
  task: Task
}
```

Example
```json
{
  "อุปกรณ์สำนักงาน": [
    {
      "plan": "บริหารงานทั่วไป",
      "type": "วางแผนสถิติและวิชาการ",
      "task": "งบลงทุน"
    },
    {
      "plan": "บริหารงานทั่วไป",
      "type": "บริหารงานคลัง",
      "task": "งบลงทุน"
    }
  ]
}
```
