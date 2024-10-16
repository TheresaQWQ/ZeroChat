<template>
  <div class="card-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-container {
  background-color: var(--theme-bg-color-container);
  border-radius: 4px;
  padding: 16px;
  box-shadow: var(--theme-shadow-1);
  margin: 24px;
  display: flex;
  flex-direction: column;
  transition: all .2s ease-in-out;
}

.card-container:hover {
  box-shadow: var(--theme-shadow-2);
}
</style>