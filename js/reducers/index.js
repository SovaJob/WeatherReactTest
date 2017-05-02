'use strict';

var { combineReducers } = require('redux');
module.exports = combineReducers({
    main: require('./main'),
});