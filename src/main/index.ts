import { Server } from './server'

(async () => {
  const server = new Server()
  await server.listen()
  const STOP_EVENTS = ['SIGTERM', 'SIGINT'] as const
  
  for (const event of STOP_EVENTS) {
    process.on(event, async () => {
      await server.close()
      process.exit(0)
    })
  }
})()
