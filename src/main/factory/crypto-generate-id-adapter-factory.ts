import { CryptoGenerateIdAdapter } from '@/adapter/crypto-generate-id-adapter'

export const cryptoGenerateIdAdapterFactory = () => {
  return new CryptoGenerateIdAdapter()
}

