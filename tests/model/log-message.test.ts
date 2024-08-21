import { LogMessage } from '@/model/log-message'

describe('LogMessage', () => {
  it('should throw an error if type is not info, warning or error', () => {
    const createCallback = () => LogMessage.create('test_id', 'invalid_type', 'test_content', new Date())

    expect(createCallback).toThrow(new Error('Invalid `type`.'))
  })

  it('should create an object with id, type, message and createdDate', () => {
    const [id, type, content, createdDate] = ['test_id', 'info', 'test_content', new Date()]
    const logMessage = LogMessage.create(id, type, content, createdDate)

    expect(logMessage.id).toBe('test_id')
    expect(logMessage.type).toBe('info')
    expect(logMessage.content).toBe('test_content')
    expect(logMessage.createdDate).toEqual(createdDate)
  })
})
