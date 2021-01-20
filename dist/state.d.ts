/**
 * Represents the states of a promise.
 */
export declare enum State {
    /**
     * Promise initial state.
     */
    Pending = "pending",
    /**
     * Promise state after the method {@link CompletablePromise.resolve} has been called.
     */
    Fulfilled = "fulfilled",
    /**
     * Promise state after the method {@link CompletablePromise.reject} has been called.
     */
    Rejected = "rejected"
}
