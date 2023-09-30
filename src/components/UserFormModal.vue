<template>
  <default-modal @close="close">
    <template v-slot:header>
      <p>Добавить пользователя</p>
    </template>

    <template v-slot:body>
      <div class="name-input-container">
        <p>Имя</p>
        <input type="Text" v-model="fullName" placeholder="Иван Иванов" />
      </div>

      <div class="phone-input-container">
        <p>Телефон</p>
        <input type="tel" v-model="phone" placeholder="Номер телефона" />
      </div>

      <div class="parent-select-container">
        <p>Начальник</p>

        <select v-model="parentId" name="parents" class="parent-select">
          <option disabled value="null">Выберите начальника</option>
          <option value="">Главный начальник</option>

          <option v-for="user in allUsers" :key="user.id" :value="user.id">
            {{ user.fullName }}
          </option>
        </select>
      </div>
    </template>

    <template v-slot:footer>
      <main-button @click="submit"> Сохранить </main-button>
      <p v-if="isValidData">Заполните все поля *</p>
    </template>
  </default-modal>
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
    users: {
      type: Array,
    },
  },
  data() {
    return {
      fullName: null,
      phone: "+7",
      parentId: null,
      isValidData: false,
    }
  },
  emits: {
    close: null,
    submit: null,
  },
  computed: {
    allUsers() {
      const allUsers = []

      const extractAllUsers = (users) => {
        for (let user of users) {
          allUsers.push(user)

          if (user.children && user.children.length > 0) {
            extractAllUsers(user.children)
          }
        }
      }

      extractAllUsers(this.users)
      return allUsers
    },
    isFormFilled() {
      return (
        Boolean(this.fullName) && Boolean(this.phone) && this.parentId !== null
      )
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
          isChildrenOpen: false,
        })
        this.close()
      } else {
        this.isValidData = true
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
