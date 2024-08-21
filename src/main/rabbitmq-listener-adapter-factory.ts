import { RabbitMQListenerAdapter, QueueListener } from '@/adapter/rabbitmq-listener-adapter'

export const rabbitmqListenerAdapterFactory = (queueListeners: QueueListener[]) =>
  new RabbitMQListenerAdapter('amqp://localhost', queueListeners)
