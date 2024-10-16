<script setup lang="ts">
import { defineProps } from 'vue';
import {
  NotificationFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon
} from "tdesign-icons-vue-next";

const props = defineProps({
  type: {
    // notification, success, warning, error
    type: String,
    default: 'notification'
  }
})

const icon = {
  notification: NotificationFilledIcon,
  success: CheckCircleFilledIcon,
  warning: ErrorCircleFilledIcon,
  error: ErrorCircleFilledIcon
}

const color = {
  notification: 'rgba(24, 144, 255, 0.6)',
  success: 'rgba(82, 196, 26, 0.6)',
  warning: 'rgba(250, 173, 20, 0.6)',
  error: 'rgba(245, 34, 45, 0.6)'
}


</script>

<template>
  <div class="tips" :style="{ backgroundColor: color[props.type] || color.notification }">
    <component class="icon" :is="icon[props.type] || icon.notification"></component>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tips {
  display: flex;
  flex-direction: row;
  padding: 8px 18px 8px 12px;
}

.tips .icon {
  margin-top: 8px !important;
  margin-right: 12px !important;
  font-size: 36px !important;
}

.tips .content >>> * {
  margin: 4px 0;
  font-size: 14px;
  color: #fff;
}
</style>