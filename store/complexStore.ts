import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Data {
    id: number;
    content: string;
}

export const useComplexStore = defineStore('complexStore', () => {
    const user = ref<User | null>(null);
    const data = ref<Data[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get('/api/data');
            data.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch data';
        } finally {
            loading.value = false;
        }
    };

    const updateUser = async (userId: number) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.patch(`/api/users/${userId}`);
            user.value = response.data;
            await fetchData(); // Fetch related data after user update
        } catch (err) {
            error.value = 'Failed to update user';
        } finally {
            loading.value = false;
        }
    };

    return {
        user,
        data,
        loading,
        error,
        fetchData,
        updateUser,
    };
});
