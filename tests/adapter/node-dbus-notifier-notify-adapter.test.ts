import { NodeDbusNotifierNotifyAdapter } from '@/adapter/node-dbus-notifier-notify-adapter'
import { LogMessage } from '@/model/log-message'
import { Notify } from 'node-dbus-notifier'

const show = jest.fn()

jest.mock('node-dbus-notifier', () => ({
  Notify: jest.fn().mockImplementation((params) => ({ show }))
}))

describe('NodeDbusNotifierNotifyAdapter', () => {
  let sut: NodeDbusNotifierNotifyAdapter

  beforeAll(() => {
    sut = new NodeDbusNotifierNotifyAdapter()
  })

  it('should create a Notify object with correct params', () => {
    const logMessage = LogMessage.create('id', 'info', 'content', new Date())
    sut.notify(logMessage)

    expect(jest.mocked(Notify)).toHaveBeenCalledWith({
      appName: 'LogServer',
      summary: 'info',
      body: 'content'
    })
  })

  it('should call show()', () => {
    const logMessage = LogMessage.create('id', 'info', 'content', new Date())
    sut.notify(logMessage)

    expect(show).toHaveBeenCalled()
  })
})

