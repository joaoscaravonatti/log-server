import { GenerateIdGateway } from '@/port/generate-id-gateway'
import crypto from 'node:crypto'

export class CryptoGenerateIdAdapter implements GenerateIdGateway {
  generate(): string {
    return crypto.randomUUID()
  }
}
