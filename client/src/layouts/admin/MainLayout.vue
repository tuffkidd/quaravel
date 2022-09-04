<template>
  <q-layout view="hHr LpR lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" /> -->
        <q-btn
          dense
          flat
          round
          :icon="layoutStore.expandOnHover ? 'mdi-menu' : 'mdi-menu-open'"
          @click="miniMode"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title1
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :mini="layoutStore.miniMode"
      @mouseover="hoverAction"
      @mouseleave="leaveAction"
    >
      <!-- drawer content -->
      <q-list>
        <template v-for="(navItem, index) in navItems" :key="index">
          <!-- <q-expansion-item
            expand-separator
            icon="mail"
            label="Inbox"
            caption="5 unread emails"
            default-opened
          >
          </q-expansion-item>
          -->
          <!-- <q-item clickable :active="navItem.label === 'Outbox'" v-ripple> -->
          <q-expansion-item
            :icon="navItem.icon"
            :label="navItem.label"
            v-if="navItem.subItems"
          >
            <template
              v-for="(subItem, subindex) in navItem.subItems"
              :key="subindex"
            >
              <q-item
                clickable
                :active="subItem.label === 'Outbox'"
                v-ripple
                :to="subItem.to"
              >
                <q-item-section avatar>
                  <q-icon :name="subItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ subItem.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
          <q-item
            clickable
            :active="navItem.label === 'Outbox'"
            v-ripple
            v-else
          >
            <q-item-section avatar>
              <q-icon :name="navItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ navItem.label }}
            </q-item-section>
          </q-item>

          <q-separator :key="'sep' + index" v-if="navItem.separator" />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useLayoutStore } from 'src/stores/layout'

// store
const layoutStore = useLayoutStore()

const leftDrawerOpen = ref(false)

// const menuList = [
//   {
//     icon: 'inbox',
//     label: 'Inbox',
//     separator: true
//   },
//   {
//     icon: 'send',
//     label: 'Outbox',
//     separator: false
//   },
//   {
//     icon: 'delete',
//     label: 'Trash',
//     separator: false
//   },
//   {
//     icon: 'error',
//     label: 'Spam',
//     separator: true
//   },
//   {
//     icon: 'settings',
//     label: 'Settings',
//     separator: false
//   },
//   {
//     icon: 'feedback',
//     label: 'Send Feedback',
//     separator: false
//   },
//   {
//     icon: 'help',
//     iconColor: 'primary',
//     label: 'Help',
//     separator: false
//   }
// ]

const navItems = [
  {
    separator: true,
    label: '대시보드',
    icon: 'mdi-view-dashboard',
    to: '/admin/dashboard',
    labels: [
      {
        to: '/admin/dashboard',
        label: '대시보드'
      }
    ]
  },
  {
    label: '사용자',
    icon: 'mdi-account-supervisor',
    subItems: [
      {
        label: '관리자',
        icon: 'mdi-circle-small',
        to: '/admin/admins/list'
      },
      {
        label: '매니저',
        icon: 'mdi-circle-small',
        to: '/admin/managers/list'
      },
      {
        label: '사용자',
        icon: 'mdi-circle-small',
        to: '/admin/members/list'
      }
    ],
    labels: [
      {
        to: '/admin/admins/list',
        label: '관리자 목록'
      },

      {
        to: '/admin/admins/create',
        label: '관리자 추가'
      },
      {
        to: '/admin/admins/show',
        label: '관리자 상세보기'
      },
      {
        to: '/admin/admins/update',
        label: '관리자 수정'
      }
    ]
  },
  {
    label: '게시판',
    icon: 'mdi-post-outline',
    subItems: [
      {
        label: '게시판 목록',
        icon: 'mdi-circle-small',
        to: '/admin/bbs/list'
      },
      {
        label: '글 목록',
        icon: 'mdi-circle-small',
        to: '/admin/article/list'
      }
    ]
  }
]

const miniMode = () => {
  layoutStore.setminiMode()
}

const hoverAction = () => {
  if (layoutStore.expandOnHover === true) {
    layoutStore.miniMode = false
  }
}
const leaveAction = () => {
  if (layoutStore.expandOnHover === true) {
    layoutStore.miniMode = true
  }
}
</script>
