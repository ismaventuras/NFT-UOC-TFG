import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//CSS
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css"

//REDUX
import { Provider } from 'react-redux'
import { createStore } from 'redux'

//Web3
import { Web3ReactProvider , createWeb3ReactRoot} from '@web3-react/core'
import Web3 from 'web3';
import marketReducer from './reducers/marketReducer';

const Web3ReactProviderReloaded = createWeb3ReactRoot('metamask')


function getLibrary(provider){
  const library = new Web3(provider)
  return library
}

const store = createStore(marketReducer)

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ReactProviderReloaded getLibrary={getLibrary}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Web3ReactProviderReloaded>
  </Web3ReactProvider>,
    document.getElementById('root')
  );