<template>
  <button type="button" class="main-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "DefaultButton",
}
</script>

<style scoped>
.main-button {
  all: unset;
  background-color: var(--bg-secondary-color);
  padding: 0.5rem 2rem;
  cursor: pointer;
  border-radius: 5px;
}

.main-button:hover,
.main-button:focus {
  background: var(--bg-secondary-color-darker);
}

.main-button:active {
  transform: scale(0.99);
}
</style>
