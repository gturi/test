"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/**
 * Represents the states of a promise.
 */
var State;
(function (State) {
    /**
     * Promise initial state.
     */
    State["Pending"] = "pending";
    /**
     * Promise state after the method {@link CompletablePromise.resolve} has been called.
     */
    State["Fulfilled"] = "fulfilled";
    /**
     * Promise state after the method {@link CompletablePromise.reject} has been called.
     */
    State["Rejected"] = "rejected";
})(State = exports.State || (exports.State = {}));
//# sourceMappingURL=state.js.map