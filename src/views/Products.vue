<template>
  <div>
    <el-row class="row">
      <el-col :span="22">
        <h2>Produkts</h2>
      </el-col>
      <el-col :span="2">
        <el-button @click="clickDialog()" type="primary">Add</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="Id" width="200px"/>
        <el-table-column prop="name" label="Name" width="180px"/>
        <el-table-column prop="createdDate" label="Date" width="250px"/>
        <el-table-column prop="category.name" label="Category name"/>
        <el-table-column prop="price" label="Price"/>
        <el-table-column prop="expireDate" label="Expire date"/>
        <el-table-column label="Operations" width="120px">
          <template #default="props">
            <el-button
                link type="primary"
                @click="clickEdit(props)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil"/>
            </el-button>
            <el-button
                link type="primary"
                size="small"
                @click="clickDelete(props)"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Id">
          <el-input v-model="form.id"/>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item  label="Category name">
          <el-select v-model="form.category" value-key="id" placeholder="Select">
            <el-option v-for="(item, index) of getCategories"
                       :key="index"
                       :label="item.name"
                       :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="price" label="Price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item prop="expireDate" label="Expire date">
          <el-input v-model="form.expireDate"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span>
        <el-button @click="closeForm()" >Cancel</el-button>
        <el-button type="primary" @click="formSaqlash()">Saqlash</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import useStore from "../store/store";

export default {
  name: "Products",
  setup() {
    const { getCategories, setCategories, getProducts, setProducts } = useStore();
    return { getCategories, setCategories, getProducts, setProducts }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        index:null,
        id: null,
        name: '',
        price: null,
        product: null,
        expireDate: null,
        category: null,
      },
      tableData: this.getProducts,
      getCategories: this.getCategories,
    }
  },
  methods: {
    closeForm() {
      this.dialogVisible = false;
      this.removeForm()
    },
    clickDialog() {
      this.dialogVisible = true
    },
    formSaqlash() {
        if (this.form.index !== null){
          this.tableData[this.form] = JSON.parse(JSON.stringify(this.form))
        } else {
          this.tableData.push(JSON.parse(JSON.stringify(this.form)))
        }
        this.setProducts(this.tableData)
      this.dialogVisible = false
      this.removeForm();
    },
    removeForm(){
      this.form = {
        index: null,
        id: null,
        name: '',
        price: null,
        product: null,
        expireDate: null,
        category: null,
      }
    },
    clickEdit(props) {
      const { row } = props;
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true
    },
    clickDelete(props) {
      const { row } = props;
      axios.delete('http://localhost:8080/api/product/' + row.id)
      .then(() => {
        this.getAllProducts()
      })
       },
    getAllProducts() {
      axios.get('http://localhost:8080/api/product')
      .then(({data}) => {
        this.tableData = data;
      })
    },
    getAllCategories() {
      axios.get('http://localhost:8080/api/category')
          .then(({data}) => {
            this.categories = data;
          })
    }
  },
  mounted() {
    this.getAllProducts();
    this.getAllCategories();
  }
}
</script>

<style scoped>

.row{
  align-items: center;
}
</style>