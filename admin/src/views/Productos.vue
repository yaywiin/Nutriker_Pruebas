<template>
  <AdminLayout>
    <div class="dev-section">
      <p class="dev-text">Sección en Desarrollo</p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
</script>

<style scoped>
.dev-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
}
.dev-text {
  font-size: 1.5rem;
  color: #6b7280;
  font-style: italic;
}
</style>
