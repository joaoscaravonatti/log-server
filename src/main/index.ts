import { rabbitmqListenerAdapterFactory } from './rabbitmq-listener-adapter-factory'
import { createLogMessageUseCaseFactory } from './create-log-message-use-case-factory'

(async () => {
  const createLogMessageUseCase = createLogMessageUseCaseFactory()
  const queueListeners = [{ queue: 'logs', useCase: createLogMessageUseCase }]
  const rabbitMQListenerAdapter = rabbitmqListenerAdapterFactory(queueListeners)
  await rabbitMQListenerAdapter.listen()
  console.log('Listening')

  process.on('SIGTERM', async () => {
    console.log('Gracefully shutting down')
    await rabbitMQListenerAdapter.close()
  })
})()
