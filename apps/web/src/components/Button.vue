<template>
  <button class="btn" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--theme-brand-color);
  border: none;
  color: var(--theme-text-color-primary);
  width: 100%;
  padding: 12px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: var(--theme-shadow-1);
}

.btn:hover {
  background-color: var(--theme-brand-color-hover);
  box-shadow: var(--theme-shadow-2);
}

.btn:active {
  background-color: var(--theme-brand-color-active);
  box-shadow: var(--theme-shadow-1);
}
</style>