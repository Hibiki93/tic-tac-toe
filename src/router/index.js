import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gameplay',
        name: 'Game Screen',
        component: () =>
            import ('../views/GamePlay.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () =>
            import ('../views/Setting.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router