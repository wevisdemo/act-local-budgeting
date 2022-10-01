import { parse } from 'csv-parse'
import request from 'request'

export function parseRemote(url: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const dataStream = request.get(url)
    const parseStream = parse()
    let completed = false

    dataStream.pipe(parseStream)
    const data: string[][] = []

    parseStream.on('readable', (chunk: unknown) => {
      let record;
      while ((record = parseStream.read()) !== null) {
        data.push(record);
      }
    })

    parseStream.on('end', () => {
      resolve(data)
    })

    parseStream.on('error', reject)

    dataStream.on('error', (err) => {
      parseStream.end()
      if (!completed) {
        reject(err)
      }
    })

    dataStream.on('complete', () => {
      completed = true
    })
  })
}
