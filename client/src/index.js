import React from 'react';
import {
	render
} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import RoutesContainer from 'react-router/routes';
import store from 'redux/store';
import history from 'react-router/history';
import 'styles/index.scss';
import * as serviceWorker from 'serviceWorker';
import 'react-app-polyfill/ie9';
import 'core-js/fn/array/find';

render(
	<Provider store={store}>
		<Router history={history}>
			<RoutesContainer />
		</Router>
	</Provider>,
	document.getElementById('app')
);

serviceWorker.unregister();
