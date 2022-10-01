import { KeywordRow } from "../../read/types";
import { generateKeywords } from "./keywords"

describe('generate > keywords', () => {
  test('Create lookup for each keywords', () => {
    const row: KeywordRow = {
      plan: 'บริหารงานทั่วไป',
      type: 'บริหารทั่วไป',
      task: 'งบบุคลากร',
      keywords: ['เงินเดือน', 'เงินเพิ่มพิเศษ'],
    }

    const keywords = generateKeywords([row])

    expect(keywords).toEqual({
      'เงินเดือน': [{
        plan: 'บริหารงานทั่วไป',
        type: 'บริหารทั่วไป',
        task: 'งบบุคลากร',
      }],
      'เงินเพิ่มพิเศษ': [{
        plan: 'บริหารงานทั่วไป',
        type: 'บริหารทั่วไป',
        task: 'งบบุคลากร',
      }],
    })
  })

  test('Append lookup to an existing keyword', () => {
    const wage1: KeywordRow = {
      plan: 'บริหารงานทั่วไป',
      type: 'บริหารทั่วไป',
      task: 'งบบุคลากร',
      keywords: ['เงินเดือน'],
    }

    const wage2: KeywordRow = {
      plan: 'บริหารงานทั่วไป',
      type: 'วางแผนสถิติและวิชาการ',
      task: 'งบบุคลากร',
      keywords: ['เงินเดือน'],
    }

    const keywords = generateKeywords([wage1, wage2])

    expect(keywords).toEqual({
      'เงินเดือน': [
        { plan: 'บริหารงานทั่วไป', type: 'บริหารทั่วไป', task: 'งบบุคลากร' },
        { plan: 'บริหารงานทั่วไป', type: 'วางแผนสถิติและวิชาการ', task: 'งบบุคลากร' },
      ]
    })
  })
})
