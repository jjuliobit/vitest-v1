import { mount } from '@vue/test-utils'
import _sut from '../components/batman.vue'

describe('Dummy Component', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    test('can be mounted', () => {
        expect(_sut).toBeTruthy()
        const wrapper = mount(_sut)
        expect(wrapper.find('.root')).toBeTruthy()
    })
})