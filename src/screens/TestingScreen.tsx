import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';

import DefaultPreference from 'react-native-default-preference';
import RNRestart from 'react-native-restart';

import { useStores } from 'src/stores';
import { useServices } from 'src/services';
import useStyles from 'src/hooks/useStyles';
import { ScreenOptions } from 'src/services/navigation/screens';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Section from 'src/components/Section';
import Bounceable from 'src/components/Bounceable';

const TestingScreen: NavigationFunctionComponent = observer(({
  componentId,
}) => {
  const { testing } = useStores();
  const { } = useServices();
  const { styles, theme } = useStyles(_styles);

  const [appCode, setAppCode] = useState('');
  const [envIndex, setEnvIndex] = useState(1);

  const envs: AppMode[] = ['DEV', 'PROD'];

  const runApp = () => {
    if (!(appCode && appCode !== '')) return;

    const baseUrl = `http://${appCode}.app.cli-rn.batyr.io`; // don't try to hack it :)
    const env = envs[envIndex];

    let bundleUrl = '';

    if (env === 'DEV')  bundleUrl = `${baseUrl}/index.bundle?platform=ios&dev=false&minify=true`;
    if (env === 'PROD') bundleUrl = `${baseUrl}/index.ios.bundle`;

    testing.setLoading(true);
    testing.addAppCode({ code: appCode, mode: env });
    DefaultPreference.set('bundle_url', bundleUrl);
    DefaultPreference.set('app_mode', env);

    setTimeout(RNRestart.Restart, 1000); // just cool feeling :)
  }

  const choosePreviousApp = (app: AppItem) => () => {
    setAppCode(app.code);
    setEnvIndex(envs.findIndex(it => it === app.mode));
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Section bg title={'New app'}>
          <View style={styles.newAppContainer}>
            <TextInput
              placeholder={'App Code'}
              style={styles.textinput}
              onChange={props => setAppCode(props.nativeEvent.text)}
              value={appCode}
              autoCapitalize={'none'}
              autoCorrect={false}
            />

            <SegmentedControl
              values={envs}
              selectedIndex={envIndex}
              style={styles.segmentedControl}
              onChange={e => setEnvIndex(e.nativeEvent.selectedSegmentIndex)}
            />

            <Bounceable onPress={runApp}>
              {
                testing.loading
                  ? <ActivityIndicator />
                  : <Text style={styles.buttonText}>Run</Text>
              }
            </Bounceable>
          </View>
        </Section>

        <Section bg title={'Previously run apps'}>
          <View style={styles.prevRunAppsContainer}>
            {
              testing.apps.length === 0
                ? <Text style={styles.noAppsText}>{ `No app codes to show yet.\n\nIn order to generate a new app, you will need to download cli-rn on your local machine.` }</Text>
                : null
            }
            {
              testing.apps.map(it => (
                <Bounceable key={it.code} onPress={choosePreviousApp(it)}>
                  <View style={styles.appCodeContainer}>
                    <Text style={styles.appCodeText}>{it.code}</Text>
                    <View style={styles.chipContainer}>
                      <Text style={styles.chipText}>{it.mode}</Text>
                    </View>
                  </View>
                </Bounceable>
              ))
            }
          </View>
        </Section>
      </ScrollView>
    </View>
  );
});

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  textinput: {
    width: '40%',
    fontSize: 20,
    padding: theme.sizes.s,
    textAlign: 'center',
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  newAppContainer: {
    padding: theme.sizes.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  segmentedControl: {
    width: '30%',
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.main,
    fontWeight: 'bold',
  },

  appCodeText: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  appCodeContainer: {
    paddingVertical: theme.sizes.m,
    flexDirection: 'row',
    alignItems: 'center',
  },

  prevRunAppsContainer: {
    padding: theme.sizes.s,
  },

  chipContainer: {
    marginLeft: theme.sizes.m,
    backgroundColor: theme.colors.main,
    borderRadius: 4,
    padding: 4,
  },
  chipText: {
    color: theme.colors.white,
    fontSize: 12,
  },

  noAppsText: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.text,
  },
});

TestingScreen.options = props => ScreenOptions.TestingScreen;

export default TestingScreen;
