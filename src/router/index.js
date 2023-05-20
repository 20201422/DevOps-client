import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue";
import Projects from "@/views/ProjectsView.vue";
import Main from "@/views/MainView.vue";

import Project from "@/components/Project.vue";
import Iteration from "@/components/Iteration.vue";
import Work from "@/components/Work.vue";
import Story from "@/components/Story.vue";

import Model from "@/components/Model.vue";
import Table from "@/components/Table.vue"
import Update from "@/components/UpdateModel.vue";

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
    path: '/Projects',
    name: 'Projects',
    component: Projects
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
  {
    path: '/Model',
    name: 'Model',
    component: Model,
  },
  {
    path: '/Update',
    name: 'Update',
    component: Update,
  },
  {
    path: '/Table',
    name: 'Table',
    component: Table,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
