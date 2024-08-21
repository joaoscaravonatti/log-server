import { PersisLogMessageGateway } from '@/port/persist-log-message-gateway'
import { GenerateIdGateway } from '@/port/generate-id-gateway'
import { NotifyGateway } from '@/port/notify-gateway'
import { LogMessage } from '@/model/log-message'
import { UseCase } from './use-case'

export type CreateLogMessageUseCaseParams = {
  type: string
  content: string
}

export class CreateLogMessageUseCase implements UseCase {
  constructor (
    private readonly generateIdGateway: GenerateIdGateway,
    private readonly persisLogMessageGateway: PersisLogMessageGateway,
    private readonly notifyGateway: NotifyGateway
  ) {}

  async run (params: CreateLogMessageUseCaseParams): Promise<void> {
    const id = this.generateIdGateway.generate()
    const logMessage = LogMessage.create(id, params.type, params.content, new Date())
    await this.persisLogMessageGateway.persist(logMessage)
    this.notifyGateway.notify(logMessage)
  }
}
