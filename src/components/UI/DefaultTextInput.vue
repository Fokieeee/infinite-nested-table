<template>
  <div class="text-input-container">
    <label v-if="hasLabel" class="text-input-label">{{ label }}</label>
    <input
      @input="handleInput"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="text-input"
    />
  </div>
</template>

<script>
export default {
  name: "DefaultTextInput",
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    hasLabel: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
    },
  },
  emits: {
    "update:modelValue": null,
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit("update:modelValue", value)
    },
  },
}
</script>

<style scoped>
.text-input-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.text-input-label {
  margin-top: 1rem;
}

.text-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--border-color);
  padding: 2px 0;
  background: transparent;
}
</style>
