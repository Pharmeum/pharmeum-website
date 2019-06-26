import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faCheck, faUser, faPhone, faSortDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import 'normalize.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './base.css';

library.add(faEnvelope, faLock, faCheck, faUser, faPhone, faSortDown, faTrashAlt);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
