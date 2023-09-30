<template>
  <template v-for="user in users" :key="user.id">
    <tr @click="toggleChildren(user)" class="table-row">
      <td
        class="table-cell name"
        :style="{ 'margin-left': tableRowMargin(user) }"
        :class="{ 'has-children': user.children }"
      >
        <plus-icon
          v-if="user.children && !user.isChildrenOpen"
          class="plus-icon"
        />
        <minus-icon
          v-if="user.children && user.isChildrenOpen"
          class="plus-icon"
        />
        <p class="name-text">{{ user.fullName }}</p>
      </td>
      <td class="table-cell phone">{{ user.phone }}</td>
    </tr>
    <table-row
      v-if="user.children && user.isChildrenOpen"
      :users="user.children"
    />
  </template>
</template>

<script>
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import MinusIcon from "@/assets/icons/MinusIcon.vue"

export default {
  name: "TableRow",
  props: {
    users: {
      type: Array,
    },
  },
  components: {
    PlusIcon,
    MinusIcon,
  },
  computed: {
    tableRowMargin() {
      return (user) => `${user.level * 20}px`
    },
  },
  methods: {
    toggleChildren(user) {
      user.isChildrenOpen = !user.isChildrenOpen
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
}

td {
  border: 1px solid black;
  padding: 0.5em;
}

td.has-children {
  cursor: pointer;
}

th {
  background: var(--bg-secondary-color);
  padding: 0.5em;
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
