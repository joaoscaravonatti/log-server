import { LogMessage } from '@/model/log-message'

export interface PersistLogMessageGateway {
  persist (logMessage: LogMessage): Promise<void>
}
