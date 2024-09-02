import { PersistLogMessageGateway } from '@/port/persist-log-message-gateway'
import { GenerateIdGateway } from '@/port/generate-id-gateway'
import { NotifyGateway } from '@/port/notify-gateway'
import { LogMessage } from '@/model/log-message'
import { UseCase } from './use-case'

export type CreateLogMessageUseCaseParams = {
  type: string
  content: string
}

export interface CreateLogMessageUseCaseDeps {
  generateIdGateway: GenerateIdGateway
  persistLogMessageGateway: PersistLogMessageGateway
  notifyGateway: NotifyGateway
}

export class CreateLogMessageUseCase implements UseCase {
  constructor (private readonly deps: CreateLogMessageUseCaseDeps) {}

  async run (params: CreateLogMessageUseCaseParams): Promise<void> {
    const id = this.deps.generateIdGateway.generate()
    const logMessage = LogMessage.create(id, params.type, params.content, new Date())
    await this.deps.persistLogMessageGateway.persist(logMessage)
    this.deps.notifyGateway.notify(logMessage)
  }
}
