import { writeFile, rmdir, mkdir } from 'fs/promises'
import { KeywordMap } from "../generate/keywords/types";
import { Metadata } from "../generate/metadata/types";
import { NationWideFileData } from "../generate/nation-wide/nation-wide";
import { PaoBudgetFileData } from "../generate/pao/pao";

type WriteJsonFilesInput = {
  metadata: Metadata
  nationWides: NationWideFileData[]
  paos: PaoBudgetFileData[]
  keywords: KeywordMap
}

type FilePathWithData = {
  path: string
  content: any
}

export async function writeJsonFiles(input: WriteJsonFilesInput, rootPath: string) {
  const files = createFilePathWithData(input)

  try {
    await rmdir(rootPath, { recursive: true })
  } catch (e) {
    throw new Error(`Write JSONs: cannot remove root path directory ${e}`)
  }

  try {
    await mkdir(rootPath)
  } catch (e) {
    throw new Error(`Write JSONs: cannot recreate root path directory ${e}`)
  }

  try {
    await Promise.all(files.map((file) =>
      writeFile(`${rootPath}${file.path}`, JSON.stringify(file.content))
    ))
  } catch (e) {
    throw new Error(`Write JSONs: cannot write files ${e}`)
  }
}

function createFilePathWithData(input: WriteJsonFilesInput): FilePathWithData[] {
  const metadata: FilePathWithData = { path: '/metadata.json', content: input.metadata }
  const keywords: FilePathWithData = { path: '/keywords.json', content: input.keywords }
  const byYears: FilePathWithData[] = input.nationWides
    .map(nationWide => {
      const year = nationWide.year
      return [
        { path: `/${year}/nation-wide.json`, content: nationWide.budget } as FilePathWithData,
        ...(input.paos
            .filter(pao => pao.year === year)
            .map(pao => ({
              path: `/${year}/pao-${pao.province}.json`,
              content: pao.budget,
            }) as FilePathWithData)
          )
      ]
    })
    .flat()

  return [ metadata, keywords, ...byYears ]
}
