/************************************************
 * 관리자
 ***********************************************/

/** 레아아웃 */
const AMainLayout = import('layouts/admin/MainLayout.vue')
const APublicLayout = import('layouts/admin/PublicLayout.vue')

/** 페이지 */
const ALogin = import('pages/admin/LoginPage.vue')
const ARecover = import('pages/admin/RecoverPage.vue')
const ADashboard = import('pages/admin/DashboardPage.vue')

// 사용자
const AUserList = import('pages/admin/users/ListPage.vue')
const AUserCreate = import('pages/admin/users/CreatePage.vue')
const AUserEdit = import('pages/admin/users/EditPage.vue')
const AUserShow = import('pages/admin/users/ShowPage.vue')

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
        }
      ]
    },
    {
      path: '/admin/login',
      component: () => APublicLayout,
      children: [{ path: '', component: () => ALogin }]
    },
    {
      path: '/admin/recover',
      component: () => APublicLayout,
      children: [{ path: '', component: () => ARecover }]
    },
    {
      path: '/admin/dashboard',
      component: () => AMainLayout,
      children: [{ path: '', component: () => ADashboard }]
    },
    {
      path: '/admin/users',
      component: () => AMainLayout,
      meta: { requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/users/list' },
        { path: 'list', component: () => AUserList },
        { path: 'create', component: () => AUserCreate },
        { path: ':id', component: () => AUserShow },
        { path: ':id/edit', component: () => AUserEdit }
      ]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ]
  return routes
}
