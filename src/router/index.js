import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue"
import Projects from "@/views/ProjectsView.vue"
import Main from "@/views/MainView.vue"

import Project from "@/components/content/Project.vue"
import Iteration from "@/components/content/Iteration.vue"
import Work from "@/components/content/Work.vue"
import Story from "@/components/content/Story.vue"

import Model from "@/components/Model.vue"
import Table from "@/components/Table.vue"
import UpdateModel from "@/components/UpdateModel.vue"
import StoryMap from "@/components/StoryMap.vue"

import Statistic from "@/components/Statistic.vue"
import UploadFile from "@/components/UploadFile.vue"

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
    path: '/UpdateModel',
    name: 'UpdateModel',
    component: UpdateModel,
  },
  {
    path: '/Table',
    name: 'Table',
    component: Table,
  },
  {
    path: '/StoryMap',
    name: 'StoryMap',
    component: StoryMap,
  },
  {
    path: '/Statistic',
    name: 'Statistic',
    component: Statistic,
  },
  {
    path: '/UploadFile',
    name: 'UploadFile',
    component: UploadFile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
