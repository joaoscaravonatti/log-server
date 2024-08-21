import { RabbitMQListenerAdapter } from '@/adapter/rabbitmq-listener-adapter'
import amqp from 'amqplib'

const assertQueue = jest.fn()
const consume = jest.fn()
const close = jest.fn()

const createChannel = jest.fn().mockImplementation(() => ({
  assertQueue,
  consume
}))

jest.mock('amqplib', () => ({
  connect: jest.fn().mockImplementation(() => ({
    createChannel,
    close
  }))
}))

describe('RabbitMQListenerAdapter', () => {
  let sut: RabbitMQListenerAdapter
  const fakeUseCase1 = { run: jest.fn().mockResolvedValue(undefined) }
  const fakeUseCase2 = { run: jest.fn().mockResolvedValue(undefined) }
  const URL = 'amqp://localhost'

  beforeAll(async () => {
    sut = new RabbitMQListenerAdapter(
      URL,
      [
        { queue: 'queue1', useCase: fakeUseCase1 },
        { queue: 'queue2', useCase: fakeUseCase2 }
      ]
    )
  })

  afterEach(() => jest.clearAllMocks())

  it('should call connect() with correct url', async () => {
    await sut.listen()

    expect(amqp.connect).toHaveBeenCalledWith(URL)
  })

  it('should call createChannel() for each listener', async () => {
    await sut.listen()

    expect(createChannel).toHaveBeenCalledTimes(2)
  })

  it('should call assertQueue() for each listener', async () => {
    await sut.listen()

    expect(assertQueue).toHaveBeenNthCalledWith(1, 'queue1', { durable: false })
    expect(assertQueue).toHaveBeenNthCalledWith(2, 'queue2', { durable: false })
  })

  it('should call consume() for each listener', async () => {
    await sut.listen()

    expect(consume).toHaveBeenNthCalledWith(1, 'queue1', expect.any(Function), { noAck: true })
    expect(consume).toHaveBeenNthCalledWith(2, 'queue2', expect.any(Function), { noAck: true })
  })

  it('should call consume() callback for each listener', async () => {
    await sut.listen()
    const message1 = { content: Buffer.from(JSON.stringify({ key: 'value1' })) }
    const message2 = { content: Buffer.from(JSON.stringify({ key: 'value2' })) }
    const consumeCallback1 = consume.mock.calls[0][1]
    const consumeCallback2 = consume.mock.calls[1][1]
    consumeCallback1(message1)
    consumeCallback2(message2)
  
    expect(fakeUseCase1.run).toHaveBeenCalledWith({ key: 'value1' })
    expect(fakeUseCase2.run).toHaveBeenCalledWith({ key: 'value2' })
  })

  it('should call close()', async () => {
    await sut.listen()
    await sut.close()

    expect(close).toHaveBeenCalled()
  })
})
