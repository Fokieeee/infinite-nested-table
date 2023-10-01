<template>
  <div class="table-container">
    <default-button @click="openEmployeeFormModal"> Добавить </default-button>

    <employee-table
      @sortEmployees="sortEmployees"
      @updateEmployees="updateEmployees"
      :employees="employees"
    />
  </div>

  <employee-form-modal
    v-if="isModalVisible"
    @close="closeEmployeeFormModal"
    @submit="addNewEmployee"
    :employees="employees"
  />
</template>

<script>
import DefaultButton from "@/components/UI/DefaultButton.vue"
import EmployeeTable from "@/components/EmployeeTable/App.vue"
import EmployeeFormModal from "@/components/EmployeeFormModal.vue"
import { addItemToArray, sortArray } from "@/utils/arrayUtils"

export default {
  name: "App",
  components: {
    DefaultButton,
    EmployeeTable,
    EmployeeFormModal,
  },
  data() {
    return {
      isModalVisible: false,
      employees: null
    }
  },
  created() {
    this.loadEmployeesFromLocalStorage()
  },
  methods: {
    loadEmployeesFromLocalStorage() {
      const employees = JSON.parse(localStorage.getItem("employees")) || []
      this.employees = employees
    },
    addNewEmployee(newEmployee) {
      addItemToArray(this.employees, newEmployee)
      this.addEmployeesToLocalStorage()
    },
    sortEmployees() {
      this.employees = sortArray(this.employees)
      this.addEmployeesToLocalStorage()
    },
    openEmployeeFormModal() {
      this.isModalVisible = true
    },
    closeEmployeeFormModal() {
      this.isModalVisible = false
    },
    addEmployeesToLocalStorage() {
      localStorage.setItem("employees", JSON.stringify(this.employees))
    },
    updateEmployees(newEmployees) {
      this.employees = newEmployees
      this.addEmployeesToLocalStorage()
    },
  },
}
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 1em;
  padding: 1em;
}
</style>
