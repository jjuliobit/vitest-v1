import { useComplexStore } from "~/store/complexStore";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockData = [
    {
        id: 1,
        content: 'John Doe'
    }
];

const mockDataUpdated = [
    {
        id: 1,
        content: 'John Doe Updated'
    }
]

vi.mock('axios');

describe('testing in pinia', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks(); // Clear all mocks before each test
    });

    it('should be able to set active pinia', () => {
        const store = useComplexStore();
        expect(store).toBeTruthy();
    });

    it('fetches data successfully', async () => {
        const store = useComplexStore();

        // Mock axios.get with vi.mocked
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockResolvedValue({ data: mockData });

        await store.fetchData();

        expect(store.data).toEqual(mockData);
        expect(store.loading).toBe(false);
        expect(store.error).toBe(null);
    });

    it('updateUser successfully updates user data and fetches related data', async () => {
        const store = useComplexStore();
        const userId = 1; // Replace with a valid user ID

        // Mock axios.patch with vi.mocked
        const mockedAxiosPatch = vi.mocked(axios.patch);
        mockedAxiosPatch.mockResolvedValueOnce({ data: { id: userId, name: 'John Doe', email: 'john@example.com' } }); // Resolve only once

        // Mock axios.get for fetchData
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockResolvedValueOnce({ data: mockDataUpdated }); // Resolve fetchData with updated data

        // Call updateUser directly (not through the store)
        await store.updateUser(userId);

        // Assertions
        expect(store.user).toEqual({ id: userId, name: 'John Doe', email: 'john@example.com' }); // Verify user data is updated in store
        expect(store.data).toEqual(mockDataUpdated); // Verify data is updated in store
        expect(store.loading).toBe(false); // Ensure loading state is set to false
        expect(store.error).toBe(null);   // Check for no errors
    });

    it('updateUser handles errors gracefully', async () => {
        const store = useComplexStore();
        const userId = 123; // Replace with a valid user ID

        // Mock axios.patch with vi.mocked
        const mockedAxiosPatch = vi.mocked(axios.patch);
        mockedAxiosPatch.mockRejectedValueOnce(new Error('Network error')); // Simulate network error

        // Call updateUser and capture error
        await store.updateUser(userId).catch((err) => {
            // Verifica se a mensagem de erro é correta
            expect(err.message).toBe(`Failed to update user with ID ${userId}`);
        });

        // Assertions
        expect(store.user).toBe(null);
        expect(store.data).toEqual([]); // User data should remain unchanged
        expect(store.loading).toBe(false); // Ensure loading state is set to false
        expect(store.error).toBe('Failed to update user'); // Verify error message is set
    });

    it('fetchData handles errors gracefully', async () => {
        const store = useComplexStore();

        // Mock axios.get with vi.mocked
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockRejectedValueOnce(new Error('Network error')); // Simulate network error

        // Call fetchData and capture error
        await store.fetchData().catch((err) => {
            // Verifica se a mensagem de erro é correta
            expect(err.message).toBe('Failed to fetch data from /api/data');
        });

        // Assertions
        expect(store.data).toEqual([]); // Data should remain unchanged
        expect(store.loading).toBe(false); // Ensure loading state is set to false
        expect(store.error).toBe('Failed to fetch data'); // Verify error message is set
    });

    it("should have expected properties defined", () => {
        const store = useComplexStore();

        const expectedProperties = [
            "user",
            "data",
            "loading",
            "error",
            "fetchData",
            "updateUser"
        ];

        const storeKeys = Object.keys(store);

        expectedProperties.forEach(property => {
            expect(storeKeys).toContain(property);
        });

    });
});
