import { RabbitMQListenerAdapter, QueueListener } from '@/adapter/rabbitmq-listener-adapter'

export const rabbitmqListenerAdapterFactory = (queueListeners: QueueListener[]) => {
  return new RabbitMQListenerAdapter('amqp://localhost', queueListeners)
}
