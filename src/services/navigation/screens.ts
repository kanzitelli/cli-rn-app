import TestingScreen from 'src/screens/TestingScreen';
import StarterScreen from 'src/screens/StarterScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import AppUpdateScreen from 'src/screens/AppUpdateScreen';

import { Buttons } from './buttons';
import { Options } from 'react-native-navigation';

// Here we define all information regarding screens

const prefix = 'rnn_starter';

const ScreenNames = {
  TestingScreen: `${prefix}.TestingScreen`,
  StarterScreen: `${prefix}.StarterScreen`,
  SettingsScreen: `${prefix}.SettingsScreen`,
  AppUpdateScreen: `${prefix}.AppUpdateScreen`,
}

const ScreenTitles = {
  TestingScreen: 'Testing',
  StarterScreen: 'Starter',
  SettingsScreen: 'Settings',
  AppUpdateScreen: '',
}

const ScreenButtons = {
  StarterScreen: {
    right: [Buttons.Inc, Buttons.Dec]
  }
};

const ScreenOptions: Record<string, Options> = {
  TestingScreen: {
    topBar: {
      title: { text: ScreenTitles.TestingScreen, },
    }
  },
  StarterScreen: {
    topBar: {
      title: { text: ScreenTitles.StarterScreen, },
      rightButtons: ScreenButtons.StarterScreen.right,
    },
  },
  SettingsScreen: {
    topBar: { title: { text: ScreenTitles.SettingsScreen, } }
  },

  AppUpdateScreen: {
    overlay: { interceptTouchOutside: false },
    topBar: { visible: false },
    layout: { componentBackgroundColor: 'transparent' },
  }
}

const Screens = new Map<string, React.FC<any>>();
Screens.set(ScreenNames.TestingScreen, TestingScreen);
Screens.set(ScreenNames.StarterScreen, StarterScreen);
Screens.set(ScreenNames.SettingsScreen, SettingsScreen);
Screens.set(ScreenNames.AppUpdateScreen, AppUpdateScreen);

export default Screens;
export {
  ScreenNames,
  ScreenTitles,
  ScreenOptions,
  ScreenButtons,
};