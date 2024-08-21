import { LogMessage } from '@/model/log-message'

export interface PersisLogMessageGateway {
  persist (logMessage: LogMessage): Promise<void>
}
