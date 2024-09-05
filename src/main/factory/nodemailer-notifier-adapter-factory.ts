import { NodemailerNotifierAdapter } from '@/adapter/nodemailer-notifier-adapter'

export const nodemailerNotifierAdapterFactory = () => {
  return new NodemailerNotifierAdapter(
    'candace.champlin@ethereal.email',
    'UmAguNW3WEkPCMjqn4'
  )
}
