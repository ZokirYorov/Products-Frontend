<template>
  <el-row>
    <el-col :span="22">
      <h2>Ro'yxat</h2>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="addAccount()">Add</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="firstName" label="Ismi" width="300px"/>
      <el-table-column prop="lastName" label="Familiyasi" width="300px"/>
      <el-table-column prop="date" label="Yili" width="300px"/>
      <el-table-column prop="nationality" label="Millati"/>
      <el-table-column label="Sozlamalar" width="120px">
        <template #default="props">
          <el-button
              link type="primary"
              @click="clickEdit(props)"
          >
            <font-awesome-icon icon="fa-solid fa-pencil"/>
          </el-button>
          <el-button
              link type="primary"
              @click="clickDelete(props)"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible">
      <el-form :model="menu">
        <el-form-item label="Ismi">
          <el-input v-model="menu.firstName" />
        </el-form-item>
        <el-form-item label="Familiyasi">
          <el-input v-model="menu.lastName"/>
        </el-form-item>
        <el-form-item label="Yili">
          <el-input v-model="menu.date" />
        </el-form-item>
        <el-form-item label="Millati">
          <el-input v-model="menu.nationality"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeForm()">Cancel</el-button>
          <el-button @click="saveForm()" type="primary">Saqlash</el-button>
        </span>
      </template>
    </el-dialog>
  </el-row>
</template>

<script>
import useStore from '../store/store.js';
export default {
  name: "Account",
  setup() {
    const { getAccounts, setAccounts } = useStore()
    return {
      getAccounts,
      setAccounts
    }
  },
  data() {
    return {
      dialogVisible: false,
       menu : {
        index: null,
          firstName: '',
          lastName: '',
          date: '',
         nationality: ''
        },
      tableData: this.getAccounts,
    }
  },

  methods: {
    addAccount() {
      this.dialogVisible = true;
      this.removeForm()
    },
    saveForm() {
      if (this.menu.index != null) {
        this.tableData[this.menu.index] = JSON.parse(JSON.stringify(this.menu));
      } else {
        this.tableData.push(JSON.parse(JSON.stringify(this.menu)))
      }
      this.setAccounts(this.tableData)
      this.dialogVisible = false
    },
    clickEdit(props) {
      const {$index, row } = props;
      this.menu = JSON.parse(JSON.stringify(row));
      this.menu.index = $index
      this.dialogVisible = true
    },
    clickDelete(props) {
      const { $index } = props;
      this.tableData.splice($index, 1);
      this.setAccounts(this.tableData)
    },
    closeForm(){
      this.dialogVisible = false;
      this.removeForm()
    },
    removeForm() {
      this.menu = {
        index: null,
        firstName: '',
        lastName: '',
        date: '',
      }
    }
  }
}
</script>

<style scoped>

</style>