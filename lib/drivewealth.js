/*!
 * 
 * 	drivewealth-javascript - JavaScript bindings for the DriveWealth API
 * 	Author: John Shammas
 * 	Version: v1.0.0
 * 	Url: https://github.com/drivewealth/drivewealth-javascript
 * 	License(s): ISC
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["drivewealth"] = factory();
	else
		root["drivewealth"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Account = __webpack_require__(1);
	
	var _Account2 = _interopRequireDefault(_Account);
	
	var _Instrument = __webpack_require__(5);
	
	var _Instrument2 = _interopRequireDefault(_Instrument);
	
	var _User = __webpack_require__(6);
	
	var _User2 = _interopRequireDefault(_User);
	
	var _Config = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    ENVIRONMENTS: _Config.ENVIRONMENTS,
	
	    Account: _Account2.default,
	    Instrument: _Instrument2.default,
	    User: _User2.default,
	
	    setup: _Config.setup
	};
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _Sessions = __webpack_require__(4);
	
	var _Sessions2 = _interopRequireDefault(_Sessions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Account = function () {
	    function Account(data) {
	        _classCallCheck(this, Account);
	
	        var _arr = ["accountID", "userID", "accountNo", "accountType", "currencyID", "ibID", "margin", "nickname", "openedWhen", "patternDayTrades", "status", "tradingType"];
	
	        for (var _i = 0; _i < _arr.length; _i++) {
	            var key = _arr[_i];
	            this[key] = data[key];
	        }
	    }
	
	    _createClass(Account, [{
	        key: "getBlotter",
	        value: function getBlotter(type, cb) {
	            if (type && !cb) {
	                cb = type;
	                type = null;
	            }
	
	            (0, _request2.default)({
	                method: "GET",
	                endpoint: "/users/" + this.userID + "/accountSummary/" + this.accountID + (type ? '/' + type : ""),
	                sessionKey: _Sessions2.default.get(this.userID)
	            }, function (data) {
	                cb && cb(null, type ? data[type] : data);
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }], [{
	        key: "getListForUserID",
	        value: function getListForUserID(userID, cb) {
	            (0, _request2.default)({
	                method: "GET",
	                endpoint: "/users/" + userID + "/accounts",
	                sessionKey: _Sessions2.default.get(userID)
	            }, function (data) {
	                cb && cb(null, data.map(function (account) {
	                    return new Account(account);
	                }));
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }, {
	        key: "BLOTTER_TYPES",
	        get: function get() {
	            return {
	                CASH: "cash",
	                ORDERS: "orders",
	                TRANSACTIONS: "transactions",
	                POSITIONS: "positions",
	                ALL: null
	            };
	        }
	    }]);
	
	    return Account;
	}();
	
	exports.default = Account;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = request;
	
	var _Config = __webpack_require__(3);
	
	function request(_ref, onSuccess, onError) {
	    var _ref$method = _ref.method,
	        method = _ref$method === undefined ? "GET" : _ref$method,
	        endpoint = _ref.endpoint,
	        sessionKey = _ref.sessionKey,
	        body = _ref.body,
	        _ref$addlHeaders = _ref.addlHeaders,
	        addlHeaders = _ref$addlHeaders === undefined ? {} : _ref$addlHeaders;
	
	    var headers = {
	        Accept: "application/json"
	    };
	    if (method === "POST" || method === "PUT" || method === "PATCH") {
	        headers["Content-Type"] = "application/json";
	    }
	    if (sessionKey) {
	        headers["x-mysolomeo-session-key"] = sessionKey;
	    }
	    for (var header in addlHeaders) {
	        headers[header] = addlHeaders[header];
	    }
	
	    endpoint = _Config.Config.env + endpoint;
	
	    if (headers["Content-Type"] === "application/json") body = JSON.stringify(body);
	
	    _Config.Config.httpImpl(method, endpoint, headers, body, function (statusCode, resHeaders, resBody) {
	        if ((resHeaders["Content-Type"] === "application/json" || resHeaders["content-type"] === "application/json") && resBody) {
	            resBody = JSON.parse(resBody);
	        }
	
	        if (String(statusCode)[0] === "2" || String(statusCode)[0] === "3") {
	            onSuccess(resBody, resHeaders);
	        } else {
	            onError(resBody, resHeaders);
	        }
	    });
	}
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setup = setup;
	var Config = exports.Config = {
	    env: null,
	    httpImpl: null,
	    appTypeID: null,
	    appVersion: null
	};
	
	var ENVIRONMENTS = exports.ENVIRONMENTS = {
	    UAT: "http://api.drivewealth.io/v1",
	    PROD: "https://api.drivewealth.net/v1"
	};
	
	function setup(_ref) {
	    var env = _ref.env,
	        httpImpl = _ref.httpImpl,
	        appTypeID = _ref.appTypeID,
	        appVersion = _ref.appVersion;
	
	    Config.env = env;
	    Config.httpImpl = httpImpl;
	    Config.appTypeID = appTypeID;
	    Config.appVersion = appVersion;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sessions = function () {
	    function Sessions() {
	        _classCallCheck(this, Sessions);
	
	        this._keys = {};
	        this._mainUser = null;
	    }
	
	    _createClass(Sessions, [{
	        key: "save",
	        value: function save(userID, sessionKey) {
	            this._keys[userID] = sessionKey;
	            if (!this._mainUser) this._mainUser = userID;
	        }
	    }, {
	        key: "get",
	        value: function get(userID) {
	            return this._keys[userID];
	        }
	    }, {
	        key: "getAny",
	        value: function getAny() {
	            return this._keys[this._mainUser];
	        }
	    }]);
	
	    return Sessions;
	}();
	
	var sessions = exports.sessions = new Sessions();
	exports.default = sessions;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _Sessions = __webpack_require__(4);
	
	var _Sessions2 = _interopRequireDefault(_Sessions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Instrument = function () {
	    function Instrument(data) {
	        _classCallCheck(this, Instrument);
	
	        var _arr = ["instrumentID", "name", "exchangeID", "instrumentTypeID", "orderSizeMax", "orderSizeMin", "orderSizeStep", "rateAsk", "rateBid", "ratePrecision", "symbol", "tradeStatus", "urlImage", "urlInvestor", "chaikinPgr", "priorClose", "marketState"];
	
	        for (var _i = 0; _i < _arr.length; _i++) {
	            var key = _arr[_i];
	            this[key] = data[key];
	        }
	    }
	
	    _createClass(Instrument, null, [{
	        key: "getBySymbol",
	        value: function getBySymbol(symbol, cb) {
	            var symbols = symbol;
	            if (typeof symbol === "string") symbols = [symbol];
	
	            (0, _request2.default)({
	                method: "GET",
	                endpoint: "/instruments?symbol=" + symbols.join(','),
	                sessionKey: _Sessions2.default.getAny()
	            }, function (data) {
	                data = data.map(function (ins) {
	                    return new Instrument(ins);
	                });
	                cb && cb(null, typeof symbol === "string" ? data[0] : data);
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }, {
	        key: "getByID",
	        value: function getByID(id) {
	            var includeFundamentals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	            var cb = arguments[2];
	
	            (0, _request2.default)({
	                method: "GET",
	                endpoint: "/instruments/" + id + (includeFundamentals ? '?options=F' : ''),
	                sessionKey: _Sessions2.default.getAny()
	            }, function (data) {
	                cb && cb(null, new Instrument(data));
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }]);
	
	    return Instrument;
	}();
	
	exports.default = Instrument;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _Config = __webpack_require__(3);
	
	var _Sessions = __webpack_require__(4);
	
	var _Sessions2 = _interopRequireDefault(_Sessions);
	
	var _Account = __webpack_require__(1);
	
	var _Account2 = _interopRequireDefault(_Account);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var User = function () {
	    function User(data) {
	        _classCallCheck(this, User);
	
	        var _arr = ["countryID", "emailAddress", "firstName", "languageID", "lastName", "phoneNumber", "referralCode", "userID", "username", "wlpID", "status", "usCitizen", "lastLoginWhen", "citizenship"];
	
	        for (var _i = 0; _i < _arr.length; _i++) {
	            var key = _arr[_i];
	            this[key] = data[key];
	        }
	    }
	
	    _createClass(User, [{
	        key: "getAccounts",
	        value: function getAccounts(cb) {
	            _Account2.default.getListForUserID(this.userID, cb);
	        }
	    }], [{
	        key: "getByUserID",
	        value: function getByUserID(userID, cb) {
	            (0, _request2.default)({
	                method: "GET",
	                endpoint: "/users/" + userID,
	                sessionKey: _Sessions2.default.get(userID)
	            }, function (data) {
	                cb && cb(null, new User(data));
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }, {
	        key: "login",
	        value: function login(username, password, cb) {
	            (0, _request2.default)({
	                method: "POST",
	                endpoint: "/userSessions",
	                body: {
	                    username: username,
	                    password: password,
	                    appTypeID: _Config.Config.appTypeID,
	                    appVersion: _Config.Config.appVersion,
	                    languageID: "en_US",
	                    osType: "unknown",
	                    osVersion: "unknown",
	                    scrRes: "unknown",
	                    ipAddress: "unknown"
	                }
	            }, function (data) {
	                _Sessions2.default.save(data.userID, data.sessionKey);
	                User.getByUserID(data.userID, function (err, user) {
	                    if (err) return cb && cb(err);
	                    cb && cb(null, user);
	                });
	            }, function (err) {
	                return cb && cb(err);
	            });
	        }
	    }]);
	
	    return User;
	}();
	
	exports.default = User;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiODJmOWY2NWZhZTI5OGU4YzVjMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FjY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2Vzc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXIuanMiXSwibmFtZXMiOlsiRU5WSVJPTk1FTlRTIiwiQWNjb3VudCIsIkluc3RydW1lbnQiLCJVc2VyIiwic2V0dXAiLCJkYXRhIiwia2V5IiwidHlwZSIsImNiIiwibWV0aG9kIiwiZW5kcG9pbnQiLCJ1c2VySUQiLCJhY2NvdW50SUQiLCJzZXNzaW9uS2V5IiwiZ2V0IiwiZXJyIiwibWFwIiwiYWNjb3VudCIsIkNBU0giLCJPUkRFUlMiLCJUUkFOU0FDVElPTlMiLCJQT1NJVElPTlMiLCJBTEwiLCJyZXF1ZXN0Iiwib25TdWNjZXNzIiwib25FcnJvciIsImJvZHkiLCJhZGRsSGVhZGVycyIsImhlYWRlcnMiLCJBY2NlcHQiLCJoZWFkZXIiLCJlbnYiLCJKU09OIiwic3RyaW5naWZ5IiwiaHR0cEltcGwiLCJzdGF0dXNDb2RlIiwicmVzSGVhZGVycyIsInJlc0JvZHkiLCJwYXJzZSIsIlN0cmluZyIsIkNvbmZpZyIsImFwcFR5cGVJRCIsImFwcFZlcnNpb24iLCJVQVQiLCJQUk9EIiwiU2Vzc2lvbnMiLCJfa2V5cyIsIl9tYWluVXNlciIsInNlc3Npb25zIiwic3ltYm9sIiwic3ltYm9scyIsImpvaW4iLCJnZXRBbnkiLCJpbnMiLCJpZCIsImluY2x1ZGVGdW5kYW1lbnRhbHMiLCJnZXRMaXN0Rm9yVXNlcklEIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxhbmd1YWdlSUQiLCJvc1R5cGUiLCJvc1ZlcnNpb24iLCJzY3JSZXMiLCJpcEFkZHJlc3MiLCJzYXZlIiwiZ2V0QnlVc2VySUQiLCJ1c2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7bUJBRWU7QUFDWEEsdUNBRFc7O0FBR1hDLCtCQUhXO0FBSVhDLHFDQUpXO0FBS1hDLHlCQUxXOztBQU9YQztBQVBXLEU7Ozs7Ozs7Ozs7Ozs7OztBQ0xmOzs7O0FBQ0E7Ozs7Ozs7O0tBRXFCSCxPO0FBRWpCLHNCQUFZSSxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0JBQ0UsQ0FDWixXQURZLEVBRVosUUFGWSxFQUdaLFdBSFksRUFJWixhQUpZLEVBS1osWUFMWSxFQU1aLE1BTlksRUFPWixRQVBZLEVBUVosVUFSWSxFQVNaLFlBVFksRUFVWixrQkFWWSxFQVdaLFFBWFksRUFZWixhQVpZLENBREY7O0FBQ2Qsa0RBYUc7QUFiRSxpQkFBSUMsY0FBSjtBQWNELGtCQUFLQSxHQUFMLElBQVlELEtBQUtDLEdBQUwsQ0FBWjtBQUNIO0FBQ0o7Ozs7b0NBRVVDLEksRUFBTUMsRSxFQUFJO0FBQ2pCLGlCQUFJRCxRQUFRLENBQUNDLEVBQWIsRUFBaUI7QUFDYkEsc0JBQUtELElBQUw7QUFDQUEsd0JBQU8sSUFBUDtBQUNIOztBQUVELG9DQUFRO0FBQ0pFLHlCQUFRLEtBREo7QUFFSkMsdUNBQW9CLEtBQUtDLE1BQXpCLHdC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SCxDQUFiO0FBQUEsY0FOSDtBQU9IOzs7K0JBRVkwQyxRLEVBQVVDLFEsRUFBVWxELEUsRUFBSTtBQUNqQyxvQ0FBUTtBQUNKQyx5QkFBUSxNQURKO0FBRUpDLDJCQUFVLGVBRk47QUFHSmdCLHVCQUFNO0FBQ0YrQix1Q0FERTtBQUVGQyx1Q0FGRTtBQUdGakIsZ0NBQVcsZUFBT0EsU0FIaEI7QUFJRkMsaUNBQVksZUFBT0EsVUFKakI7QUFLRmlCLGlDQUFZLE9BTFY7QUFNRkMsNkJBQVEsU0FOTjtBQU9GQyxnQ0FBVyxTQVBUO0FBUUZDLDZCQUFRLFNBUk47QUFTRkMsZ0NBQVc7QUFUVDtBQUhGLGNBQVIsRUFjRyxVQUFDMUQsSUFBRCxFQUFVO0FBQ1Qsb0NBQVMyRCxJQUFULENBQWMzRCxLQUFLTSxNQUFuQixFQUEyQk4sS0FBS1EsVUFBaEM7QUFDQVYsc0JBQUs4RCxXQUFMLENBQWlCNUQsS0FBS00sTUFBdEIsRUFBOEIsVUFBQ0ksR0FBRCxFQUFNbUQsSUFBTixFQUFlO0FBQ3pDLHlCQUFJbkQsR0FBSixFQUFTLE9BQU9QLE1BQU1BLEdBQUdPLEdBQUgsQ0FBYjtBQUNUUCwyQkFBTUEsR0FBRyxJQUFILEVBQVMwRCxJQUFULENBQU47QUFDSCxrQkFIRDtBQUlILGNBcEJELEVBb0JHO0FBQUEsd0JBQU8xRCxNQUFNQSxHQUFHTyxHQUFILENBQWI7QUFBQSxjQXBCSDtBQXFCSDs7Ozs7O21CQTNEZ0JaLEkiLCJmaWxlIjoiZHJpdmV3ZWFsdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkcml2ZXdlYWx0aFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkcml2ZXdlYWx0aFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiODJmOWY2NWZhZTI5OGU4YzVjMCIsImltcG9ydCBBY2NvdW50IGZyb20gXCIuL0FjY291bnRcIjtcbmltcG9ydCBJbnN0cnVtZW50IGZyb20gXCIuL0luc3RydW1lbnRcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuL1VzZXJcIjtcbmltcG9ydCB7IHNldHVwLCBFTlZJUk9OTUVOVFMgfSBmcm9tIFwiLi9Db25maWdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIEVOVklST05NRU5UUyxcblxuICAgIEFjY291bnQsXG4gICAgSW5zdHJ1bWVudCxcbiAgICBVc2VyLFxuXG4gICAgc2V0dXBcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgU2Vzc2lvbnMgZnJvbSBcIi4vU2Vzc2lvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBbXG4gICAgICAgICAgICBcImFjY291bnRJRFwiLFxuICAgICAgICAgICAgXCJ1c2VySURcIixcbiAgICAgICAgICAgIFwiYWNjb3VudE5vXCIsXG4gICAgICAgICAgICBcImFjY291bnRUeXBlXCIsXG4gICAgICAgICAgICBcImN1cnJlbmN5SURcIixcbiAgICAgICAgICAgIFwiaWJJRFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5cIixcbiAgICAgICAgICAgIFwibmlja25hbWVcIixcbiAgICAgICAgICAgIFwib3BlbmVkV2hlblwiLFxuICAgICAgICAgICAgXCJwYXR0ZXJuRGF5VHJhZGVzXCIsXG4gICAgICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICAgICAgXCJ0cmFkaW5nVHlwZVwiLFxuICAgICAgICBdKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCbG90dGVyKHR5cGUsIGNiKSB7XG4gICAgICAgIGlmICh0eXBlICYmICFjYikge1xuICAgICAgICAgICAgY2IgPSB0eXBlO1xuICAgICAgICAgICAgdHlwZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGVuZHBvaW50OiBgL3VzZXJzLyR7dGhpcy51c2VySUR9L2FjY291bnRTdW1tYXJ5LyR7dGhpcy5hY2NvdW50SUR9JHt0eXBlID8gJy8nICsgdHlwZSA6IFwiXCJ9YCxcbiAgICAgICAgICAgIHNlc3Npb25LZXk6IFNlc3Npb25zLmdldCh0aGlzLnVzZXJJRClcbiAgICAgICAgfSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNiICYmIGNiKG51bGwsIHR5cGUgPyBkYXRhW3R5cGVdIDogZGF0YSk7XG4gICAgICAgIH0sIGVyciA9PiBjYiAmJiBjYihlcnIpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEJMT1RURVJfVFlQRVMoKSB7IHJldHVybiB7XG4gICAgICAgIENBU0g6IFwiY2FzaFwiLFxuICAgICAgICBPUkRFUlM6IFwib3JkZXJzXCIsXG4gICAgICAgIFRSQU5TQUNUSU9OUzogXCJ0cmFuc2FjdGlvbnNcIixcbiAgICAgICAgUE9TSVRJT05TOiBcInBvc2l0aW9uc1wiLFxuICAgICAgICBBTEw6IG51bGwsXG4gICAgfSB9O1xuXG4gICAgc3RhdGljIGdldExpc3RGb3JVc2VySUQodXNlcklELCBjYikge1xuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGVuZHBvaW50OiBgL3VzZXJzLyR7dXNlcklEfS9hY2NvdW50c2AsXG4gICAgICAgICAgICBzZXNzaW9uS2V5OiBTZXNzaW9ucy5nZXQodXNlcklEKVxuICAgICAgICB9LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgZGF0YS5tYXAoYWNjb3VudCA9PiBuZXcgQWNjb3VudChhY2NvdW50KSkpO1xuICAgICAgICB9LCBlcnIgPT4gY2IgJiYgY2IoZXJyKSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQWNjb3VudC5qcyIsImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KHtcbiAgICBtZXRob2QgPSBcIkdFVFwiLFxuICAgIGVuZHBvaW50LFxuICAgIHNlc3Npb25LZXksXG4gICAgYm9keSxcbiAgICBhZGRsSGVhZGVycyA9IHt9LFxufSwgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgbGV0IGhlYWRlcnMgPSB7XG4gICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiIHx8IG1ldGhvZCA9PT0gXCJQVVRcIiB8fCBtZXRob2QgPT09IFwiUEFUQ0hcIikge1xuICAgICAgICBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG4gICAgfVxuICAgIGlmIChzZXNzaW9uS2V5KSB7XG4gICAgICAgIGhlYWRlcnNbXCJ4LW15c29sb21lby1zZXNzaW9uLWtleVwiXSA9IHNlc3Npb25LZXk7XG4gICAgfVxuICAgIGZvciAobGV0IGhlYWRlciBpbiBhZGRsSGVhZGVycykge1xuICAgICAgICBoZWFkZXJzW2hlYWRlcl0gPSBhZGRsSGVhZGVyc1toZWFkZXJdO1xuICAgIH1cblxuICAgIGVuZHBvaW50ID0gQ29uZmlnLmVudiArIGVuZHBvaW50O1xuXG4gICAgaWYgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPT09IFwiYXBwbGljYXRpb24vanNvblwiKSBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cbiAgICBDb25maWcuaHR0cEltcGwobWV0aG9kLCBlbmRwb2ludCwgaGVhZGVycywgYm9keSwgKHN0YXR1c0NvZGUsIHJlc0hlYWRlcnMsIHJlc0JvZHkpID0+IHtcbiAgICAgICAgaWYgKCAocmVzSGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9PT0gXCJhcHBsaWNhdGlvbi9qc29uXCIgfHwgcmVzSGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSA9PT0gXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAmJiByZXNCb2R5KSB7XG4gICAgICAgICAgICByZXNCb2R5ID0gSlNPTi5wYXJzZShyZXNCb2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdHJpbmcoc3RhdHVzQ29kZSlbMF0gPT09IFwiMlwiIHx8IFN0cmluZyhzdGF0dXNDb2RlKVswXSA9PT0gXCIzXCIpIHtcbiAgICAgICAgICAgIG9uU3VjY2VzcyhyZXNCb2R5LCByZXNIZWFkZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uRXJyb3IocmVzQm9keSwgcmVzSGVhZGVycyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZXF1ZXN0LmpzIiwiZXhwb3J0IGNvbnN0IENvbmZpZyA9IHtcbiAgICBlbnY6IG51bGwsXG4gICAgaHR0cEltcGw6IG51bGwsXG4gICAgYXBwVHlwZUlEOiBudWxsLFxuICAgIGFwcFZlcnNpb246IG51bGwsXG59O1xuXG5leHBvcnQgY29uc3QgRU5WSVJPTk1FTlRTID0ge1xuICAgIFVBVDogXCJodHRwOi8vYXBpLmRyaXZld2VhbHRoLmlvL3YxXCIsXG4gICAgUFJPRDogXCJodHRwczovL2FwaS5kcml2ZXdlYWx0aC5uZXQvdjFcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cCh7XG4gICAgZW52LFxuICAgIGh0dHBJbXBsLFxuICAgIGFwcFR5cGVJRCxcbiAgICBhcHBWZXJzaW9uLFxufSkge1xuICAgIENvbmZpZy5lbnYgPSBlbnY7XG4gICAgQ29uZmlnLmh0dHBJbXBsID0gaHR0cEltcGw7XG4gICAgQ29uZmlnLmFwcFR5cGVJRCA9IGFwcFR5cGVJRDtcbiAgICBDb25maWcuYXBwVmVyc2lvbiA9IGFwcFZlcnNpb247XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ29uZmlnLmpzIiwiY2xhc3MgU2Vzc2lvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9rZXlzID0ge307XG4gICAgICAgIHRoaXMuX21haW5Vc2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzYXZlKHVzZXJJRCwgc2Vzc2lvbktleSkge1xuICAgICAgICB0aGlzLl9rZXlzW3VzZXJJRF0gPSBzZXNzaW9uS2V5O1xuICAgICAgICBpZiAoIXRoaXMuX21haW5Vc2VyKSB0aGlzLl9tYWluVXNlciA9IHVzZXJJRDtcbiAgICB9XG5cbiAgICBnZXQodXNlcklEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzW3VzZXJJRF07XG4gICAgfVxuXG4gICAgZ2V0QW55KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c1t0aGlzLl9tYWluVXNlcl07XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2Vzc2lvbnMgPSBuZXcgU2Vzc2lvbnMoKTtcbmV4cG9ydCBkZWZhdWx0IHNlc3Npb25zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1Nlc3Npb25zLmpzIiwiaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IFNlc3Npb25zIGZyb20gXCIuL1Nlc3Npb25zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RydW1lbnQge1xuXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgW1xuICAgICAgICAgICAgXCJpbnN0cnVtZW50SURcIixcbiAgICAgICAgICAgIFwibmFtZVwiLFxuICAgICAgICAgICAgXCJleGNoYW5nZUlEXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnRUeXBlSURcIixcbiAgICAgICAgICAgIFwib3JkZXJTaXplTWF4XCIsXG4gICAgICAgICAgICBcIm9yZGVyU2l6ZU1pblwiLFxuICAgICAgICAgICAgXCJvcmRlclNpemVTdGVwXCIsXG4gICAgICAgICAgICBcInJhdGVBc2tcIixcbiAgICAgICAgICAgIFwicmF0ZUJpZFwiLFxuICAgICAgICAgICAgXCJyYXRlUHJlY2lzaW9uXCIsXG4gICAgICAgICAgICBcInN5bWJvbFwiLFxuICAgICAgICAgICAgXCJ0cmFkZVN0YXR1c1wiLFxuICAgICAgICAgICAgXCJ1cmxJbWFnZVwiLFxuICAgICAgICAgICAgXCJ1cmxJbnZlc3RvclwiLFxuICAgICAgICAgICAgXCJjaGFpa2luUGdyXCIsXG4gICAgICAgICAgICBcInByaW9yQ2xvc2VcIixcbiAgICAgICAgICAgIFwibWFya2V0U3RhdGVcIixcbiAgICAgICAgXSkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEJ5U3ltYm9sKHN5bWJvbCwgY2IpIHtcbiAgICAgICAgbGV0IHN5bWJvbHMgPSBzeW1ib2w7XG4gICAgICAgIGlmICh0eXBlb2Ygc3ltYm9sID09PSBcInN0cmluZ1wiKSBzeW1ib2xzID0gW3N5bWJvbF07XG5cbiAgICAgICAgcmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBlbmRwb2ludDogYC9pbnN0cnVtZW50cz9zeW1ib2w9JHtzeW1ib2xzLmpvaW4oJywnKX1gLFxuICAgICAgICAgICAgc2Vzc2lvbktleTogU2Vzc2lvbnMuZ2V0QW55KCksXG4gICAgICAgIH0sIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5tYXAoaW5zID0+IG5ldyBJbnN0cnVtZW50KGlucykpO1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgdHlwZW9mIHN5bWJvbCA9PT0gXCJzdHJpbmdcIiA/IGRhdGFbMF0gOiBkYXRhKTtcbiAgICAgICAgfSwgZXJyID0+IGNiICYmIGNiKGVycikpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRCeUlEKGlkLCBpbmNsdWRlRnVuZGFtZW50YWxzID0gdHJ1ZSwgY2IpIHtcbiAgICAgICAgcmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBlbmRwb2ludDogYC9pbnN0cnVtZW50cy8ke2lkfSR7aW5jbHVkZUZ1bmRhbWVudGFscyA/ICc/b3B0aW9ucz1GJyA6ICcnfWAsXG4gICAgICAgICAgICBzZXNzaW9uS2V5OiBTZXNzaW9ucy5nZXRBbnkoKSxcbiAgICAgICAgfSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNiICYmIGNiKG51bGwsIG5ldyBJbnN0cnVtZW50KGRhdGEpKTtcbiAgICAgICAgfSwgZXJyID0+IGNiICYmIGNiKGVycikpO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luc3RydW1lbnQuanMiLCJpbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCBTZXNzaW9ucyBmcm9tIFwiLi9TZXNzaW9uc1wiO1xuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vQWNjb3VudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIFtcbiAgICAgICAgICAgIFwiY291bnRyeUlEXCIsXG4gICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiLFxuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIixcbiAgICAgICAgICAgIFwibGFuZ3VhZ2VJRFwiLFxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiLFxuICAgICAgICAgICAgXCJwaG9uZU51bWJlclwiLFxuICAgICAgICAgICAgXCJyZWZlcnJhbENvZGVcIixcbiAgICAgICAgICAgIFwidXNlcklEXCIsXG4gICAgICAgICAgICBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICBcIndscElEXCIsXG4gICAgICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICAgICAgXCJ1c0NpdGl6ZW5cIixcbiAgICAgICAgICAgIFwibGFzdExvZ2luV2hlblwiLFxuICAgICAgICAgICAgXCJjaXRpemVuc2hpcFwiLFxuICAgICAgICBdKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBY2NvdW50cyhjYikge1xuICAgICAgICBBY2NvdW50LmdldExpc3RGb3JVc2VySUQodGhpcy51c2VySUQsIGNiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0QnlVc2VySUQodXNlcklELCBjYikge1xuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGVuZHBvaW50OiBgL3VzZXJzLyR7dXNlcklEfWAsXG4gICAgICAgICAgICBzZXNzaW9uS2V5OiBTZXNzaW9ucy5nZXQodXNlcklEKVxuICAgICAgICB9LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgbmV3IFVzZXIoZGF0YSkpO1xuICAgICAgICB9LCBlcnIgPT4gY2IgJiYgY2IoZXJyKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCwgY2IpIHtcbiAgICAgICAgcmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZW5kcG9pbnQ6IFwiL3VzZXJTZXNzaW9uc1wiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGFwcFR5cGVJRDogQ29uZmlnLmFwcFR5cGVJRCxcbiAgICAgICAgICAgICAgICBhcHBWZXJzaW9uOiBDb25maWcuYXBwVmVyc2lvbixcbiAgICAgICAgICAgICAgICBsYW5ndWFnZUlEOiBcImVuX1VTXCIsXG4gICAgICAgICAgICAgICAgb3NUeXBlOiBcInVua25vd25cIixcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb246IFwidW5rbm93blwiLFxuICAgICAgICAgICAgICAgIHNjclJlczogXCJ1bmtub3duXCIsXG4gICAgICAgICAgICAgICAgaXBBZGRyZXNzOiBcInVua25vd25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgU2Vzc2lvbnMuc2F2ZShkYXRhLnVzZXJJRCwgZGF0YS5zZXNzaW9uS2V5KTtcbiAgICAgICAgICAgIFVzZXIuZ2V0QnlVc2VySUQoZGF0YS51c2VySUQsIChlcnIsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IgJiYgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICBjYiAmJiBjYihudWxsLCB1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnIgPT4gY2IgJiYgY2IoZXJyKSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXNlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=