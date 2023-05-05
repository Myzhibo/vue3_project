import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: ()=> import("../views/Login.vue")
    },
    {
        path: "/about",
        name: "about",
        component: ()=> import("../views/About.vue")
    },
    {
        path: "/video",
        name: "video",
        component: ()=> import("../views/Video.vue")
    },
    {
        path: "/vip",
        name: "vip",
        component: ()=> import("../views/Vip.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;