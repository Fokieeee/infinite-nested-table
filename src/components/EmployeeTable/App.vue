<template>
  <table class="table">
    <thead @click="handleTableHeadClick">
      <tr class="header">
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
.table {
  /* margin: 1em auto; */
  width: 80%;
  max-width: 700px;
  border-collapse: collapse;
  border: 1px solid #dddddd;
}

.head-cell {
  font: var(--font-l);
  background: var(--bg-secondary-color);
  padding: 0.5em;
}

.header {
  cursor: pointer;
}
</style>
