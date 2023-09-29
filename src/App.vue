<template>
  <MainButton @click="showUserFormModal"> Добавить </MainButton>
  <UserDataTable :userList="userList" />
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
          fullName: "ilya nachalnik",
          phone: "+2423423",
          level: 0,
          isChildrenOpen: false,
          children: [
            {
              id: "321",
              fullName: "ilya child 1",
              phone: "+2423423",
              parentId: "123",
              level: 1,
              isChildrenOpen: false
            },
            {
              id: "333",
              fullName: "ilya child 2",
              phone: "+2423423",
              parentId: "123",
              level: 1,
              isChildrenOpen: false,
              children: [
                {
                  id: "4",
                  fullName: "ilya child 2 child",
                  phone: "+3242",
                  parentId: "333",
                  level: 2,
                  isChildrenOpen: false
                },
              ],
            },
          ],
        },
        {
          id: "334",
          fullName: "nikita",
          phone: "+2423423",
          level: 0,
          isChildrenOpen: false,
          children: [
            {
              id: "335",
              fullName: "nikita child 1",
              phone: "+2423423",
              parentId: "334",
              level: 1,
              isChildrenOpen: false
            },
            {
              id: "336",
              fullName: "nikita child 2",
              phone: "+2423423",
              parentId: "334",
              level: 1,
              isChildrenOpen: false
            },
          ],
        },
      ],
    }
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
    },
  },
}
</script>

<style></style>
