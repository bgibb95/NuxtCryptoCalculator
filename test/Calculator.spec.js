/* eslint-disable no-console */
import { mount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'
import axios from 'axios'

describe('Calculator', () => {
  beforeEach(() => {
    jest.setTimeout(10000)
  })

  const wrapper = mount(Calculator, {
    mocks: {
      $nuxt: {
        $loading: {
          start: () => {}
        }
      },
      $axios: axios
    }
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('validates a valid input correctly when using a number', () => {
    expect(wrapper.vm.isValidInput(2)).toBeTruthy()
  })

  test('validates an invalid input correctly when using a string or empty string', () => {
    expect(wrapper.vm.isValidInput('test')).toBeFalsy()
    expect(wrapper.vm.isValidInput('')).toBeFalsy()
  })

  test('fetches ticker data from API succesfully', () => {
    return wrapper.vm
      .fetchTickerData('XBTZAR')
      .then(res => {
        expect(res.data).toEqual(
          expect.objectContaining({
            pair: 'XBTZAR'
          })
        )
      })
      .catch(err => {
        console.log(err)
      })
  })

  test('allows different currency to be selected', () => {
    wrapper.find('.EUR').element.selected = true
    wrapper.find('select').trigger('change')
    expect(wrapper.vm.selected).toBe('Euro')
  })
})
