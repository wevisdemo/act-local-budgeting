export type Metadata = {
  years: number[]
  provinces: string[]
  updatedAt: string
  provincesByYears: { [year: string]: string[] }
}
