<template>
  <div class="home">
    <el-row class="row">
      <el-col :span="22">
        <h2 style="color: white; padding-left: 10px">Categories</h2>
      </el-col>
      <el-col :span="2">
        <el-button @click="formVisibleAdd()" type="primary">Add</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="Id" width="200px"/>
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
    <el-dialog v-model="formVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Id">
          <el-input v-model="form.id"/>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Parent">
          <el-select v-model="form.parent"
               value-key="id"
               class="m-2"
               placeholder="Select"
               size="large">
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
              @click="formVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Saqlash</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import useStore from "../store/store.js";
import axios from  'axios'

export default {
  name: "categories",
  setup() {
    const { getCategories, setCategories } = useStore();
    return { getCategories, setCategories}
  },
  data() {
    return {
      formVisible: false,
      form: {
        index: null,
        id: null,
        name: '',
        parent: null,
      },
      tableData: this.getCategories,
    }
  },
  created(){
    this.loadData()
  },
  methods: {
    formVisibleAdd() {
      this.formVisible = true
      this.form = {
        id: null,
        name: "",
        parent: null,
      }
    },
    loadData(){
      axios.get('http://localhost:8080/api/category')
      .then((response ) => {
        this.tableData = response.data
      })
    },
    saveForm() {
      if (this.form.index !== null){
        this.tableData[this.form] = JSON.parse(JSON.stringify(this.form))
      } else {
        this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      }
      this.setCategories(this.tableData)
      this.formVisible = false;
    },
    formEdit(props) {
      const { row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    formDelete(props) {
      const { row } = props;
     axios.delete('http://localhost:8080/api/category/' + row.id)
      .then(() => {
        this.loadData()
      })
    }
  }
}
</script>

<style scoped>
.home{

  background-color: #539f9f
}
.row{
  align-items: center;
}
</style>