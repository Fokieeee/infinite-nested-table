<template>
  <div class="table-container">
    <default-button @click="openEmployeeFormModal"> Добавить </default-button>

    <employee-table @sortEmployees="sortEmployees" :employees="employees" />
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
      employees: [
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
    this.loadEmployeesFromLocalStorage()
  },
  methods: {
    loadEmployeesFromLocalStorage() {
      const employees = JSON.parse(localStorage.getItem("employees")) || []
      this.employees = employees
    },
    addNewEmployee(newEmployee) {
      addItemToArray(this.employees, newEmployee)
      localStorage.setItem("employees", JSON.stringify(this.employees))
    },
    sortEmployees() {
      this.employees = sortArray(this.employees)
      localStorage.setItem("employees", JSON.stringify(this.employees))
    },
    openEmployeeFormModal() {
      this.isModalVisible = true
    },
    closeEmployeeFormModal() {
      this.isModalVisible = false
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
