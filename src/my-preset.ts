/* Works because highlight tokens are defined under colorScheme */
import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'rgb(235, 243, 253)',
      100: 'rgb(214, 231, 250)',
      200: 'rgb(173, 206, 243)',
      300: 'rgb(132, 181, 236)',
      400: 'rgb(91, 156, 229)',
      500: 'rgb(46, 106, 184)',
      600: 'rgb(42, 97, 168)',
      700: 'rgb(36, 83, 144)',
      800: 'rgb(29, 67, 116)',
      900: 'rgb(22, 50, 87)',
      950: 'rgb(16, 37, 65)'
    },
    colorScheme: {
      light: {
        primary: {
          color: 'rgb(46, 106, 184)',
          inverseColor: '#ffffff',
          hoverColor: 'rgb(36, 83, 144)',
          activeColor: 'rgb(29, 67, 116)'
        },
        highlight: {
          background: 'rgb(46, 106, 184)',
          focusBackground: 'rgb(29, 67, 116)',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: 'rgb(235, 243, 253)',
          inverseColor: 'rgb(22, 50, 87)',
          hoverColor: 'rgb(214, 231, 250)',
          activeColor: 'rgb(173, 206, 243)'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});
