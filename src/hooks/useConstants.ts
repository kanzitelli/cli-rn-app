import { MailComposerOptions } from 'expo-mail-composer';
import { Platform } from 'react-native';

const useContants = () => {
  return {
    colors: {
      main: '#4d7198',
      black: '#000',
      white: '#fff',
      lightGrey: '#dcdde1',
      darkGrey: '#222',
      blue: '#4d7198',
      yellow: '#fbc531',
      grey: '#555',
      red: '#e74c3c',
      light: 'rgb(240, 240, 240)',
      greyOpacity: 'rgba(200, 200, 200, 0.7)'
    },
    sizes: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 40,
    },

    settings: {
      general: {
        mailOptions: {
          recipients: ['dev@batyr.io'],
          subject: '[cli-rn] Question/Request/Other',
          body: 'Please, describe your question/request/something else? 🙂\n\n',
        } as MailComposerOptions,
      },
      links: {
        github: 'https://cli-rn.batyr.io/github',
        website: 'https://cli-rn.batyr.io',
        app: 'https://cli-rn.batyr.io/app',
        personalGithub: 'https://github.com/kanzitelli',
      }
    },

    system: {
      yandexMetrikaApiKey: Platform.select({ ios: '0ba6265a-c238-43fa-89e1-b21c315374d7', android: '' })
    }
  }
}

export default useContants;