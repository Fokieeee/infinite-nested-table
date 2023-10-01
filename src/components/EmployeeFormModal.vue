<template>
  <default-modal @close="close">
    <template v-slot:header>
      <p>Добавить пользователя</p>
    </template>

    <template v-slot:body>
      <div class="text-input-container name">
        <label class="text-input-label">Имя</label>
        <input
          type="Text"
          v-model="fullName"
          placeholder="Иван Иванов"
          class="text-input"
        />
      </div>

      <div class="text-input-container phone">
        <label class="text-input-label">Телефон</label>
        <input
          label="телефон"
          type="tel"
          v-model="phone"
          placeholder="Номер телефона"
          class="text-input"
        />
      </div>

      <div class="parent-select-container">
        <label>Начальник</label>

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
.text-input-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.text-input-label {
  margin-top: 1rem;
}

.text-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--border);
  padding: 2px 0;
  background: transparent;
}

.parent-select-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 1rem;
}

.parent-select {
  width: 100%;
  border: 0;
  padding: 0.3rem;
}
</style>
