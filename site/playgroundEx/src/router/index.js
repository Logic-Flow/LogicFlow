import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: 'gallery',
    children: [
      {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Gallery/index.vue'),
      },
      {
        path: '/playground',
        name: 'Playground',
        component: () => import('../views/Playground/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
