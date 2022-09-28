import { generateNationWide } from './generate/nation-wide'
import { getBudgetRows } from './read/google-sheets'
import { CsvUrls } from './read/types'

async function main() {
  const csvUrls: CsvUrls = {
    budget: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1497107552&single=true&output=csv',
    actAiLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1213798408&single=true&output=csv',
    byYearLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=415184036&single=true&output=csv',
    asset: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1543063625&single=true&output=csv',
    keyword: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1469844879&single=true&output=csv',
  }
  
  const rows = await getBudgetRows(csvUrls.budget)
  const nationWides = generateNationWide(rows)
}

main()


