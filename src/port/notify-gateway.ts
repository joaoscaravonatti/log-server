import { LogMessage } from '@/model/log-message'

export interface NotifyGateway {
  notify (logMessage: LogMessage): void
}
