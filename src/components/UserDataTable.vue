<template>
  <table class="table-container">
    <thead @click="onTableHeadClick">
      <tr class="table-header">
        <th class="table-cell head">
          <p class="table-cell-head-text">Имя</p>
        </th>
        <th class="table-cell head">Телефон</th>
      </tr>
    </thead>

    <tbody>
      <TableRow :userList="userList" />
    </tbody>
  </table>
</template>

<script>
import TableRow from "./TableRow.vue"

export default {
  name: "UserDataTable",
  components: {
    TableRow,
  },
  props: {
    userList: {
      type: Array,
    },
  },
  emits: {
    sortUserList: null,
  },
  methods: {
    onTableHeadClick() {
      this.$emit("sortUserList")
    }
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

th {
  background: var(--bg-secondary-color);
  padding: 0.5em;
}

.table-header {
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
</style>
