import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'

describe('CryptoGenerateIdAdapter', () => {
  it('should return a string', () => {
    const sut = new CryptoGenerateIdAdapter()
    const result = sut.generate()

    expect(typeof result).toBe('string')
  })
})
