import AppMetrica from 'react-native-appmetrica';
import useContants from 'src/hooks/useConstants';

const C = useContants();

class YandexService {
  init = async () => {
    await this.setupMetrica();
  }

  reportError = async (e: string) => {
    AppMetrica.reportError(e);
  }

  private setupMetrica = async () => {
    try {
      AppMetrica.activate({ apiKey: C.system.yandexMetrikaApiKey });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new YandexService();