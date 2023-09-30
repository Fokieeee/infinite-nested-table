<template>
  <button type="button" class="main-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "MainButton",
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
  background: var(--bg-secondary-color-lighter);
}

.main-button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

.main-button:active {
  transform: scale(0.99);
}
</style>
