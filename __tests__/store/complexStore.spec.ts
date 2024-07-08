// Importa os módulos necessários
import { useComplexStore } from "~/store/complexStore";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Dados simulados para os testes
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

// Mocks do axios
vi.mock('axios');

describe('testing in pinia', () => {
    beforeEach(() => {
        // Configura um novo Pinia ativo antes de cada teste
        setActivePinia(createPinia());
        vi.clearAllMocks(); // Limpa todos os mocks antes de cada teste
    });

    it('should be able to set active pinia', () => {
        const store = useComplexStore();
        expect(store).toBeTruthy(); // Verifica se a store foi criada com sucesso
    });

    it('fetches data successfully', async () => {
        const store = useComplexStore();

        // Mock do axios.get
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockResolvedValue({ data: mockData });

        // Chama a função fetchData da store
        await store.fetchData();

        // Verifica se os dados foram atribuídos corretamente à store
        expect(store.data).toEqual(mockData);
        expect(store.loading).toBe(false);
        expect(store.error).toBe(null);
    });

    it('updateUser successfully updates user data and fetches related data', async () => {
        const store = useComplexStore();
        const userId = 1; // ID do usuário para teste

        // Mock do axios.patch
        const mockedAxiosPatch = vi.mocked(axios.patch);
        mockedAxiosPatch.mockResolvedValueOnce({ data: { id: userId, name: 'John Doe', email: 'john@example.com' } }); // Resolve apenas uma vez

        // Mock do axios.get para fetchData
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockResolvedValueOnce({ data: mockDataUpdated }); // Resolve fetchData com dados atualizados

        // Chama a função updateUser diretamente (não através da store)
        await store.updateUser(userId);

        // Verificações
        expect(store.user).toEqual({ id: userId, name: 'John Doe', email: 'john@example.com' }); // Verifica se os dados do usuário foram atualizados na store
        expect(store.data).toEqual(mockDataUpdated); // Verifica se os dados foram atualizados na store
        expect(store.loading).toBe(false); // Verifica se o estado de loading está false
        expect(store.error).toBe(null);   // Verifica se não há erros
    });

    it('updateUser handles errors gracefully', async () => {
        const store = useComplexStore();
        const userId = 123; // ID do usuário para teste

        // Mock do axios.patch
        const mockedAxiosPatch = vi.mocked(axios.patch);
        mockedAxiosPatch.mockRejectedValueOnce(new Error('Network error')); // Simula um erro de rede

        // Chama a função updateUser e captura o erro
        await store.updateUser(userId).catch((err) => {
            // Verifica se a mensagem de erro é correta
            expect(err.message).toBe(`Failed to update user with ID ${userId}`);
        });

        // Verificações
        expect(store.user).toBe(null);
        expect(store.data).toEqual([]); // Os dados do usuário devem permanecer inalterados
        expect(store.loading).toBe(false); // Verifica se o estado de loading está false
        expect(store.error).toBe('Failed to update user'); // Verifica se a mensagem de erro foi definida
    });

    it('fetchData handles errors gracefully', async () => {
        const store = useComplexStore();

        // Mock do axios.get
        const mockedAxiosGet = vi.mocked(axios.get);
        mockedAxiosGet.mockRejectedValueOnce(new Error('Network error')); // Simula um erro de rede

        // Chama a função fetchData e captura o erro
        await store.fetchData().catch((err) => {
            // Verifica se a mensagem de erro é correta
            expect(err.message).toBe('Failed to fetch data from /api/data');
        });

        // Verificações
        expect(store.data).toEqual([]); // Os dados devem permanecer inalterados
        expect(store.loading).toBe(false); // Verifica se o estado de loading está false
        expect(store.error).toBe('Failed to fetch data'); // Verifica se a mensagem de erro foi definida
    });

    it("should have expected properties defined", () => {
        const store = useComplexStore();

        // Propriedades esperadas na store
        const expectedProperties = [
            "user",
            "data",
            "loading",
            "error",
            "fetchData",
            "updateUser"
        ];

        const storeKeys = Object.keys(store);

        // Verifica se todas as propriedades esperadas estão definidas
        expectedProperties.forEach(property => {
            expect(storeKeys).toContain(property);
        });

    });
});
