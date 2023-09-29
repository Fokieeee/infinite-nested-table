<template>
  <MainButton @click="showUserFormModal"> Добавить </MainButton>
  <UserDataTable :userList="userList" @sortUserList="sortUserList" />
  <UserFormModal
    v-if="isModalVisible"
    @close="closeUserFormModal"
    @submit="addNewUser"
    :userList="userList"
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
      userList: [
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
    const stringifiedUserList = JSON.parse(localStorage.getItem("userList"))
    this.userList = stringifiedUserList
  },
  methods: {
    showUserFormModal() {
      this.isModalVisible = true
    },
    closeUserFormModal() {
      this.isModalVisible = false
    },
    addNewUser(newUser) {
      this.insertUser(this.userList, newUser)
    },
    insertUser(userList, newUser) {
      if (newUser.level === 0) {
        userList.push(newUser)
      } else {
        for (const user of userList) {
          if (user.id === newUser.parentId) {
            if (!user.children) {
              user.children = []
            }
            user.children.push(newUser)
            break
          } else if (user.children) {
            this.insertUser(user.children, newUser)
          }
        }
      }
      localStorage.setItem("userList", JSON.stringify(this.userList))
    },
    sortUserList() {
      this.userList = this.recursiveSort(this.userList)
      localStorage.setItem("userList", JSON.stringify(this.userList))
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
