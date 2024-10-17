import * as openpgp from 'openpgp';

export type curveType = 'curve25519' | 'ed25519' | 'p256' | 'p384' | 'p521' | 'brainpoolP256r1' | 'brainpoolP384r1' | 'brainpoolP512r1' | 'secp256k1';

export const CreateKeyPair = async (username: string, email: string, password: string, curve?: curveType) => {
  curve = curve || "curve25519"

  const keyPair = await openpgp.generateKey({
    type: "ecc",
    userIDs: [{ name: username, email: email }],
    curve: curve,
    passphrase: password,
  });

  return {
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    revocationCertificate: keyPair.revocationCertificate,
    curve: curve
  }
}