<template>
  <table class="table-container">
    <thead @click="handleTableHeadClick">
      <tr class="table-header">
        <th class="head-cell">Имя</th>

        <th class="head-cell">Телефон</th>
      </tr>
    </thead>

    <tbody>
      <table-body :employees="employees" />
    </tbody>
  </table>
</template>

<script>
import TableBody from "./TableBody.vue"

export default {
  name: "EmployeeTable",
  components: {
    TableBody,
  },
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  emits: {
    sortEmployees: null,
  },
  methods: {
    handleTableHeadClick() {
      this.$emit("sortEmployees")
    },
  },
}
</script>

<style scoped>
.table-container {
  margin: 1em auto;
  width: 90%;
  max-width: 600px;
  border-collapse: collapse;
  border: 1px solid black;
}

.head-cell {
  font: var(--font-l);
  background: var(--bg-secondary-color);
  padding: 0.5em;
}

.table-header {
  cursor: pointer;
}
</style>
