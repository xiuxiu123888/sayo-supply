import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import AboutUs from './pages/AboutUs.vue';
import ServicesPage from './pages/ServicesPage.vue';
import CrexpresPage from './pages/CrexpresPage.vue';
import TruckingPage from './pages/TruckingPage.vue';
import ContactPage from './pages/ContactPage.vue';
import CareerDetailPage from './pages/CareerDetailPage.vue';
import AdminLogin from './pages/admin/AdminLogin.vue';
import AdminMessages from './pages/admin/AdminMessages.vue';
import { getAdminToken } from './api';
import { jobs } from './data/jobs';

const defaultCareerSlug = jobs[0]?.slug ?? 'intl-logistics-sales';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: AboutUs },
    { path: '/services', name: 'services', component: ServicesPage },
    { path: '/crexpres', name: 'crexpres', component: CrexpresPage },
    { path: '/trucking', name: 'trucking', component: TruckingPage },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/careers', redirect: `/careers/${defaultCareerSlug}` },
    { path: '/careers/:slug', name: 'career-detail', component: CareerDetailPage },
    { path: '/admin', redirect: '/admin/messages' },
    { path: '/admin/login', name: 'admin-login', component: AdminLogin, meta: { admin: true, public: true } },
    { path: '/admin/messages', name: 'admin-messages', component: AdminMessages, meta: { admin: true } },
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

router.beforeEach((to) => {
  if (to.meta.admin && !to.meta.public && !getAdminToken()) {
    return { path: '/admin/login', query: { redirect: to.fullPath } };
  }
  if (to.path === '/admin/login' && getAdminToken()) {
    return { path: '/admin/messages' };
  }
  return true;
});

export default router;
