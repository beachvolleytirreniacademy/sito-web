<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full border rounded text-gray-700 p-2 mt-1" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" required class="w-full border text-gray-700 rounded p-2 mt-1" />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        
        <UButton 
          type="submit" 
          block 
          :loading="loading"
          class="!bg-[#FD7F00] hover:!bg-[#e67300] !text-white font-bold"
        >
          Accedi
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '~/api/supabase' 
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    error.value = "Credenziali errate"
  } else {
    router.push('/admin/dashboard')
  }
  loading.value = false
}
</script>