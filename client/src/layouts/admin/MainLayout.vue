<template>
  <q-layout view="hHr LpR lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" /> -->
        <q-btn
          dense
          flat
          round
          :icon="layoutStore.expandOnHover ? 'mdi-menu': 'mdi-menu-open'"
          @click="drawerMini"
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
      :mini="layoutStore.drawerMini"
      @mouseover="hoverAction"
      @mouseleave="leaveAction"

    >

      <!-- drawer content -->
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
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
const miniState = ref(false)

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]

const drawerMini = () => {
  layoutStore.setDrawerMini()
}

const hoverAction = () => {
  if (layoutStore.expandOnHover == true) {
    layoutStore.drawerMini = false
  }
}
const leaveAction = () => {
  if (layoutStore.expandOnHover == true) {
    layoutStore.drawerMini = true
  }
}

</script>
