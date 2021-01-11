import { observable, action, makeObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { HydratedStore } from 'src/utils/classes';

class AppItemSchema {
  @persist @observable code: string = '';
  @persist @observable mode: AppMode = 'PROD';
}

class TestingStore extends HydratedStore {
  constructor() {
    super('TestingStore'); // Storage ID

    makeObservable(this);
  }

  @observable loading = false;
  @persist('list', AppItemSchema) @observable.ref apps: AppItem[] = [];

  @action addAppCode = async (app: AppItem) => {
    this.apps = [
      app,
      ...this.apps.filter(it => it.code !== app.code),
    ].slice(0, 10); // take only 10 elements
  }

  @action setLoading = async (v: boolean) => {
    this.loading = v;
  }
}

export default new TestingStore();