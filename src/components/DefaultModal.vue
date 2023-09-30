<template>
  <div @click.stop="close" class="modal-backdrop">
    <div @click.stop class="modal">
      <slot name="header"> </slot>

      <slot name="body"> </slot>

      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFormModal",
  emits: {
    closeModal: null,
  },
  methods: {
    close() {
      this.$emit("close")
    },
    mounted() {
      document.addEventListener("keydown", this.handleKeydown)
    },
    beforeUnmount() {
      document.removeEventListener("keydown", this.handleKeydown)
    },
    handleKeydown(e) {
      if (e.key === "Escape") {
        this.close()
      }
    },
  },
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--bg-color);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 2rem;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
