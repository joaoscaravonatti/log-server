import { FsPersistLogMessageAdapter } from '@/adapter/fs-persist-log-message-adapter'
import { LogMessage } from '@/model/log-message'
import path from 'node:path'
import fs from 'node:fs'

jest.mock('node:fs', () => ({
  promises: {
    appendFile: jest.fn()
  }
}))

describe('FsPersistLogMessageAdapter', () => {
  let sut: FsPersistLogMessageAdapter

  beforeAll(() => {
    sut = new FsPersistLogMessageAdapter(['path'])
  })

  it('should call appendFile() correctly', async () => {
    const logMessage = LogMessage.create('id', 'info', 'content', new Date())
    await sut.persist(logMessage)

    expect(fs.promises.appendFile).toHaveBeenCalledWith(
      path.resolve('path'),
      `id,info,content,${logMessage.createdDate.toISOString()}\n`
    )
  })
})
