<template>
  <template v-for="user in userList" :key="user.id">
    <tr class="table-row" @click="toggleChildren(user)">
      <td
        class="table-cell name"
        :style="{ marginLeft: getMarginLeft(user) + 'px' }"
        :class="{ hasChildren: user.children }"
      >
        <PlusIcon
          class="plus-icon"
          v-if="user.children && !user.isChildrenOpen"
        />
        <MinusIcon
          class="plus-icon"
          v-if="user.children && user.isChildrenOpen"
        />
        <p class="name-text">{{ user.fullName }}</p>
      </td>
      <td class="table-cell phone">{{ user.phone }}</td>
    </tr>
    <TableRow
      v-if="user.children && user.isChildrenOpen"
      :userList="user.children"
    />
  </template>
</template>

<script>
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import MinusIcon from "@/assets/icons/MinusIcon.vue"

export default {
  name: "TableRow",
  props: {
    userList: {
      type: Array,
    },
  },
  components: {
    PlusIcon,
    MinusIcon,
  },
  methods: {
    getMarginLeft(user) {
      return user.level * 20
    },
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

td.hasChildren {
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

/* @media screen and (max-width: var(--tablet-width)) {
  th,
  td {
    width: auto;
    display: block;
    border: 0;
  }

  th {
    border-left: solid 1px var(--table-border);
    border-right: solid 1px var(--table-border);
    border-bottom: solid 1px var(--table-border);
  }

  td {
    border-left: solid 1px var(--table-border);
    border-right: solid 1px var(--table-border);
    border-bottom: solid 1px var(--table-border);
  }

  .flex-row {
    width: 100%;
  }
} */

.plus-icon {
  width: 10px;
}
</style>
