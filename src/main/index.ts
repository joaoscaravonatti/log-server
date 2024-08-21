import { Server } from './server'

(async () => {
  const server = new Server()
  await server.listen()
  process.on('SIGTERM', () => server.close())
})()
