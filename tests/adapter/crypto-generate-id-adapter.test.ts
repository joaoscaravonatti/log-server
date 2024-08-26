import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'
import crypto from 'node:crypto'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('id')
}))

describe('CryptoGenerateIdAdapter', () => {
  it('should call randomUUID()', () => {
    const sut = new CryptoGenerateIdAdapter()
    sut.generate()

    expect(crypto.randomUUID).toHaveBeenCalled()
  })

  it('should return a string', () => {
    const sut = new CryptoGenerateIdAdapter()
    const result = sut.generate()

    expect(result).toBe('id')
  })
})
