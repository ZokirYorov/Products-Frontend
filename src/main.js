import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia} from 'pinia/dist/pinia';
import App from './App.vue'
import about from "./views/about.vue";
import Account from "./views/Account.vue";
import categories from "./views/categories.vue";
import products from "./views/Products.vue";
import Categories2 from "./views/Categories2.vue";
import { createRouter, createWebHashHistory} from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faUserSecret,
    faBars,
    faSpinner,
    faBook,
    faUserGear,
    faClipboardList,
    faUser,
    faAppleWhole,
    faTrashArrowUp,
    faTrashCan,
    faPencil

} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faBars, faSpinner, faBook,faUserGear,faClipboardList,faUser, faAppleWhole,faTrashArrowUp,
    faTrashCan,faPencil)

const pinia = createPinia();

const routes =[
    {
        name: "Main",
        path: "/",
        redirect: "/about",
    },
    {
        name: "AboutPage",
        path: "/about",
        component: about,
    },
    {
        name: "AccountPage",
        path: "/account",
        component: Account,
    },
    {
        name: "CategoriesPage",
        path: "/categories",
        component: categories,
    },
    {
        name: "ProductPage",
        path: "/products",
        component: products,
    },
    {
        name: "CategoryPage",
        path: "/categories2",
        component: Categories2,
    }
]

const router =createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')
