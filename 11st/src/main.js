import 'regenerator-runtime'
import Vue from 'vue'
import store from './store'
import App from './App'
import searchData from "./plugins/searchData";
import fetchData from "./plugins/fetchData";

Vue.use(searchData) // Vue 전용 플러그인을 만들어 가져와 연결했다.
Vue.use(fetchData)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})