import * as Papa from 'papaparse'
import request from 'request'

export function parseRemote(url: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const dataStream = request.get(url)
    const options = { encoding: 'utf8' }
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, options as Papa.ParseConfig)
    let completed = false

    dataStream.pipe(parseStream)

    let data: string[][] = []
    parseStream.on('data', (chunk: unknown) => {
        data.push(chunk as string[])
    })

    parseStream.on('finish', () => {
      resolve(data)
    })

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
