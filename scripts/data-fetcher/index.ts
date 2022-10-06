import { generateKeywords } from './generate/keywords/keywords'
import { generateMetadata } from './generate/metadata/metadata'
import { generateNationWide } from './generate/nation-wide/nation-wide'
import { generatePaoBudgets } from './generate/pao/pao'
import { logc } from './log-collector/log-collector'
import { getActAiLinkRows, getAssetRows, getBudgetRows, getByYearLinkRows, getKeywordRows } from './read/google-sheets'
import { CsvUrls } from './read/types'
import { writeJsonFiles } from './write/json-file'

// !! WARN: This script will DELETE the given path without any warnings !!
// Path to data directory to generate JSON files into
// - Relative and absolute path are acceptable
// - No trailing backslash
const DATA_PATH = './static/data'

const csvUrls: CsvUrls = {
  budget: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1497107552&single=true&output=csv',
  actAiLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1213798408&single=true&output=csv',
  byYearLink: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=415184036&single=true&output=csv',
  asset: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1543063625&single=true&output=csv',
  keyword: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6ZY5MDXLGInacANGVgiuNKTHjpnreTpy-0w0kjaJRAuTaPyDZLonYRjUk6z7Pj0hIolpElxiIYFvz/pub?gid=1469844879&single=true&output=csv',
}

async function main() {
  try {
    console.log('reading...')
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
    logc.info(`read completed:
budget=${budgetRows.length}
asset=${assetRows.length}
actAiLink=${actAiLinkRows.length}
byYearLink=${byYearkLinkRows.length}
keyword=${keywordRows.length}`)

    console.log('generating...')
    const nationWides = generateNationWide(budgetRows, byYearkLinkRows)
    const paos = generatePaoBudgets(budgetRows, assetRows, actAiLinkRows, byYearkLinkRows)
    const keywords = generateKeywords(keywordRows)
    const metadata = generateMetadata(paos)

    console.log('writing...')
    await writeJsonFiles({ nationWides, paos, keywords, metadata }, DATA_PATH)
    console.log('succeeded, see infos and warnings below')
    console.log('---------------------------------------')
  } catch (e) {
    console.error(e)
  } finally {
    console.log(JSON.stringify(logc.getAll(), null, 2))
  }
}

main()
