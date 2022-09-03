
import { useAuthStore } from 'src/stores/auth'
import { toRaw } from 'vue'

// Layouts
import AdminMainLayout from 'layouts/admin/MainLayout.vue'
import AdminPublicLayout from 'layouts/admin/PublicLayout.vue'

// Pages
import AdminLoginPage from 'pages/admin/LoginPage.vue'
import AdminRecoverPage from 'pages/admin/RecoverPage.vue'
import AdminDashboardPage from 'pages/admin/DashboardPage.vue'

export default function (store) {
  const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('pages/IndexPage.vue')
        }]
    },
    // 어드민 로그인
    {
      path: '/admin/login',
      component: () => import('layouts/admin/PublicLayout.vue'),
      children: [
        {
          path: '', name: 'admin-login', component: () => import('pages/admin/LoginPage.vue')
        }
      ]
    },
    // 어드민 리커버
    {
      path: '/admin/recover',
      component: () => import('layouts/admin/PublicLayout.vue'),
      children: [
        {
          path: 'recover', name: 'admin-recover', component: () => import('pages/admin/RecoverPage.vue')
        }
      ]
    },
    // 어드민 대시보드
    {
      path: '/admin/dashboard',
      component: AdminMainLayout,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('pages/admin/DashboardPage.vue'),
          meta: {
            requiresAdmin: true
          }
        }
      ]
    },
    // {
    //   path: '/admin',
    //   // component: () => import('layouts/admin/MainLayout.vue'),
    //   component: MainLayout,
    //   children: [
    //     {
    //       path: 'login',
    //       name: 'admin-login',
    //       component: () => import('pages/admin/LoginPage.vue')
    //     },
    //     {
    //       path: 'recover',
    //       name: 'admin-recover',
    //       component: () => import('pages/admin/RecoverPage.vue')
    //     },
    //     {
    //       path: 'dashboard',
    //       name: 'admin-dashboard',
    //       component: () => import('pages/admin/DashboardPage.vue'),
    //       meta: {
    //         requiresAdmin: true
    //       }
    //     },
    //     {
    //       path: 'user',
    //       name: 'admin-user-list',
    //       component: AdminDashboardPage,
    //       meta: {
    //         requiresAdmin: true
    //       }
    //     }
    //   ]
    // },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ]
  return routes
}
