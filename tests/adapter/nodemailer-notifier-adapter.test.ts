import { NodemailerNotifierAdapter } from '@/adapter/nodemailer-notifier-adapter'
import { LogMessage } from '@/model/log-message'
import nodemailer from 'nodemailer'

const sendMail = jest.fn()

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail
  }))
}))

describe.only('NodemailerNotifierAdapter', () => {
  let sut: NodemailerNotifierAdapter
  const logMessage = LogMessage.create('id', 'info', 'content', new Date())

  beforeAll(() => {
    sut = new NodemailerNotifierAdapter(
     'fakeemail@fake.com',
     'fakepassword'
    )
  })

  it('should call createTransport()', async () => {
    await sut.notify(logMessage)

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'fakeemail@fake.com',
        pass: 'fakepassword'
      } 
    })
  })

  it('should call sendMail()', async () => {
    await sut.notify(logMessage) 

    expect(sendMail).toHaveBeenCalledWith({
      from: 'fakeemail@fake.com',
      to: 'fakeemail@fake.com', 
      subject: 'LogServer - info',
      text: 'content'
    })
  })
})

