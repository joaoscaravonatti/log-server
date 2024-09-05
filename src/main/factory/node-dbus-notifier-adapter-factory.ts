import { NodeDbusNotifierNotifyAdapter } from '@/adapter/node-dbus-notifier-notify-adapter'

export const nodeDbusNotifierAdapterFactory = () => {
  return new NodeDbusNotifierNotifyAdapter()
}

