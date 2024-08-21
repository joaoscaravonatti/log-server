import { createLogMessageUseCaseFactory } from './factory/create-log-message-use-case-factory'
import { rabbitmqListenerAdapterFactory } from './factory/rabbitmq-listener-adapter-factory'
import { Listener } from '@/port/listener'

export class Server implements Listener {
  private readonly listener: Listener

  constructor () {
    const createLogMessageUseCase = createLogMessageUseCaseFactory()
    const queueListeners = [{ queue: 'logs', useCase: createLogMessageUseCase }]
    const rabbitMQListenerAdapter = rabbitmqListenerAdapterFactory(queueListeners)
    this.listener = rabbitMQListenerAdapter
  }

  async listen(): Promise<void> {
    await this.listener.listen()
    console.log('Listening')
  }

  async close(): Promise<void> {
    console.log('Closing')
    await this.listener.close()
  }
}
