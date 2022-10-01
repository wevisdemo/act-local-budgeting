type WarnDetail = {
  source?: string
  line?: string
}

type Base = { level: string, at: Date, message: string }
type Info = { level: 'info' } & Base
type Warn = {level: 'warn'} & Base & WarnDetail

type Log = Warn | Info

export class LogCollector {
  private infos: Info[] = []
  private warns: Warn[] = []

  warn(message: string, detail?: WarnDetail): void {
    this.warns.push({ level: 'warn', at: new Date(), message, ...detail })
  }

  info(message: string): void {
    this.infos.push({ level: 'info', at: new Date(), message })
  }

  getAll(): Log[] {
    return [...this.infos, ...this.warns]
      .sort((a, b) => { return a.at.getTime() - b.at.getTime() } )
  }
}

export const logc = new LogCollector()
