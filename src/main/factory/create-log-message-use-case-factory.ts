import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'
import { FsPersistLogMessageAdapter } from '@/adapter/fs-persist-log-message-adapter'
import { NodeDbusNotifierNotifyAdapter } from '@/adapter/node-dbus-notifier-notify-adapter'
import { CreateLogMessageUseCase } from '@/use-case/create-log-message-use-case'

export const createLogMessageUseCaseFactory = () => new CreateLogMessageUseCase({
  generateIdGateway: new CryptoGenerateIdAdapter(),
  persistLogMessageGateway: new FsPersistLogMessageAdapter([__dirname, '..', '..', '..', 'database.txt']),
  notifyGateway: new NodeDbusNotifierNotifyAdapter()
})
