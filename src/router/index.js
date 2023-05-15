import { createRouter, createWebHistory } from 'vue-router'

import MainView from "@/views/MainView.vue";

import Project from "@/components/Project.vue";
import Iteration from "@/components/IterationVue.vue";
import Work from "@/components/Work.vue";
import Story from "@/components/Story.vue";

const routes = [
  {
    path: '/',
    redirect: '/MainView'
  },
  {
    path: '/MainView',
    name: 'mainView',
    component: MainView,
    children: [
      { path: '/MainView', redirect: '/MainView/Project', },
      { path: 'Project', component: Project },
      { path: 'Iteration', component: Iteration },
      { path: 'Work', component: Work },
      { path: 'Story', component: Story },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
