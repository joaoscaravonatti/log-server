export interface Listener {
  listen (): Promise<void>
  close (): Promise<void>
}
