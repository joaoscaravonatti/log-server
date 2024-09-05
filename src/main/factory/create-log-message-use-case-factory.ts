import { CreateLogMessageUseCase } from '@/use-case/create-log-message-use-case'
import { nodeDbusNotifierAdapterFactory } from './node-dbus-notifier-adapter-factory'
import { fsPersistLogMessageAdapter } from './fs-persist-log-message-adapter-factory'
import { cryptoGenerateIdAdapterFactory } from './crypto-generate-id-adapter-factory'
import { NotifierComposite } from '../composite/notifier-composite'
import { nodemailerNotifierAdapterFactory } from './nodemailer-notifier-adapter-factory'

export const createLogMessageUseCaseFactory = () => new CreateLogMessageUseCase({
  generateIdGateway: cryptoGenerateIdAdapterFactory(),
  persistLogMessageGateway: fsPersistLogMessageAdapter(), 
  notifyGateway: new NotifierComposite([
    nodeDbusNotifierAdapterFactory(),
    nodemailerNotifierAdapterFactory()
  ])
})
