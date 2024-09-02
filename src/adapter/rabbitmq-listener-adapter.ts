import { UseCase } from '@/use-case/use-case'
import { Listener } from '@/port/listener'
import amqp from 'amqplib'

export type QueueListener = {
  useCase: UseCase
  queue: string
}

export class RabbitMQListenerAdapter implements Listener {
  private connection: amqp.Connection

  constructor (
    private readonly url: string,
    private readonly channelListeners: QueueListener[]
  ) {}

  async listen (): Promise<void> {
    this.connection = await amqp.connect(this.url)

    for (const listener of this.channelListeners) {
      const channel = await this.connection.createChannel()
      await channel.assertQueue(listener.queue, { durable: true })

      channel.consume(listener.queue, (message) => {
        const json = JSON.parse(message.content.toString())
        listener.useCase.run(json).catch(console.error)
        channel.ack(message)
      }, { noAck: false })
    }
  }

  async close(): Promise<void> {
    await this.connection.close()
  }
}

