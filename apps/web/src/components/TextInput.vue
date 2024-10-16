<script setup lang="ts">
import {defineProps, ref} from 'vue'

const isFocused = ref(false)

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String
  }
})

const updateFocus = (focus: boolean) => {
  isFocused.value = focus && props.modelValue.length === 0;
}
</script>

<template>
  <div class="input">
    <input type="text" @focus="updateFocus(true)" @blur="updateFocus(false)" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <label :class="isFocused && 'focus'">{{ placeholder }}</label>
  </div>
</template>

<style scoped>
.input {
  position: relative;
  width: 100%;
  margin-top: 24px;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 2px;
  background-color: var(--theme-bg-color-component);
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  color: var(--theme-text-color-primary);
  font-size: 16px;
  height: 18px;
}

input:focus {
  border-bottom: 2px solid var(--theme-text-color-primary);
}

label {
  position: absolute;
  top: -2px;
  left: 8px;
  padding: 10px;
  pointer-events: none;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  color: var(--theme-text-color-secondary);
}

label.focus {
  top: -30px;
  left: -6px;
  font-size: 12px;
  color: var(--theme-text-color-primary);
}
</style>