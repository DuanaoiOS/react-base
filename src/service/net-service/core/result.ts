/**
 * @desc Result
 * @author DuanaoiOS
 */

export type Result<T, E> = Ok<T, E> | Err<T, E>;
export const ok = <T, E>(value: T): Ok<T, E> => new Ok(value);
export const err = <T, E>(error: E): Err<T, E> => new Err(error);

export function resultZip<A extends any, E>(args: Result<A, E>[]): Result<A[], E> {
    return ok(
        args.map((item) => {
            if (item.isErr()) {
                throw Error('RESULT IS FAILURE!');
            }
            return item._unsafeUnwrap();
        }),
    );
}

export class Ok<T, E> {
    constructor(readonly value: T) {}

    isOk(): this is Ok<T, E> {
        return true;
    }

    isErr(): this is Err<T, E> {
        return !this.isOk();
    }

    map<A>(f: (t: T) => A): Result<A, E> {
        return ok(f(this.value));
    }

    mapErr<U>(_f: (e: E) => U): Result<T, U> {
        return ok(this.value);
    }

    andThen<U>(f: (t: T) => Result<U, E>): Result<U, E> {
        return f(this.value);
    }

    success(f: (t: T) => void): Result<T, E> {
        f(this.value);
        return this;
    }

    failure(f: (e: E) => void): Result<T, E> {
        return this;
    }

    unwrapOr(_v: T): T {
        return this.value;
    }

    match = <A>(ok: (t: T) => A, _err: (e: E) => A): A => {
        return ok(this.value);
    };

    _unsafeUnwrap(): T {
        return this.value;
    }

    _unsafeUnwrapErr(): E {
        throw new Error('RESULT IS OK~!');
    }
}

export class Err<T, E> {
    constructor(readonly error: E) {}

    isOk(): this is Ok<T, E> {
        return false;
    }

    isErr(): this is Err<T, E> {
        return !this.isOk();
    }

    map<A>(_f: (t: T) => A): Result<A, E> {
        return err(this.error);
    }

    mapErr<U>(f: (e: E) => U): Result<T, U> {
        return err(f(this.error));
    }

    andThen<U>(_f: (t: T) => Result<U, E>): Result<U, E> {
        return err(this.error);
    }

    success(f: (t: T) => void): Result<T, E> {
        return this;
    }

    failure(f: (e: E) => void): Result<T, E> {
        f(this.error);
        return this;
    }

    unwrapOr(v: T): T {
        return v;
    }

    match = <A>(_ok: (t: T) => A, err: (e: E) => A): A => {
        return err(this.error);
    };

    _unsafeUnwrap(): T {
        throw new Error('RESULT IS ERR~!');
    }

    _unsafeUnwrapErr(): E {
        return this.error;
    }
}
