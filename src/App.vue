<template>
  <main-button @click="showUserFormModal"> Добавить </main-button>
  <user-data-table :users="users" @sortUsers="sortUsers" />
  <user-form-modal
    v-if="isModalVisible"
    @close="closeUserFormModal"
    @submit="addNewUser"
    :users="users"
  />
</template>

<script>
import MainButton from "./components/DefaultButton/MainButton.vue"
import UserDataTable from "./components/UserDataTable.vue"
import UserFormModal from "./components/UserFormModal.vue"

export default {
  name: "App",
  components: {
    MainButton,
    UserDataTable,
    UserFormModal,
  },
  data() {
    return {
      isModalVisible: false,
      users: [
        {
          id: "123",
          fullName: "Илья",
          phone: "+2423423",
          level: 0,
          isChildrenOpen: false,
          children: [
            {
              id: "321",
              fullName: "Андрей илья child",
              phone: "+2423423",
              parentId: "123",
              level: 1,
              isChildrenOpen: false,
            },
            {
              id: "333",
              fullName: "Никита илья child",
              phone: "+2423423",
              parentId: "123",
              level: 1,
              isChildrenOpen: false,
              children: [
                {
                  id: "4",
                  fullName: "Вася Никита child",
                  phone: "+3242",
                  parentId: "333",
                  level: 2,
                  isChildrenOpen: false,
                },
              ],
            },
          ],
        },
        {
          id: "334",
          fullName: "Никита",
          phone: "+2423423",
          level: 0,
          isChildrenOpen: false,
          children: [
            {
              id: "335",
              fullName: "Влад никита child",
              phone: "+2423423",
              parentId: "334",
              level: 1,
              isChildrenOpen: false,
            },
            {
              id: "336",
              fullName: "Валера никита child",
              phone: "+2423423",
              parentId: "334",
              level: 1,
              isChildrenOpen: false,
            },
          ],
        },
      ],
    }
  },
  created() {
    const users = JSON.parse(localStorage.getItem("users"))
    this.users = users
  },
  methods: {
    showUserFormModal() {
      this.isModalVisible = true
    },
    closeUserFormModal() {
      this.isModalVisible = false
    },
    addNewUser(newUser) {
      this.insertUser(this.users, newUser)
    },
    insertUser(users, newUser) {
      if (newUser.level === 0) {
        users.push(newUser)
      } else {
        users.forEach((user) => {
          if (user.id === newUser.parentId) {
            if (!user.children) {
              user.children = []
            }
            user.children.push(newUser)
            // break
          } else if (user.children) {
            this.insertUser(user.children, newUser)
          }
        })
      }
      localStorage.setItem("users", JSON.stringify(this.users))
    },
    sortUsers() {
      this.users = this.recursiveSort(this.users)
      localStorage.setItem("users", JSON.stringify(this.users))
    },
    recursiveSort(arr) {
      arr.sort((a, b) => {
        if (a.fullName < b.fullName) return -1
        if (a.fullName > b.fullName) return 1
        return 0
      })

      for (const item of arr) {
        if (item.children && item.children.length > 0) {
          this.recursiveSort(item.children)
        }
      }
      return arr
    },
  },
}
</script>

<style></style>
