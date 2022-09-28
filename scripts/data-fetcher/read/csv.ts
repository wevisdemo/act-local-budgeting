import * as Papa from 'papaparse'
import request from 'request'

export function parseRemote(url: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const dataStream = request.get(url)
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT)

    dataStream.pipe(parseStream)

    let data: string[][] = []
    parseStream.on('data', (chunk: unknown) => {
        data.push(chunk as string[])
    })

    parseStream.on('finish', () => {
        resolve(data)
    })

    parseStream.on('error', reject)
  })
}
