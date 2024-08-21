import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'
import { FsPersisLogMessageAdapter } from '@/adapter/fs-persist-log-message-adapter'
import { NodeDbusNotifierNotifyAdapter } from '@/adapter/node-dbus-notifier-notify-adapter'
import { CreateLogMessageUseCase } from '@/use-case/create-log-message-use-case'

export const createLogMessageUseCaseFactory = () => new CreateLogMessageUseCase(
  new CryptoGenerateIdAdapter(),
  new FsPersisLogMessageAdapter([__dirname, '..', '..', 'database.txt']),
  new NodeDbusNotifierNotifyAdapter()
)
