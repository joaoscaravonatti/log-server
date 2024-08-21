const VALID_TYPES = ['info', 'warning', 'error']

export class LogMessage {
  private constructor (
    readonly id: string,
    readonly type: string,
    readonly content: string,
    readonly createdDate: Date
  ) {}

  static create (
    id: string,
    type: string,
    content: string,
    createdDate: Date
  ) {
    if (!VALID_TYPES.includes(type)) {
      throw new Error('Invalid `type`.')
    }

    return new LogMessage(id, type, content, createdDate)
  }
}
