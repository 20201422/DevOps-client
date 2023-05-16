import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue";
import Main from "@/views/MainView.vue";

import Project from "@/components/Project.vue";
import Iteration from "@/components/Iteration.vue";
import Work from "@/components/Work.vue";
import Story from "@/components/Story.vue";

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'main',
    component: Main,
    // props: (route) => ({
    //   userName: route.query.userName,
    //   userType: route.query.userType,
    // }),
    children: [
      { path: '/Main', redirect: '/Main/Project', },
      { path: 'Project', component: Project, },
      { path: 'Iteration', component: Iteration, },
      { path: 'Work', component: Work, },
      { path: 'Story', component: Story, },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
