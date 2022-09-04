<template>
  <q-page
    class="row window-height window-width justify-center items-center"
    padding
  >
    <div class="col" style="max-width: 400px">
      <q-card flat bordered class="my-card q-ma-sm">
        <q-card-section class="bg-primary text-white text-h5">
          님하 로그인하셈
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit="login" class="q-gutter-md">
            <q-input
              outlined
              v-model="email"
              type="email"
              label="이메일"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              hint="이메일을 입력하세요."
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || '필수입력사항 입니다.'
              ]"
            />

            <q-input
              v-model="password"
              outlined
              :type="hidePasswd ? 'password' : 'text'"
              hint="비밀번호를 입력하세요."
              label="비밀번호"
              :rules="[
                val => (val && val.length > 0) || '필수입력사항 입니다.'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="hidePasswd ? 'mdi-eye-off' : 'mdi-eye'"
                  class="cursor-pointer"
                  @click="hidePasswd = !hidePasswd"
                />
              </template>
            </q-input>

            <q-field
              :rules="[val => val !== false || '운영정책에 동의해야합니다.']"
              :model-value="acceptPolicy"
              ref="policyRef"
              borderless
              dense
            >
              <template v-slot:control>
                <q-checkbox
                  v-model="acceptPolicy"
                  label="운영정책 동의"
                  dense
                ></q-checkbox>
              </template>
            </q-field>

            <div>
              <q-btn
                label="로그인"
                type="submit"
                color="primary"
                size="lg"
                class="full-width"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

// Notify.create('ddd')
const policyRef = ref(null)
const email = ref('') // 이메일
const password = ref('') // 비밀번호
const hidePasswd = ref(true) // 비밀번호 보기/감추기 토글
const acceptPolicy = ref(false) // 운영정책에 동의했는지 여부

const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  await authStore.getCsrf()
  await authStore.login(email.value, password.value)
  await authStore.getUser()
  router.replace('/admin/dashboard')
}
</script>
