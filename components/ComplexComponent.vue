// components/ComplexComponent.vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
    <ul>
      <li v-for="item in data" :key="item.id">{{ item.content }}</li>
    </ul>
    <button @click="handleUpdateUser">Update User</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useComplexStore } from '../stores/complexStore';

export default defineComponent({
  setup() {
    const complexStore = useComplexStore();

    const handleUpdateUser = () => {
      complexStore.updateUser(1); // Assume que 1 é o ID do usuário a ser atualizado
    };

    return {
      ...complexStore,
      handleUpdateUser,
    };
  },
});
</script>
