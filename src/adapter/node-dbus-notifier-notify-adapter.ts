import { NotifyGateway } from '@/port/notify-gateway'
import { LogMessage } from '@/model/log-message'
import { Notify } from 'node-dbus-notifier'

export class NodeDbusNotifierNotifyAdapter implements NotifyGateway {
  notify(logMessage: LogMessage): void {
    const notifier = new Notify({
      appName: 'LogServer',
      summary: logMessage.type,
      body: logMessage.content
    })

    notifier.show()
  }
}
