<template>
  <template v-for="employee in employees" :key="employee.id">
    <tr @click="toggleChildren(employee)" class="table-row">
      <td
        class="table-cell name"
        :class="{ 'has-children': employee.children }"
        :style="{ 'margin-left': tableRowMargin(employee) }"
      >
        <plus-icon
          v-if="employee.children && !employee.isChildrenOpen"
          class="plus-icon"
        />

        <minus-icon
          v-if="employee.children && employee.isChildrenOpen"
          class="plus-icon"
        />

        <p class="name-text">{{ employee.fullName }}</p>
      </td>

      <td class="table-cell phone">{{ employee.phone }}</td>
    </tr>

    <table-body
      v-if="employee.children && employee.isChildrenOpen"
      :employees="employee.children"
    />
  </template>
</template>

<script>
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import MinusIcon from "@/assets/icons/MinusIcon.vue"

export default {
  name: "TableBody",
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PlusIcon,
    MinusIcon,
  },
  computed: {
    tableRowMargin() {
      return (employee) => `${employee.level * 20}px`
    },
  },
  methods: {
    toggleChildren(employee) {
      employee.isChildrenOpen = !employee.isChildrenOpen
    },
  },
}
</script>

<style scoped>
td {
  padding: 0.5em;
}

tr {
  border: 1px solid #dddddd;
}

td.has-children {
  cursor: pointer;
}

.table-cell {
  text-align: center;
}

.table-cell.head {
  font: var(--font-l);
}

.table-cell.name {
  display: flex;
  align-items: center;
}

.name-text {
  margin-left: 1rem;
}

.plus-icon {
  width: 10px;
}
</style>
