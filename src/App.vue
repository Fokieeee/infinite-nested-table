<template>
  <MainButton @click="showUserFormModal"> Добавить </MainButton>
  <UserDataTable :userList="filteredUserList" />
  <UserFormModal
    v-if="isModalVisible"
    @close="closeUserFormModal"
    @submit="addNewUser"
    :userList="filteredUserList"
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
          id: "335",
          fullName: "nikita child 1",
          phone: "+2423423",
          parentId: "334",
          level: 1,
        },
        {
          id: "336",
          fullName: "nikita child 2",
          phone: "+2423423",
          parentId: "334",
          level: 1,
        },
        {
          id: "321",
          fullName: "ilya child 1",
          phone: "+2423423",
          parentId: "123",
          level: 1,
        },
        {
          id: "123",
          fullName: "ilya nachalnik",
          phone: "+2423423",
          level: 0,
          childIds: ["321", "333"],
        },
        {
          id: "333",
          fullName: "ilya child 2",
          phone: "+2423423",
          parentId: "123",
          level: 1,
        },
        {
          id: "334",
          fullName: "nikita",
          phone: "+2423423",
          level: 0,
        },
        {
          id: "2323",
          fullName: "xui",
          phone: "+32423423",
          level: 1,
          parentId: "123",
        },
      ],
      rootUsersId: ["123", " 334"],
    }
  },
  methods: {
    showUserFormModal() {
      this.isModalVisible = true
    },
    closeUserFormModal() {
      this.isModalVisible = false
    },
    addNewUser(userObject) {
      this.userList.push(userObject)
    },
    sortUserList(userList) {
      const sortedList = []
      function findChildren(parentId, level) {
        const children = userList.filter(
          (user) => user.parentId === parentId && user.level === level
        )

        for (const child of children) {
          sortedList.push(child)
          findChildren(child.id, level + 1)
        }
      }

      const topLevelUsers = userList.filter((user) => user.level === 0)

      for (const user of topLevelUsers) {
        sortedList.push(user)
        findChildren(user.id, user.level + 1)
      }

      return sortedList
    },
  },
  computed: {
    filteredUserList() {
      const xui = this.sortUserList(this.userList)
      return xui
    },
  },
}
</script>

<style></style>
