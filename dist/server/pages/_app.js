"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "react-hot-toast"
const external_react_hot_toast_namespaceObject = require("react-hot-toast");
;// CONCATENATED MODULE: external "react-query"
const external_react_query_namespaceObject = require("react-query");
;// CONCATENATED MODULE: ./pages/_app.tsx




const queryClient = new external_react_query_namespaceObject.QueryClient();
// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === "undefined" ? null : children}
//     </div>
//   );
// }
function MyApp({ Component , pageProps  }) {
    return(// <SafeHydrate>
    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_query_namespaceObject.QueryClientProvider, {
        client: queryClient,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_hot_toast_namespaceObject.Toaster, {
                position: "top-right"
            })
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(137));
module.exports = __webpack_exports__;

})();