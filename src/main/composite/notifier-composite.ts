import { LogMessage } from '@/model/log-message'
import { NotifyGateway } from '@/port/notify-gateway'

export class NotifierComposite implements NotifyGateway {  
  constructor (private readonly notifiers: NotifyGateway[]) {}

  notify(logMessage: LogMessage): void {
    for (const notifier of this.notifiers) {
      notifier.notify(logMessage) 
    }
  }
}

