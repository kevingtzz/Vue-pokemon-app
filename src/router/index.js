import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Favorites from '@/views/Favorites.vue';
import Documentation from '@/views/Documentation.vue';
import Details from '@/views/Details.vue';
import SignUp from '@/views/Auth/SignUp.vue';
import LogIn from '@/views/Auth/LogIn.vue';

import { getCurrentUser } from '@/utils/firebase/firebase.utils';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: Documentation,
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details,
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((rute) => rute.meta.requireAuth)) {
    const user = getCurrentUser();
    if (user) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
