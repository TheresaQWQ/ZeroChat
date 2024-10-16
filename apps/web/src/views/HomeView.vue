<script setup lang="ts">
import CardContainer from "../components/CardContainer.vue";
import Divider from "../components/divider.vue";
import TextInput from "../components/TextInput.vue";
import Tips from "../components/Tips.vue";
import Button from "../components/Button.vue";
</script>

<template>
  <div class="root">
    <div class="container">
      <CardContainer class="card">
        <h1>创建账号</h1>
        <Tips title="这是什么?">
          <p>这是一个基于OpenPGP算法，允许使用多种不同传输协议，隐私优先的端到端加密聊天工具</p>
          <p>在这里，你的所有用户数据都存储在浏览器中，同时支持阅后即焚</p>
        </Tips>
        <Divider/>
        <TextInput placeholder="用户名"/>
        <Button>创建账号</Button>
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

.container .card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 80%;
  max-width: 420px;
}

.container .card:deep() * {
  margin: 8px 0;
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