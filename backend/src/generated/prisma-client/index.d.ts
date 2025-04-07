
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TravelPlan
 * 
 */
export type TravelPlan = $Result.DefaultSelection<Prisma.$TravelPlanPayload>
/**
 * Model TravelPlanJournal
 * 
 */
export type TravelPlanJournal = $Result.DefaultSelection<Prisma.$TravelPlanJournalPayload>
/**
 * Model TravelPlanDestination
 * 
 */
export type TravelPlanDestination = $Result.DefaultSelection<Prisma.$TravelPlanDestinationPayload>
/**
 * Model TravelPlanDestinationAttachment
 * 
 */
export type TravelPlanDestinationAttachment = $Result.DefaultSelection<Prisma.$TravelPlanDestinationAttachmentPayload>
/**
 * Model TravelPlanBookmark
 * 
 */
export type TravelPlanBookmark = $Result.DefaultSelection<Prisma.$TravelPlanBookmarkPayload>
/**
 * Model TravelPlanLike
 * 
 */
export type TravelPlanLike = $Result.DefaultSelection<Prisma.$TravelPlanLikePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Visibility: {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE'
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility]

}

export type Visibility = $Enums.Visibility

export const Visibility: typeof $Enums.Visibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlan`: Exposes CRUD operations for the **TravelPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlans
    * const travelPlans = await prisma.travelPlan.findMany()
    * ```
    */
  get travelPlan(): Prisma.TravelPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlanJournal`: Exposes CRUD operations for the **TravelPlanJournal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlanJournals
    * const travelPlanJournals = await prisma.travelPlanJournal.findMany()
    * ```
    */
  get travelPlanJournal(): Prisma.TravelPlanJournalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlanDestination`: Exposes CRUD operations for the **TravelPlanDestination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlanDestinations
    * const travelPlanDestinations = await prisma.travelPlanDestination.findMany()
    * ```
    */
  get travelPlanDestination(): Prisma.TravelPlanDestinationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlanDestinationAttachment`: Exposes CRUD operations for the **TravelPlanDestinationAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlanDestinationAttachments
    * const travelPlanDestinationAttachments = await prisma.travelPlanDestinationAttachment.findMany()
    * ```
    */
  get travelPlanDestinationAttachment(): Prisma.TravelPlanDestinationAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlanBookmark`: Exposes CRUD operations for the **TravelPlanBookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlanBookmarks
    * const travelPlanBookmarks = await prisma.travelPlanBookmark.findMany()
    * ```
    */
  get travelPlanBookmark(): Prisma.TravelPlanBookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelPlanLike`: Exposes CRUD operations for the **TravelPlanLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelPlanLikes
    * const travelPlanLikes = await prisma.travelPlanLike.findMany()
    * ```
    */
  get travelPlanLike(): Prisma.TravelPlanLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    TravelPlan: 'TravelPlan',
    TravelPlanJournal: 'TravelPlanJournal',
    TravelPlanDestination: 'TravelPlanDestination',
    TravelPlanDestinationAttachment: 'TravelPlanDestinationAttachment',
    TravelPlanBookmark: 'TravelPlanBookmark',
    TravelPlanLike: 'TravelPlanLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "travelPlan" | "travelPlanJournal" | "travelPlanDestination" | "travelPlanDestinationAttachment" | "travelPlanBookmark" | "travelPlanLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TravelPlan: {
        payload: Prisma.$TravelPlanPayload<ExtArgs>
        fields: Prisma.TravelPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          findFirst: {
            args: Prisma.TravelPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          findMany: {
            args: Prisma.TravelPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>[]
          }
          create: {
            args: Prisma.TravelPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          createMany: {
            args: Prisma.TravelPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>[]
          }
          delete: {
            args: Prisma.TravelPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          update: {
            args: Prisma.TravelPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanPayload>
          }
          aggregate: {
            args: Prisma.TravelPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlan>
          }
          groupBy: {
            args: Prisma.TravelPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanCountAggregateOutputType> | number
          }
        }
      }
      TravelPlanJournal: {
        payload: Prisma.$TravelPlanJournalPayload<ExtArgs>
        fields: Prisma.TravelPlanJournalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanJournalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanJournalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          findFirst: {
            args: Prisma.TravelPlanJournalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanJournalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          findMany: {
            args: Prisma.TravelPlanJournalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>[]
          }
          create: {
            args: Prisma.TravelPlanJournalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          createMany: {
            args: Prisma.TravelPlanJournalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanJournalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>[]
          }
          delete: {
            args: Prisma.TravelPlanJournalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          update: {
            args: Prisma.TravelPlanJournalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanJournalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanJournalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanJournalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanJournalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanJournalPayload>
          }
          aggregate: {
            args: Prisma.TravelPlanJournalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlanJournal>
          }
          groupBy: {
            args: Prisma.TravelPlanJournalGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanJournalGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanJournalCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanJournalCountAggregateOutputType> | number
          }
        }
      }
      TravelPlanDestination: {
        payload: Prisma.$TravelPlanDestinationPayload<ExtArgs>
        fields: Prisma.TravelPlanDestinationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanDestinationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanDestinationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          findFirst: {
            args: Prisma.TravelPlanDestinationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanDestinationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          findMany: {
            args: Prisma.TravelPlanDestinationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>[]
          }
          create: {
            args: Prisma.TravelPlanDestinationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          createMany: {
            args: Prisma.TravelPlanDestinationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanDestinationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>[]
          }
          delete: {
            args: Prisma.TravelPlanDestinationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          update: {
            args: Prisma.TravelPlanDestinationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanDestinationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanDestinationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanDestinationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanDestinationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationPayload>
          }
          aggregate: {
            args: Prisma.TravelPlanDestinationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlanDestination>
          }
          groupBy: {
            args: Prisma.TravelPlanDestinationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanDestinationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanDestinationCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanDestinationCountAggregateOutputType> | number
          }
        }
      }
      TravelPlanDestinationAttachment: {
        payload: Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>
        fields: Prisma.TravelPlanDestinationAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanDestinationAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanDestinationAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          findFirst: {
            args: Prisma.TravelPlanDestinationAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanDestinationAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          findMany: {
            args: Prisma.TravelPlanDestinationAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>[]
          }
          create: {
            args: Prisma.TravelPlanDestinationAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          createMany: {
            args: Prisma.TravelPlanDestinationAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanDestinationAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>[]
          }
          delete: {
            args: Prisma.TravelPlanDestinationAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          update: {
            args: Prisma.TravelPlanDestinationAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanDestinationAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanDestinationAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanDestinationAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanDestinationAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanDestinationAttachmentPayload>
          }
          aggregate: {
            args: Prisma.TravelPlanDestinationAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlanDestinationAttachment>
          }
          groupBy: {
            args: Prisma.TravelPlanDestinationAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanDestinationAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanDestinationAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanDestinationAttachmentCountAggregateOutputType> | number
          }
        }
      }
      TravelPlanBookmark: {
        payload: Prisma.$TravelPlanBookmarkPayload<ExtArgs>
        fields: Prisma.TravelPlanBookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanBookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanBookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          findFirst: {
            args: Prisma.TravelPlanBookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanBookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          findMany: {
            args: Prisma.TravelPlanBookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>[]
          }
          create: {
            args: Prisma.TravelPlanBookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          createMany: {
            args: Prisma.TravelPlanBookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanBookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>[]
          }
          delete: {
            args: Prisma.TravelPlanBookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          update: {
            args: Prisma.TravelPlanBookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanBookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanBookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanBookmarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanBookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanBookmarkPayload>
          }
          aggregate: {
            args: Prisma.TravelPlanBookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlanBookmark>
          }
          groupBy: {
            args: Prisma.TravelPlanBookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanBookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanBookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanBookmarkCountAggregateOutputType> | number
          }
        }
      }
      TravelPlanLike: {
        payload: Prisma.$TravelPlanLikePayload<ExtArgs>
        fields: Prisma.TravelPlanLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelPlanLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelPlanLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          findFirst: {
            args: Prisma.TravelPlanLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelPlanLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          findMany: {
            args: Prisma.TravelPlanLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>[]
          }
          create: {
            args: Prisma.TravelPlanLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          createMany: {
            args: Prisma.TravelPlanLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelPlanLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>[]
          }
          delete: {
            args: Prisma.TravelPlanLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          update: {
            args: Prisma.TravelPlanLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          deleteMany: {
            args: Prisma.TravelPlanLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelPlanLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelPlanLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>[]
          }
          upsert: {
            args: Prisma.TravelPlanLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelPlanLikePayload>
          }
          aggregate: {
            args: Prisma.TravelPlanLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelPlanLike>
          }
          groupBy: {
            args: Prisma.TravelPlanLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelPlanLikeCountArgs<ExtArgs>
            result: $Utils.Optional<TravelPlanLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    travelPlan?: TravelPlanOmit
    travelPlanJournal?: TravelPlanJournalOmit
    travelPlanDestination?: TravelPlanDestinationOmit
    travelPlanDestinationAttachment?: TravelPlanDestinationAttachmentOmit
    travelPlanBookmark?: TravelPlanBookmarkOmit
    travelPlanLike?: TravelPlanLikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    travelPlans: number
    bookmarkedTravelPlans: number
    likedTravelPlans: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlans?: boolean | UserCountOutputTypeCountTravelPlansArgs
    bookmarkedTravelPlans?: boolean | UserCountOutputTypeCountBookmarkedTravelPlansArgs
    likedTravelPlans?: boolean | UserCountOutputTypeCountLikedTravelPlansArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTravelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarkedTravelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanBookmarkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedTravelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanLikeWhereInput
  }


  /**
   * Count Type TravelPlanCountOutputType
   */

  export type TravelPlanCountOutputType = {
    destinations: number
    bookmarkedByUsers: number
    likedByUsers: number
  }

  export type TravelPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    destinations?: boolean | TravelPlanCountOutputTypeCountDestinationsArgs
    bookmarkedByUsers?: boolean | TravelPlanCountOutputTypeCountBookmarkedByUsersArgs
    likedByUsers?: boolean | TravelPlanCountOutputTypeCountLikedByUsersArgs
  }

  // Custom InputTypes
  /**
   * TravelPlanCountOutputType without action
   */
  export type TravelPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanCountOutputType
     */
    select?: TravelPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TravelPlanCountOutputType without action
   */
  export type TravelPlanCountOutputTypeCountDestinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanDestinationWhereInput
  }

  /**
   * TravelPlanCountOutputType without action
   */
  export type TravelPlanCountOutputTypeCountBookmarkedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanBookmarkWhereInput
  }

  /**
   * TravelPlanCountOutputType without action
   */
  export type TravelPlanCountOutputTypeCountLikedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanLikeWhereInput
  }


  /**
   * Count Type TravelPlanDestinationCountOutputType
   */

  export type TravelPlanDestinationCountOutputType = {
    attachments: number
  }

  export type TravelPlanDestinationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | TravelPlanDestinationCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * TravelPlanDestinationCountOutputType without action
   */
  export type TravelPlanDestinationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationCountOutputType
     */
    select?: TravelPlanDestinationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TravelPlanDestinationCountOutputType without action
   */
  export type TravelPlanDestinationCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanDestinationAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    experienceLevel: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    experienceLevel: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    avatarUrl: string | null
    experienceLevel: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    avatarUrl: string | null
    experienceLevel: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    avatarUrl: number
    experienceLevel: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    experienceLevel?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    experienceLevel?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    avatarUrl?: true
    experienceLevel?: true
    updatedAt?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    avatarUrl?: true
    experienceLevel?: true
    updatedAt?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    avatarUrl?: true
    experienceLevel?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    avatarUrl: string | null
    experienceLevel: number
    updatedAt: Date
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    experienceLevel?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlans?: boolean | User$travelPlansArgs<ExtArgs>
    bookmarkedTravelPlans?: boolean | User$bookmarkedTravelPlansArgs<ExtArgs>
    likedTravelPlans?: boolean | User$likedTravelPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    experienceLevel?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    experienceLevel?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    experienceLevel?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "avatarUrl" | "experienceLevel" | "updatedAt" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlans?: boolean | User$travelPlansArgs<ExtArgs>
    bookmarkedTravelPlans?: boolean | User$bookmarkedTravelPlansArgs<ExtArgs>
    likedTravelPlans?: boolean | User$likedTravelPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      travelPlans: Prisma.$TravelPlanPayload<ExtArgs>[]
      bookmarkedTravelPlans: Prisma.$TravelPlanBookmarkPayload<ExtArgs>[]
      likedTravelPlans: Prisma.$TravelPlanLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      avatarUrl: string | null
      experienceLevel: number
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlans<T extends User$travelPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$travelPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarkedTravelPlans<T extends User$bookmarkedTravelPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarkedTravelPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likedTravelPlans<T extends User$likedTravelPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$likedTravelPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly experienceLevel: FieldRef<"User", 'Int'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.travelPlans
   */
  export type User$travelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    where?: TravelPlanWhereInput
    orderBy?: TravelPlanOrderByWithRelationInput | TravelPlanOrderByWithRelationInput[]
    cursor?: TravelPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanScalarFieldEnum | TravelPlanScalarFieldEnum[]
  }

  /**
   * User.bookmarkedTravelPlans
   */
  export type User$bookmarkedTravelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    where?: TravelPlanBookmarkWhereInput
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    cursor?: TravelPlanBookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanBookmarkScalarFieldEnum | TravelPlanBookmarkScalarFieldEnum[]
  }

  /**
   * User.likedTravelPlans
   */
  export type User$likedTravelPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    where?: TravelPlanLikeWhereInput
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    cursor?: TravelPlanLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanLikeScalarFieldEnum | TravelPlanLikeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlan
   */

  export type AggregateTravelPlan = {
    _count: TravelPlanCountAggregateOutputType | null
    _avg: TravelPlanAvgAggregateOutputType | null
    _sum: TravelPlanSumAggregateOutputType | null
    _min: TravelPlanMinAggregateOutputType | null
    _max: TravelPlanMaxAggregateOutputType | null
  }

  export type TravelPlanAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type TravelPlanSumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type TravelPlanMinAggregateOutputType = {
    id: number | null
    authorId: number | null
    title: string | null
    cityTitle: string | null
    notes: string | null
    startDate: Date | null
    endDate: Date | null
    visibility: $Enums.Visibility | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanMaxAggregateOutputType = {
    id: number | null
    authorId: number | null
    title: string | null
    cityTitle: string | null
    notes: string | null
    startDate: Date | null
    endDate: Date | null
    visibility: $Enums.Visibility | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanCountAggregateOutputType = {
    id: number
    authorId: number
    title: number
    cityTitle: number
    notes: number
    startDate: number
    endDate: number
    visibility: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type TravelPlanAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type TravelPlanSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type TravelPlanMinAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    cityTitle?: true
    notes?: true
    startDate?: true
    endDate?: true
    visibility?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanMaxAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    cityTitle?: true
    notes?: true
    startDate?: true
    endDate?: true
    visibility?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanCountAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    cityTitle?: true
    notes?: true
    startDate?: true
    endDate?: true
    visibility?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TravelPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlan to aggregate.
     */
    where?: TravelPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlans to fetch.
     */
    orderBy?: TravelPlanOrderByWithRelationInput | TravelPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlans
    **/
    _count?: true | TravelPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanMaxAggregateInputType
  }

  export type GetTravelPlanAggregateType<T extends TravelPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlan[P]>
      : GetScalarType<T[P], AggregateTravelPlan[P]>
  }




  export type TravelPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanWhereInput
    orderBy?: TravelPlanOrderByWithAggregationInput | TravelPlanOrderByWithAggregationInput[]
    by: TravelPlanScalarFieldEnum[] | TravelPlanScalarFieldEnum
    having?: TravelPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanCountAggregateInputType | true
    _avg?: TravelPlanAvgAggregateInputType
    _sum?: TravelPlanSumAggregateInputType
    _min?: TravelPlanMinAggregateInputType
    _max?: TravelPlanMaxAggregateInputType
  }

  export type TravelPlanGroupByOutputType = {
    id: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date
    endDate: Date
    visibility: $Enums.Visibility
    updatedAt: Date
    createdAt: Date
    _count: TravelPlanCountAggregateOutputType | null
    _avg: TravelPlanAvgAggregateOutputType | null
    _sum: TravelPlanSumAggregateOutputType | null
    _min: TravelPlanMinAggregateOutputType | null
    _max: TravelPlanMaxAggregateOutputType | null
  }

  type GetTravelPlanGroupByPayload<T extends TravelPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    cityTitle?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    visibility?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    journal?: boolean | TravelPlan$journalArgs<ExtArgs>
    destinations?: boolean | TravelPlan$destinationsArgs<ExtArgs>
    bookmarkedByUsers?: boolean | TravelPlan$bookmarkedByUsersArgs<ExtArgs>
    likedByUsers?: boolean | TravelPlan$likedByUsersArgs<ExtArgs>
    _count?: boolean | TravelPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlan"]>

  export type TravelPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    cityTitle?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    visibility?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlan"]>

  export type TravelPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    cityTitle?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    visibility?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlan"]>

  export type TravelPlanSelectScalar = {
    id?: boolean
    authorId?: boolean
    title?: boolean
    cityTitle?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    visibility?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type TravelPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorId" | "title" | "cityTitle" | "notes" | "startDate" | "endDate" | "visibility" | "updatedAt" | "createdAt", ExtArgs["result"]["travelPlan"]>
  export type TravelPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    journal?: boolean | TravelPlan$journalArgs<ExtArgs>
    destinations?: boolean | TravelPlan$destinationsArgs<ExtArgs>
    bookmarkedByUsers?: boolean | TravelPlan$bookmarkedByUsersArgs<ExtArgs>
    likedByUsers?: boolean | TravelPlan$likedByUsersArgs<ExtArgs>
    _count?: boolean | TravelPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TravelPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TravelPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TravelPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      journal: Prisma.$TravelPlanJournalPayload<ExtArgs> | null
      destinations: Prisma.$TravelPlanDestinationPayload<ExtArgs>[]
      bookmarkedByUsers: Prisma.$TravelPlanBookmarkPayload<ExtArgs>[]
      likedByUsers: Prisma.$TravelPlanLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      authorId: number
      title: string
      cityTitle: string
      notes: string
      startDate: Date
      endDate: Date
      visibility: $Enums.Visibility
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["travelPlan"]>
    composites: {}
  }

  type TravelPlanGetPayload<S extends boolean | null | undefined | TravelPlanDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanPayload, S>

  type TravelPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanCountAggregateInputType | true
    }

  export interface TravelPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlan'], meta: { name: 'TravelPlan' } }
    /**
     * Find zero or one TravelPlan that matches the filter.
     * @param {TravelPlanFindUniqueArgs} args - Arguments to find a TravelPlan
     * @example
     * // Get one TravelPlan
     * const travelPlan = await prisma.travelPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanFindUniqueArgs>(args: SelectSubset<T, TravelPlanFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanFindUniqueOrThrowArgs} args - Arguments to find a TravelPlan
     * @example
     * // Get one TravelPlan
     * const travelPlan = await prisma.travelPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanFindFirstArgs} args - Arguments to find a TravelPlan
     * @example
     * // Get one TravelPlan
     * const travelPlan = await prisma.travelPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanFindFirstArgs>(args?: SelectSubset<T, TravelPlanFindFirstArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanFindFirstOrThrowArgs} args - Arguments to find a TravelPlan
     * @example
     * // Get one TravelPlan
     * const travelPlan = await prisma.travelPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlans
     * const travelPlans = await prisma.travelPlan.findMany()
     * 
     * // Get first 10 TravelPlans
     * const travelPlans = await prisma.travelPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelPlanWithIdOnly = await prisma.travelPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelPlanFindManyArgs>(args?: SelectSubset<T, TravelPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlan.
     * @param {TravelPlanCreateArgs} args - Arguments to create a TravelPlan.
     * @example
     * // Create one TravelPlan
     * const TravelPlan = await prisma.travelPlan.create({
     *   data: {
     *     // ... data to create a TravelPlan
     *   }
     * })
     * 
     */
    create<T extends TravelPlanCreateArgs>(args: SelectSubset<T, TravelPlanCreateArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlans.
     * @param {TravelPlanCreateManyArgs} args - Arguments to create many TravelPlans.
     * @example
     * // Create many TravelPlans
     * const travelPlan = await prisma.travelPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanCreateManyArgs>(args?: SelectSubset<T, TravelPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlans and returns the data saved in the database.
     * @param {TravelPlanCreateManyAndReturnArgs} args - Arguments to create many TravelPlans.
     * @example
     * // Create many TravelPlans
     * const travelPlan = await prisma.travelPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlans and only return the `id`
     * const travelPlanWithIdOnly = await prisma.travelPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlan.
     * @param {TravelPlanDeleteArgs} args - Arguments to delete one TravelPlan.
     * @example
     * // Delete one TravelPlan
     * const TravelPlan = await prisma.travelPlan.delete({
     *   where: {
     *     // ... filter to delete one TravelPlan
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanDeleteArgs>(args: SelectSubset<T, TravelPlanDeleteArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlan.
     * @param {TravelPlanUpdateArgs} args - Arguments to update one TravelPlan.
     * @example
     * // Update one TravelPlan
     * const travelPlan = await prisma.travelPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanUpdateArgs>(args: SelectSubset<T, TravelPlanUpdateArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlans.
     * @param {TravelPlanDeleteManyArgs} args - Arguments to filter TravelPlans to delete.
     * @example
     * // Delete a few TravelPlans
     * const { count } = await prisma.travelPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanDeleteManyArgs>(args?: SelectSubset<T, TravelPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlans
     * const travelPlan = await prisma.travelPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanUpdateManyArgs>(args: SelectSubset<T, TravelPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlans and returns the data updated in the database.
     * @param {TravelPlanUpdateManyAndReturnArgs} args - Arguments to update many TravelPlans.
     * @example
     * // Update many TravelPlans
     * const travelPlan = await prisma.travelPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlans and only return the `id`
     * const travelPlanWithIdOnly = await prisma.travelPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlan.
     * @param {TravelPlanUpsertArgs} args - Arguments to update or create a TravelPlan.
     * @example
     * // Update or create a TravelPlan
     * const travelPlan = await prisma.travelPlan.upsert({
     *   create: {
     *     // ... data to create a TravelPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlan we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanUpsertArgs>(args: SelectSubset<T, TravelPlanUpsertArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanCountArgs} args - Arguments to filter TravelPlans to count.
     * @example
     * // Count the number of TravelPlans
     * const count = await prisma.travelPlan.count({
     *   where: {
     *     // ... the filter for the TravelPlans we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanCountArgs>(
      args?: Subset<T, TravelPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanAggregateArgs>(args: Subset<T, TravelPlanAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanAggregateType<T>>

    /**
     * Group by TravelPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlan model
   */
  readonly fields: TravelPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    journal<T extends TravelPlan$journalArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlan$journalArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    destinations<T extends TravelPlan$destinationsArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlan$destinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarkedByUsers<T extends TravelPlan$bookmarkedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlan$bookmarkedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likedByUsers<T extends TravelPlan$likedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlan$likedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlan model
   */ 
  interface TravelPlanFieldRefs {
    readonly id: FieldRef<"TravelPlan", 'Int'>
    readonly authorId: FieldRef<"TravelPlan", 'Int'>
    readonly title: FieldRef<"TravelPlan", 'String'>
    readonly cityTitle: FieldRef<"TravelPlan", 'String'>
    readonly notes: FieldRef<"TravelPlan", 'String'>
    readonly startDate: FieldRef<"TravelPlan", 'DateTime'>
    readonly endDate: FieldRef<"TravelPlan", 'DateTime'>
    readonly visibility: FieldRef<"TravelPlan", 'Visibility'>
    readonly updatedAt: FieldRef<"TravelPlan", 'DateTime'>
    readonly createdAt: FieldRef<"TravelPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlan findUnique
   */
  export type TravelPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlan to fetch.
     */
    where: TravelPlanWhereUniqueInput
  }

  /**
   * TravelPlan findUniqueOrThrow
   */
  export type TravelPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlan to fetch.
     */
    where: TravelPlanWhereUniqueInput
  }

  /**
   * TravelPlan findFirst
   */
  export type TravelPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlan to fetch.
     */
    where?: TravelPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlans to fetch.
     */
    orderBy?: TravelPlanOrderByWithRelationInput | TravelPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlans.
     */
    cursor?: TravelPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlans.
     */
    distinct?: TravelPlanScalarFieldEnum | TravelPlanScalarFieldEnum[]
  }

  /**
   * TravelPlan findFirstOrThrow
   */
  export type TravelPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlan to fetch.
     */
    where?: TravelPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlans to fetch.
     */
    orderBy?: TravelPlanOrderByWithRelationInput | TravelPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlans.
     */
    cursor?: TravelPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlans.
     */
    distinct?: TravelPlanScalarFieldEnum | TravelPlanScalarFieldEnum[]
  }

  /**
   * TravelPlan findMany
   */
  export type TravelPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlans to fetch.
     */
    where?: TravelPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlans to fetch.
     */
    orderBy?: TravelPlanOrderByWithRelationInput | TravelPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlans.
     */
    cursor?: TravelPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlans.
     */
    skip?: number
    distinct?: TravelPlanScalarFieldEnum | TravelPlanScalarFieldEnum[]
  }

  /**
   * TravelPlan create
   */
  export type TravelPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlan.
     */
    data: XOR<TravelPlanCreateInput, TravelPlanUncheckedCreateInput>
  }

  /**
   * TravelPlan createMany
   */
  export type TravelPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlans.
     */
    data: TravelPlanCreateManyInput | TravelPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlan createManyAndReturn
   */
  export type TravelPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlans.
     */
    data: TravelPlanCreateManyInput | TravelPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlan update
   */
  export type TravelPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlan.
     */
    data: XOR<TravelPlanUpdateInput, TravelPlanUncheckedUpdateInput>
    /**
     * Choose, which TravelPlan to update.
     */
    where: TravelPlanWhereUniqueInput
  }

  /**
   * TravelPlan updateMany
   */
  export type TravelPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlans.
     */
    data: XOR<TravelPlanUpdateManyMutationInput, TravelPlanUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlans to update
     */
    where?: TravelPlanWhereInput
    /**
     * Limit how many TravelPlans to update.
     */
    limit?: number
  }

  /**
   * TravelPlan updateManyAndReturn
   */
  export type TravelPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlans.
     */
    data: XOR<TravelPlanUpdateManyMutationInput, TravelPlanUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlans to update
     */
    where?: TravelPlanWhereInput
    /**
     * Limit how many TravelPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlan upsert
   */
  export type TravelPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlan to update in case it exists.
     */
    where: TravelPlanWhereUniqueInput
    /**
     * In case the TravelPlan found by the `where` argument doesn't exist, create a new TravelPlan with this data.
     */
    create: XOR<TravelPlanCreateInput, TravelPlanUncheckedCreateInput>
    /**
     * In case the TravelPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanUpdateInput, TravelPlanUncheckedUpdateInput>
  }

  /**
   * TravelPlan delete
   */
  export type TravelPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
    /**
     * Filter which TravelPlan to delete.
     */
    where: TravelPlanWhereUniqueInput
  }

  /**
   * TravelPlan deleteMany
   */
  export type TravelPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlans to delete
     */
    where?: TravelPlanWhereInput
    /**
     * Limit how many TravelPlans to delete.
     */
    limit?: number
  }

  /**
   * TravelPlan.journal
   */
  export type TravelPlan$journalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    where?: TravelPlanJournalWhereInput
  }

  /**
   * TravelPlan.destinations
   */
  export type TravelPlan$destinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    where?: TravelPlanDestinationWhereInput
    orderBy?: TravelPlanDestinationOrderByWithRelationInput | TravelPlanDestinationOrderByWithRelationInput[]
    cursor?: TravelPlanDestinationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanDestinationScalarFieldEnum | TravelPlanDestinationScalarFieldEnum[]
  }

  /**
   * TravelPlan.bookmarkedByUsers
   */
  export type TravelPlan$bookmarkedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    where?: TravelPlanBookmarkWhereInput
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    cursor?: TravelPlanBookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanBookmarkScalarFieldEnum | TravelPlanBookmarkScalarFieldEnum[]
  }

  /**
   * TravelPlan.likedByUsers
   */
  export type TravelPlan$likedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    where?: TravelPlanLikeWhereInput
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    cursor?: TravelPlanLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanLikeScalarFieldEnum | TravelPlanLikeScalarFieldEnum[]
  }

  /**
   * TravelPlan without action
   */
  export type TravelPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlan
     */
    select?: TravelPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlan
     */
    omit?: TravelPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlanJournal
   */

  export type AggregateTravelPlanJournal = {
    _count: TravelPlanJournalCountAggregateOutputType | null
    _avg: TravelPlanJournalAvgAggregateOutputType | null
    _sum: TravelPlanJournalSumAggregateOutputType | null
    _min: TravelPlanJournalMinAggregateOutputType | null
    _max: TravelPlanJournalMaxAggregateOutputType | null
  }

  export type TravelPlanJournalAvgAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    rating: number | null
  }

  export type TravelPlanJournalSumAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    rating: number | null
  }

  export type TravelPlanJournalMinAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    notes: string | null
    futureTip: string | null
    favNotes: string | null
    rating: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanJournalMaxAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    notes: string | null
    futureTip: string | null
    favNotes: string | null
    rating: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanJournalCountAggregateOutputType = {
    id: number
    travelPlanId: number
    notes: number
    futureTip: number
    favNotes: number
    rating: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type TravelPlanJournalAvgAggregateInputType = {
    id?: true
    travelPlanId?: true
    rating?: true
  }

  export type TravelPlanJournalSumAggregateInputType = {
    id?: true
    travelPlanId?: true
    rating?: true
  }

  export type TravelPlanJournalMinAggregateInputType = {
    id?: true
    travelPlanId?: true
    notes?: true
    futureTip?: true
    favNotes?: true
    rating?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanJournalMaxAggregateInputType = {
    id?: true
    travelPlanId?: true
    notes?: true
    futureTip?: true
    favNotes?: true
    rating?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanJournalCountAggregateInputType = {
    id?: true
    travelPlanId?: true
    notes?: true
    futureTip?: true
    favNotes?: true
    rating?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TravelPlanJournalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanJournal to aggregate.
     */
    where?: TravelPlanJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanJournals to fetch.
     */
    orderBy?: TravelPlanJournalOrderByWithRelationInput | TravelPlanJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlanJournals
    **/
    _count?: true | TravelPlanJournalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanJournalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanJournalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanJournalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanJournalMaxAggregateInputType
  }

  export type GetTravelPlanJournalAggregateType<T extends TravelPlanJournalAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlanJournal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlanJournal[P]>
      : GetScalarType<T[P], AggregateTravelPlanJournal[P]>
  }




  export type TravelPlanJournalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanJournalWhereInput
    orderBy?: TravelPlanJournalOrderByWithAggregationInput | TravelPlanJournalOrderByWithAggregationInput[]
    by: TravelPlanJournalScalarFieldEnum[] | TravelPlanJournalScalarFieldEnum
    having?: TravelPlanJournalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanJournalCountAggregateInputType | true
    _avg?: TravelPlanJournalAvgAggregateInputType
    _sum?: TravelPlanJournalSumAggregateInputType
    _min?: TravelPlanJournalMinAggregateInputType
    _max?: TravelPlanJournalMaxAggregateInputType
  }

  export type TravelPlanJournalGroupByOutputType = {
    id: number
    travelPlanId: number
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt: Date
    createdAt: Date
    _count: TravelPlanJournalCountAggregateOutputType | null
    _avg: TravelPlanJournalAvgAggregateOutputType | null
    _sum: TravelPlanJournalSumAggregateOutputType | null
    _min: TravelPlanJournalMinAggregateOutputType | null
    _max: TravelPlanJournalMaxAggregateOutputType | null
  }

  type GetTravelPlanJournalGroupByPayload<T extends TravelPlanJournalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanJournalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanJournalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanJournalGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanJournalGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanJournalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    notes?: boolean
    futureTip?: boolean
    favNotes?: boolean
    rating?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanJournal"]>

  export type TravelPlanJournalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    notes?: boolean
    futureTip?: boolean
    favNotes?: boolean
    rating?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanJournal"]>

  export type TravelPlanJournalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    notes?: boolean
    futureTip?: boolean
    favNotes?: boolean
    rating?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanJournal"]>

  export type TravelPlanJournalSelectScalar = {
    id?: boolean
    travelPlanId?: boolean
    notes?: boolean
    futureTip?: boolean
    favNotes?: boolean
    rating?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type TravelPlanJournalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "travelPlanId" | "notes" | "futureTip" | "favNotes" | "rating" | "updatedAt" | "createdAt", ExtArgs["result"]["travelPlanJournal"]>
  export type TravelPlanJournalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }
  export type TravelPlanJournalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }
  export type TravelPlanJournalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }

  export type $TravelPlanJournalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlanJournal"
    objects: {
      travelPlan: Prisma.$TravelPlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      travelPlanId: number
      notes: string
      futureTip: string
      favNotes: string
      rating: number
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["travelPlanJournal"]>
    composites: {}
  }

  type TravelPlanJournalGetPayload<S extends boolean | null | undefined | TravelPlanJournalDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanJournalPayload, S>

  type TravelPlanJournalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanJournalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanJournalCountAggregateInputType | true
    }

  export interface TravelPlanJournalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlanJournal'], meta: { name: 'TravelPlanJournal' } }
    /**
     * Find zero or one TravelPlanJournal that matches the filter.
     * @param {TravelPlanJournalFindUniqueArgs} args - Arguments to find a TravelPlanJournal
     * @example
     * // Get one TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanJournalFindUniqueArgs>(args: SelectSubset<T, TravelPlanJournalFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlanJournal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanJournalFindUniqueOrThrowArgs} args - Arguments to find a TravelPlanJournal
     * @example
     * // Get one TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanJournalFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanJournalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanJournal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalFindFirstArgs} args - Arguments to find a TravelPlanJournal
     * @example
     * // Get one TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanJournalFindFirstArgs>(args?: SelectSubset<T, TravelPlanJournalFindFirstArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanJournal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalFindFirstOrThrowArgs} args - Arguments to find a TravelPlanJournal
     * @example
     * // Get one TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanJournalFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanJournalFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlanJournals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlanJournals
     * const travelPlanJournals = await prisma.travelPlanJournal.findMany()
     * 
     * // Get first 10 TravelPlanJournals
     * const travelPlanJournals = await prisma.travelPlanJournal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelPlanJournalWithIdOnly = await prisma.travelPlanJournal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelPlanJournalFindManyArgs>(args?: SelectSubset<T, TravelPlanJournalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlanJournal.
     * @param {TravelPlanJournalCreateArgs} args - Arguments to create a TravelPlanJournal.
     * @example
     * // Create one TravelPlanJournal
     * const TravelPlanJournal = await prisma.travelPlanJournal.create({
     *   data: {
     *     // ... data to create a TravelPlanJournal
     *   }
     * })
     * 
     */
    create<T extends TravelPlanJournalCreateArgs>(args: SelectSubset<T, TravelPlanJournalCreateArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlanJournals.
     * @param {TravelPlanJournalCreateManyArgs} args - Arguments to create many TravelPlanJournals.
     * @example
     * // Create many TravelPlanJournals
     * const travelPlanJournal = await prisma.travelPlanJournal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanJournalCreateManyArgs>(args?: SelectSubset<T, TravelPlanJournalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlanJournals and returns the data saved in the database.
     * @param {TravelPlanJournalCreateManyAndReturnArgs} args - Arguments to create many TravelPlanJournals.
     * @example
     * // Create many TravelPlanJournals
     * const travelPlanJournal = await prisma.travelPlanJournal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlanJournals and only return the `id`
     * const travelPlanJournalWithIdOnly = await prisma.travelPlanJournal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanJournalCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanJournalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlanJournal.
     * @param {TravelPlanJournalDeleteArgs} args - Arguments to delete one TravelPlanJournal.
     * @example
     * // Delete one TravelPlanJournal
     * const TravelPlanJournal = await prisma.travelPlanJournal.delete({
     *   where: {
     *     // ... filter to delete one TravelPlanJournal
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanJournalDeleteArgs>(args: SelectSubset<T, TravelPlanJournalDeleteArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlanJournal.
     * @param {TravelPlanJournalUpdateArgs} args - Arguments to update one TravelPlanJournal.
     * @example
     * // Update one TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanJournalUpdateArgs>(args: SelectSubset<T, TravelPlanJournalUpdateArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlanJournals.
     * @param {TravelPlanJournalDeleteManyArgs} args - Arguments to filter TravelPlanJournals to delete.
     * @example
     * // Delete a few TravelPlanJournals
     * const { count } = await prisma.travelPlanJournal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanJournalDeleteManyArgs>(args?: SelectSubset<T, TravelPlanJournalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanJournals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlanJournals
     * const travelPlanJournal = await prisma.travelPlanJournal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanJournalUpdateManyArgs>(args: SelectSubset<T, TravelPlanJournalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanJournals and returns the data updated in the database.
     * @param {TravelPlanJournalUpdateManyAndReturnArgs} args - Arguments to update many TravelPlanJournals.
     * @example
     * // Update many TravelPlanJournals
     * const travelPlanJournal = await prisma.travelPlanJournal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlanJournals and only return the `id`
     * const travelPlanJournalWithIdOnly = await prisma.travelPlanJournal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanJournalUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanJournalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlanJournal.
     * @param {TravelPlanJournalUpsertArgs} args - Arguments to update or create a TravelPlanJournal.
     * @example
     * // Update or create a TravelPlanJournal
     * const travelPlanJournal = await prisma.travelPlanJournal.upsert({
     *   create: {
     *     // ... data to create a TravelPlanJournal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlanJournal we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanJournalUpsertArgs>(args: SelectSubset<T, TravelPlanJournalUpsertArgs<ExtArgs>>): Prisma__TravelPlanJournalClient<$Result.GetResult<Prisma.$TravelPlanJournalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlanJournals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalCountArgs} args - Arguments to filter TravelPlanJournals to count.
     * @example
     * // Count the number of TravelPlanJournals
     * const count = await prisma.travelPlanJournal.count({
     *   where: {
     *     // ... the filter for the TravelPlanJournals we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanJournalCountArgs>(
      args?: Subset<T, TravelPlanJournalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanJournalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlanJournal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanJournalAggregateArgs>(args: Subset<T, TravelPlanJournalAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanJournalAggregateType<T>>

    /**
     * Group by TravelPlanJournal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanJournalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanJournalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanJournalGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanJournalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanJournalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanJournalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlanJournal model
   */
  readonly fields: TravelPlanJournalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlanJournal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanJournalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlan<T extends TravelPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDefaultArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlanJournal model
   */ 
  interface TravelPlanJournalFieldRefs {
    readonly id: FieldRef<"TravelPlanJournal", 'Int'>
    readonly travelPlanId: FieldRef<"TravelPlanJournal", 'Int'>
    readonly notes: FieldRef<"TravelPlanJournal", 'String'>
    readonly futureTip: FieldRef<"TravelPlanJournal", 'String'>
    readonly favNotes: FieldRef<"TravelPlanJournal", 'String'>
    readonly rating: FieldRef<"TravelPlanJournal", 'Int'>
    readonly updatedAt: FieldRef<"TravelPlanJournal", 'DateTime'>
    readonly createdAt: FieldRef<"TravelPlanJournal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlanJournal findUnique
   */
  export type TravelPlanJournalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanJournal to fetch.
     */
    where: TravelPlanJournalWhereUniqueInput
  }

  /**
   * TravelPlanJournal findUniqueOrThrow
   */
  export type TravelPlanJournalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanJournal to fetch.
     */
    where: TravelPlanJournalWhereUniqueInput
  }

  /**
   * TravelPlanJournal findFirst
   */
  export type TravelPlanJournalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanJournal to fetch.
     */
    where?: TravelPlanJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanJournals to fetch.
     */
    orderBy?: TravelPlanJournalOrderByWithRelationInput | TravelPlanJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanJournals.
     */
    cursor?: TravelPlanJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanJournals.
     */
    distinct?: TravelPlanJournalScalarFieldEnum | TravelPlanJournalScalarFieldEnum[]
  }

  /**
   * TravelPlanJournal findFirstOrThrow
   */
  export type TravelPlanJournalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanJournal to fetch.
     */
    where?: TravelPlanJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanJournals to fetch.
     */
    orderBy?: TravelPlanJournalOrderByWithRelationInput | TravelPlanJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanJournals.
     */
    cursor?: TravelPlanJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanJournals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanJournals.
     */
    distinct?: TravelPlanJournalScalarFieldEnum | TravelPlanJournalScalarFieldEnum[]
  }

  /**
   * TravelPlanJournal findMany
   */
  export type TravelPlanJournalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanJournals to fetch.
     */
    where?: TravelPlanJournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanJournals to fetch.
     */
    orderBy?: TravelPlanJournalOrderByWithRelationInput | TravelPlanJournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlanJournals.
     */
    cursor?: TravelPlanJournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanJournals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanJournals.
     */
    skip?: number
    distinct?: TravelPlanJournalScalarFieldEnum | TravelPlanJournalScalarFieldEnum[]
  }

  /**
   * TravelPlanJournal create
   */
  export type TravelPlanJournalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlanJournal.
     */
    data: XOR<TravelPlanJournalCreateInput, TravelPlanJournalUncheckedCreateInput>
  }

  /**
   * TravelPlanJournal createMany
   */
  export type TravelPlanJournalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlanJournals.
     */
    data: TravelPlanJournalCreateManyInput | TravelPlanJournalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlanJournal createManyAndReturn
   */
  export type TravelPlanJournalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlanJournals.
     */
    data: TravelPlanJournalCreateManyInput | TravelPlanJournalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanJournal update
   */
  export type TravelPlanJournalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlanJournal.
     */
    data: XOR<TravelPlanJournalUpdateInput, TravelPlanJournalUncheckedUpdateInput>
    /**
     * Choose, which TravelPlanJournal to update.
     */
    where: TravelPlanJournalWhereUniqueInput
  }

  /**
   * TravelPlanJournal updateMany
   */
  export type TravelPlanJournalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlanJournals.
     */
    data: XOR<TravelPlanJournalUpdateManyMutationInput, TravelPlanJournalUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanJournals to update
     */
    where?: TravelPlanJournalWhereInput
    /**
     * Limit how many TravelPlanJournals to update.
     */
    limit?: number
  }

  /**
   * TravelPlanJournal updateManyAndReturn
   */
  export type TravelPlanJournalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlanJournals.
     */
    data: XOR<TravelPlanJournalUpdateManyMutationInput, TravelPlanJournalUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanJournals to update
     */
    where?: TravelPlanJournalWhereInput
    /**
     * Limit how many TravelPlanJournals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanJournal upsert
   */
  export type TravelPlanJournalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlanJournal to update in case it exists.
     */
    where: TravelPlanJournalWhereUniqueInput
    /**
     * In case the TravelPlanJournal found by the `where` argument doesn't exist, create a new TravelPlanJournal with this data.
     */
    create: XOR<TravelPlanJournalCreateInput, TravelPlanJournalUncheckedCreateInput>
    /**
     * In case the TravelPlanJournal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanJournalUpdateInput, TravelPlanJournalUncheckedUpdateInput>
  }

  /**
   * TravelPlanJournal delete
   */
  export type TravelPlanJournalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
    /**
     * Filter which TravelPlanJournal to delete.
     */
    where: TravelPlanJournalWhereUniqueInput
  }

  /**
   * TravelPlanJournal deleteMany
   */
  export type TravelPlanJournalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanJournals to delete
     */
    where?: TravelPlanJournalWhereInput
    /**
     * Limit how many TravelPlanJournals to delete.
     */
    limit?: number
  }

  /**
   * TravelPlanJournal without action
   */
  export type TravelPlanJournalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanJournal
     */
    select?: TravelPlanJournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanJournal
     */
    omit?: TravelPlanJournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanJournalInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlanDestination
   */

  export type AggregateTravelPlanDestination = {
    _count: TravelPlanDestinationCountAggregateOutputType | null
    _avg: TravelPlanDestinationAvgAggregateOutputType | null
    _sum: TravelPlanDestinationSumAggregateOutputType | null
    _min: TravelPlanDestinationMinAggregateOutputType | null
    _max: TravelPlanDestinationMaxAggregateOutputType | null
  }

  export type TravelPlanDestinationAvgAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    latitude: number | null
    longitude: number | null
    dailyVisitOrder: number | null
  }

  export type TravelPlanDestinationSumAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    latitude: number | null
    longitude: number | null
    dailyVisitOrder: number | null
  }

  export type TravelPlanDestinationMinAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    title: string | null
    latitude: number | null
    longitude: number | null
    photoUrl: string | null
    googlePlaceId: string | null
    startDate: Date | null
    dailyVisitOrder: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanDestinationMaxAggregateOutputType = {
    id: number | null
    travelPlanId: number | null
    title: string | null
    latitude: number | null
    longitude: number | null
    photoUrl: string | null
    googlePlaceId: string | null
    startDate: Date | null
    dailyVisitOrder: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanDestinationCountAggregateOutputType = {
    id: number
    travelPlanId: number
    title: number
    latitude: number
    longitude: number
    photoUrl: number
    googlePlaceId: number
    startDate: number
    dailyVisitOrder: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type TravelPlanDestinationAvgAggregateInputType = {
    id?: true
    travelPlanId?: true
    latitude?: true
    longitude?: true
    dailyVisitOrder?: true
  }

  export type TravelPlanDestinationSumAggregateInputType = {
    id?: true
    travelPlanId?: true
    latitude?: true
    longitude?: true
    dailyVisitOrder?: true
  }

  export type TravelPlanDestinationMinAggregateInputType = {
    id?: true
    travelPlanId?: true
    title?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    googlePlaceId?: true
    startDate?: true
    dailyVisitOrder?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanDestinationMaxAggregateInputType = {
    id?: true
    travelPlanId?: true
    title?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    googlePlaceId?: true
    startDate?: true
    dailyVisitOrder?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanDestinationCountAggregateInputType = {
    id?: true
    travelPlanId?: true
    title?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    googlePlaceId?: true
    startDate?: true
    dailyVisitOrder?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TravelPlanDestinationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanDestination to aggregate.
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinations to fetch.
     */
    orderBy?: TravelPlanDestinationOrderByWithRelationInput | TravelPlanDestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanDestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlanDestinations
    **/
    _count?: true | TravelPlanDestinationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanDestinationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanDestinationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanDestinationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanDestinationMaxAggregateInputType
  }

  export type GetTravelPlanDestinationAggregateType<T extends TravelPlanDestinationAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlanDestination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlanDestination[P]>
      : GetScalarType<T[P], AggregateTravelPlanDestination[P]>
  }




  export type TravelPlanDestinationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanDestinationWhereInput
    orderBy?: TravelPlanDestinationOrderByWithAggregationInput | TravelPlanDestinationOrderByWithAggregationInput[]
    by: TravelPlanDestinationScalarFieldEnum[] | TravelPlanDestinationScalarFieldEnum
    having?: TravelPlanDestinationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanDestinationCountAggregateInputType | true
    _avg?: TravelPlanDestinationAvgAggregateInputType
    _sum?: TravelPlanDestinationSumAggregateInputType
    _min?: TravelPlanDestinationMinAggregateInputType
    _max?: TravelPlanDestinationMaxAggregateInputType
  }

  export type TravelPlanDestinationGroupByOutputType = {
    id: number
    travelPlanId: number
    title: string
    latitude: number
    longitude: number
    photoUrl: string | null
    googlePlaceId: string
    startDate: Date
    dailyVisitOrder: number
    updatedAt: Date
    createdAt: Date
    _count: TravelPlanDestinationCountAggregateOutputType | null
    _avg: TravelPlanDestinationAvgAggregateOutputType | null
    _sum: TravelPlanDestinationSumAggregateOutputType | null
    _min: TravelPlanDestinationMinAggregateOutputType | null
    _max: TravelPlanDestinationMaxAggregateOutputType | null
  }

  type GetTravelPlanDestinationGroupByPayload<T extends TravelPlanDestinationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanDestinationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanDestinationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanDestinationGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanDestinationGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanDestinationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    title?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    startDate?: boolean
    dailyVisitOrder?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    attachments?: boolean | TravelPlanDestination$attachmentsArgs<ExtArgs>
    _count?: boolean | TravelPlanDestinationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestination"]>

  export type TravelPlanDestinationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    title?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    startDate?: boolean
    dailyVisitOrder?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestination"]>

  export type TravelPlanDestinationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelPlanId?: boolean
    title?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    startDate?: boolean
    dailyVisitOrder?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestination"]>

  export type TravelPlanDestinationSelectScalar = {
    id?: boolean
    travelPlanId?: boolean
    title?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    startDate?: boolean
    dailyVisitOrder?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type TravelPlanDestinationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "travelPlanId" | "title" | "latitude" | "longitude" | "photoUrl" | "googlePlaceId" | "startDate" | "dailyVisitOrder" | "updatedAt" | "createdAt", ExtArgs["result"]["travelPlanDestination"]>
  export type TravelPlanDestinationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    attachments?: boolean | TravelPlanDestination$attachmentsArgs<ExtArgs>
    _count?: boolean | TravelPlanDestinationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TravelPlanDestinationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }
  export type TravelPlanDestinationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
  }

  export type $TravelPlanDestinationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlanDestination"
    objects: {
      travelPlan: Prisma.$TravelPlanPayload<ExtArgs>
      attachments: Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      travelPlanId: number
      title: string
      latitude: number
      longitude: number
      photoUrl: string | null
      googlePlaceId: string
      startDate: Date
      dailyVisitOrder: number
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["travelPlanDestination"]>
    composites: {}
  }

  type TravelPlanDestinationGetPayload<S extends boolean | null | undefined | TravelPlanDestinationDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanDestinationPayload, S>

  type TravelPlanDestinationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanDestinationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanDestinationCountAggregateInputType | true
    }

  export interface TravelPlanDestinationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlanDestination'], meta: { name: 'TravelPlanDestination' } }
    /**
     * Find zero or one TravelPlanDestination that matches the filter.
     * @param {TravelPlanDestinationFindUniqueArgs} args - Arguments to find a TravelPlanDestination
     * @example
     * // Get one TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanDestinationFindUniqueArgs>(args: SelectSubset<T, TravelPlanDestinationFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlanDestination that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanDestinationFindUniqueOrThrowArgs} args - Arguments to find a TravelPlanDestination
     * @example
     * // Get one TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanDestinationFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanDestinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanDestination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationFindFirstArgs} args - Arguments to find a TravelPlanDestination
     * @example
     * // Get one TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanDestinationFindFirstArgs>(args?: SelectSubset<T, TravelPlanDestinationFindFirstArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanDestination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationFindFirstOrThrowArgs} args - Arguments to find a TravelPlanDestination
     * @example
     * // Get one TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanDestinationFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanDestinationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlanDestinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlanDestinations
     * const travelPlanDestinations = await prisma.travelPlanDestination.findMany()
     * 
     * // Get first 10 TravelPlanDestinations
     * const travelPlanDestinations = await prisma.travelPlanDestination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelPlanDestinationWithIdOnly = await prisma.travelPlanDestination.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelPlanDestinationFindManyArgs>(args?: SelectSubset<T, TravelPlanDestinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlanDestination.
     * @param {TravelPlanDestinationCreateArgs} args - Arguments to create a TravelPlanDestination.
     * @example
     * // Create one TravelPlanDestination
     * const TravelPlanDestination = await prisma.travelPlanDestination.create({
     *   data: {
     *     // ... data to create a TravelPlanDestination
     *   }
     * })
     * 
     */
    create<T extends TravelPlanDestinationCreateArgs>(args: SelectSubset<T, TravelPlanDestinationCreateArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlanDestinations.
     * @param {TravelPlanDestinationCreateManyArgs} args - Arguments to create many TravelPlanDestinations.
     * @example
     * // Create many TravelPlanDestinations
     * const travelPlanDestination = await prisma.travelPlanDestination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanDestinationCreateManyArgs>(args?: SelectSubset<T, TravelPlanDestinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlanDestinations and returns the data saved in the database.
     * @param {TravelPlanDestinationCreateManyAndReturnArgs} args - Arguments to create many TravelPlanDestinations.
     * @example
     * // Create many TravelPlanDestinations
     * const travelPlanDestination = await prisma.travelPlanDestination.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlanDestinations and only return the `id`
     * const travelPlanDestinationWithIdOnly = await prisma.travelPlanDestination.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanDestinationCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanDestinationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlanDestination.
     * @param {TravelPlanDestinationDeleteArgs} args - Arguments to delete one TravelPlanDestination.
     * @example
     * // Delete one TravelPlanDestination
     * const TravelPlanDestination = await prisma.travelPlanDestination.delete({
     *   where: {
     *     // ... filter to delete one TravelPlanDestination
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanDestinationDeleteArgs>(args: SelectSubset<T, TravelPlanDestinationDeleteArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlanDestination.
     * @param {TravelPlanDestinationUpdateArgs} args - Arguments to update one TravelPlanDestination.
     * @example
     * // Update one TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanDestinationUpdateArgs>(args: SelectSubset<T, TravelPlanDestinationUpdateArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlanDestinations.
     * @param {TravelPlanDestinationDeleteManyArgs} args - Arguments to filter TravelPlanDestinations to delete.
     * @example
     * // Delete a few TravelPlanDestinations
     * const { count } = await prisma.travelPlanDestination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanDestinationDeleteManyArgs>(args?: SelectSubset<T, TravelPlanDestinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanDestinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlanDestinations
     * const travelPlanDestination = await prisma.travelPlanDestination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanDestinationUpdateManyArgs>(args: SelectSubset<T, TravelPlanDestinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanDestinations and returns the data updated in the database.
     * @param {TravelPlanDestinationUpdateManyAndReturnArgs} args - Arguments to update many TravelPlanDestinations.
     * @example
     * // Update many TravelPlanDestinations
     * const travelPlanDestination = await prisma.travelPlanDestination.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlanDestinations and only return the `id`
     * const travelPlanDestinationWithIdOnly = await prisma.travelPlanDestination.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanDestinationUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanDestinationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlanDestination.
     * @param {TravelPlanDestinationUpsertArgs} args - Arguments to update or create a TravelPlanDestination.
     * @example
     * // Update or create a TravelPlanDestination
     * const travelPlanDestination = await prisma.travelPlanDestination.upsert({
     *   create: {
     *     // ... data to create a TravelPlanDestination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlanDestination we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanDestinationUpsertArgs>(args: SelectSubset<T, TravelPlanDestinationUpsertArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlanDestinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationCountArgs} args - Arguments to filter TravelPlanDestinations to count.
     * @example
     * // Count the number of TravelPlanDestinations
     * const count = await prisma.travelPlanDestination.count({
     *   where: {
     *     // ... the filter for the TravelPlanDestinations we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanDestinationCountArgs>(
      args?: Subset<T, TravelPlanDestinationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanDestinationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlanDestination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanDestinationAggregateArgs>(args: Subset<T, TravelPlanDestinationAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanDestinationAggregateType<T>>

    /**
     * Group by TravelPlanDestination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanDestinationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanDestinationGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanDestinationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanDestinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanDestinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlanDestination model
   */
  readonly fields: TravelPlanDestinationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlanDestination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanDestinationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlan<T extends TravelPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDefaultArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attachments<T extends TravelPlanDestination$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDestination$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlanDestination model
   */ 
  interface TravelPlanDestinationFieldRefs {
    readonly id: FieldRef<"TravelPlanDestination", 'Int'>
    readonly travelPlanId: FieldRef<"TravelPlanDestination", 'Int'>
    readonly title: FieldRef<"TravelPlanDestination", 'String'>
    readonly latitude: FieldRef<"TravelPlanDestination", 'Float'>
    readonly longitude: FieldRef<"TravelPlanDestination", 'Float'>
    readonly photoUrl: FieldRef<"TravelPlanDestination", 'String'>
    readonly googlePlaceId: FieldRef<"TravelPlanDestination", 'String'>
    readonly startDate: FieldRef<"TravelPlanDestination", 'DateTime'>
    readonly dailyVisitOrder: FieldRef<"TravelPlanDestination", 'Int'>
    readonly updatedAt: FieldRef<"TravelPlanDestination", 'DateTime'>
    readonly createdAt: FieldRef<"TravelPlanDestination", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlanDestination findUnique
   */
  export type TravelPlanDestinationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestination to fetch.
     */
    where: TravelPlanDestinationWhereUniqueInput
  }

  /**
   * TravelPlanDestination findUniqueOrThrow
   */
  export type TravelPlanDestinationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestination to fetch.
     */
    where: TravelPlanDestinationWhereUniqueInput
  }

  /**
   * TravelPlanDestination findFirst
   */
  export type TravelPlanDestinationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestination to fetch.
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinations to fetch.
     */
    orderBy?: TravelPlanDestinationOrderByWithRelationInput | TravelPlanDestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanDestinations.
     */
    cursor?: TravelPlanDestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanDestinations.
     */
    distinct?: TravelPlanDestinationScalarFieldEnum | TravelPlanDestinationScalarFieldEnum[]
  }

  /**
   * TravelPlanDestination findFirstOrThrow
   */
  export type TravelPlanDestinationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestination to fetch.
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinations to fetch.
     */
    orderBy?: TravelPlanDestinationOrderByWithRelationInput | TravelPlanDestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanDestinations.
     */
    cursor?: TravelPlanDestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanDestinations.
     */
    distinct?: TravelPlanDestinationScalarFieldEnum | TravelPlanDestinationScalarFieldEnum[]
  }

  /**
   * TravelPlanDestination findMany
   */
  export type TravelPlanDestinationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinations to fetch.
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinations to fetch.
     */
    orderBy?: TravelPlanDestinationOrderByWithRelationInput | TravelPlanDestinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlanDestinations.
     */
    cursor?: TravelPlanDestinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinations.
     */
    skip?: number
    distinct?: TravelPlanDestinationScalarFieldEnum | TravelPlanDestinationScalarFieldEnum[]
  }

  /**
   * TravelPlanDestination create
   */
  export type TravelPlanDestinationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlanDestination.
     */
    data: XOR<TravelPlanDestinationCreateInput, TravelPlanDestinationUncheckedCreateInput>
  }

  /**
   * TravelPlanDestination createMany
   */
  export type TravelPlanDestinationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlanDestinations.
     */
    data: TravelPlanDestinationCreateManyInput | TravelPlanDestinationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlanDestination createManyAndReturn
   */
  export type TravelPlanDestinationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlanDestinations.
     */
    data: TravelPlanDestinationCreateManyInput | TravelPlanDestinationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanDestination update
   */
  export type TravelPlanDestinationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlanDestination.
     */
    data: XOR<TravelPlanDestinationUpdateInput, TravelPlanDestinationUncheckedUpdateInput>
    /**
     * Choose, which TravelPlanDestination to update.
     */
    where: TravelPlanDestinationWhereUniqueInput
  }

  /**
   * TravelPlanDestination updateMany
   */
  export type TravelPlanDestinationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlanDestinations.
     */
    data: XOR<TravelPlanDestinationUpdateManyMutationInput, TravelPlanDestinationUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanDestinations to update
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * Limit how many TravelPlanDestinations to update.
     */
    limit?: number
  }

  /**
   * TravelPlanDestination updateManyAndReturn
   */
  export type TravelPlanDestinationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlanDestinations.
     */
    data: XOR<TravelPlanDestinationUpdateManyMutationInput, TravelPlanDestinationUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanDestinations to update
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * Limit how many TravelPlanDestinations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanDestination upsert
   */
  export type TravelPlanDestinationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlanDestination to update in case it exists.
     */
    where: TravelPlanDestinationWhereUniqueInput
    /**
     * In case the TravelPlanDestination found by the `where` argument doesn't exist, create a new TravelPlanDestination with this data.
     */
    create: XOR<TravelPlanDestinationCreateInput, TravelPlanDestinationUncheckedCreateInput>
    /**
     * In case the TravelPlanDestination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanDestinationUpdateInput, TravelPlanDestinationUncheckedUpdateInput>
  }

  /**
   * TravelPlanDestination delete
   */
  export type TravelPlanDestinationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
    /**
     * Filter which TravelPlanDestination to delete.
     */
    where: TravelPlanDestinationWhereUniqueInput
  }

  /**
   * TravelPlanDestination deleteMany
   */
  export type TravelPlanDestinationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanDestinations to delete
     */
    where?: TravelPlanDestinationWhereInput
    /**
     * Limit how many TravelPlanDestinations to delete.
     */
    limit?: number
  }

  /**
   * TravelPlanDestination.attachments
   */
  export type TravelPlanDestination$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    where?: TravelPlanDestinationAttachmentWhereInput
    orderBy?: TravelPlanDestinationAttachmentOrderByWithRelationInput | TravelPlanDestinationAttachmentOrderByWithRelationInput[]
    cursor?: TravelPlanDestinationAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelPlanDestinationAttachmentScalarFieldEnum | TravelPlanDestinationAttachmentScalarFieldEnum[]
  }

  /**
   * TravelPlanDestination without action
   */
  export type TravelPlanDestinationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestination
     */
    select?: TravelPlanDestinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestination
     */
    omit?: TravelPlanDestinationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlanDestinationAttachment
   */

  export type AggregateTravelPlanDestinationAttachment = {
    _count: TravelPlanDestinationAttachmentCountAggregateOutputType | null
    _avg: TravelPlanDestinationAttachmentAvgAggregateOutputType | null
    _sum: TravelPlanDestinationAttachmentSumAggregateOutputType | null
    _min: TravelPlanDestinationAttachmentMinAggregateOutputType | null
    _max: TravelPlanDestinationAttachmentMaxAggregateOutputType | null
  }

  export type TravelPlanDestinationAttachmentAvgAggregateOutputType = {
    travelPlanDestinationId: number | null
    order: number | null
  }

  export type TravelPlanDestinationAttachmentSumAggregateOutputType = {
    travelPlanDestinationId: number | null
    order: number | null
  }

  export type TravelPlanDestinationAttachmentMinAggregateOutputType = {
    travelPlanDestinationId: number | null
    url: string | null
    order: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanDestinationAttachmentMaxAggregateOutputType = {
    travelPlanDestinationId: number | null
    url: string | null
    order: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TravelPlanDestinationAttachmentCountAggregateOutputType = {
    travelPlanDestinationId: number
    url: number
    order: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type TravelPlanDestinationAttachmentAvgAggregateInputType = {
    travelPlanDestinationId?: true
    order?: true
  }

  export type TravelPlanDestinationAttachmentSumAggregateInputType = {
    travelPlanDestinationId?: true
    order?: true
  }

  export type TravelPlanDestinationAttachmentMinAggregateInputType = {
    travelPlanDestinationId?: true
    url?: true
    order?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanDestinationAttachmentMaxAggregateInputType = {
    travelPlanDestinationId?: true
    url?: true
    order?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TravelPlanDestinationAttachmentCountAggregateInputType = {
    travelPlanDestinationId?: true
    url?: true
    order?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TravelPlanDestinationAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanDestinationAttachment to aggregate.
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinationAttachments to fetch.
     */
    orderBy?: TravelPlanDestinationAttachmentOrderByWithRelationInput | TravelPlanDestinationAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanDestinationAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinationAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinationAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlanDestinationAttachments
    **/
    _count?: true | TravelPlanDestinationAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanDestinationAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanDestinationAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanDestinationAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanDestinationAttachmentMaxAggregateInputType
  }

  export type GetTravelPlanDestinationAttachmentAggregateType<T extends TravelPlanDestinationAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlanDestinationAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlanDestinationAttachment[P]>
      : GetScalarType<T[P], AggregateTravelPlanDestinationAttachment[P]>
  }




  export type TravelPlanDestinationAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanDestinationAttachmentWhereInput
    orderBy?: TravelPlanDestinationAttachmentOrderByWithAggregationInput | TravelPlanDestinationAttachmentOrderByWithAggregationInput[]
    by: TravelPlanDestinationAttachmentScalarFieldEnum[] | TravelPlanDestinationAttachmentScalarFieldEnum
    having?: TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanDestinationAttachmentCountAggregateInputType | true
    _avg?: TravelPlanDestinationAttachmentAvgAggregateInputType
    _sum?: TravelPlanDestinationAttachmentSumAggregateInputType
    _min?: TravelPlanDestinationAttachmentMinAggregateInputType
    _max?: TravelPlanDestinationAttachmentMaxAggregateInputType
  }

  export type TravelPlanDestinationAttachmentGroupByOutputType = {
    travelPlanDestinationId: number
    url: string
    order: number
    updatedAt: Date
    createdAt: Date
    _count: TravelPlanDestinationAttachmentCountAggregateOutputType | null
    _avg: TravelPlanDestinationAttachmentAvgAggregateOutputType | null
    _sum: TravelPlanDestinationAttachmentSumAggregateOutputType | null
    _min: TravelPlanDestinationAttachmentMinAggregateOutputType | null
    _max: TravelPlanDestinationAttachmentMaxAggregateOutputType | null
  }

  type GetTravelPlanDestinationAttachmentGroupByPayload<T extends TravelPlanDestinationAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanDestinationAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanDestinationAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanDestinationAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanDestinationAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanDestinationAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanDestinationId?: boolean
    url?: boolean
    order?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestinationAttachment"]>

  export type TravelPlanDestinationAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanDestinationId?: boolean
    url?: boolean
    order?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestinationAttachment"]>

  export type TravelPlanDestinationAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanDestinationId?: boolean
    url?: boolean
    order?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanDestinationAttachment"]>

  export type TravelPlanDestinationAttachmentSelectScalar = {
    travelPlanDestinationId?: boolean
    url?: boolean
    order?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type TravelPlanDestinationAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"travelPlanDestinationId" | "url" | "order" | "updatedAt" | "createdAt", ExtArgs["result"]["travelPlanDestinationAttachment"]>
  export type TravelPlanDestinationAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }
  export type TravelPlanDestinationAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }
  export type TravelPlanDestinationAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlanDestination?: boolean | TravelPlanDestinationDefaultArgs<ExtArgs>
  }

  export type $TravelPlanDestinationAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlanDestinationAttachment"
    objects: {
      travelPlanDestination: Prisma.$TravelPlanDestinationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      travelPlanDestinationId: number
      url: string
      order: number
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["travelPlanDestinationAttachment"]>
    composites: {}
  }

  type TravelPlanDestinationAttachmentGetPayload<S extends boolean | null | undefined | TravelPlanDestinationAttachmentDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload, S>

  type TravelPlanDestinationAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanDestinationAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanDestinationAttachmentCountAggregateInputType | true
    }

  export interface TravelPlanDestinationAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlanDestinationAttachment'], meta: { name: 'TravelPlanDestinationAttachment' } }
    /**
     * Find zero or one TravelPlanDestinationAttachment that matches the filter.
     * @param {TravelPlanDestinationAttachmentFindUniqueArgs} args - Arguments to find a TravelPlanDestinationAttachment
     * @example
     * // Get one TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanDestinationAttachmentFindUniqueArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlanDestinationAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanDestinationAttachmentFindUniqueOrThrowArgs} args - Arguments to find a TravelPlanDestinationAttachment
     * @example
     * // Get one TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanDestinationAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanDestinationAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentFindFirstArgs} args - Arguments to find a TravelPlanDestinationAttachment
     * @example
     * // Get one TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanDestinationAttachmentFindFirstArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentFindFirstArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanDestinationAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentFindFirstOrThrowArgs} args - Arguments to find a TravelPlanDestinationAttachment
     * @example
     * // Get one TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanDestinationAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlanDestinationAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachments = await prisma.travelPlanDestinationAttachment.findMany()
     * 
     * // Get first 10 TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachments = await prisma.travelPlanDestinationAttachment.findMany({ take: 10 })
     * 
     * // Only select the `travelPlanDestinationId`
     * const travelPlanDestinationAttachmentWithTravelPlanDestinationIdOnly = await prisma.travelPlanDestinationAttachment.findMany({ select: { travelPlanDestinationId: true } })
     * 
     */
    findMany<T extends TravelPlanDestinationAttachmentFindManyArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlanDestinationAttachment.
     * @param {TravelPlanDestinationAttachmentCreateArgs} args - Arguments to create a TravelPlanDestinationAttachment.
     * @example
     * // Create one TravelPlanDestinationAttachment
     * const TravelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.create({
     *   data: {
     *     // ... data to create a TravelPlanDestinationAttachment
     *   }
     * })
     * 
     */
    create<T extends TravelPlanDestinationAttachmentCreateArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentCreateArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlanDestinationAttachments.
     * @param {TravelPlanDestinationAttachmentCreateManyArgs} args - Arguments to create many TravelPlanDestinationAttachments.
     * @example
     * // Create many TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanDestinationAttachmentCreateManyArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlanDestinationAttachments and returns the data saved in the database.
     * @param {TravelPlanDestinationAttachmentCreateManyAndReturnArgs} args - Arguments to create many TravelPlanDestinationAttachments.
     * @example
     * // Create many TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlanDestinationAttachments and only return the `travelPlanDestinationId`
     * const travelPlanDestinationAttachmentWithTravelPlanDestinationIdOnly = await prisma.travelPlanDestinationAttachment.createManyAndReturn({
     *   select: { travelPlanDestinationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanDestinationAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlanDestinationAttachment.
     * @param {TravelPlanDestinationAttachmentDeleteArgs} args - Arguments to delete one TravelPlanDestinationAttachment.
     * @example
     * // Delete one TravelPlanDestinationAttachment
     * const TravelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.delete({
     *   where: {
     *     // ... filter to delete one TravelPlanDestinationAttachment
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanDestinationAttachmentDeleteArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentDeleteArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlanDestinationAttachment.
     * @param {TravelPlanDestinationAttachmentUpdateArgs} args - Arguments to update one TravelPlanDestinationAttachment.
     * @example
     * // Update one TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanDestinationAttachmentUpdateArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentUpdateArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlanDestinationAttachments.
     * @param {TravelPlanDestinationAttachmentDeleteManyArgs} args - Arguments to filter TravelPlanDestinationAttachments to delete.
     * @example
     * // Delete a few TravelPlanDestinationAttachments
     * const { count } = await prisma.travelPlanDestinationAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanDestinationAttachmentDeleteManyArgs>(args?: SelectSubset<T, TravelPlanDestinationAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanDestinationAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanDestinationAttachmentUpdateManyArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanDestinationAttachments and returns the data updated in the database.
     * @param {TravelPlanDestinationAttachmentUpdateManyAndReturnArgs} args - Arguments to update many TravelPlanDestinationAttachments.
     * @example
     * // Update many TravelPlanDestinationAttachments
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlanDestinationAttachments and only return the `travelPlanDestinationId`
     * const travelPlanDestinationAttachmentWithTravelPlanDestinationIdOnly = await prisma.travelPlanDestinationAttachment.updateManyAndReturn({
     *   select: { travelPlanDestinationId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanDestinationAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlanDestinationAttachment.
     * @param {TravelPlanDestinationAttachmentUpsertArgs} args - Arguments to update or create a TravelPlanDestinationAttachment.
     * @example
     * // Update or create a TravelPlanDestinationAttachment
     * const travelPlanDestinationAttachment = await prisma.travelPlanDestinationAttachment.upsert({
     *   create: {
     *     // ... data to create a TravelPlanDestinationAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlanDestinationAttachment we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanDestinationAttachmentUpsertArgs>(args: SelectSubset<T, TravelPlanDestinationAttachmentUpsertArgs<ExtArgs>>): Prisma__TravelPlanDestinationAttachmentClient<$Result.GetResult<Prisma.$TravelPlanDestinationAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlanDestinationAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentCountArgs} args - Arguments to filter TravelPlanDestinationAttachments to count.
     * @example
     * // Count the number of TravelPlanDestinationAttachments
     * const count = await prisma.travelPlanDestinationAttachment.count({
     *   where: {
     *     // ... the filter for the TravelPlanDestinationAttachments we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanDestinationAttachmentCountArgs>(
      args?: Subset<T, TravelPlanDestinationAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanDestinationAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlanDestinationAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanDestinationAttachmentAggregateArgs>(args: Subset<T, TravelPlanDestinationAttachmentAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanDestinationAttachmentAggregateType<T>>

    /**
     * Group by TravelPlanDestinationAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanDestinationAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanDestinationAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanDestinationAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanDestinationAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanDestinationAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanDestinationAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlanDestinationAttachment model
   */
  readonly fields: TravelPlanDestinationAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlanDestinationAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanDestinationAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlanDestination<T extends TravelPlanDestinationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDestinationDefaultArgs<ExtArgs>>): Prisma__TravelPlanDestinationClient<$Result.GetResult<Prisma.$TravelPlanDestinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlanDestinationAttachment model
   */ 
  interface TravelPlanDestinationAttachmentFieldRefs {
    readonly travelPlanDestinationId: FieldRef<"TravelPlanDestinationAttachment", 'Int'>
    readonly url: FieldRef<"TravelPlanDestinationAttachment", 'String'>
    readonly order: FieldRef<"TravelPlanDestinationAttachment", 'Int'>
    readonly updatedAt: FieldRef<"TravelPlanDestinationAttachment", 'DateTime'>
    readonly createdAt: FieldRef<"TravelPlanDestinationAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlanDestinationAttachment findUnique
   */
  export type TravelPlanDestinationAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinationAttachment to fetch.
     */
    where: TravelPlanDestinationAttachmentWhereUniqueInput
  }

  /**
   * TravelPlanDestinationAttachment findUniqueOrThrow
   */
  export type TravelPlanDestinationAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinationAttachment to fetch.
     */
    where: TravelPlanDestinationAttachmentWhereUniqueInput
  }

  /**
   * TravelPlanDestinationAttachment findFirst
   */
  export type TravelPlanDestinationAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinationAttachment to fetch.
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinationAttachments to fetch.
     */
    orderBy?: TravelPlanDestinationAttachmentOrderByWithRelationInput | TravelPlanDestinationAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanDestinationAttachments.
     */
    cursor?: TravelPlanDestinationAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinationAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinationAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanDestinationAttachments.
     */
    distinct?: TravelPlanDestinationAttachmentScalarFieldEnum | TravelPlanDestinationAttachmentScalarFieldEnum[]
  }

  /**
   * TravelPlanDestinationAttachment findFirstOrThrow
   */
  export type TravelPlanDestinationAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinationAttachment to fetch.
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinationAttachments to fetch.
     */
    orderBy?: TravelPlanDestinationAttachmentOrderByWithRelationInput | TravelPlanDestinationAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanDestinationAttachments.
     */
    cursor?: TravelPlanDestinationAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinationAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinationAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanDestinationAttachments.
     */
    distinct?: TravelPlanDestinationAttachmentScalarFieldEnum | TravelPlanDestinationAttachmentScalarFieldEnum[]
  }

  /**
   * TravelPlanDestinationAttachment findMany
   */
  export type TravelPlanDestinationAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanDestinationAttachments to fetch.
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanDestinationAttachments to fetch.
     */
    orderBy?: TravelPlanDestinationAttachmentOrderByWithRelationInput | TravelPlanDestinationAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlanDestinationAttachments.
     */
    cursor?: TravelPlanDestinationAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanDestinationAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanDestinationAttachments.
     */
    skip?: number
    distinct?: TravelPlanDestinationAttachmentScalarFieldEnum | TravelPlanDestinationAttachmentScalarFieldEnum[]
  }

  /**
   * TravelPlanDestinationAttachment create
   */
  export type TravelPlanDestinationAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlanDestinationAttachment.
     */
    data: XOR<TravelPlanDestinationAttachmentCreateInput, TravelPlanDestinationAttachmentUncheckedCreateInput>
  }

  /**
   * TravelPlanDestinationAttachment createMany
   */
  export type TravelPlanDestinationAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlanDestinationAttachments.
     */
    data: TravelPlanDestinationAttachmentCreateManyInput | TravelPlanDestinationAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlanDestinationAttachment createManyAndReturn
   */
  export type TravelPlanDestinationAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlanDestinationAttachments.
     */
    data: TravelPlanDestinationAttachmentCreateManyInput | TravelPlanDestinationAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanDestinationAttachment update
   */
  export type TravelPlanDestinationAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlanDestinationAttachment.
     */
    data: XOR<TravelPlanDestinationAttachmentUpdateInput, TravelPlanDestinationAttachmentUncheckedUpdateInput>
    /**
     * Choose, which TravelPlanDestinationAttachment to update.
     */
    where: TravelPlanDestinationAttachmentWhereUniqueInput
  }

  /**
   * TravelPlanDestinationAttachment updateMany
   */
  export type TravelPlanDestinationAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlanDestinationAttachments.
     */
    data: XOR<TravelPlanDestinationAttachmentUpdateManyMutationInput, TravelPlanDestinationAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanDestinationAttachments to update
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * Limit how many TravelPlanDestinationAttachments to update.
     */
    limit?: number
  }

  /**
   * TravelPlanDestinationAttachment updateManyAndReturn
   */
  export type TravelPlanDestinationAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlanDestinationAttachments.
     */
    data: XOR<TravelPlanDestinationAttachmentUpdateManyMutationInput, TravelPlanDestinationAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanDestinationAttachments to update
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * Limit how many TravelPlanDestinationAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanDestinationAttachment upsert
   */
  export type TravelPlanDestinationAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlanDestinationAttachment to update in case it exists.
     */
    where: TravelPlanDestinationAttachmentWhereUniqueInput
    /**
     * In case the TravelPlanDestinationAttachment found by the `where` argument doesn't exist, create a new TravelPlanDestinationAttachment with this data.
     */
    create: XOR<TravelPlanDestinationAttachmentCreateInput, TravelPlanDestinationAttachmentUncheckedCreateInput>
    /**
     * In case the TravelPlanDestinationAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanDestinationAttachmentUpdateInput, TravelPlanDestinationAttachmentUncheckedUpdateInput>
  }

  /**
   * TravelPlanDestinationAttachment delete
   */
  export type TravelPlanDestinationAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
    /**
     * Filter which TravelPlanDestinationAttachment to delete.
     */
    where: TravelPlanDestinationAttachmentWhereUniqueInput
  }

  /**
   * TravelPlanDestinationAttachment deleteMany
   */
  export type TravelPlanDestinationAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanDestinationAttachments to delete
     */
    where?: TravelPlanDestinationAttachmentWhereInput
    /**
     * Limit how many TravelPlanDestinationAttachments to delete.
     */
    limit?: number
  }

  /**
   * TravelPlanDestinationAttachment without action
   */
  export type TravelPlanDestinationAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanDestinationAttachment
     */
    select?: TravelPlanDestinationAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanDestinationAttachment
     */
    omit?: TravelPlanDestinationAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanDestinationAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlanBookmark
   */

  export type AggregateTravelPlanBookmark = {
    _count: TravelPlanBookmarkCountAggregateOutputType | null
    _avg: TravelPlanBookmarkAvgAggregateOutputType | null
    _sum: TravelPlanBookmarkSumAggregateOutputType | null
    _min: TravelPlanBookmarkMinAggregateOutputType | null
    _max: TravelPlanBookmarkMaxAggregateOutputType | null
  }

  export type TravelPlanBookmarkAvgAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanBookmarkSumAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanBookmarkMinAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanBookmarkMaxAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanBookmarkCountAggregateOutputType = {
    travelPlanId: number
    userId: number
    _all: number
  }


  export type TravelPlanBookmarkAvgAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanBookmarkSumAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanBookmarkMinAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanBookmarkMaxAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanBookmarkCountAggregateInputType = {
    travelPlanId?: true
    userId?: true
    _all?: true
  }

  export type TravelPlanBookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanBookmark to aggregate.
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanBookmarks to fetch.
     */
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlanBookmarks
    **/
    _count?: true | TravelPlanBookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanBookmarkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanBookmarkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanBookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanBookmarkMaxAggregateInputType
  }

  export type GetTravelPlanBookmarkAggregateType<T extends TravelPlanBookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlanBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlanBookmark[P]>
      : GetScalarType<T[P], AggregateTravelPlanBookmark[P]>
  }




  export type TravelPlanBookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanBookmarkWhereInput
    orderBy?: TravelPlanBookmarkOrderByWithAggregationInput | TravelPlanBookmarkOrderByWithAggregationInput[]
    by: TravelPlanBookmarkScalarFieldEnum[] | TravelPlanBookmarkScalarFieldEnum
    having?: TravelPlanBookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanBookmarkCountAggregateInputType | true
    _avg?: TravelPlanBookmarkAvgAggregateInputType
    _sum?: TravelPlanBookmarkSumAggregateInputType
    _min?: TravelPlanBookmarkMinAggregateInputType
    _max?: TravelPlanBookmarkMaxAggregateInputType
  }

  export type TravelPlanBookmarkGroupByOutputType = {
    travelPlanId: number
    userId: number
    _count: TravelPlanBookmarkCountAggregateOutputType | null
    _avg: TravelPlanBookmarkAvgAggregateOutputType | null
    _sum: TravelPlanBookmarkSumAggregateOutputType | null
    _min: TravelPlanBookmarkMinAggregateOutputType | null
    _max: TravelPlanBookmarkMaxAggregateOutputType | null
  }

  type GetTravelPlanBookmarkGroupByPayload<T extends TravelPlanBookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanBookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanBookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanBookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanBookmarkGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanBookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanBookmark"]>

  export type TravelPlanBookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanBookmark"]>

  export type TravelPlanBookmarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanBookmark"]>

  export type TravelPlanBookmarkSelectScalar = {
    travelPlanId?: boolean
    userId?: boolean
  }

  export type TravelPlanBookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"travelPlanId" | "userId", ExtArgs["result"]["travelPlanBookmark"]>
  export type TravelPlanBookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TravelPlanBookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TravelPlanBookmarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TravelPlanBookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlanBookmark"
    objects: {
      travelPlan: Prisma.$TravelPlanPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      travelPlanId: number
      userId: number
    }, ExtArgs["result"]["travelPlanBookmark"]>
    composites: {}
  }

  type TravelPlanBookmarkGetPayload<S extends boolean | null | undefined | TravelPlanBookmarkDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanBookmarkPayload, S>

  type TravelPlanBookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanBookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanBookmarkCountAggregateInputType | true
    }

  export interface TravelPlanBookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlanBookmark'], meta: { name: 'TravelPlanBookmark' } }
    /**
     * Find zero or one TravelPlanBookmark that matches the filter.
     * @param {TravelPlanBookmarkFindUniqueArgs} args - Arguments to find a TravelPlanBookmark
     * @example
     * // Get one TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanBookmarkFindUniqueArgs>(args: SelectSubset<T, TravelPlanBookmarkFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlanBookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanBookmarkFindUniqueOrThrowArgs} args - Arguments to find a TravelPlanBookmark
     * @example
     * // Get one TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanBookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanBookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanBookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkFindFirstArgs} args - Arguments to find a TravelPlanBookmark
     * @example
     * // Get one TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanBookmarkFindFirstArgs>(args?: SelectSubset<T, TravelPlanBookmarkFindFirstArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanBookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkFindFirstOrThrowArgs} args - Arguments to find a TravelPlanBookmark
     * @example
     * // Get one TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanBookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanBookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlanBookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlanBookmarks
     * const travelPlanBookmarks = await prisma.travelPlanBookmark.findMany()
     * 
     * // Get first 10 TravelPlanBookmarks
     * const travelPlanBookmarks = await prisma.travelPlanBookmark.findMany({ take: 10 })
     * 
     * // Only select the `travelPlanId`
     * const travelPlanBookmarkWithTravelPlanIdOnly = await prisma.travelPlanBookmark.findMany({ select: { travelPlanId: true } })
     * 
     */
    findMany<T extends TravelPlanBookmarkFindManyArgs>(args?: SelectSubset<T, TravelPlanBookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlanBookmark.
     * @param {TravelPlanBookmarkCreateArgs} args - Arguments to create a TravelPlanBookmark.
     * @example
     * // Create one TravelPlanBookmark
     * const TravelPlanBookmark = await prisma.travelPlanBookmark.create({
     *   data: {
     *     // ... data to create a TravelPlanBookmark
     *   }
     * })
     * 
     */
    create<T extends TravelPlanBookmarkCreateArgs>(args: SelectSubset<T, TravelPlanBookmarkCreateArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlanBookmarks.
     * @param {TravelPlanBookmarkCreateManyArgs} args - Arguments to create many TravelPlanBookmarks.
     * @example
     * // Create many TravelPlanBookmarks
     * const travelPlanBookmark = await prisma.travelPlanBookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanBookmarkCreateManyArgs>(args?: SelectSubset<T, TravelPlanBookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlanBookmarks and returns the data saved in the database.
     * @param {TravelPlanBookmarkCreateManyAndReturnArgs} args - Arguments to create many TravelPlanBookmarks.
     * @example
     * // Create many TravelPlanBookmarks
     * const travelPlanBookmark = await prisma.travelPlanBookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlanBookmarks and only return the `travelPlanId`
     * const travelPlanBookmarkWithTravelPlanIdOnly = await prisma.travelPlanBookmark.createManyAndReturn({
     *   select: { travelPlanId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanBookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanBookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlanBookmark.
     * @param {TravelPlanBookmarkDeleteArgs} args - Arguments to delete one TravelPlanBookmark.
     * @example
     * // Delete one TravelPlanBookmark
     * const TravelPlanBookmark = await prisma.travelPlanBookmark.delete({
     *   where: {
     *     // ... filter to delete one TravelPlanBookmark
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanBookmarkDeleteArgs>(args: SelectSubset<T, TravelPlanBookmarkDeleteArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlanBookmark.
     * @param {TravelPlanBookmarkUpdateArgs} args - Arguments to update one TravelPlanBookmark.
     * @example
     * // Update one TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanBookmarkUpdateArgs>(args: SelectSubset<T, TravelPlanBookmarkUpdateArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlanBookmarks.
     * @param {TravelPlanBookmarkDeleteManyArgs} args - Arguments to filter TravelPlanBookmarks to delete.
     * @example
     * // Delete a few TravelPlanBookmarks
     * const { count } = await prisma.travelPlanBookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanBookmarkDeleteManyArgs>(args?: SelectSubset<T, TravelPlanBookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanBookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlanBookmarks
     * const travelPlanBookmark = await prisma.travelPlanBookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanBookmarkUpdateManyArgs>(args: SelectSubset<T, TravelPlanBookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanBookmarks and returns the data updated in the database.
     * @param {TravelPlanBookmarkUpdateManyAndReturnArgs} args - Arguments to update many TravelPlanBookmarks.
     * @example
     * // Update many TravelPlanBookmarks
     * const travelPlanBookmark = await prisma.travelPlanBookmark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlanBookmarks and only return the `travelPlanId`
     * const travelPlanBookmarkWithTravelPlanIdOnly = await prisma.travelPlanBookmark.updateManyAndReturn({
     *   select: { travelPlanId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanBookmarkUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanBookmarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlanBookmark.
     * @param {TravelPlanBookmarkUpsertArgs} args - Arguments to update or create a TravelPlanBookmark.
     * @example
     * // Update or create a TravelPlanBookmark
     * const travelPlanBookmark = await prisma.travelPlanBookmark.upsert({
     *   create: {
     *     // ... data to create a TravelPlanBookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlanBookmark we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanBookmarkUpsertArgs>(args: SelectSubset<T, TravelPlanBookmarkUpsertArgs<ExtArgs>>): Prisma__TravelPlanBookmarkClient<$Result.GetResult<Prisma.$TravelPlanBookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlanBookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkCountArgs} args - Arguments to filter TravelPlanBookmarks to count.
     * @example
     * // Count the number of TravelPlanBookmarks
     * const count = await prisma.travelPlanBookmark.count({
     *   where: {
     *     // ... the filter for the TravelPlanBookmarks we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanBookmarkCountArgs>(
      args?: Subset<T, TravelPlanBookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanBookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlanBookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanBookmarkAggregateArgs>(args: Subset<T, TravelPlanBookmarkAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanBookmarkAggregateType<T>>

    /**
     * Group by TravelPlanBookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanBookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanBookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanBookmarkGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanBookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanBookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlanBookmark model
   */
  readonly fields: TravelPlanBookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlanBookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanBookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlan<T extends TravelPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDefaultArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlanBookmark model
   */ 
  interface TravelPlanBookmarkFieldRefs {
    readonly travelPlanId: FieldRef<"TravelPlanBookmark", 'Int'>
    readonly userId: FieldRef<"TravelPlanBookmark", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlanBookmark findUnique
   */
  export type TravelPlanBookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanBookmark to fetch.
     */
    where: TravelPlanBookmarkWhereUniqueInput
  }

  /**
   * TravelPlanBookmark findUniqueOrThrow
   */
  export type TravelPlanBookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanBookmark to fetch.
     */
    where: TravelPlanBookmarkWhereUniqueInput
  }

  /**
   * TravelPlanBookmark findFirst
   */
  export type TravelPlanBookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanBookmark to fetch.
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanBookmarks to fetch.
     */
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanBookmarks.
     */
    cursor?: TravelPlanBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanBookmarks.
     */
    distinct?: TravelPlanBookmarkScalarFieldEnum | TravelPlanBookmarkScalarFieldEnum[]
  }

  /**
   * TravelPlanBookmark findFirstOrThrow
   */
  export type TravelPlanBookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanBookmark to fetch.
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanBookmarks to fetch.
     */
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanBookmarks.
     */
    cursor?: TravelPlanBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanBookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanBookmarks.
     */
    distinct?: TravelPlanBookmarkScalarFieldEnum | TravelPlanBookmarkScalarFieldEnum[]
  }

  /**
   * TravelPlanBookmark findMany
   */
  export type TravelPlanBookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanBookmarks to fetch.
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanBookmarks to fetch.
     */
    orderBy?: TravelPlanBookmarkOrderByWithRelationInput | TravelPlanBookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlanBookmarks.
     */
    cursor?: TravelPlanBookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanBookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanBookmarks.
     */
    skip?: number
    distinct?: TravelPlanBookmarkScalarFieldEnum | TravelPlanBookmarkScalarFieldEnum[]
  }

  /**
   * TravelPlanBookmark create
   */
  export type TravelPlanBookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlanBookmark.
     */
    data: XOR<TravelPlanBookmarkCreateInput, TravelPlanBookmarkUncheckedCreateInput>
  }

  /**
   * TravelPlanBookmark createMany
   */
  export type TravelPlanBookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlanBookmarks.
     */
    data: TravelPlanBookmarkCreateManyInput | TravelPlanBookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlanBookmark createManyAndReturn
   */
  export type TravelPlanBookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlanBookmarks.
     */
    data: TravelPlanBookmarkCreateManyInput | TravelPlanBookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanBookmark update
   */
  export type TravelPlanBookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlanBookmark.
     */
    data: XOR<TravelPlanBookmarkUpdateInput, TravelPlanBookmarkUncheckedUpdateInput>
    /**
     * Choose, which TravelPlanBookmark to update.
     */
    where: TravelPlanBookmarkWhereUniqueInput
  }

  /**
   * TravelPlanBookmark updateMany
   */
  export type TravelPlanBookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlanBookmarks.
     */
    data: XOR<TravelPlanBookmarkUpdateManyMutationInput, TravelPlanBookmarkUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanBookmarks to update
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * Limit how many TravelPlanBookmarks to update.
     */
    limit?: number
  }

  /**
   * TravelPlanBookmark updateManyAndReturn
   */
  export type TravelPlanBookmarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlanBookmarks.
     */
    data: XOR<TravelPlanBookmarkUpdateManyMutationInput, TravelPlanBookmarkUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanBookmarks to update
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * Limit how many TravelPlanBookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanBookmark upsert
   */
  export type TravelPlanBookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlanBookmark to update in case it exists.
     */
    where: TravelPlanBookmarkWhereUniqueInput
    /**
     * In case the TravelPlanBookmark found by the `where` argument doesn't exist, create a new TravelPlanBookmark with this data.
     */
    create: XOR<TravelPlanBookmarkCreateInput, TravelPlanBookmarkUncheckedCreateInput>
    /**
     * In case the TravelPlanBookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanBookmarkUpdateInput, TravelPlanBookmarkUncheckedUpdateInput>
  }

  /**
   * TravelPlanBookmark delete
   */
  export type TravelPlanBookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
    /**
     * Filter which TravelPlanBookmark to delete.
     */
    where: TravelPlanBookmarkWhereUniqueInput
  }

  /**
   * TravelPlanBookmark deleteMany
   */
  export type TravelPlanBookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanBookmarks to delete
     */
    where?: TravelPlanBookmarkWhereInput
    /**
     * Limit how many TravelPlanBookmarks to delete.
     */
    limit?: number
  }

  /**
   * TravelPlanBookmark without action
   */
  export type TravelPlanBookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanBookmark
     */
    select?: TravelPlanBookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanBookmark
     */
    omit?: TravelPlanBookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanBookmarkInclude<ExtArgs> | null
  }


  /**
   * Model TravelPlanLike
   */

  export type AggregateTravelPlanLike = {
    _count: TravelPlanLikeCountAggregateOutputType | null
    _avg: TravelPlanLikeAvgAggregateOutputType | null
    _sum: TravelPlanLikeSumAggregateOutputType | null
    _min: TravelPlanLikeMinAggregateOutputType | null
    _max: TravelPlanLikeMaxAggregateOutputType | null
  }

  export type TravelPlanLikeAvgAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanLikeSumAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanLikeMinAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanLikeMaxAggregateOutputType = {
    travelPlanId: number | null
    userId: number | null
  }

  export type TravelPlanLikeCountAggregateOutputType = {
    travelPlanId: number
    userId: number
    _all: number
  }


  export type TravelPlanLikeAvgAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanLikeSumAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanLikeMinAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanLikeMaxAggregateInputType = {
    travelPlanId?: true
    userId?: true
  }

  export type TravelPlanLikeCountAggregateInputType = {
    travelPlanId?: true
    userId?: true
    _all?: true
  }

  export type TravelPlanLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanLike to aggregate.
     */
    where?: TravelPlanLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanLikes to fetch.
     */
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelPlanLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelPlanLikes
    **/
    _count?: true | TravelPlanLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelPlanLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelPlanLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelPlanLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelPlanLikeMaxAggregateInputType
  }

  export type GetTravelPlanLikeAggregateType<T extends TravelPlanLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelPlanLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelPlanLike[P]>
      : GetScalarType<T[P], AggregateTravelPlanLike[P]>
  }




  export type TravelPlanLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelPlanLikeWhereInput
    orderBy?: TravelPlanLikeOrderByWithAggregationInput | TravelPlanLikeOrderByWithAggregationInput[]
    by: TravelPlanLikeScalarFieldEnum[] | TravelPlanLikeScalarFieldEnum
    having?: TravelPlanLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelPlanLikeCountAggregateInputType | true
    _avg?: TravelPlanLikeAvgAggregateInputType
    _sum?: TravelPlanLikeSumAggregateInputType
    _min?: TravelPlanLikeMinAggregateInputType
    _max?: TravelPlanLikeMaxAggregateInputType
  }

  export type TravelPlanLikeGroupByOutputType = {
    travelPlanId: number
    userId: number
    _count: TravelPlanLikeCountAggregateOutputType | null
    _avg: TravelPlanLikeAvgAggregateOutputType | null
    _sum: TravelPlanLikeSumAggregateOutputType | null
    _min: TravelPlanLikeMinAggregateOutputType | null
    _max: TravelPlanLikeMaxAggregateOutputType | null
  }

  type GetTravelPlanLikeGroupByPayload<T extends TravelPlanLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelPlanLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelPlanLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelPlanLikeGroupByOutputType[P]>
            : GetScalarType<T[P], TravelPlanLikeGroupByOutputType[P]>
        }
      >
    >


  export type TravelPlanLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanLike"]>

  export type TravelPlanLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanLike"]>

  export type TravelPlanLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    travelPlanId?: boolean
    userId?: boolean
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelPlanLike"]>

  export type TravelPlanLikeSelectScalar = {
    travelPlanId?: boolean
    userId?: boolean
  }

  export type TravelPlanLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"travelPlanId" | "userId", ExtArgs["result"]["travelPlanLike"]>
  export type TravelPlanLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TravelPlanLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TravelPlanLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelPlan?: boolean | TravelPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TravelPlanLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelPlanLike"
    objects: {
      travelPlan: Prisma.$TravelPlanPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      travelPlanId: number
      userId: number
    }, ExtArgs["result"]["travelPlanLike"]>
    composites: {}
  }

  type TravelPlanLikeGetPayload<S extends boolean | null | undefined | TravelPlanLikeDefaultArgs> = $Result.GetResult<Prisma.$TravelPlanLikePayload, S>

  type TravelPlanLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelPlanLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelPlanLikeCountAggregateInputType | true
    }

  export interface TravelPlanLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelPlanLike'], meta: { name: 'TravelPlanLike' } }
    /**
     * Find zero or one TravelPlanLike that matches the filter.
     * @param {TravelPlanLikeFindUniqueArgs} args - Arguments to find a TravelPlanLike
     * @example
     * // Get one TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelPlanLikeFindUniqueArgs>(args: SelectSubset<T, TravelPlanLikeFindUniqueArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelPlanLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelPlanLikeFindUniqueOrThrowArgs} args - Arguments to find a TravelPlanLike
     * @example
     * // Get one TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelPlanLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelPlanLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeFindFirstArgs} args - Arguments to find a TravelPlanLike
     * @example
     * // Get one TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelPlanLikeFindFirstArgs>(args?: SelectSubset<T, TravelPlanLikeFindFirstArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelPlanLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeFindFirstOrThrowArgs} args - Arguments to find a TravelPlanLike
     * @example
     * // Get one TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelPlanLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelPlanLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelPlanLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelPlanLikes
     * const travelPlanLikes = await prisma.travelPlanLike.findMany()
     * 
     * // Get first 10 TravelPlanLikes
     * const travelPlanLikes = await prisma.travelPlanLike.findMany({ take: 10 })
     * 
     * // Only select the `travelPlanId`
     * const travelPlanLikeWithTravelPlanIdOnly = await prisma.travelPlanLike.findMany({ select: { travelPlanId: true } })
     * 
     */
    findMany<T extends TravelPlanLikeFindManyArgs>(args?: SelectSubset<T, TravelPlanLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelPlanLike.
     * @param {TravelPlanLikeCreateArgs} args - Arguments to create a TravelPlanLike.
     * @example
     * // Create one TravelPlanLike
     * const TravelPlanLike = await prisma.travelPlanLike.create({
     *   data: {
     *     // ... data to create a TravelPlanLike
     *   }
     * })
     * 
     */
    create<T extends TravelPlanLikeCreateArgs>(args: SelectSubset<T, TravelPlanLikeCreateArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelPlanLikes.
     * @param {TravelPlanLikeCreateManyArgs} args - Arguments to create many TravelPlanLikes.
     * @example
     * // Create many TravelPlanLikes
     * const travelPlanLike = await prisma.travelPlanLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelPlanLikeCreateManyArgs>(args?: SelectSubset<T, TravelPlanLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelPlanLikes and returns the data saved in the database.
     * @param {TravelPlanLikeCreateManyAndReturnArgs} args - Arguments to create many TravelPlanLikes.
     * @example
     * // Create many TravelPlanLikes
     * const travelPlanLike = await prisma.travelPlanLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelPlanLikes and only return the `travelPlanId`
     * const travelPlanLikeWithTravelPlanIdOnly = await prisma.travelPlanLike.createManyAndReturn({
     *   select: { travelPlanId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelPlanLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelPlanLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelPlanLike.
     * @param {TravelPlanLikeDeleteArgs} args - Arguments to delete one TravelPlanLike.
     * @example
     * // Delete one TravelPlanLike
     * const TravelPlanLike = await prisma.travelPlanLike.delete({
     *   where: {
     *     // ... filter to delete one TravelPlanLike
     *   }
     * })
     * 
     */
    delete<T extends TravelPlanLikeDeleteArgs>(args: SelectSubset<T, TravelPlanLikeDeleteArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelPlanLike.
     * @param {TravelPlanLikeUpdateArgs} args - Arguments to update one TravelPlanLike.
     * @example
     * // Update one TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelPlanLikeUpdateArgs>(args: SelectSubset<T, TravelPlanLikeUpdateArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelPlanLikes.
     * @param {TravelPlanLikeDeleteManyArgs} args - Arguments to filter TravelPlanLikes to delete.
     * @example
     * // Delete a few TravelPlanLikes
     * const { count } = await prisma.travelPlanLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelPlanLikeDeleteManyArgs>(args?: SelectSubset<T, TravelPlanLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelPlanLikes
     * const travelPlanLike = await prisma.travelPlanLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelPlanLikeUpdateManyArgs>(args: SelectSubset<T, TravelPlanLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelPlanLikes and returns the data updated in the database.
     * @param {TravelPlanLikeUpdateManyAndReturnArgs} args - Arguments to update many TravelPlanLikes.
     * @example
     * // Update many TravelPlanLikes
     * const travelPlanLike = await prisma.travelPlanLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelPlanLikes and only return the `travelPlanId`
     * const travelPlanLikeWithTravelPlanIdOnly = await prisma.travelPlanLike.updateManyAndReturn({
     *   select: { travelPlanId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelPlanLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelPlanLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelPlanLike.
     * @param {TravelPlanLikeUpsertArgs} args - Arguments to update or create a TravelPlanLike.
     * @example
     * // Update or create a TravelPlanLike
     * const travelPlanLike = await prisma.travelPlanLike.upsert({
     *   create: {
     *     // ... data to create a TravelPlanLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelPlanLike we want to update
     *   }
     * })
     */
    upsert<T extends TravelPlanLikeUpsertArgs>(args: SelectSubset<T, TravelPlanLikeUpsertArgs<ExtArgs>>): Prisma__TravelPlanLikeClient<$Result.GetResult<Prisma.$TravelPlanLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelPlanLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeCountArgs} args - Arguments to filter TravelPlanLikes to count.
     * @example
     * // Count the number of TravelPlanLikes
     * const count = await prisma.travelPlanLike.count({
     *   where: {
     *     // ... the filter for the TravelPlanLikes we want to count
     *   }
     * })
    **/
    count<T extends TravelPlanLikeCountArgs>(
      args?: Subset<T, TravelPlanLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelPlanLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelPlanLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelPlanLikeAggregateArgs>(args: Subset<T, TravelPlanLikeAggregateArgs>): Prisma.PrismaPromise<GetTravelPlanLikeAggregateType<T>>

    /**
     * Group by TravelPlanLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelPlanLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelPlanLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelPlanLikeGroupByArgs['orderBy'] }
        : { orderBy?: TravelPlanLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelPlanLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelPlanLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelPlanLike model
   */
  readonly fields: TravelPlanLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelPlanLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelPlanLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelPlan<T extends TravelPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelPlanDefaultArgs<ExtArgs>>): Prisma__TravelPlanClient<$Result.GetResult<Prisma.$TravelPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelPlanLike model
   */ 
  interface TravelPlanLikeFieldRefs {
    readonly travelPlanId: FieldRef<"TravelPlanLike", 'Int'>
    readonly userId: FieldRef<"TravelPlanLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TravelPlanLike findUnique
   */
  export type TravelPlanLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanLike to fetch.
     */
    where: TravelPlanLikeWhereUniqueInput
  }

  /**
   * TravelPlanLike findUniqueOrThrow
   */
  export type TravelPlanLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanLike to fetch.
     */
    where: TravelPlanLikeWhereUniqueInput
  }

  /**
   * TravelPlanLike findFirst
   */
  export type TravelPlanLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanLike to fetch.
     */
    where?: TravelPlanLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanLikes to fetch.
     */
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanLikes.
     */
    cursor?: TravelPlanLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanLikes.
     */
    distinct?: TravelPlanLikeScalarFieldEnum | TravelPlanLikeScalarFieldEnum[]
  }

  /**
   * TravelPlanLike findFirstOrThrow
   */
  export type TravelPlanLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanLike to fetch.
     */
    where?: TravelPlanLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanLikes to fetch.
     */
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelPlanLikes.
     */
    cursor?: TravelPlanLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelPlanLikes.
     */
    distinct?: TravelPlanLikeScalarFieldEnum | TravelPlanLikeScalarFieldEnum[]
  }

  /**
   * TravelPlanLike findMany
   */
  export type TravelPlanLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter, which TravelPlanLikes to fetch.
     */
    where?: TravelPlanLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelPlanLikes to fetch.
     */
    orderBy?: TravelPlanLikeOrderByWithRelationInput | TravelPlanLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelPlanLikes.
     */
    cursor?: TravelPlanLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelPlanLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelPlanLikes.
     */
    skip?: number
    distinct?: TravelPlanLikeScalarFieldEnum | TravelPlanLikeScalarFieldEnum[]
  }

  /**
   * TravelPlanLike create
   */
  export type TravelPlanLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelPlanLike.
     */
    data: XOR<TravelPlanLikeCreateInput, TravelPlanLikeUncheckedCreateInput>
  }

  /**
   * TravelPlanLike createMany
   */
  export type TravelPlanLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelPlanLikes.
     */
    data: TravelPlanLikeCreateManyInput | TravelPlanLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelPlanLike createManyAndReturn
   */
  export type TravelPlanLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * The data used to create many TravelPlanLikes.
     */
    data: TravelPlanLikeCreateManyInput | TravelPlanLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanLike update
   */
  export type TravelPlanLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelPlanLike.
     */
    data: XOR<TravelPlanLikeUpdateInput, TravelPlanLikeUncheckedUpdateInput>
    /**
     * Choose, which TravelPlanLike to update.
     */
    where: TravelPlanLikeWhereUniqueInput
  }

  /**
   * TravelPlanLike updateMany
   */
  export type TravelPlanLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelPlanLikes.
     */
    data: XOR<TravelPlanLikeUpdateManyMutationInput, TravelPlanLikeUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanLikes to update
     */
    where?: TravelPlanLikeWhereInput
    /**
     * Limit how many TravelPlanLikes to update.
     */
    limit?: number
  }

  /**
   * TravelPlanLike updateManyAndReturn
   */
  export type TravelPlanLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * The data used to update TravelPlanLikes.
     */
    data: XOR<TravelPlanLikeUpdateManyMutationInput, TravelPlanLikeUncheckedUpdateManyInput>
    /**
     * Filter which TravelPlanLikes to update
     */
    where?: TravelPlanLikeWhereInput
    /**
     * Limit how many TravelPlanLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelPlanLike upsert
   */
  export type TravelPlanLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelPlanLike to update in case it exists.
     */
    where: TravelPlanLikeWhereUniqueInput
    /**
     * In case the TravelPlanLike found by the `where` argument doesn't exist, create a new TravelPlanLike with this data.
     */
    create: XOR<TravelPlanLikeCreateInput, TravelPlanLikeUncheckedCreateInput>
    /**
     * In case the TravelPlanLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelPlanLikeUpdateInput, TravelPlanLikeUncheckedUpdateInput>
  }

  /**
   * TravelPlanLike delete
   */
  export type TravelPlanLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
    /**
     * Filter which TravelPlanLike to delete.
     */
    where: TravelPlanLikeWhereUniqueInput
  }

  /**
   * TravelPlanLike deleteMany
   */
  export type TravelPlanLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelPlanLikes to delete
     */
    where?: TravelPlanLikeWhereInput
    /**
     * Limit how many TravelPlanLikes to delete.
     */
    limit?: number
  }

  /**
   * TravelPlanLike without action
   */
  export type TravelPlanLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelPlanLike
     */
    select?: TravelPlanLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelPlanLike
     */
    omit?: TravelPlanLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelPlanLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    avatarUrl: 'avatarUrl',
    experienceLevel: 'experienceLevel',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TravelPlanScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    title: 'title',
    cityTitle: 'cityTitle',
    notes: 'notes',
    startDate: 'startDate',
    endDate: 'endDate',
    visibility: 'visibility',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type TravelPlanScalarFieldEnum = (typeof TravelPlanScalarFieldEnum)[keyof typeof TravelPlanScalarFieldEnum]


  export const TravelPlanJournalScalarFieldEnum: {
    id: 'id',
    travelPlanId: 'travelPlanId',
    notes: 'notes',
    futureTip: 'futureTip',
    favNotes: 'favNotes',
    rating: 'rating',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type TravelPlanJournalScalarFieldEnum = (typeof TravelPlanJournalScalarFieldEnum)[keyof typeof TravelPlanJournalScalarFieldEnum]


  export const TravelPlanDestinationScalarFieldEnum: {
    id: 'id',
    travelPlanId: 'travelPlanId',
    title: 'title',
    latitude: 'latitude',
    longitude: 'longitude',
    photoUrl: 'photoUrl',
    googlePlaceId: 'googlePlaceId',
    startDate: 'startDate',
    dailyVisitOrder: 'dailyVisitOrder',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type TravelPlanDestinationScalarFieldEnum = (typeof TravelPlanDestinationScalarFieldEnum)[keyof typeof TravelPlanDestinationScalarFieldEnum]


  export const TravelPlanDestinationAttachmentScalarFieldEnum: {
    travelPlanDestinationId: 'travelPlanDestinationId',
    url: 'url',
    order: 'order',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type TravelPlanDestinationAttachmentScalarFieldEnum = (typeof TravelPlanDestinationAttachmentScalarFieldEnum)[keyof typeof TravelPlanDestinationAttachmentScalarFieldEnum]


  export const TravelPlanBookmarkScalarFieldEnum: {
    travelPlanId: 'travelPlanId',
    userId: 'userId'
  };

  export type TravelPlanBookmarkScalarFieldEnum = (typeof TravelPlanBookmarkScalarFieldEnum)[keyof typeof TravelPlanBookmarkScalarFieldEnum]


  export const TravelPlanLikeScalarFieldEnum: {
    travelPlanId: 'travelPlanId',
    userId: 'userId'
  };

  export type TravelPlanLikeScalarFieldEnum = (typeof TravelPlanLikeScalarFieldEnum)[keyof typeof TravelPlanLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Visibility'
   */
  export type EnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility'>
    


  /**
   * Reference to a field of type 'Visibility[]'
   */
  export type ListEnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    experienceLevel?: IntFilter<"User"> | number
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    travelPlans?: TravelPlanListRelationFilter
    bookmarkedTravelPlans?: TravelPlanBookmarkListRelationFilter
    likedTravelPlans?: TravelPlanLikeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    experienceLevel?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    travelPlans?: TravelPlanOrderByRelationAggregateInput
    bookmarkedTravelPlans?: TravelPlanBookmarkOrderByRelationAggregateInput
    likedTravelPlans?: TravelPlanLikeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    experienceLevel?: IntFilter<"User"> | number
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    travelPlans?: TravelPlanListRelationFilter
    bookmarkedTravelPlans?: TravelPlanBookmarkListRelationFilter
    likedTravelPlans?: TravelPlanLikeListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    experienceLevel?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    experienceLevel?: IntWithAggregatesFilter<"User"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TravelPlanWhereInput = {
    AND?: TravelPlanWhereInput | TravelPlanWhereInput[]
    OR?: TravelPlanWhereInput[]
    NOT?: TravelPlanWhereInput | TravelPlanWhereInput[]
    id?: IntFilter<"TravelPlan"> | number
    authorId?: IntFilter<"TravelPlan"> | number
    title?: StringFilter<"TravelPlan"> | string
    cityTitle?: StringFilter<"TravelPlan"> | string
    notes?: StringFilter<"TravelPlan"> | string
    startDate?: DateTimeFilter<"TravelPlan"> | Date | string
    endDate?: DateTimeFilter<"TravelPlan"> | Date | string
    visibility?: EnumVisibilityFilter<"TravelPlan"> | $Enums.Visibility
    updatedAt?: DateTimeFilter<"TravelPlan"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    journal?: XOR<TravelPlanJournalNullableScalarRelationFilter, TravelPlanJournalWhereInput> | null
    destinations?: TravelPlanDestinationListRelationFilter
    bookmarkedByUsers?: TravelPlanBookmarkListRelationFilter
    likedByUsers?: TravelPlanLikeListRelationFilter
  }

  export type TravelPlanOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    cityTitle?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    visibility?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    journal?: TravelPlanJournalOrderByWithRelationInput
    destinations?: TravelPlanDestinationOrderByRelationAggregateInput
    bookmarkedByUsers?: TravelPlanBookmarkOrderByRelationAggregateInput
    likedByUsers?: TravelPlanLikeOrderByRelationAggregateInput
  }

  export type TravelPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TravelPlanWhereInput | TravelPlanWhereInput[]
    OR?: TravelPlanWhereInput[]
    NOT?: TravelPlanWhereInput | TravelPlanWhereInput[]
    authorId?: IntFilter<"TravelPlan"> | number
    title?: StringFilter<"TravelPlan"> | string
    cityTitle?: StringFilter<"TravelPlan"> | string
    notes?: StringFilter<"TravelPlan"> | string
    startDate?: DateTimeFilter<"TravelPlan"> | Date | string
    endDate?: DateTimeFilter<"TravelPlan"> | Date | string
    visibility?: EnumVisibilityFilter<"TravelPlan"> | $Enums.Visibility
    updatedAt?: DateTimeFilter<"TravelPlan"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    journal?: XOR<TravelPlanJournalNullableScalarRelationFilter, TravelPlanJournalWhereInput> | null
    destinations?: TravelPlanDestinationListRelationFilter
    bookmarkedByUsers?: TravelPlanBookmarkListRelationFilter
    likedByUsers?: TravelPlanLikeListRelationFilter
  }, "id">

  export type TravelPlanOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    cityTitle?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    visibility?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: TravelPlanCountOrderByAggregateInput
    _avg?: TravelPlanAvgOrderByAggregateInput
    _max?: TravelPlanMaxOrderByAggregateInput
    _min?: TravelPlanMinOrderByAggregateInput
    _sum?: TravelPlanSumOrderByAggregateInput
  }

  export type TravelPlanScalarWhereWithAggregatesInput = {
    AND?: TravelPlanScalarWhereWithAggregatesInput | TravelPlanScalarWhereWithAggregatesInput[]
    OR?: TravelPlanScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanScalarWhereWithAggregatesInput | TravelPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TravelPlan"> | number
    authorId?: IntWithAggregatesFilter<"TravelPlan"> | number
    title?: StringWithAggregatesFilter<"TravelPlan"> | string
    cityTitle?: StringWithAggregatesFilter<"TravelPlan"> | string
    notes?: StringWithAggregatesFilter<"TravelPlan"> | string
    startDate?: DateTimeWithAggregatesFilter<"TravelPlan"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"TravelPlan"> | Date | string
    visibility?: EnumVisibilityWithAggregatesFilter<"TravelPlan"> | $Enums.Visibility
    updatedAt?: DateTimeWithAggregatesFilter<"TravelPlan"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TravelPlan"> | Date | string
  }

  export type TravelPlanJournalWhereInput = {
    AND?: TravelPlanJournalWhereInput | TravelPlanJournalWhereInput[]
    OR?: TravelPlanJournalWhereInput[]
    NOT?: TravelPlanJournalWhereInput | TravelPlanJournalWhereInput[]
    id?: IntFilter<"TravelPlanJournal"> | number
    travelPlanId?: IntFilter<"TravelPlanJournal"> | number
    notes?: StringFilter<"TravelPlanJournal"> | string
    futureTip?: StringFilter<"TravelPlanJournal"> | string
    favNotes?: StringFilter<"TravelPlanJournal"> | string
    rating?: IntFilter<"TravelPlanJournal"> | number
    updatedAt?: DateTimeFilter<"TravelPlanJournal"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanJournal"> | Date | string
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
  }

  export type TravelPlanJournalOrderByWithRelationInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    notes?: SortOrder
    futureTip?: SortOrder
    favNotes?: SortOrder
    rating?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    travelPlan?: TravelPlanOrderByWithRelationInput
  }

  export type TravelPlanJournalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    travelPlanId?: number
    AND?: TravelPlanJournalWhereInput | TravelPlanJournalWhereInput[]
    OR?: TravelPlanJournalWhereInput[]
    NOT?: TravelPlanJournalWhereInput | TravelPlanJournalWhereInput[]
    notes?: StringFilter<"TravelPlanJournal"> | string
    futureTip?: StringFilter<"TravelPlanJournal"> | string
    favNotes?: StringFilter<"TravelPlanJournal"> | string
    rating?: IntFilter<"TravelPlanJournal"> | number
    updatedAt?: DateTimeFilter<"TravelPlanJournal"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanJournal"> | Date | string
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
  }, "id" | "travelPlanId">

  export type TravelPlanJournalOrderByWithAggregationInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    notes?: SortOrder
    futureTip?: SortOrder
    favNotes?: SortOrder
    rating?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: TravelPlanJournalCountOrderByAggregateInput
    _avg?: TravelPlanJournalAvgOrderByAggregateInput
    _max?: TravelPlanJournalMaxOrderByAggregateInput
    _min?: TravelPlanJournalMinOrderByAggregateInput
    _sum?: TravelPlanJournalSumOrderByAggregateInput
  }

  export type TravelPlanJournalScalarWhereWithAggregatesInput = {
    AND?: TravelPlanJournalScalarWhereWithAggregatesInput | TravelPlanJournalScalarWhereWithAggregatesInput[]
    OR?: TravelPlanJournalScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanJournalScalarWhereWithAggregatesInput | TravelPlanJournalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TravelPlanJournal"> | number
    travelPlanId?: IntWithAggregatesFilter<"TravelPlanJournal"> | number
    notes?: StringWithAggregatesFilter<"TravelPlanJournal"> | string
    futureTip?: StringWithAggregatesFilter<"TravelPlanJournal"> | string
    favNotes?: StringWithAggregatesFilter<"TravelPlanJournal"> | string
    rating?: IntWithAggregatesFilter<"TravelPlanJournal"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"TravelPlanJournal"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TravelPlanJournal"> | Date | string
  }

  export type TravelPlanDestinationWhereInput = {
    AND?: TravelPlanDestinationWhereInput | TravelPlanDestinationWhereInput[]
    OR?: TravelPlanDestinationWhereInput[]
    NOT?: TravelPlanDestinationWhereInput | TravelPlanDestinationWhereInput[]
    id?: IntFilter<"TravelPlanDestination"> | number
    travelPlanId?: IntFilter<"TravelPlanDestination"> | number
    title?: StringFilter<"TravelPlanDestination"> | string
    latitude?: FloatFilter<"TravelPlanDestination"> | number
    longitude?: FloatFilter<"TravelPlanDestination"> | number
    photoUrl?: StringNullableFilter<"TravelPlanDestination"> | string | null
    googlePlaceId?: StringFilter<"TravelPlanDestination"> | string
    startDate?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    dailyVisitOrder?: IntFilter<"TravelPlanDestination"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    attachments?: TravelPlanDestinationAttachmentListRelationFilter
  }

  export type TravelPlanDestinationOrderByWithRelationInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    title?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrder
    startDate?: SortOrder
    dailyVisitOrder?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    travelPlan?: TravelPlanOrderByWithRelationInput
    attachments?: TravelPlanDestinationAttachmentOrderByRelationAggregateInput
  }

  export type TravelPlanDestinationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TravelPlanDestinationWhereInput | TravelPlanDestinationWhereInput[]
    OR?: TravelPlanDestinationWhereInput[]
    NOT?: TravelPlanDestinationWhereInput | TravelPlanDestinationWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanDestination"> | number
    title?: StringFilter<"TravelPlanDestination"> | string
    latitude?: FloatFilter<"TravelPlanDestination"> | number
    longitude?: FloatFilter<"TravelPlanDestination"> | number
    photoUrl?: StringNullableFilter<"TravelPlanDestination"> | string | null
    googlePlaceId?: StringFilter<"TravelPlanDestination"> | string
    startDate?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    dailyVisitOrder?: IntFilter<"TravelPlanDestination"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    attachments?: TravelPlanDestinationAttachmentListRelationFilter
  }, "id">

  export type TravelPlanDestinationOrderByWithAggregationInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    title?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrder
    startDate?: SortOrder
    dailyVisitOrder?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: TravelPlanDestinationCountOrderByAggregateInput
    _avg?: TravelPlanDestinationAvgOrderByAggregateInput
    _max?: TravelPlanDestinationMaxOrderByAggregateInput
    _min?: TravelPlanDestinationMinOrderByAggregateInput
    _sum?: TravelPlanDestinationSumOrderByAggregateInput
  }

  export type TravelPlanDestinationScalarWhereWithAggregatesInput = {
    AND?: TravelPlanDestinationScalarWhereWithAggregatesInput | TravelPlanDestinationScalarWhereWithAggregatesInput[]
    OR?: TravelPlanDestinationScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanDestinationScalarWhereWithAggregatesInput | TravelPlanDestinationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TravelPlanDestination"> | number
    travelPlanId?: IntWithAggregatesFilter<"TravelPlanDestination"> | number
    title?: StringWithAggregatesFilter<"TravelPlanDestination"> | string
    latitude?: FloatWithAggregatesFilter<"TravelPlanDestination"> | number
    longitude?: FloatWithAggregatesFilter<"TravelPlanDestination"> | number
    photoUrl?: StringNullableWithAggregatesFilter<"TravelPlanDestination"> | string | null
    googlePlaceId?: StringWithAggregatesFilter<"TravelPlanDestination"> | string
    startDate?: DateTimeWithAggregatesFilter<"TravelPlanDestination"> | Date | string
    dailyVisitOrder?: IntWithAggregatesFilter<"TravelPlanDestination"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"TravelPlanDestination"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TravelPlanDestination"> | Date | string
  }

  export type TravelPlanDestinationAttachmentWhereInput = {
    AND?: TravelPlanDestinationAttachmentWhereInput | TravelPlanDestinationAttachmentWhereInput[]
    OR?: TravelPlanDestinationAttachmentWhereInput[]
    NOT?: TravelPlanDestinationAttachmentWhereInput | TravelPlanDestinationAttachmentWhereInput[]
    travelPlanDestinationId?: IntFilter<"TravelPlanDestinationAttachment"> | number
    url?: StringFilter<"TravelPlanDestinationAttachment"> | string
    order?: IntFilter<"TravelPlanDestinationAttachment"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
    travelPlanDestination?: XOR<TravelPlanDestinationScalarRelationFilter, TravelPlanDestinationWhereInput>
  }

  export type TravelPlanDestinationAttachmentOrderByWithRelationInput = {
    travelPlanDestinationId?: SortOrder
    url?: SortOrder
    order?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    travelPlanDestination?: TravelPlanDestinationOrderByWithRelationInput
  }

  export type TravelPlanDestinationAttachmentWhereUniqueInput = Prisma.AtLeast<{
    travelPlanDestinationId?: number
    AND?: TravelPlanDestinationAttachmentWhereInput | TravelPlanDestinationAttachmentWhereInput[]
    OR?: TravelPlanDestinationAttachmentWhereInput[]
    NOT?: TravelPlanDestinationAttachmentWhereInput | TravelPlanDestinationAttachmentWhereInput[]
    url?: StringFilter<"TravelPlanDestinationAttachment"> | string
    order?: IntFilter<"TravelPlanDestinationAttachment"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
    travelPlanDestination?: XOR<TravelPlanDestinationScalarRelationFilter, TravelPlanDestinationWhereInput>
  }, "travelPlanDestinationId">

  export type TravelPlanDestinationAttachmentOrderByWithAggregationInput = {
    travelPlanDestinationId?: SortOrder
    url?: SortOrder
    order?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: TravelPlanDestinationAttachmentCountOrderByAggregateInput
    _avg?: TravelPlanDestinationAttachmentAvgOrderByAggregateInput
    _max?: TravelPlanDestinationAttachmentMaxOrderByAggregateInput
    _min?: TravelPlanDestinationAttachmentMinOrderByAggregateInput
    _sum?: TravelPlanDestinationAttachmentSumOrderByAggregateInput
  }

  export type TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput = {
    AND?: TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput | TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput[]
    OR?: TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput | TravelPlanDestinationAttachmentScalarWhereWithAggregatesInput[]
    travelPlanDestinationId?: IntWithAggregatesFilter<"TravelPlanDestinationAttachment"> | number
    url?: StringWithAggregatesFilter<"TravelPlanDestinationAttachment"> | string
    order?: IntWithAggregatesFilter<"TravelPlanDestinationAttachment"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"TravelPlanDestinationAttachment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TravelPlanDestinationAttachment"> | Date | string
  }

  export type TravelPlanBookmarkWhereInput = {
    AND?: TravelPlanBookmarkWhereInput | TravelPlanBookmarkWhereInput[]
    OR?: TravelPlanBookmarkWhereInput[]
    NOT?: TravelPlanBookmarkWhereInput | TravelPlanBookmarkWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanBookmark"> | number
    userId?: IntFilter<"TravelPlanBookmark"> | number
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TravelPlanBookmarkOrderByWithRelationInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
    travelPlan?: TravelPlanOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TravelPlanBookmarkWhereUniqueInput = Prisma.AtLeast<{
    travelPlanId_userId?: TravelPlanBookmarkTravelPlanIdUserIdCompoundUniqueInput
    AND?: TravelPlanBookmarkWhereInput | TravelPlanBookmarkWhereInput[]
    OR?: TravelPlanBookmarkWhereInput[]
    NOT?: TravelPlanBookmarkWhereInput | TravelPlanBookmarkWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanBookmark"> | number
    userId?: IntFilter<"TravelPlanBookmark"> | number
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "travelPlanId_userId">

  export type TravelPlanBookmarkOrderByWithAggregationInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
    _count?: TravelPlanBookmarkCountOrderByAggregateInput
    _avg?: TravelPlanBookmarkAvgOrderByAggregateInput
    _max?: TravelPlanBookmarkMaxOrderByAggregateInput
    _min?: TravelPlanBookmarkMinOrderByAggregateInput
    _sum?: TravelPlanBookmarkSumOrderByAggregateInput
  }

  export type TravelPlanBookmarkScalarWhereWithAggregatesInput = {
    AND?: TravelPlanBookmarkScalarWhereWithAggregatesInput | TravelPlanBookmarkScalarWhereWithAggregatesInput[]
    OR?: TravelPlanBookmarkScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanBookmarkScalarWhereWithAggregatesInput | TravelPlanBookmarkScalarWhereWithAggregatesInput[]
    travelPlanId?: IntWithAggregatesFilter<"TravelPlanBookmark"> | number
    userId?: IntWithAggregatesFilter<"TravelPlanBookmark"> | number
  }

  export type TravelPlanLikeWhereInput = {
    AND?: TravelPlanLikeWhereInput | TravelPlanLikeWhereInput[]
    OR?: TravelPlanLikeWhereInput[]
    NOT?: TravelPlanLikeWhereInput | TravelPlanLikeWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanLike"> | number
    userId?: IntFilter<"TravelPlanLike"> | number
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TravelPlanLikeOrderByWithRelationInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
    travelPlan?: TravelPlanOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TravelPlanLikeWhereUniqueInput = Prisma.AtLeast<{
    travelPlanId_userId?: TravelPlanLikeTravelPlanIdUserIdCompoundUniqueInput
    AND?: TravelPlanLikeWhereInput | TravelPlanLikeWhereInput[]
    OR?: TravelPlanLikeWhereInput[]
    NOT?: TravelPlanLikeWhereInput | TravelPlanLikeWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanLike"> | number
    userId?: IntFilter<"TravelPlanLike"> | number
    travelPlan?: XOR<TravelPlanScalarRelationFilter, TravelPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "travelPlanId_userId">

  export type TravelPlanLikeOrderByWithAggregationInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
    _count?: TravelPlanLikeCountOrderByAggregateInput
    _avg?: TravelPlanLikeAvgOrderByAggregateInput
    _max?: TravelPlanLikeMaxOrderByAggregateInput
    _min?: TravelPlanLikeMinOrderByAggregateInput
    _sum?: TravelPlanLikeSumOrderByAggregateInput
  }

  export type TravelPlanLikeScalarWhereWithAggregatesInput = {
    AND?: TravelPlanLikeScalarWhereWithAggregatesInput | TravelPlanLikeScalarWhereWithAggregatesInput[]
    OR?: TravelPlanLikeScalarWhereWithAggregatesInput[]
    NOT?: TravelPlanLikeScalarWhereWithAggregatesInput | TravelPlanLikeScalarWhereWithAggregatesInput[]
    travelPlanId?: IntWithAggregatesFilter<"TravelPlanLike"> | number
    userId?: IntWithAggregatesFilter<"TravelPlanLike"> | number
  }

  export type UserCreateInput = {
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanCreateNestedManyWithoutUserInput
    bookmarkedTravelPlans?: TravelPlanBookmarkCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanUncheckedCreateNestedManyWithoutUserInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUpdateManyWithoutUserNestedInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUncheckedUpdateManyWithoutUserNestedInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanCreateInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTravelPlansInput
    journal?: TravelPlanJournalCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelPlansNestedInput
    journal?: TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanCreateManyInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanJournalCreateInput = {
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlan: TravelPlanCreateNestedOneWithoutJournalInput
  }

  export type TravelPlanJournalUncheckedCreateInput = {
    id?: number
    travelPlanId: number
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanJournalUpdateInput = {
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlan?: TravelPlanUpdateOneRequiredWithoutJournalNestedInput
  }

  export type TravelPlanJournalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelPlanId?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanJournalCreateManyInput = {
    id?: number
    travelPlanId: number
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanJournalUpdateManyMutationInput = {
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanJournalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelPlanId?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationCreateInput = {
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlan: TravelPlanCreateNestedOneWithoutDestinationsInput
    attachments?: TravelPlanDestinationAttachmentCreateNestedManyWithoutTravelPlanDestinationInput
  }

  export type TravelPlanDestinationUncheckedCreateInput = {
    id?: number
    travelPlanId: number
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
    attachments?: TravelPlanDestinationAttachmentUncheckedCreateNestedManyWithoutTravelPlanDestinationInput
  }

  export type TravelPlanDestinationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlan?: TravelPlanUpdateOneRequiredWithoutDestinationsNestedInput
    attachments?: TravelPlanDestinationAttachmentUpdateManyWithoutTravelPlanDestinationNestedInput
  }

  export type TravelPlanDestinationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelPlanId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: TravelPlanDestinationAttachmentUncheckedUpdateManyWithoutTravelPlanDestinationNestedInput
  }

  export type TravelPlanDestinationCreateManyInput = {
    id?: number
    travelPlanId: number
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelPlanId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationAttachmentCreateInput = {
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlanDestination: TravelPlanDestinationCreateNestedOneWithoutAttachmentsInput
  }

  export type TravelPlanDestinationAttachmentUncheckedCreateInput = {
    travelPlanDestinationId: number
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationAttachmentUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlanDestination?: TravelPlanDestinationUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type TravelPlanDestinationAttachmentUncheckedUpdateInput = {
    travelPlanDestinationId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationAttachmentCreateManyInput = {
    travelPlanDestinationId: number
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationAttachmentUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationAttachmentUncheckedUpdateManyInput = {
    travelPlanDestinationId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanBookmarkCreateInput = {
    travelPlan: TravelPlanCreateNestedOneWithoutBookmarkedByUsersInput
    user: UserCreateNestedOneWithoutBookmarkedTravelPlansInput
  }

  export type TravelPlanBookmarkUncheckedCreateInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanBookmarkUpdateInput = {
    travelPlan?: TravelPlanUpdateOneRequiredWithoutBookmarkedByUsersNestedInput
    user?: UserUpdateOneRequiredWithoutBookmarkedTravelPlansNestedInput
  }

  export type TravelPlanBookmarkUncheckedUpdateInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanBookmarkCreateManyInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanBookmarkUpdateManyMutationInput = {

  }

  export type TravelPlanBookmarkUncheckedUpdateManyInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeCreateInput = {
    travelPlan: TravelPlanCreateNestedOneWithoutLikedByUsersInput
    user: UserCreateNestedOneWithoutLikedTravelPlansInput
  }

  export type TravelPlanLikeUncheckedCreateInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanLikeUpdateInput = {
    travelPlan?: TravelPlanUpdateOneRequiredWithoutLikedByUsersNestedInput
    user?: UserUpdateOneRequiredWithoutLikedTravelPlansNestedInput
  }

  export type TravelPlanLikeUncheckedUpdateInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeCreateManyInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanLikeUpdateManyMutationInput = {

  }

  export type TravelPlanLikeUncheckedUpdateManyInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TravelPlanListRelationFilter = {
    every?: TravelPlanWhereInput
    some?: TravelPlanWhereInput
    none?: TravelPlanWhereInput
  }

  export type TravelPlanBookmarkListRelationFilter = {
    every?: TravelPlanBookmarkWhereInput
    some?: TravelPlanBookmarkWhereInput
    none?: TravelPlanBookmarkWhereInput
  }

  export type TravelPlanLikeListRelationFilter = {
    every?: TravelPlanLikeWhereInput
    some?: TravelPlanLikeWhereInput
    none?: TravelPlanLikeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TravelPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelPlanBookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelPlanLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    experienceLevel?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    experienceLevel?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    experienceLevel?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    experienceLevel?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    experienceLevel?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TravelPlanJournalNullableScalarRelationFilter = {
    is?: TravelPlanJournalWhereInput | null
    isNot?: TravelPlanJournalWhereInput | null
  }

  export type TravelPlanDestinationListRelationFilter = {
    every?: TravelPlanDestinationWhereInput
    some?: TravelPlanDestinationWhereInput
    none?: TravelPlanDestinationWhereInput
  }

  export type TravelPlanDestinationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelPlanCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    cityTitle?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    visibility?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type TravelPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    cityTitle?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    visibility?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    cityTitle?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    visibility?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type EnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type TravelPlanScalarRelationFilter = {
    is?: TravelPlanWhereInput
    isNot?: TravelPlanWhereInput
  }

  export type TravelPlanJournalCountOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    notes?: SortOrder
    futureTip?: SortOrder
    favNotes?: SortOrder
    rating?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanJournalAvgOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    rating?: SortOrder
  }

  export type TravelPlanJournalMaxOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    notes?: SortOrder
    futureTip?: SortOrder
    favNotes?: SortOrder
    rating?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanJournalMinOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    notes?: SortOrder
    futureTip?: SortOrder
    favNotes?: SortOrder
    rating?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanJournalSumOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    rating?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TravelPlanDestinationAttachmentListRelationFilter = {
    every?: TravelPlanDestinationAttachmentWhereInput
    some?: TravelPlanDestinationAttachmentWhereInput
    none?: TravelPlanDestinationAttachmentWhereInput
  }

  export type TravelPlanDestinationAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelPlanDestinationCountOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    title?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    startDate?: SortOrder
    dailyVisitOrder?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationAvgOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    dailyVisitOrder?: SortOrder
  }

  export type TravelPlanDestinationMaxOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    title?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    startDate?: SortOrder
    dailyVisitOrder?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationMinOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    title?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    startDate?: SortOrder
    dailyVisitOrder?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationSumOrderByAggregateInput = {
    id?: SortOrder
    travelPlanId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    dailyVisitOrder?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TravelPlanDestinationScalarRelationFilter = {
    is?: TravelPlanDestinationWhereInput
    isNot?: TravelPlanDestinationWhereInput
  }

  export type TravelPlanDestinationAttachmentCountOrderByAggregateInput = {
    travelPlanDestinationId?: SortOrder
    url?: SortOrder
    order?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationAttachmentAvgOrderByAggregateInput = {
    travelPlanDestinationId?: SortOrder
    order?: SortOrder
  }

  export type TravelPlanDestinationAttachmentMaxOrderByAggregateInput = {
    travelPlanDestinationId?: SortOrder
    url?: SortOrder
    order?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationAttachmentMinOrderByAggregateInput = {
    travelPlanDestinationId?: SortOrder
    url?: SortOrder
    order?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TravelPlanDestinationAttachmentSumOrderByAggregateInput = {
    travelPlanDestinationId?: SortOrder
    order?: SortOrder
  }

  export type TravelPlanBookmarkTravelPlanIdUserIdCompoundUniqueInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanBookmarkCountOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanBookmarkAvgOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanBookmarkMaxOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanBookmarkMinOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanBookmarkSumOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanLikeTravelPlanIdUserIdCompoundUniqueInput = {
    travelPlanId: number
    userId: number
  }

  export type TravelPlanLikeCountOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanLikeAvgOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanLikeMaxOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanLikeMinOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanLikeSumOrderByAggregateInput = {
    travelPlanId?: SortOrder
    userId?: SortOrder
  }

  export type TravelPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput> | TravelPlanCreateWithoutUserInput[] | TravelPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanCreateOrConnectWithoutUserInput | TravelPlanCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanCreateManyUserInputEnvelope
    connect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
  }

  export type TravelPlanBookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput> | TravelPlanBookmarkCreateWithoutUserInput[] | TravelPlanBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutUserInput | TravelPlanBookmarkCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanBookmarkCreateManyUserInputEnvelope
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
  }

  export type TravelPlanLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput> | TravelPlanLikeCreateWithoutUserInput[] | TravelPlanLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutUserInput | TravelPlanLikeCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanLikeCreateManyUserInputEnvelope
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
  }

  export type TravelPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput> | TravelPlanCreateWithoutUserInput[] | TravelPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanCreateOrConnectWithoutUserInput | TravelPlanCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanCreateManyUserInputEnvelope
    connect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
  }

  export type TravelPlanBookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput> | TravelPlanBookmarkCreateWithoutUserInput[] | TravelPlanBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutUserInput | TravelPlanBookmarkCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanBookmarkCreateManyUserInputEnvelope
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
  }

  export type TravelPlanLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput> | TravelPlanLikeCreateWithoutUserInput[] | TravelPlanLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutUserInput | TravelPlanLikeCreateOrConnectWithoutUserInput[]
    createMany?: TravelPlanLikeCreateManyUserInputEnvelope
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TravelPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput> | TravelPlanCreateWithoutUserInput[] | TravelPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanCreateOrConnectWithoutUserInput | TravelPlanCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanUpsertWithWhereUniqueWithoutUserInput | TravelPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanCreateManyUserInputEnvelope
    set?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    disconnect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    delete?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    connect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    update?: TravelPlanUpdateWithWhereUniqueWithoutUserInput | TravelPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanUpdateManyWithWhereWithoutUserInput | TravelPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanScalarWhereInput | TravelPlanScalarWhereInput[]
  }

  export type TravelPlanBookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput> | TravelPlanBookmarkCreateWithoutUserInput[] | TravelPlanBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutUserInput | TravelPlanBookmarkCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanBookmarkUpsertWithWhereUniqueWithoutUserInput | TravelPlanBookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanBookmarkCreateManyUserInputEnvelope
    set?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    disconnect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    delete?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    update?: TravelPlanBookmarkUpdateWithWhereUniqueWithoutUserInput | TravelPlanBookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanBookmarkUpdateManyWithWhereWithoutUserInput | TravelPlanBookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
  }

  export type TravelPlanLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput> | TravelPlanLikeCreateWithoutUserInput[] | TravelPlanLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutUserInput | TravelPlanLikeCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanLikeUpsertWithWhereUniqueWithoutUserInput | TravelPlanLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanLikeCreateManyUserInputEnvelope
    set?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    disconnect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    delete?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    update?: TravelPlanLikeUpdateWithWhereUniqueWithoutUserInput | TravelPlanLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanLikeUpdateManyWithWhereWithoutUserInput | TravelPlanLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
  }

  export type TravelPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput> | TravelPlanCreateWithoutUserInput[] | TravelPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanCreateOrConnectWithoutUserInput | TravelPlanCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanUpsertWithWhereUniqueWithoutUserInput | TravelPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanCreateManyUserInputEnvelope
    set?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    disconnect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    delete?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    connect?: TravelPlanWhereUniqueInput | TravelPlanWhereUniqueInput[]
    update?: TravelPlanUpdateWithWhereUniqueWithoutUserInput | TravelPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanUpdateManyWithWhereWithoutUserInput | TravelPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanScalarWhereInput | TravelPlanScalarWhereInput[]
  }

  export type TravelPlanBookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput> | TravelPlanBookmarkCreateWithoutUserInput[] | TravelPlanBookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutUserInput | TravelPlanBookmarkCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanBookmarkUpsertWithWhereUniqueWithoutUserInput | TravelPlanBookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanBookmarkCreateManyUserInputEnvelope
    set?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    disconnect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    delete?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    update?: TravelPlanBookmarkUpdateWithWhereUniqueWithoutUserInput | TravelPlanBookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanBookmarkUpdateManyWithWhereWithoutUserInput | TravelPlanBookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
  }

  export type TravelPlanLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput> | TravelPlanLikeCreateWithoutUserInput[] | TravelPlanLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutUserInput | TravelPlanLikeCreateOrConnectWithoutUserInput[]
    upsert?: TravelPlanLikeUpsertWithWhereUniqueWithoutUserInput | TravelPlanLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelPlanLikeCreateManyUserInputEnvelope
    set?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    disconnect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    delete?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    update?: TravelPlanLikeUpdateWithWhereUniqueWithoutUserInput | TravelPlanLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelPlanLikeUpdateManyWithWhereWithoutUserInput | TravelPlanLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTravelPlansInput = {
    create?: XOR<UserCreateWithoutTravelPlansInput, UserUncheckedCreateWithoutTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTravelPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TravelPlanJournalCreateNestedOneWithoutTravelPlanInput = {
    create?: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
    connectOrCreate?: TravelPlanJournalCreateOrConnectWithoutTravelPlanInput
    connect?: TravelPlanJournalWhereUniqueInput
  }

  export type TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput> | TravelPlanDestinationCreateWithoutTravelPlanInput[] | TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput | TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanDestinationCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
  }

  export type TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput> | TravelPlanBookmarkCreateWithoutTravelPlanInput[] | TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput | TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanBookmarkCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
  }

  export type TravelPlanLikeCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput> | TravelPlanLikeCreateWithoutTravelPlanInput[] | TravelPlanLikeUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutTravelPlanInput | TravelPlanLikeCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanLikeCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
  }

  export type TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput = {
    create?: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
    connectOrCreate?: TravelPlanJournalCreateOrConnectWithoutTravelPlanInput
    connect?: TravelPlanJournalWhereUniqueInput
  }

  export type TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput> | TravelPlanDestinationCreateWithoutTravelPlanInput[] | TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput | TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanDestinationCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
  }

  export type TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput> | TravelPlanBookmarkCreateWithoutTravelPlanInput[] | TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput | TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanBookmarkCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
  }

  export type TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput = {
    create?: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput> | TravelPlanLikeCreateWithoutTravelPlanInput[] | TravelPlanLikeUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutTravelPlanInput | TravelPlanLikeCreateOrConnectWithoutTravelPlanInput[]
    createMany?: TravelPlanLikeCreateManyTravelPlanInputEnvelope
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
  }

  export type EnumVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.Visibility
  }

  export type UserUpdateOneRequiredWithoutTravelPlansNestedInput = {
    create?: XOR<UserCreateWithoutTravelPlansInput, UserUncheckedCreateWithoutTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTravelPlansInput
    upsert?: UserUpsertWithoutTravelPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTravelPlansInput, UserUpdateWithoutTravelPlansInput>, UserUncheckedUpdateWithoutTravelPlansInput>
  }

  export type TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
    connectOrCreate?: TravelPlanJournalCreateOrConnectWithoutTravelPlanInput
    upsert?: TravelPlanJournalUpsertWithoutTravelPlanInput
    disconnect?: TravelPlanJournalWhereInput | boolean
    delete?: TravelPlanJournalWhereInput | boolean
    connect?: TravelPlanJournalWhereUniqueInput
    update?: XOR<XOR<TravelPlanJournalUpdateToOneWithWhereWithoutTravelPlanInput, TravelPlanJournalUpdateWithoutTravelPlanInput>, TravelPlanJournalUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput> | TravelPlanDestinationCreateWithoutTravelPlanInput[] | TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput | TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanDestinationUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanDestinationUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanDestinationCreateManyTravelPlanInputEnvelope
    set?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    disconnect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    delete?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    connect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    update?: TravelPlanDestinationUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanDestinationUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanDestinationUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanDestinationUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanDestinationScalarWhereInput | TravelPlanDestinationScalarWhereInput[]
  }

  export type TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput> | TravelPlanBookmarkCreateWithoutTravelPlanInput[] | TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput | TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanBookmarkUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanBookmarkUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanBookmarkCreateManyTravelPlanInputEnvelope
    set?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    disconnect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    delete?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    update?: TravelPlanBookmarkUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanBookmarkUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanBookmarkUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanBookmarkUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
  }

  export type TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput> | TravelPlanLikeCreateWithoutTravelPlanInput[] | TravelPlanLikeUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutTravelPlanInput | TravelPlanLikeCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanLikeUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanLikeUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanLikeCreateManyTravelPlanInputEnvelope
    set?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    disconnect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    delete?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    update?: TravelPlanLikeUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanLikeUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanLikeUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanLikeUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
  }

  export type TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
    connectOrCreate?: TravelPlanJournalCreateOrConnectWithoutTravelPlanInput
    upsert?: TravelPlanJournalUpsertWithoutTravelPlanInput
    disconnect?: TravelPlanJournalWhereInput | boolean
    delete?: TravelPlanJournalWhereInput | boolean
    connect?: TravelPlanJournalWhereUniqueInput
    update?: XOR<XOR<TravelPlanJournalUpdateToOneWithWhereWithoutTravelPlanInput, TravelPlanJournalUpdateWithoutTravelPlanInput>, TravelPlanJournalUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput> | TravelPlanDestinationCreateWithoutTravelPlanInput[] | TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput | TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanDestinationUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanDestinationUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanDestinationCreateManyTravelPlanInputEnvelope
    set?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    disconnect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    delete?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    connect?: TravelPlanDestinationWhereUniqueInput | TravelPlanDestinationWhereUniqueInput[]
    update?: TravelPlanDestinationUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanDestinationUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanDestinationUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanDestinationUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanDestinationScalarWhereInput | TravelPlanDestinationScalarWhereInput[]
  }

  export type TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput> | TravelPlanBookmarkCreateWithoutTravelPlanInput[] | TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput | TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanBookmarkUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanBookmarkUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanBookmarkCreateManyTravelPlanInputEnvelope
    set?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    disconnect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    delete?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    connect?: TravelPlanBookmarkWhereUniqueInput | TravelPlanBookmarkWhereUniqueInput[]
    update?: TravelPlanBookmarkUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanBookmarkUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanBookmarkUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanBookmarkUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
  }

  export type TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput = {
    create?: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput> | TravelPlanLikeCreateWithoutTravelPlanInput[] | TravelPlanLikeUncheckedCreateWithoutTravelPlanInput[]
    connectOrCreate?: TravelPlanLikeCreateOrConnectWithoutTravelPlanInput | TravelPlanLikeCreateOrConnectWithoutTravelPlanInput[]
    upsert?: TravelPlanLikeUpsertWithWhereUniqueWithoutTravelPlanInput | TravelPlanLikeUpsertWithWhereUniqueWithoutTravelPlanInput[]
    createMany?: TravelPlanLikeCreateManyTravelPlanInputEnvelope
    set?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    disconnect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    delete?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    connect?: TravelPlanLikeWhereUniqueInput | TravelPlanLikeWhereUniqueInput[]
    update?: TravelPlanLikeUpdateWithWhereUniqueWithoutTravelPlanInput | TravelPlanLikeUpdateWithWhereUniqueWithoutTravelPlanInput[]
    updateMany?: TravelPlanLikeUpdateManyWithWhereWithoutTravelPlanInput | TravelPlanLikeUpdateManyWithWhereWithoutTravelPlanInput[]
    deleteMany?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
  }

  export type TravelPlanCreateNestedOneWithoutJournalInput = {
    create?: XOR<TravelPlanCreateWithoutJournalInput, TravelPlanUncheckedCreateWithoutJournalInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutJournalInput
    connect?: TravelPlanWhereUniqueInput
  }

  export type TravelPlanUpdateOneRequiredWithoutJournalNestedInput = {
    create?: XOR<TravelPlanCreateWithoutJournalInput, TravelPlanUncheckedCreateWithoutJournalInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutJournalInput
    upsert?: TravelPlanUpsertWithoutJournalInput
    connect?: TravelPlanWhereUniqueInput
    update?: XOR<XOR<TravelPlanUpdateToOneWithWhereWithoutJournalInput, TravelPlanUpdateWithoutJournalInput>, TravelPlanUncheckedUpdateWithoutJournalInput>
  }

  export type TravelPlanCreateNestedOneWithoutDestinationsInput = {
    create?: XOR<TravelPlanCreateWithoutDestinationsInput, TravelPlanUncheckedCreateWithoutDestinationsInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutDestinationsInput
    connect?: TravelPlanWhereUniqueInput
  }

  export type TravelPlanDestinationAttachmentCreateNestedManyWithoutTravelPlanDestinationInput = {
    create?: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput> | TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput[] | TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput[]
    connectOrCreate?: TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput[]
    createMany?: TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInputEnvelope
    connect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
  }

  export type TravelPlanDestinationAttachmentUncheckedCreateNestedManyWithoutTravelPlanDestinationInput = {
    create?: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput> | TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput[] | TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput[]
    connectOrCreate?: TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput[]
    createMany?: TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInputEnvelope
    connect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TravelPlanUpdateOneRequiredWithoutDestinationsNestedInput = {
    create?: XOR<TravelPlanCreateWithoutDestinationsInput, TravelPlanUncheckedCreateWithoutDestinationsInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutDestinationsInput
    upsert?: TravelPlanUpsertWithoutDestinationsInput
    connect?: TravelPlanWhereUniqueInput
    update?: XOR<XOR<TravelPlanUpdateToOneWithWhereWithoutDestinationsInput, TravelPlanUpdateWithoutDestinationsInput>, TravelPlanUncheckedUpdateWithoutDestinationsInput>
  }

  export type TravelPlanDestinationAttachmentUpdateManyWithoutTravelPlanDestinationNestedInput = {
    create?: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput> | TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput[] | TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput[]
    connectOrCreate?: TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput[]
    upsert?: TravelPlanDestinationAttachmentUpsertWithWhereUniqueWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpsertWithWhereUniqueWithoutTravelPlanDestinationInput[]
    createMany?: TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInputEnvelope
    set?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    disconnect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    delete?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    connect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    update?: TravelPlanDestinationAttachmentUpdateWithWhereUniqueWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpdateWithWhereUniqueWithoutTravelPlanDestinationInput[]
    updateMany?: TravelPlanDestinationAttachmentUpdateManyWithWhereWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpdateManyWithWhereWithoutTravelPlanDestinationInput[]
    deleteMany?: TravelPlanDestinationAttachmentScalarWhereInput | TravelPlanDestinationAttachmentScalarWhereInput[]
  }

  export type TravelPlanDestinationAttachmentUncheckedUpdateManyWithoutTravelPlanDestinationNestedInput = {
    create?: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput> | TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput[] | TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput[]
    connectOrCreate?: TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput[]
    upsert?: TravelPlanDestinationAttachmentUpsertWithWhereUniqueWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpsertWithWhereUniqueWithoutTravelPlanDestinationInput[]
    createMany?: TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInputEnvelope
    set?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    disconnect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    delete?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    connect?: TravelPlanDestinationAttachmentWhereUniqueInput | TravelPlanDestinationAttachmentWhereUniqueInput[]
    update?: TravelPlanDestinationAttachmentUpdateWithWhereUniqueWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpdateWithWhereUniqueWithoutTravelPlanDestinationInput[]
    updateMany?: TravelPlanDestinationAttachmentUpdateManyWithWhereWithoutTravelPlanDestinationInput | TravelPlanDestinationAttachmentUpdateManyWithWhereWithoutTravelPlanDestinationInput[]
    deleteMany?: TravelPlanDestinationAttachmentScalarWhereInput | TravelPlanDestinationAttachmentScalarWhereInput[]
  }

  export type TravelPlanDestinationCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutAttachmentsInput, TravelPlanDestinationUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutAttachmentsInput
    connect?: TravelPlanDestinationWhereUniqueInput
  }

  export type TravelPlanDestinationUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<TravelPlanDestinationCreateWithoutAttachmentsInput, TravelPlanDestinationUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: TravelPlanDestinationCreateOrConnectWithoutAttachmentsInput
    upsert?: TravelPlanDestinationUpsertWithoutAttachmentsInput
    connect?: TravelPlanDestinationWhereUniqueInput
    update?: XOR<XOR<TravelPlanDestinationUpdateToOneWithWhereWithoutAttachmentsInput, TravelPlanDestinationUpdateWithoutAttachmentsInput>, TravelPlanDestinationUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TravelPlanCreateNestedOneWithoutBookmarkedByUsersInput = {
    create?: XOR<TravelPlanCreateWithoutBookmarkedByUsersInput, TravelPlanUncheckedCreateWithoutBookmarkedByUsersInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutBookmarkedByUsersInput
    connect?: TravelPlanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBookmarkedTravelPlansInput = {
    create?: XOR<UserCreateWithoutBookmarkedTravelPlansInput, UserUncheckedCreateWithoutBookmarkedTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarkedTravelPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TravelPlanUpdateOneRequiredWithoutBookmarkedByUsersNestedInput = {
    create?: XOR<TravelPlanCreateWithoutBookmarkedByUsersInput, TravelPlanUncheckedCreateWithoutBookmarkedByUsersInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutBookmarkedByUsersInput
    upsert?: TravelPlanUpsertWithoutBookmarkedByUsersInput
    connect?: TravelPlanWhereUniqueInput
    update?: XOR<XOR<TravelPlanUpdateToOneWithWhereWithoutBookmarkedByUsersInput, TravelPlanUpdateWithoutBookmarkedByUsersInput>, TravelPlanUncheckedUpdateWithoutBookmarkedByUsersInput>
  }

  export type UserUpdateOneRequiredWithoutBookmarkedTravelPlansNestedInput = {
    create?: XOR<UserCreateWithoutBookmarkedTravelPlansInput, UserUncheckedCreateWithoutBookmarkedTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarkedTravelPlansInput
    upsert?: UserUpsertWithoutBookmarkedTravelPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarkedTravelPlansInput, UserUpdateWithoutBookmarkedTravelPlansInput>, UserUncheckedUpdateWithoutBookmarkedTravelPlansInput>
  }

  export type TravelPlanCreateNestedOneWithoutLikedByUsersInput = {
    create?: XOR<TravelPlanCreateWithoutLikedByUsersInput, TravelPlanUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutLikedByUsersInput
    connect?: TravelPlanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikedTravelPlansInput = {
    create?: XOR<UserCreateWithoutLikedTravelPlansInput, UserUncheckedCreateWithoutLikedTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedTravelPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TravelPlanUpdateOneRequiredWithoutLikedByUsersNestedInput = {
    create?: XOR<TravelPlanCreateWithoutLikedByUsersInput, TravelPlanUncheckedCreateWithoutLikedByUsersInput>
    connectOrCreate?: TravelPlanCreateOrConnectWithoutLikedByUsersInput
    upsert?: TravelPlanUpsertWithoutLikedByUsersInput
    connect?: TravelPlanWhereUniqueInput
    update?: XOR<XOR<TravelPlanUpdateToOneWithWhereWithoutLikedByUsersInput, TravelPlanUpdateWithoutLikedByUsersInput>, TravelPlanUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type UserUpdateOneRequiredWithoutLikedTravelPlansNestedInput = {
    create?: XOR<UserCreateWithoutLikedTravelPlansInput, UserUncheckedCreateWithoutLikedTravelPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedTravelPlansInput
    upsert?: UserUpsertWithoutLikedTravelPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedTravelPlansInput, UserUpdateWithoutLikedTravelPlansInput>, UserUncheckedUpdateWithoutLikedTravelPlansInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type NestedEnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TravelPlanCreateWithoutUserInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanCreateOrConnectWithoutUserInput = {
    where: TravelPlanWhereUniqueInput
    create: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanCreateManyUserInputEnvelope = {
    data: TravelPlanCreateManyUserInput | TravelPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanBookmarkCreateWithoutUserInput = {
    travelPlan: TravelPlanCreateNestedOneWithoutBookmarkedByUsersInput
  }

  export type TravelPlanBookmarkUncheckedCreateWithoutUserInput = {
    travelPlanId: number
  }

  export type TravelPlanBookmarkCreateOrConnectWithoutUserInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    create: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanBookmarkCreateManyUserInputEnvelope = {
    data: TravelPlanBookmarkCreateManyUserInput | TravelPlanBookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanLikeCreateWithoutUserInput = {
    travelPlan: TravelPlanCreateNestedOneWithoutLikedByUsersInput
  }

  export type TravelPlanLikeUncheckedCreateWithoutUserInput = {
    travelPlanId: number
  }

  export type TravelPlanLikeCreateOrConnectWithoutUserInput = {
    where: TravelPlanLikeWhereUniqueInput
    create: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanLikeCreateManyUserInputEnvelope = {
    data: TravelPlanLikeCreateManyUserInput | TravelPlanLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: TravelPlanWhereUniqueInput
    update: XOR<TravelPlanUpdateWithoutUserInput, TravelPlanUncheckedUpdateWithoutUserInput>
    create: XOR<TravelPlanCreateWithoutUserInput, TravelPlanUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: TravelPlanWhereUniqueInput
    data: XOR<TravelPlanUpdateWithoutUserInput, TravelPlanUncheckedUpdateWithoutUserInput>
  }

  export type TravelPlanUpdateManyWithWhereWithoutUserInput = {
    where: TravelPlanScalarWhereInput
    data: XOR<TravelPlanUpdateManyMutationInput, TravelPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type TravelPlanScalarWhereInput = {
    AND?: TravelPlanScalarWhereInput | TravelPlanScalarWhereInput[]
    OR?: TravelPlanScalarWhereInput[]
    NOT?: TravelPlanScalarWhereInput | TravelPlanScalarWhereInput[]
    id?: IntFilter<"TravelPlan"> | number
    authorId?: IntFilter<"TravelPlan"> | number
    title?: StringFilter<"TravelPlan"> | string
    cityTitle?: StringFilter<"TravelPlan"> | string
    notes?: StringFilter<"TravelPlan"> | string
    startDate?: DateTimeFilter<"TravelPlan"> | Date | string
    endDate?: DateTimeFilter<"TravelPlan"> | Date | string
    visibility?: EnumVisibilityFilter<"TravelPlan"> | $Enums.Visibility
    updatedAt?: DateTimeFilter<"TravelPlan"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlan"> | Date | string
  }

  export type TravelPlanBookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    update: XOR<TravelPlanBookmarkUpdateWithoutUserInput, TravelPlanBookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<TravelPlanBookmarkCreateWithoutUserInput, TravelPlanBookmarkUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanBookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    data: XOR<TravelPlanBookmarkUpdateWithoutUserInput, TravelPlanBookmarkUncheckedUpdateWithoutUserInput>
  }

  export type TravelPlanBookmarkUpdateManyWithWhereWithoutUserInput = {
    where: TravelPlanBookmarkScalarWhereInput
    data: XOR<TravelPlanBookmarkUpdateManyMutationInput, TravelPlanBookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type TravelPlanBookmarkScalarWhereInput = {
    AND?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
    OR?: TravelPlanBookmarkScalarWhereInput[]
    NOT?: TravelPlanBookmarkScalarWhereInput | TravelPlanBookmarkScalarWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanBookmark"> | number
    userId?: IntFilter<"TravelPlanBookmark"> | number
  }

  export type TravelPlanLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: TravelPlanLikeWhereUniqueInput
    update: XOR<TravelPlanLikeUpdateWithoutUserInput, TravelPlanLikeUncheckedUpdateWithoutUserInput>
    create: XOR<TravelPlanLikeCreateWithoutUserInput, TravelPlanLikeUncheckedCreateWithoutUserInput>
  }

  export type TravelPlanLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: TravelPlanLikeWhereUniqueInput
    data: XOR<TravelPlanLikeUpdateWithoutUserInput, TravelPlanLikeUncheckedUpdateWithoutUserInput>
  }

  export type TravelPlanLikeUpdateManyWithWhereWithoutUserInput = {
    where: TravelPlanLikeScalarWhereInput
    data: XOR<TravelPlanLikeUpdateManyMutationInput, TravelPlanLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type TravelPlanLikeScalarWhereInput = {
    AND?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
    OR?: TravelPlanLikeScalarWhereInput[]
    NOT?: TravelPlanLikeScalarWhereInput | TravelPlanLikeScalarWhereInput[]
    travelPlanId?: IntFilter<"TravelPlanLike"> | number
    userId?: IntFilter<"TravelPlanLike"> | number
  }

  export type UserCreateWithoutTravelPlansInput = {
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    bookmarkedTravelPlans?: TravelPlanBookmarkCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTravelPlansInput = {
    id?: number
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTravelPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTravelPlansInput, UserUncheckedCreateWithoutTravelPlansInput>
  }

  export type TravelPlanJournalCreateWithoutTravelPlanInput = {
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanJournalUncheckedCreateWithoutTravelPlanInput = {
    id?: number
    notes: string
    futureTip: string
    favNotes: string
    rating: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanJournalCreateOrConnectWithoutTravelPlanInput = {
    where: TravelPlanJournalWhereUniqueInput
    create: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationCreateWithoutTravelPlanInput = {
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
    attachments?: TravelPlanDestinationAttachmentCreateNestedManyWithoutTravelPlanDestinationInput
  }

  export type TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput = {
    id?: number
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
    attachments?: TravelPlanDestinationAttachmentUncheckedCreateNestedManyWithoutTravelPlanDestinationInput
  }

  export type TravelPlanDestinationCreateOrConnectWithoutTravelPlanInput = {
    where: TravelPlanDestinationWhereUniqueInput
    create: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationCreateManyTravelPlanInputEnvelope = {
    data: TravelPlanDestinationCreateManyTravelPlanInput | TravelPlanDestinationCreateManyTravelPlanInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanBookmarkCreateWithoutTravelPlanInput = {
    user: UserCreateNestedOneWithoutBookmarkedTravelPlansInput
  }

  export type TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput = {
    userId: number
  }

  export type TravelPlanBookmarkCreateOrConnectWithoutTravelPlanInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    create: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanBookmarkCreateManyTravelPlanInputEnvelope = {
    data: TravelPlanBookmarkCreateManyTravelPlanInput | TravelPlanBookmarkCreateManyTravelPlanInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanLikeCreateWithoutTravelPlanInput = {
    user: UserCreateNestedOneWithoutLikedTravelPlansInput
  }

  export type TravelPlanLikeUncheckedCreateWithoutTravelPlanInput = {
    userId: number
  }

  export type TravelPlanLikeCreateOrConnectWithoutTravelPlanInput = {
    where: TravelPlanLikeWhereUniqueInput
    create: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanLikeCreateManyTravelPlanInputEnvelope = {
    data: TravelPlanLikeCreateManyTravelPlanInput | TravelPlanLikeCreateManyTravelPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTravelPlansInput = {
    update: XOR<UserUpdateWithoutTravelPlansInput, UserUncheckedUpdateWithoutTravelPlansInput>
    create: XOR<UserCreateWithoutTravelPlansInput, UserUncheckedCreateWithoutTravelPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTravelPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTravelPlansInput, UserUncheckedUpdateWithoutTravelPlansInput>
  }

  export type UserUpdateWithoutTravelPlansInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarkedTravelPlans?: TravelPlanBookmarkUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTravelPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TravelPlanJournalUpsertWithoutTravelPlanInput = {
    update: XOR<TravelPlanJournalUpdateWithoutTravelPlanInput, TravelPlanJournalUncheckedUpdateWithoutTravelPlanInput>
    create: XOR<TravelPlanJournalCreateWithoutTravelPlanInput, TravelPlanJournalUncheckedCreateWithoutTravelPlanInput>
    where?: TravelPlanJournalWhereInput
  }

  export type TravelPlanJournalUpdateToOneWithWhereWithoutTravelPlanInput = {
    where?: TravelPlanJournalWhereInput
    data: XOR<TravelPlanJournalUpdateWithoutTravelPlanInput, TravelPlanJournalUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanJournalUpdateWithoutTravelPlanInput = {
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanJournalUncheckedUpdateWithoutTravelPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    futureTip?: StringFieldUpdateOperationsInput | string
    favNotes?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationUpsertWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanDestinationWhereUniqueInput
    update: XOR<TravelPlanDestinationUpdateWithoutTravelPlanInput, TravelPlanDestinationUncheckedUpdateWithoutTravelPlanInput>
    create: XOR<TravelPlanDestinationCreateWithoutTravelPlanInput, TravelPlanDestinationUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationUpdateWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanDestinationWhereUniqueInput
    data: XOR<TravelPlanDestinationUpdateWithoutTravelPlanInput, TravelPlanDestinationUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationUpdateManyWithWhereWithoutTravelPlanInput = {
    where: TravelPlanDestinationScalarWhereInput
    data: XOR<TravelPlanDestinationUpdateManyMutationInput, TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanInput>
  }

  export type TravelPlanDestinationScalarWhereInput = {
    AND?: TravelPlanDestinationScalarWhereInput | TravelPlanDestinationScalarWhereInput[]
    OR?: TravelPlanDestinationScalarWhereInput[]
    NOT?: TravelPlanDestinationScalarWhereInput | TravelPlanDestinationScalarWhereInput[]
    id?: IntFilter<"TravelPlanDestination"> | number
    travelPlanId?: IntFilter<"TravelPlanDestination"> | number
    title?: StringFilter<"TravelPlanDestination"> | string
    latitude?: FloatFilter<"TravelPlanDestination"> | number
    longitude?: FloatFilter<"TravelPlanDestination"> | number
    photoUrl?: StringNullableFilter<"TravelPlanDestination"> | string | null
    googlePlaceId?: StringFilter<"TravelPlanDestination"> | string
    startDate?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    dailyVisitOrder?: IntFilter<"TravelPlanDestination"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestination"> | Date | string
  }

  export type TravelPlanBookmarkUpsertWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    update: XOR<TravelPlanBookmarkUpdateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedUpdateWithoutTravelPlanInput>
    create: XOR<TravelPlanBookmarkCreateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanBookmarkUpdateWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanBookmarkWhereUniqueInput
    data: XOR<TravelPlanBookmarkUpdateWithoutTravelPlanInput, TravelPlanBookmarkUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanBookmarkUpdateManyWithWhereWithoutTravelPlanInput = {
    where: TravelPlanBookmarkScalarWhereInput
    data: XOR<TravelPlanBookmarkUpdateManyMutationInput, TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanInput>
  }

  export type TravelPlanLikeUpsertWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanLikeWhereUniqueInput
    update: XOR<TravelPlanLikeUpdateWithoutTravelPlanInput, TravelPlanLikeUncheckedUpdateWithoutTravelPlanInput>
    create: XOR<TravelPlanLikeCreateWithoutTravelPlanInput, TravelPlanLikeUncheckedCreateWithoutTravelPlanInput>
  }

  export type TravelPlanLikeUpdateWithWhereUniqueWithoutTravelPlanInput = {
    where: TravelPlanLikeWhereUniqueInput
    data: XOR<TravelPlanLikeUpdateWithoutTravelPlanInput, TravelPlanLikeUncheckedUpdateWithoutTravelPlanInput>
  }

  export type TravelPlanLikeUpdateManyWithWhereWithoutTravelPlanInput = {
    where: TravelPlanLikeScalarWhereInput
    data: XOR<TravelPlanLikeUpdateManyMutationInput, TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanInput>
  }

  export type TravelPlanCreateWithoutJournalInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTravelPlansInput
    destinations?: TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateWithoutJournalInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    destinations?: TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanCreateOrConnectWithoutJournalInput = {
    where: TravelPlanWhereUniqueInput
    create: XOR<TravelPlanCreateWithoutJournalInput, TravelPlanUncheckedCreateWithoutJournalInput>
  }

  export type TravelPlanUpsertWithoutJournalInput = {
    update: XOR<TravelPlanUpdateWithoutJournalInput, TravelPlanUncheckedUpdateWithoutJournalInput>
    create: XOR<TravelPlanCreateWithoutJournalInput, TravelPlanUncheckedCreateWithoutJournalInput>
    where?: TravelPlanWhereInput
  }

  export type TravelPlanUpdateToOneWithWhereWithoutJournalInput = {
    where?: TravelPlanWhereInput
    data: XOR<TravelPlanUpdateWithoutJournalInput, TravelPlanUncheckedUpdateWithoutJournalInput>
  }

  export type TravelPlanUpdateWithoutJournalInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelPlansNestedInput
    destinations?: TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateWithoutJournalInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destinations?: TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanCreateWithoutDestinationsInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTravelPlansInput
    journal?: TravelPlanJournalCreateNestedOneWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateWithoutDestinationsInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanCreateOrConnectWithoutDestinationsInput = {
    where: TravelPlanWhereUniqueInput
    create: XOR<TravelPlanCreateWithoutDestinationsInput, TravelPlanUncheckedCreateWithoutDestinationsInput>
  }

  export type TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput = {
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput = {
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationAttachmentCreateOrConnectWithoutTravelPlanDestinationInput = {
    where: TravelPlanDestinationAttachmentWhereUniqueInput
    create: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput>
  }

  export type TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInputEnvelope = {
    data: TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInput | TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInput[]
    skipDuplicates?: boolean
  }

  export type TravelPlanUpsertWithoutDestinationsInput = {
    update: XOR<TravelPlanUpdateWithoutDestinationsInput, TravelPlanUncheckedUpdateWithoutDestinationsInput>
    create: XOR<TravelPlanCreateWithoutDestinationsInput, TravelPlanUncheckedCreateWithoutDestinationsInput>
    where?: TravelPlanWhereInput
  }

  export type TravelPlanUpdateToOneWithWhereWithoutDestinationsInput = {
    where?: TravelPlanWhereInput
    data: XOR<TravelPlanUpdateWithoutDestinationsInput, TravelPlanUncheckedUpdateWithoutDestinationsInput>
  }

  export type TravelPlanUpdateWithoutDestinationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelPlansNestedInput
    journal?: TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateWithoutDestinationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanDestinationAttachmentUpsertWithWhereUniqueWithoutTravelPlanDestinationInput = {
    where: TravelPlanDestinationAttachmentWhereUniqueInput
    update: XOR<TravelPlanDestinationAttachmentUpdateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedUpdateWithoutTravelPlanDestinationInput>
    create: XOR<TravelPlanDestinationAttachmentCreateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedCreateWithoutTravelPlanDestinationInput>
  }

  export type TravelPlanDestinationAttachmentUpdateWithWhereUniqueWithoutTravelPlanDestinationInput = {
    where: TravelPlanDestinationAttachmentWhereUniqueInput
    data: XOR<TravelPlanDestinationAttachmentUpdateWithoutTravelPlanDestinationInput, TravelPlanDestinationAttachmentUncheckedUpdateWithoutTravelPlanDestinationInput>
  }

  export type TravelPlanDestinationAttachmentUpdateManyWithWhereWithoutTravelPlanDestinationInput = {
    where: TravelPlanDestinationAttachmentScalarWhereInput
    data: XOR<TravelPlanDestinationAttachmentUpdateManyMutationInput, TravelPlanDestinationAttachmentUncheckedUpdateManyWithoutTravelPlanDestinationInput>
  }

  export type TravelPlanDestinationAttachmentScalarWhereInput = {
    AND?: TravelPlanDestinationAttachmentScalarWhereInput | TravelPlanDestinationAttachmentScalarWhereInput[]
    OR?: TravelPlanDestinationAttachmentScalarWhereInput[]
    NOT?: TravelPlanDestinationAttachmentScalarWhereInput | TravelPlanDestinationAttachmentScalarWhereInput[]
    travelPlanDestinationId?: IntFilter<"TravelPlanDestinationAttachment"> | number
    url?: StringFilter<"TravelPlanDestinationAttachment"> | string
    order?: IntFilter<"TravelPlanDestinationAttachment"> | number
    updatedAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
    createdAt?: DateTimeFilter<"TravelPlanDestinationAttachment"> | Date | string
  }

  export type TravelPlanDestinationCreateWithoutAttachmentsInput = {
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlan: TravelPlanCreateNestedOneWithoutDestinationsInput
  }

  export type TravelPlanDestinationUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    travelPlanId: number
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationCreateOrConnectWithoutAttachmentsInput = {
    where: TravelPlanDestinationWhereUniqueInput
    create: XOR<TravelPlanDestinationCreateWithoutAttachmentsInput, TravelPlanDestinationUncheckedCreateWithoutAttachmentsInput>
  }

  export type TravelPlanDestinationUpsertWithoutAttachmentsInput = {
    update: XOR<TravelPlanDestinationUpdateWithoutAttachmentsInput, TravelPlanDestinationUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<TravelPlanDestinationCreateWithoutAttachmentsInput, TravelPlanDestinationUncheckedCreateWithoutAttachmentsInput>
    where?: TravelPlanDestinationWhereInput
  }

  export type TravelPlanDestinationUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: TravelPlanDestinationWhereInput
    data: XOR<TravelPlanDestinationUpdateWithoutAttachmentsInput, TravelPlanDestinationUncheckedUpdateWithoutAttachmentsInput>
  }

  export type TravelPlanDestinationUpdateWithoutAttachmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlan?: TravelPlanUpdateOneRequiredWithoutDestinationsNestedInput
  }

  export type TravelPlanDestinationUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelPlanId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanCreateWithoutBookmarkedByUsersInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTravelPlansInput
    journal?: TravelPlanJournalCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateWithoutBookmarkedByUsersInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput
    likedByUsers?: TravelPlanLikeUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanCreateOrConnectWithoutBookmarkedByUsersInput = {
    where: TravelPlanWhereUniqueInput
    create: XOR<TravelPlanCreateWithoutBookmarkedByUsersInput, TravelPlanUncheckedCreateWithoutBookmarkedByUsersInput>
  }

  export type UserCreateWithoutBookmarkedTravelPlansInput = {
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookmarkedTravelPlansInput = {
    id?: number
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanUncheckedCreateNestedManyWithoutUserInput
    likedTravelPlans?: TravelPlanLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookmarkedTravelPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarkedTravelPlansInput, UserUncheckedCreateWithoutBookmarkedTravelPlansInput>
  }

  export type TravelPlanUpsertWithoutBookmarkedByUsersInput = {
    update: XOR<TravelPlanUpdateWithoutBookmarkedByUsersInput, TravelPlanUncheckedUpdateWithoutBookmarkedByUsersInput>
    create: XOR<TravelPlanCreateWithoutBookmarkedByUsersInput, TravelPlanUncheckedCreateWithoutBookmarkedByUsersInput>
    where?: TravelPlanWhereInput
  }

  export type TravelPlanUpdateToOneWithWhereWithoutBookmarkedByUsersInput = {
    where?: TravelPlanWhereInput
    data: XOR<TravelPlanUpdateWithoutBookmarkedByUsersInput, TravelPlanUncheckedUpdateWithoutBookmarkedByUsersInput>
  }

  export type TravelPlanUpdateWithoutBookmarkedByUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelPlansNestedInput
    journal?: TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateWithoutBookmarkedByUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type UserUpsertWithoutBookmarkedTravelPlansInput = {
    update: XOR<UserUpdateWithoutBookmarkedTravelPlansInput, UserUncheckedUpdateWithoutBookmarkedTravelPlansInput>
    create: XOR<UserCreateWithoutBookmarkedTravelPlansInput, UserUncheckedCreateWithoutBookmarkedTravelPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarkedTravelPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarkedTravelPlansInput, UserUncheckedUpdateWithoutBookmarkedTravelPlansInput>
  }

  export type UserUpdateWithoutBookmarkedTravelPlansInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarkedTravelPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUncheckedUpdateManyWithoutUserNestedInput
    likedTravelPlans?: TravelPlanLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TravelPlanCreateWithoutLikedByUsersInput = {
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTravelPlansInput
    journal?: TravelPlanJournalCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanUncheckedCreateWithoutLikedByUsersInput = {
    id?: number
    authorId: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
    journal?: TravelPlanJournalUncheckedCreateNestedOneWithoutTravelPlanInput
    destinations?: TravelPlanDestinationUncheckedCreateNestedManyWithoutTravelPlanInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutTravelPlanInput
  }

  export type TravelPlanCreateOrConnectWithoutLikedByUsersInput = {
    where: TravelPlanWhereUniqueInput
    create: XOR<TravelPlanCreateWithoutLikedByUsersInput, TravelPlanUncheckedCreateWithoutLikedByUsersInput>
  }

  export type UserCreateWithoutLikedTravelPlansInput = {
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanCreateNestedManyWithoutUserInput
    bookmarkedTravelPlans?: TravelPlanBookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedTravelPlansInput = {
    id?: number
    username: string
    email: string
    password: string
    avatarUrl?: string | null
    experienceLevel?: number
    updatedAt?: Date | string
    createdAt?: Date | string
    travelPlans?: TravelPlanUncheckedCreateNestedManyWithoutUserInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedTravelPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedTravelPlansInput, UserUncheckedCreateWithoutLikedTravelPlansInput>
  }

  export type TravelPlanUpsertWithoutLikedByUsersInput = {
    update: XOR<TravelPlanUpdateWithoutLikedByUsersInput, TravelPlanUncheckedUpdateWithoutLikedByUsersInput>
    create: XOR<TravelPlanCreateWithoutLikedByUsersInput, TravelPlanUncheckedCreateWithoutLikedByUsersInput>
    where?: TravelPlanWhereInput
  }

  export type TravelPlanUpdateToOneWithWhereWithoutLikedByUsersInput = {
    where?: TravelPlanWhereInput
    data: XOR<TravelPlanUpdateWithoutLikedByUsersInput, TravelPlanUncheckedUpdateWithoutLikedByUsersInput>
  }

  export type TravelPlanUpdateWithoutLikedByUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelPlansNestedInput
    journal?: TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateWithoutLikedByUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type UserUpsertWithoutLikedTravelPlansInput = {
    update: XOR<UserUpdateWithoutLikedTravelPlansInput, UserUncheckedUpdateWithoutLikedTravelPlansInput>
    create: XOR<UserCreateWithoutLikedTravelPlansInput, UserUncheckedCreateWithoutLikedTravelPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedTravelPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedTravelPlansInput, UserUncheckedUpdateWithoutLikedTravelPlansInput>
  }

  export type UserUpdateWithoutLikedTravelPlansInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUpdateManyWithoutUserNestedInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedTravelPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelPlans?: TravelPlanUncheckedUpdateManyWithoutUserNestedInput
    bookmarkedTravelPlans?: TravelPlanBookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TravelPlanCreateManyUserInput = {
    id?: number
    title: string
    cityTitle: string
    notes: string
    startDate: Date | string
    endDate: Date | string
    visibility?: $Enums.Visibility
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanBookmarkCreateManyUserInput = {
    travelPlanId: number
  }

  export type TravelPlanLikeCreateManyUserInput = {
    travelPlanId: number
  }

  export type TravelPlanUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journal?: TravelPlanJournalUncheckedUpdateOneWithoutTravelPlanNestedInput
    destinations?: TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanNestedInput
    bookmarkedByUsers?: TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanNestedInput
    likedByUsers?: TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanNestedInput
  }

  export type TravelPlanUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cityTitle?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanBookmarkUpdateWithoutUserInput = {
    travelPlan?: TravelPlanUpdateOneRequiredWithoutBookmarkedByUsersNestedInput
  }

  export type TravelPlanBookmarkUncheckedUpdateWithoutUserInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanBookmarkUncheckedUpdateManyWithoutUserInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeUpdateWithoutUserInput = {
    travelPlan?: TravelPlanUpdateOneRequiredWithoutLikedByUsersNestedInput
  }

  export type TravelPlanLikeUncheckedUpdateWithoutUserInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeUncheckedUpdateManyWithoutUserInput = {
    travelPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanDestinationCreateManyTravelPlanInput = {
    id?: number
    title: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    googlePlaceId: string
    startDate: Date | string
    dailyVisitOrder: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanBookmarkCreateManyTravelPlanInput = {
    userId: number
  }

  export type TravelPlanLikeCreateManyTravelPlanInput = {
    userId: number
  }

  export type TravelPlanDestinationUpdateWithoutTravelPlanInput = {
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: TravelPlanDestinationAttachmentUpdateManyWithoutTravelPlanDestinationNestedInput
  }

  export type TravelPlanDestinationUncheckedUpdateWithoutTravelPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: TravelPlanDestinationAttachmentUncheckedUpdateManyWithoutTravelPlanDestinationNestedInput
  }

  export type TravelPlanDestinationUncheckedUpdateManyWithoutTravelPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyVisitOrder?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanBookmarkUpdateWithoutTravelPlanInput = {
    user?: UserUpdateOneRequiredWithoutBookmarkedTravelPlansNestedInput
  }

  export type TravelPlanBookmarkUncheckedUpdateWithoutTravelPlanInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanBookmarkUncheckedUpdateManyWithoutTravelPlanInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeUpdateWithoutTravelPlanInput = {
    user?: UserUpdateOneRequiredWithoutLikedTravelPlansNestedInput
  }

  export type TravelPlanLikeUncheckedUpdateWithoutTravelPlanInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanLikeUncheckedUpdateManyWithoutTravelPlanInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TravelPlanDestinationAttachmentCreateManyTravelPlanDestinationInput = {
    url: string
    order: number
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TravelPlanDestinationAttachmentUpdateWithoutTravelPlanDestinationInput = {
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationAttachmentUncheckedUpdateWithoutTravelPlanDestinationInput = {
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelPlanDestinationAttachmentUncheckedUpdateManyWithoutTravelPlanDestinationInput = {
    url?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}