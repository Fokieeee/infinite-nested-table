<template>
  <default-modal @close="close">
    <template v-slot:header>
      <p>Добавить пользователя</p>
    </template>

    <template v-slot:body>
      <form>
        <default-text-input
          label="Имя"
          placeholder="Иван"
          type="text"
          v-model="name"
        />

        <default-text-input
          label="Телефон"
          placeholder="+ 7 (...) .. .. .."
          type="tel"
          v-model="phone"
        />

        <div class="parent-select-container">
          <label>
            Начальник

            <select v-model="parentId" class="parent-select">
              <option disabled value="null">Выберите начальника</option>
              <option value="">Главный начальник</option>

              <option
                v-for="employee in allEmployees"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.name }}
              </option>
            </select>
          </label>
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <default-button @click="submit"> Сохранить </default-button>

      <p v-if="isCaveatVisible">Заполните все поля *</p>
    </template>
  </default-modal>
</template>

<script>
import DefaultButton from "./UI/DefaultButton.vue"
import DefaultModal from "./UI/DefaultModal.vue"
import { uuid } from "vue-uuid"
import DefaultTextInput from "./UI/DefaultTextInput.vue"
import { flattenArray } from "@/utils/arrayUtils"

export default {
  name: "EmployeeFormModal",
  components: {
    DefaultModal,
    DefaultButton,
    DefaultTextInput,
  },
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: null,
      phone: null,
      parentId: null,
      isCaveatVisible: false,
    }
  },
  emits: {
    close: null,
    submit: null,
  },
  computed: {
    allEmployees() {
      return flattenArray(this.employees)
    },
    isFormFilled() {
      return Boolean(this.name) && Boolean(this.phone) && this.parentId !== null
    },
  },
  methods: {
    submit() {
      if (this.isFormFilled) {
        const newEmployeeLevel = this.parentId
          ? this.allEmployees.find((employee) => employee.id === this.parentId)
              .level + 1
          : 0

        this.$emit("submit", {
          id: uuid.v1(),
          name: this.name,
          phone: this.phone,
          parentId: this.parentId ? this.parentId : null,
          level: newEmployeeLevel,
          isChildrenOpen: false,
        })
        this.close()
      } else {
        this.isCaveatVisible = true
      }
    },
    close() {
      this.$emit("close")
    },
  },
}
</script>

<style scoped>
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
