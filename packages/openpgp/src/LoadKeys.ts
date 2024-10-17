import * as openpgp from 'openpgp';

export type Key<T> = {
  key: T,
  user: {
    name: string,
    email: string
  },
  fingerprint: string
}

export type PublicKey = Key<openpgp.Key>;
export type PrivateKey = Key<openpgp.PrivateKey>;

export const LoadPublicKey = async (publicKeyArmored: string): Promise<PublicKey> => {
  const PublicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const fingerprint = PublicKey.getFingerprint().toUpperCase();
  const username = PublicKey.users[0].userID?.name;
  const email = PublicKey.users[0].userID?.email;

  const user = {
    name: username as string,
    email: email as string
  }

  return {
    key: PublicKey,
    user: user,
    fingerprint: fingerprint
  }
}

export const LoadPrivateKey = async (privateKeyArmored: string, passphrase: string): Promise<PrivateKey> => {
  const PrivateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase: passphrase
  })

  const fingerprint = PrivateKey.getFingerprint().toUpperCase();
  const username = PrivateKey.users[0].userID?.name;
  const email = PrivateKey.users[0].userID?.email;

  const user = {
    name: username as string,
    email: email as string
  }

  return {
    key: PrivateKey,
    user: user,
    fingerprint: fingerprint
  }
}