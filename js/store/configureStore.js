'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import {persistStore, autoRehydrate} from 'redux-persist';

import { AsyncStorage } from 'react-native';



var createF8Store = applyMiddleware(thunk)(createStore);


function configureStore(onComplete) {
    AsyncStorage.clear();

    const store = autoRehydrate()(createF8Store)(reducers);
    persistStore(store, { storage: AsyncStorage }, onComplete);
    return store;
}

module.exports = configureStore;