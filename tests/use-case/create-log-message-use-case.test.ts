import { CreateLogMessageUseCase, CreateLogMessageUseCaseParams } from '@/use-case/create-log-message-use-case'
import { LogMessage } from '@/model/log-message'
import { GenerateIdGateway } from '@/port/generate-id-gateway'
import { PersisLogMessageGateway } from '@/port/persist-log-message-gateway'
import { NotifyGateway } from '@/port/notify-gateway'

describe('CreateLogMessageUseCase', () => {
  let sut: CreateLogMessageUseCase
  let generateIdGateway: jest.Mocked<GenerateIdGateway>
  let persisLogMessageGateway: jest.Mocked<PersisLogMessageGateway>
  let notifyGateway: jest.Mocked<NotifyGateway>
  const params: CreateLogMessageUseCaseParams = { content: 'content', type: 'info' }
  const date = new Date()
  const logMessage = LogMessage.create('generated_id', 'info', 'content', date)

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(date)
    generateIdGateway = { generate: jest.fn().mockReturnValue('generated_id') }
    persisLogMessageGateway = { persist: jest.fn() }
    notifyGateway = { notify: jest.fn() }
    sut = new CreateLogMessageUseCase(generateIdGateway, persisLogMessageGateway, notifyGateway)
  })

  it('should call GenerateIdGateway', async () => {
    await sut.run(params)

    expect(generateIdGateway.generate).toHaveBeenCalled()
  })

  it('should call PersisLogMessageGateway', async () => {
    await sut.run(params)

    expect(persisLogMessageGateway.persist).toHaveBeenCalledWith(logMessage)
  })

  it('should call NotifyGateway', async () => {
    await sut.run(params)
    
    expect(notifyGateway.notify).toHaveBeenCalledWith(logMessage)
  })
})
