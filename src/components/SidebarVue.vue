<template>
    <div class="left" >
      <div class="spinner">
          <font-awesome-icon icon="fa-solid fa-spinner"/>
          Sidebar
      </div>
      <div
          class="for"
          v-for="(item, index) of menu"
          :key="index"
      >
        <div
            class="menuItem"
            :class="{active: openRouter===item.link}"
            @click="$emit('click-router', item.link)"
        >
          <font-awesome-icon
              style="margin-right: 10px; color: #7952bb"
              :icon="item.icon"/>
          <span
              v-if="!isCollapsed">
              {{item.label}}
          </span>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "sidebar",
  props: {
    open: {
      type: String,
      required: true,
    },
    isCollapsed: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      menu:[
        {
         label : "About",
          icon: 'fa-solid fa-book',
          link: '/about'
        },
        {
          label: 'Account',
          icon: 'fa-solid fa-user',
          link: '/account',
        },
        {
          label: "Categories",
          icon: 'fa-solid fa-clipboard-list',
          link: '/categories'
        },
        {
          label: "Products",
          icon: 'fa-solid fa-apple-whole',
          link: '/products',
        },
        {
          label: "Categories2",
          icon: 'fa-solid fa-clipboard-list',
          link: '/categories2'
        }
      ],
    }
  },
  computed: {
    openRouter() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

.for{
  position: relative;
  top: 50px;
  max-width: 200px;
  margin: auto;
  overflow: hidden;
}
.menuItem{
  padding: 12px;
  border-radius: 5px;
  font-size: 18px;
  gap: 10px;
  overflow: hidden;
}
.menuItem:hover{
  background-color: #588fda;
  cursor: pointer;
}
.active{
  background-color: #588fda;
}
.spinner{
  height: 60px;
  border-radius: 8px;
  width: 100px;
  margin: 40px;
  display: flex;
  align-items: center;
  overflow: inherit;
  gap: 15px;
  font-size: 22px;
}
.left{
  width: 100%;
  background-color: #70a3e8;
  height: 100%;
}
</style>