/**
 * Represents a deferred promise, exposing the resolve and reject methods.
 *
 * @type T the type of the {@link CompletablePromise}.
 */
export interface DeferredPromise<T> {
    /**
     * Method to resolve the promise.
     *
     * @param value the resolution value.
     */
    resolve: (value: T | PromiseLike<T>) => void;
    /**
     * Method to reject the promise.
     *
     * @param reason the rejection reason.
     */
    reject: (reason: unknown) => void;
}
