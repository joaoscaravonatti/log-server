import { FsPersistLogMessageAdapter } from '@/adapter/fs-persist-log-message-adapter'

export const fsPersistLogMessageAdapter = () => {
  return new FsPersistLogMessageAdapter([__dirname, '..', '..', '..', 'database.txt'])
}

