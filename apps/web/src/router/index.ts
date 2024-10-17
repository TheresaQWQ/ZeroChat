import {createMemoryHistory, createRouter} from "vue-router";

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/HomeView.vue'),
  meta: {
    title: 'Home'
  }
}]

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Home';
  document.title = `${title} - ZeroChat`;

  next();
})

export default router;
