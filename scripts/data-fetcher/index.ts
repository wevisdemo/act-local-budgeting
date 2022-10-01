import { generateKeywords } from './generate/keywords/keywords'
import { generateNationWide } from './generate/nation-wide/nation-wide'
import { generatePaoBudgets } from './generate/pao/pao'
import { getActAiLinkRows, getAssetRows, getBudgetRows, getByYearLinkRows, getKeywordRows } from './read/google-sheets'
import { CsvUrls } from './read/types'

async function main() {
  const csvUrls: CsvUrls = {
    budget: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1497107552&single=true&output=csv',
    actAiLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1213798408&single=true&output=csv',
    byYearLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=415184036&single=true&output=csv',
    asset: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1543063625&single=true&output=csv',
    keyword: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1469844879&single=true&output=csv',
  }

  const [
    budgetRows,
    assetRows,
    actAiLinkRows,
    byYearkLinkRows,
    keywordRows,
  ] = await Promise.all([
    getBudgetRows(csvUrls.budget),
    getAssetRows(csvUrls.asset),
    getActAiLinkRows(csvUrls.actAiLink),
    getByYearLinkRows(csvUrls.byYearLink),
    getKeywordRows(csvUrls.keyword),
  ])

  const nationWides = generateNationWide(budgetRows)
  const paos = generatePaoBudgets(budgetRows, assetRows, actAiLinkRows, byYearkLinkRows)
  const keywords = generateKeywords(keywordRows)
}

main()
