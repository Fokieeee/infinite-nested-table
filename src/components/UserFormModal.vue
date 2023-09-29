<template>
  <DefaultModal @close="close">
    <template v-slot:header>
      <p>Добавить пользователя</p>
    </template>

    <template v-slot:body>
      <div class="name-input-container">
        <p>Имя</p>
        <input type="Text" placeholder="Иван Иванов" v-model="fullName" />
      </div>

      <div class="phone-input-container">
        <p>Телефон</p>
        <input type="tel" placeholder="Номер телефона" v-model="phone" />
      </div>

      <div class="parent-select-container">
        <p>Начальник</p>

        <select name="parents" class="parent-select" v-model="parentId">
          <option disabled value="null">Выберите начальника</option>
          <option value="">Главный начальник</option>

          <template v-for="user in allUsers" :key="user.id">
            <option :value="user.id">{{ user.fullName }}</option>
          </template>
        </select>
      </div>
    </template>

    <template v-slot:footer>
      <MainButton @click="submit">
        Сохранить
      </MainButton>
      <p v-if="incorrectSubmit">Заполните все поля *</p>
    </template>
  </DefaultModal>
</template>

<script>
import MainButton from "./DefaultButton/MainButton.vue"
import DefaultModal from "./DefaultModal.vue"
import { uuid } from "vue-uuid"

export default {
  name: "UserFormModal",
  components: {
    DefaultModal,
    MainButton,
  },
  props: {
    userList: {
      type: Array,
    },
  },
  data() {
    return {
      fullName: null,
      phone: "+7",
      parentId: null,
      incorrectSubmit: false,
    }
  },
  emits: {
    close: null,
    submit: null,
  },
  computed: {
    allUsers() {
      const allUsers = []

      const extractAllUsers = (userList) => {
        for (let user of userList) {
          allUsers.push(user)

          if (user.children && user.children.length > 0) {
            extractAllUsers(user.children)
          }
        }
      }

      extractAllUsers(this.userList)
      return allUsers
    },
    isFormFilled() {
      return !!this.fullName && !!this.phone && this.parentId !== null
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
    submit() {
      if (this.isFormFilled) {
        const newUserLevel = this.parentId
          ? this.allUsers.find((user) => user.id === this.parentId).level + 1
          : 0
        this.$emit("submit", {
          id: uuid.v1(),
          fullName: this.fullName,
          phone: this.phone,
          parentId: this.parentId,
          level: newUserLevel,
          isChildrenOpen: false
        })
        this.close()
      } else {
        this.incorrectSubmit = true
      }
    },
  },
}
</script>

<style scoped>
.parent-select {
  all: unset;
}
</style>
