import { describe, test, expect, vi } from 'vitest';
import { loadUserData } from "./load-user-data";

// Importa os módulos necessários do 'vitest' para escrever e rodar testes
// Também importa a função 'loadUserData' do arquivo local 'load-user-data'

// vi.mock('./load-user-data', () => {
//     return {
//         loadUserData() {
//             return {
//                 "coolness": -1,
//                 "favoriteFood": "boiled spinach",
//                 "name": "Alex",
//                 "project": [],
//                 "snacks": false,
//                 "username": "testuser",
//             }
//         }
//     }
// })

// Código comentado que cria um mock da função 'loadUserData'
// Isso é útil para testes onde você quer simular respostas específicas sem realmente chamar a implementação real

describe('loadUserDetails', () => {
    // Define uma suíte de testes chamada 'loadUserDetails'

    test('loads user data as expected', async () => {
        const user = await loadUserData('burftx');
        // Chama a função 'loadUserData' com o argumento 'burftx' e aguarda a resposta

        expect(user).toMatchSnapshot();
        // Verifica se o objeto 'user' corresponde a um snapshot previamente salvo
        // Snapshots são úteis para garantir que a saída da função não mudou inesperadamente
    });

    test('loads user data as expected', async () => {
        const user = await loadUserData('burftx');
        // Chama a função 'loadUserData' novamente com o argumento 'burftx'

        expect(user).toMatchInlineSnapshot(`
          {
            "coolness": -1,
            "favoriteFood": "sushi",
            "name": "Burko Smith",
            "project": [
              "doces",
              "massa",
            ],
            "snacks": true,
            "username": "burftx",
          }
        `);
        // Verifica se o objeto 'user' corresponde ao snapshot inline fornecido
        // Snapshots inline são definidos diretamente no código e são úteis para inspeção rápida de dados esperados
    });

    test('sets coolness level appropriately', async () => {
        const julio = await loadUserData('jlengstorff');
        const burko = await loadUserData('burftx');
        // Chama a função 'loadUserData' com dois diferentes argumentos

        expect(julio.coolness).toBe(-1);
        expect(burko.coolness).toBe(-1);
        // Verifica se a propriedade 'coolness' dos dois usuários é igual a -1
    });

    test('throws an error for nonexistent users', async () => {
        expect(async () => await loadUserData('fakeruser')).rejects.toThrowError(
            'no user found'
        );
        // Verifica se a chamada para 'loadUserData' com um usuário inexistente lança um erro com a mensagem 'no user found'
    });
});
