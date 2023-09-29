<template>
  <table class="table-container">
    <thead>
      <tr class="table-header">
        <th class="table-cell head" v-for="title in tableTitles" :key="title">
          {{ title }}
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-for="user in userList" :key="user.id">
        <tr class="table-row">
          <td class="table-cell name">
            <PlusIcon class="plus-icon" />
            <p class="name-text">{{ user.fullName }}</p>
          </td>
          <td class="table-cell phone">{{ user.phone }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import PlusIcon from "@/assets/icons/PlusIcon.vue"

export default {
  name: "UserDataTable",
  data() {
    return {
      tableTitles: ["Имя", "Телефон"],
    }
  },
  components: {
    PlusIcon,
  },
  props: {
    userList: {
      type: Array,
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
