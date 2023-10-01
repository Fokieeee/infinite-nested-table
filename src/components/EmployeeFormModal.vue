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

          <option
            v-for="employee in allEmployees"
            :key="employee.id"
            :value="employee.id"
          >
            {{ employee.fullName }}
          </option>
        </select>
      </div>
    </template>

    <template v-slot:footer>
      <default-button @click="submit"> Сохранить </default-button>

      <p v-if="isValidData">Заполните все поля *</p>
    </template>
  </default-modal>
</template>

<script>
import DefaultButton from "./UI/DefaultButton.vue"
import DefaultModal from "./UI/DefaultModal.vue"
import { uuid } from "vue-uuid"

export default {
  name: "EmployeeFormModal",
  components: {
    DefaultModal,
    DefaultButton,
  },
  props: {
    employees: {
      type: Array,
      default: () => [],
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
    allEmployees() {
      const allEmployees = []

      const extractAllEmployees = (employees) => {
        for (let employee of employees) {
          allEmployees.push(employee)

          if (employee.children && employee.children.length > 0) {
            extractAllEmployees(employee.children)
          }
        }
      }

      extractAllEmployees(this.employees)
      return allEmployees
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
        const newEmployeeLevel = this.parentId
          ? this.allEmployees.find((employee) => employee.id === this.parentId)
              .level + 1
          : 0
        this.$emit("submit", {
          id: uuid.v1(),
          fullName: this.fullName,
          phone: this.phone,
          parentId: this.parentId,
          level: newEmployeeLevel,
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
