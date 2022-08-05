<template>
  <div>
   <el-row class="row">
     <el-col :span="22">
       <h2>Categories2</h2>
     </el-col>
     <el-col :span="2">
       <el-button type="primary" @click="clickDialogVisible()">Add</el-button>
     </el-col>
   </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" width="300px"/>
        <el-table-column prop="createdDate" label="Data" width="300px"/>
        <el-table-column prop="parent.name" label="Parent"/>
        <el-table-column label="Operations" width="120px">
          <template #default="props">
            <el-button
              link type="primary"
              size="small"
              @click="formEdit(props)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil"/>
            </el-button>
            <el-button
              link type="primary"
              size="small"
              @click="formDelete(props)"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Form Add">
      <el-form :model="form">
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Parent">
          <el-select
            v-model="form.parent"
            value-key="id"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item"
            />

          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button
              type="info plain"
            @click="dialogVisible= false"
          >
            Closed
          </el-button>
          <el-button
              type="primary"
            @click="saveForm()"
          >
            Saqlash
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Categories2",
  data() {
    return {
      dialogVisible: false,
      form:{
        id: null,
        name: "",
        parent: null,
      },
      tableData: [],
    }
  },

  methods: {
    removeForm(){
      this.form = {
        id: null,
        name: "",
        parent: null,
      }
    },
    clickDialogVisible(){
      this.dialogVisible = true
      this.removeForm()
    },
    loadData(){
      axios.get('http://localhost:8080/api/category')
      .then((response) => {
        this.tableData = response.data
      })
    },
    saveForm(){
      if (this.form.id != null){
        axios.put('http://localhost:8080/api/category/' + this.form.id, this.form)
        .then(() => {
          this.loadData()
        })
        .catch((ex) => {
          this.$notify({
            title: 'Error',
            message: ex.response.data.error,
            type: 'error',
          })
        })
      } else {
        axios.post('http://localhost:8080/api/category', this.form)
        .then(() => {
          this.loadData()
        })
        .catch((ex) => {
          this.$notify({
            title: 'Error',
            message: ex.response.data.error,
            type: 'error',
          })
        })
      }
      this.removeForm()
      this.dialogVisible = false
    },
    formEdit(props){
      const { row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    formDelete(props) {
      const { row } = props;
      axios.delete('http://localhost:8080/api/category/' + row.id)
      .then(() => {
        this.loadData()
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
.row{
  align-items: center;
}
</style>