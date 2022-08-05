<template>
  <div class="menu-icon">
    <font-awesome-icon icon="fa-solid fa-bars"
        @click="menuToggle()" class="icon"/>
    <h2 >Header</h2>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return{

    }
  },
  methods: {
    menuToggle() {
      this.$emit('menu-toggle')
    }
  }

}
</script>

<style scoped>
.menu-icon{
  padding-left: 15px;
  font-size: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.icon{
  width: 24px;
  height: 24px;
}
.icon:hover{
  color: deepskyblue;
}
</style>