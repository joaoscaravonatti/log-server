import { FsPersisLogMessageAdapter } from '@/adapter/fs-persist-log-message-adapter'
import path from 'node:path'
import fs from 'node:fs'
import { LogMessage } from '@/model/log-message'

const TEST_FILE_PATH = [__dirname, '..', 'testfile.txt']

describe('FsPersisLogMessageAdapter', () => {
  let sut: FsPersisLogMessageAdapter

  beforeAll(() => {
    sut = new FsPersisLogMessageAdapter(TEST_FILE_PATH)
  })

  afterAll(async () => {
    await fs.promises.unlink(path.resolve(...TEST_FILE_PATH))
  })

  it('should write data in the provided file', async () => {
    const logMessage = LogMessage.create('id', 'info', 'content', new Date())
    await sut.persist(logMessage)
    const buffer = await fs.promises.readFile(path.resolve(...TEST_FILE_PATH))
    const file = buffer.toString()

    expect(file).toEqual(`id,info,content,${logMessage.createdDate.toISOString()}\n`)
  })
})
