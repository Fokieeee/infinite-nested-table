<template>
  <template v-for="employee in employees" :key="employee.id">
    <tr @click="toggleChildren(employee)" class="table-row">
      <td
        class="table-cell name"
        :class="{ 'has-children': employee.children }"
        :style="{ 'margin-left': tableRowMargin(employee) }"
      >
        <div class="icon-container">
          <plus-icon
            v-if="employee.children && !employee.isChildrenOpen"
            class="plus-icon"
          />

          <minus-icon
            v-if="employee.children && employee.isChildrenOpen"
            class="plus-icon"
          />
        </div>

        <p class="name-text">{{ employee.name }}</p>
      </td>

      <td class="table-cell phone">{{ employee.phone }}</td>
    </tr>

    <table-body
      v-if="employee.children && employee.isChildrenOpen"
      @updateEmployees="updateEmployees"
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
  emits: {
    updateEmployees: null,
  },
  methods: {
    toggleChildren(employee) {
      employee.isChildrenOpen = !employee.isChildrenOpen
      this.$emit("updateEmployees", this.employees)
    },
    updateEmployees() {
      this.$emit("updateEmployees", this.employees)
    },
  },
}
</script>

<style scoped>
.table-cell {
  padding: 0.5em;
}

.table-row {
  border: 1px solid var(--border-color);
}

.table-cell.has-children {
  cursor: pointer;
}

.icon-container {
  width: 20px;
}

.table-cell {
  text-align: center;
}

.table-cell.name {
  display: flex;
  align-items: center;
}

.table-cell.phone {
  text-align: left;
  border: 1px solid var(--border-color);
  padding-left: 1.5rem;
}

.name-text {
  margin-left: 1rem;
}

.plus-icon {
  width: 10px;
}
</style>
