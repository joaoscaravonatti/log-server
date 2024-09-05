import { LogMessage } from '@/model/log-message'
import { NotifyGateway } from '@/port/notify-gateway'
import nodemailer from 'nodemailer'

export class NodemailerNotifierAdapter implements NotifyGateway {
  constructor (
    private readonly email: string,
    private readonly password: string
  ) {}

  async notify(logMessage: LogMessage): Promise<void> {
     const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: this.email, 
        pass: this.password,
      }
    })

    await transport.sendMail({
      from: this.email,
      to: this.email,
      subject: `LogServer - ${logMessage.type}`,
      text: logMessage.content
    })
  }
}
