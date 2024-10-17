import { defineStore } from "pinia";

export interface ProfileState {
  username: string
  email: string
  keyPair: {
    publicKey: string
    privateKey: string,
    revocationCertificate: string
  }
}

// TODO: 完成数据加密等操作
const readFromLocalStorage = () => {
  const key = 'zero:profile'
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data) as ProfileState
  } else {
    return {} as ProfileState
  }
}

const saveToLocalStorage = (profile: ProfileState) => {
  const key = 'zero:profile'
  localStorage.setItem(key, JSON.stringify(profile))
}

export const useProfileStore = defineStore('profile', {
  state() {
    return {
      ...readFromLocalStorage(),
    } as ProfileState
  },
  actions: {
    updateProfile(profile: ProfileState) {
      this.$state = profile
      saveToLocalStorage(profile)
    }
  }
})