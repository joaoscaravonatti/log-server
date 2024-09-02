import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'
import crypto from 'node:crypto'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('id')
}))

describe('CryptoGenerateIdAdapter', () => {
  let sut: CryptoGenerateIdAdapter

  beforeAll(() => {
    sut = new CryptoGenerateIdAdapter()
  })

  it('should call randomUUID()', () => {
    sut.generate()

    expect(crypto.randomUUID).toHaveBeenCalled()
  })

  it('should return a string', () => {
    const result = sut.generate()

    expect(result).toBe('id')
  })
})
