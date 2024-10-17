import { PrivateKey, PublicKey } from "@zero-chat/openpgp";
import { defineStore } from "pinia";

interface KeyPair {
  publicKey: PublicKey | null,
  privateKey: PrivateKey | null
}

export const useKeyPair = defineStore("keyPair", {
  state () {
    return {
      publicKey: null,
      privateKey: null
    } as KeyPair
  }
})