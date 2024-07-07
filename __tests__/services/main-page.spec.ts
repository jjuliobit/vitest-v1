import { mount } from '@vue/test-utils';
import _sut from '../../components/main-page.vue'

describe('main-page Test', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('can be mounted', () => {
        // vi.stubGlobal('definePageMeta', vi.fn())
        const wrapper = mount(_sut);
        expect(_sut).toBeTruthy();
        expect(wrapper.html()).toContain('Main');
    })
})