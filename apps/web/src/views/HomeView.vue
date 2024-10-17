<script setup lang="ts">
import CardContainer from "../components/CardContainer.vue";
import Divider from "../components/divider.vue";
import TextInput from "../components/TextInput.vue";
import Tips from "../components/Tips.vue";
import Button from "../components/Button.vue";
import * as openpgp from "@zero-chat/openpgp"

import { onMounted, ref } from 'vue';
import { useProfileStore } from "../store/profile.ts";
import { useKeyPair } from "../store/keyPair.ts";

const username = ref<string>("");
const email = ref<string>("");

const password_1 = ref<string>("");
const password_2 = ref<string>("");

const fingerprint = ref<string>("");

const title = ref<string>("Welcome~");

const profile = useProfileStore()
const keyPair = useKeyPair()

enum LoginStageType {
  InitKeyPair,
  InputPassphrase,
  LoggedIn,
  Unknown
}

const LoginStage = ref<LoginStageType>(LoginStageType.Unknown)

const stateUpdate = async () => {
  if (keyPair.publicKey && keyPair.privateKey) {
    LoginStage.value = LoginStageType.LoggedIn
    title.value = "已登录"
    return
  }

  if (profile.username && profile.email && profile.keyPair.privateKey && profile.keyPair.publicKey && profile.keyPair.revocationCertificate && (!keyPair.publicKey || !keyPair.privateKey)) {
    const publicKey = await openpgp.LoadPublicKey(profile.keyPair.publicKey)

    username.value = publicKey.user.name as string;
    email.value = publicKey.user.email as string;
    fingerprint.value = publicKey.fingerprint as string;

    title.value = "解密私钥"
    LoginStage.value = LoginStageType.InputPassphrase
    return
  }

  title.value = "创建密钥"
  LoginStage.value = LoginStageType.InitKeyPair
}

onMounted(() => stateUpdate());

// 创建密钥对
const createAccount = async () => {
  const value = username.value;
  if (!value || value.length < 3) {
    alert("用户名长度不能小于3个字符");
    return
  }

  if (password_1.value !== password_2.value) {
    alert("两次输入的密码不一致");
    return
  }

  const key = await openpgp.CreateKeyPair(username.value, email.value, password_1.value)

  profile.updateProfile({
    username: username.value,
    email: email.value,
    keyPair: {
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      revocationCertificate: key.revocationCertificate
    }
  })

  await InputPassphrase();
}

// 解密私钥
const InputPassphrase = async () => {
  const passphrase = password_1.value;

  try {
    const privateKey = await openpgp.LoadPrivateKey(profile.keyPair.privateKey, passphrase)
    const publicKey = await openpgp.LoadPublicKey(profile.keyPair.publicKey)

    keyPair.privateKey = privateKey
    keyPair.publicKey = publicKey

    stateUpdate()
  } catch (error) {
    alert("密码错误")
  }
}

// 销毁密钥对
const DestroyKeyPair = async () => {
  if (!confirm("你确定要这么做吗?") || !confirm("你真的确定要这么做吗?")) {
    return
  }

  profile.updateProfile({
    username: "",
    email: "",
    keyPair: {
      publicKey: "",
      privateKey: "",
      revocationCertificate: ""
    }
  })

  stateUpdate()
}
</script>

<template>
  <div class="root">
    <div class="container">
      <CardContainer class="card">
        <h1>{{ title }}</h1>
        <Tips>
          <p>这是一个基于OpenPGP算法，允许使用多种不同传输协议，隐私优先的端到端加密聊天工具。</p>
          <p>在这里，你的所有用户数据都存储在浏览器中，同时支持阅后即焚。</p>
          <p>默认使用 <code>Ed25519</code> 算法生成用于签名的主密钥，使用 <code>Curve25519</code> 算法生成用于加密的子密钥。</p>
        </Tips>
        <Divider />
        <!-- 初始化 -->
        <div v-if="LoginStage === LoginStageType.Unknown">
          <p>加载中...</p>
        </div>
        <!-- 初始化密钥对 -->
        <div v-else-if="LoginStage === LoginStageType.InitKeyPair" class="wrapper">
          <TextInput placeholder="用户名" v-model:model-value="username" />
          <TextInput placeholder="邮箱" v-model:model-value="email" />
          <TextInput type="password" placeholder="主密码" v-model:model-value="password_1" />
          <TextInput type="password" placeholder="确认密码" v-model:model-value="password_2" />
          <Button @click="() => createAccount()">创建密钥</Button>
        </div>
        <!-- 解密私钥 -->
        <div v-else-if="LoginStage === LoginStageType.InputPassphrase" class="wrapper">
          <TextInput disabled placeholder="用户名" v-model:model-value="username" />
          <TextInput disabled placeholder="邮箱" v-model:model-value="email" />
          <TextInput disabled placeholder="指纹" v-model:model-value="fingerprint" />
          <TextInput type="password" placeholder="主密码" v-model:model-value="password_1" />
          <Button @click="() => InputPassphrase()">解密私钥</Button>
          <Button style="background-color: var(--theme-error-color);" @click="() => DestroyKeyPair()">销毁密钥对</Button>
        </div>
        <!-- 已登陆 -->
        <div v-else-if="LoginStage === LoginStageType.LoggedIn" class="wrapper">
          <p>TODO: 跳转到新页面，管理聊天会话和传输服务器等</p>
        </div>
      </CardContainer>
    </div>
    <div class="bottom">
      <p>Made with Love~ ❤</p>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}

.container {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper:deep() * {
  margin: 8px 0;
}

.container .card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 80%;
  max-width: 420px;
}

.container .card h1 {
  font-size: 2rem;
  margin: 8px 0;
  padding: 0;
  text-align: center;
}

.bottom {
  height: 80px;
}
</style>