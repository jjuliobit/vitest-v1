describe('import vue components', () => {
    test('normal imports as expected', async () => {
        const cmp = await import('../components/batman.vue');
        expect(cmp).toBeDefined();
    })

    test('dymanic import as expected', async () => {
        const name = 'batman';
        const cmp = await import(`../components/${name}.vue`);
        expect(cmp).toBeDefined();
    })
})