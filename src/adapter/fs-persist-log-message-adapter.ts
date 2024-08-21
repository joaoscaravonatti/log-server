import { PersisLogMessageGateway } from '@/port/persist-log-message-gateway'
import { LogMessage } from '@/model/log-message'
import path from 'node:path'
import fs from 'node:fs'

export class FsPersisLogMessageAdapter implements PersisLogMessageGateway {
  constructor (private readonly filePath: string[]) {}

  async persist (logMessage: LogMessage): Promise<void> {
    const { id, type, content, createdDate } = logMessage
    const data = [id, type, content, createdDate.toISOString()].join(',').concat('\n')
    await fs.promises.appendFile(path.resolve(...this.filePath), data) 
  }
}
