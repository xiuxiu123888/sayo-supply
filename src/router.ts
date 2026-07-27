import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import AboutUs from './pages/AboutUs.vue';
import ServicesPage from './pages/ServicesPage.vue';
import NetworkPage from './pages/NetworkPage.vue';
import CrexpresPage from './pages/CrexpresPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: AboutUs },
    { path: '/services', name: 'services', component: ServicesPage },
    { path: '/network', name: 'network', component: NetworkPage },
    { path: '/crexpres', name: 'crexpres', component: CrexpresPage },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 120,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
