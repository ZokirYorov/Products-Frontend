import { defineStore } from "pinia/dist/pinia";
import { useStorage }  from "@vueuse/core";

const useStore = defineStore('store', {
    state: () => ({
        products: useStorage('products', []),
        accounts: useStorage('accounts', []),
    }),
    getters: {
        getProducts: (state) => state.products,
        getAccounts: (state) => state.accounts,
    },
    actions: {
        setProducts(products) {
            this.products = products
        },
        setAccounts(accounts) {
            this.accounts = accounts
        },
    }
})

export default useStore;