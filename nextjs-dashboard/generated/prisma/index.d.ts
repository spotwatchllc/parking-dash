
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
 * Model Box
 * 
 */
export type Box = $Result.DefaultSelection<Prisma.$BoxPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Boxes
 * const boxes = await prisma.box.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Boxes
   * const boxes = await prisma.box.findMany()
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
   * `prisma.box`: Exposes CRUD operations for the **Box** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Boxes
    * const boxes = await prisma.box.findMany()
    * ```
    */
  get box(): Prisma.BoxDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
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
    Box: 'Box'
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
      modelProps: "box"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Box: {
        payload: Prisma.$BoxPayload<ExtArgs>
        fields: Prisma.BoxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          findFirst: {
            args: Prisma.BoxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          findMany: {
            args: Prisma.BoxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>[]
          }
          create: {
            args: Prisma.BoxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          createMany: {
            args: Prisma.BoxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoxCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>[]
          }
          delete: {
            args: Prisma.BoxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          update: {
            args: Prisma.BoxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          deleteMany: {
            args: Prisma.BoxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoxUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>[]
          }
          upsert: {
            args: Prisma.BoxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoxPayload>
          }
          aggregate: {
            args: Prisma.BoxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBox>
          }
          groupBy: {
            args: Prisma.BoxGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoxGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoxCountArgs<ExtArgs>
            result: $Utils.Optional<BoxCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    box?: BoxOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Models
   */

  /**
   * Model Box
   */

  export type AggregateBox = {
    _count: BoxCountAggregateOutputType | null
    _avg: BoxAvgAggregateOutputType | null
    _sum: BoxSumAggregateOutputType | null
    _min: BoxMinAggregateOutputType | null
    _max: BoxMaxAggregateOutputType | null
  }

  export type BoxAvgAggregateOutputType = {
    id: number | null
    boxId: number | null
    x1: number | null
    y1: number | null
    x2: number | null
    y2: number | null
    x3: number | null
    y3: number | null
    x4: number | null
    y4: number | null
    availability: number | null
  }

  export type BoxSumAggregateOutputType = {
    id: number | null
    boxId: number | null
    x1: number | null
    y1: number | null
    x2: number | null
    y2: number | null
    x3: number | null
    y3: number | null
    x4: number | null
    y4: number | null
    availability: number | null
  }

  export type BoxMinAggregateOutputType = {
    id: number | null
    boxId: number | null
    x1: number | null
    y1: number | null
    x2: number | null
    y2: number | null
    x3: number | null
    y3: number | null
    x4: number | null
    y4: number | null
    availability: number | null
    updatedAt: Date | null
  }

  export type BoxMaxAggregateOutputType = {
    id: number | null
    boxId: number | null
    x1: number | null
    y1: number | null
    x2: number | null
    y2: number | null
    x3: number | null
    y3: number | null
    x4: number | null
    y4: number | null
    availability: number | null
    updatedAt: Date | null
  }

  export type BoxCountAggregateOutputType = {
    id: number
    boxId: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    availability: number
    updatedAt: number
    _all: number
  }


  export type BoxAvgAggregateInputType = {
    id?: true
    boxId?: true
    x1?: true
    y1?: true
    x2?: true
    y2?: true
    x3?: true
    y3?: true
    x4?: true
    y4?: true
    availability?: true
  }

  export type BoxSumAggregateInputType = {
    id?: true
    boxId?: true
    x1?: true
    y1?: true
    x2?: true
    y2?: true
    x3?: true
    y3?: true
    x4?: true
    y4?: true
    availability?: true
  }

  export type BoxMinAggregateInputType = {
    id?: true
    boxId?: true
    x1?: true
    y1?: true
    x2?: true
    y2?: true
    x3?: true
    y3?: true
    x4?: true
    y4?: true
    availability?: true
    updatedAt?: true
  }

  export type BoxMaxAggregateInputType = {
    id?: true
    boxId?: true
    x1?: true
    y1?: true
    x2?: true
    y2?: true
    x3?: true
    y3?: true
    x4?: true
    y4?: true
    availability?: true
    updatedAt?: true
  }

  export type BoxCountAggregateInputType = {
    id?: true
    boxId?: true
    x1?: true
    y1?: true
    x2?: true
    y2?: true
    x3?: true
    y3?: true
    x4?: true
    y4?: true
    availability?: true
    updatedAt?: true
    _all?: true
  }

  export type BoxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Box to aggregate.
     */
    where?: BoxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boxes to fetch.
     */
    orderBy?: BoxOrderByWithRelationInput | BoxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Boxes
    **/
    _count?: true | BoxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BoxAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BoxSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoxMaxAggregateInputType
  }

  export type GetBoxAggregateType<T extends BoxAggregateArgs> = {
        [P in keyof T & keyof AggregateBox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBox[P]>
      : GetScalarType<T[P], AggregateBox[P]>
  }




  export type BoxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoxWhereInput
    orderBy?: BoxOrderByWithAggregationInput | BoxOrderByWithAggregationInput[]
    by: BoxScalarFieldEnum[] | BoxScalarFieldEnum
    having?: BoxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoxCountAggregateInputType | true
    _avg?: BoxAvgAggregateInputType
    _sum?: BoxSumAggregateInputType
    _min?: BoxMinAggregateInputType
    _max?: BoxMaxAggregateInputType
  }

  export type BoxGroupByOutputType = {
    id: number
    boxId: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    availability: number
    updatedAt: Date
    _count: BoxCountAggregateOutputType | null
    _avg: BoxAvgAggregateOutputType | null
    _sum: BoxSumAggregateOutputType | null
    _min: BoxMinAggregateOutputType | null
    _max: BoxMaxAggregateOutputType | null
  }

  type GetBoxGroupByPayload<T extends BoxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoxGroupByOutputType[P]>
            : GetScalarType<T[P], BoxGroupByOutputType[P]>
        }
      >
    >


  export type BoxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boxId?: boolean
    x1?: boolean
    y1?: boolean
    x2?: boolean
    y2?: boolean
    x3?: boolean
    y3?: boolean
    x4?: boolean
    y4?: boolean
    availability?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["box"]>

  export type BoxSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boxId?: boolean
    x1?: boolean
    y1?: boolean
    x2?: boolean
    y2?: boolean
    x3?: boolean
    y3?: boolean
    x4?: boolean
    y4?: boolean
    availability?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["box"]>

  export type BoxSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boxId?: boolean
    x1?: boolean
    y1?: boolean
    x2?: boolean
    y2?: boolean
    x3?: boolean
    y3?: boolean
    x4?: boolean
    y4?: boolean
    availability?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["box"]>

  export type BoxSelectScalar = {
    id?: boolean
    boxId?: boolean
    x1?: boolean
    y1?: boolean
    x2?: boolean
    y2?: boolean
    x3?: boolean
    y3?: boolean
    x4?: boolean
    y4?: boolean
    availability?: boolean
    updatedAt?: boolean
  }

  export type BoxOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boxId" | "x1" | "y1" | "x2" | "y2" | "x3" | "y3" | "x4" | "y4" | "availability" | "updatedAt", ExtArgs["result"]["box"]>

  export type $BoxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Box"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      boxId: number
      x1: number
      y1: number
      x2: number
      y2: number
      x3: number
      y3: number
      x4: number
      y4: number
      availability: number
      updatedAt: Date
    }, ExtArgs["result"]["box"]>
    composites: {}
  }

  type BoxGetPayload<S extends boolean | null | undefined | BoxDefaultArgs> = $Result.GetResult<Prisma.$BoxPayload, S>

  type BoxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoxCountAggregateInputType | true
    }

  export interface BoxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Box'], meta: { name: 'Box' } }
    /**
     * Find zero or one Box that matches the filter.
     * @param {BoxFindUniqueArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoxFindUniqueArgs>(args: SelectSubset<T, BoxFindUniqueArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Box that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoxFindUniqueOrThrowArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoxFindUniqueOrThrowArgs>(args: SelectSubset<T, BoxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Box that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindFirstArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoxFindFirstArgs>(args?: SelectSubset<T, BoxFindFirstArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Box that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindFirstOrThrowArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoxFindFirstOrThrowArgs>(args?: SelectSubset<T, BoxFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Boxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boxes
     * const boxes = await prisma.box.findMany()
     * 
     * // Get first 10 Boxes
     * const boxes = await prisma.box.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boxWithIdOnly = await prisma.box.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoxFindManyArgs>(args?: SelectSubset<T, BoxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Box.
     * @param {BoxCreateArgs} args - Arguments to create a Box.
     * @example
     * // Create one Box
     * const Box = await prisma.box.create({
     *   data: {
     *     // ... data to create a Box
     *   }
     * })
     * 
     */
    create<T extends BoxCreateArgs>(args: SelectSubset<T, BoxCreateArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Boxes.
     * @param {BoxCreateManyArgs} args - Arguments to create many Boxes.
     * @example
     * // Create many Boxes
     * const box = await prisma.box.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoxCreateManyArgs>(args?: SelectSubset<T, BoxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Boxes and returns the data saved in the database.
     * @param {BoxCreateManyAndReturnArgs} args - Arguments to create many Boxes.
     * @example
     * // Create many Boxes
     * const box = await prisma.box.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Boxes and only return the `id`
     * const boxWithIdOnly = await prisma.box.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoxCreateManyAndReturnArgs>(args?: SelectSubset<T, BoxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Box.
     * @param {BoxDeleteArgs} args - Arguments to delete one Box.
     * @example
     * // Delete one Box
     * const Box = await prisma.box.delete({
     *   where: {
     *     // ... filter to delete one Box
     *   }
     * })
     * 
     */
    delete<T extends BoxDeleteArgs>(args: SelectSubset<T, BoxDeleteArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Box.
     * @param {BoxUpdateArgs} args - Arguments to update one Box.
     * @example
     * // Update one Box
     * const box = await prisma.box.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoxUpdateArgs>(args: SelectSubset<T, BoxUpdateArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Boxes.
     * @param {BoxDeleteManyArgs} args - Arguments to filter Boxes to delete.
     * @example
     * // Delete a few Boxes
     * const { count } = await prisma.box.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoxDeleteManyArgs>(args?: SelectSubset<T, BoxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boxes
     * const box = await prisma.box.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoxUpdateManyArgs>(args: SelectSubset<T, BoxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boxes and returns the data updated in the database.
     * @param {BoxUpdateManyAndReturnArgs} args - Arguments to update many Boxes.
     * @example
     * // Update many Boxes
     * const box = await prisma.box.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Boxes and only return the `id`
     * const boxWithIdOnly = await prisma.box.updateManyAndReturn({
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
    updateManyAndReturn<T extends BoxUpdateManyAndReturnArgs>(args: SelectSubset<T, BoxUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Box.
     * @param {BoxUpsertArgs} args - Arguments to update or create a Box.
     * @example
     * // Update or create a Box
     * const box = await prisma.box.upsert({
     *   create: {
     *     // ... data to create a Box
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Box we want to update
     *   }
     * })
     */
    upsert<T extends BoxUpsertArgs>(args: SelectSubset<T, BoxUpsertArgs<ExtArgs>>): Prisma__BoxClient<$Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Boxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxCountArgs} args - Arguments to filter Boxes to count.
     * @example
     * // Count the number of Boxes
     * const count = await prisma.box.count({
     *   where: {
     *     // ... the filter for the Boxes we want to count
     *   }
     * })
    **/
    count<T extends BoxCountArgs>(
      args?: Subset<T, BoxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Box.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BoxAggregateArgs>(args: Subset<T, BoxAggregateArgs>): Prisma.PrismaPromise<GetBoxAggregateType<T>>

    /**
     * Group by Box.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxGroupByArgs} args - Group by arguments.
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
      T extends BoxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoxGroupByArgs['orderBy'] }
        : { orderBy?: BoxGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BoxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Box model
   */
  readonly fields: BoxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Box.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Box model
   */
  interface BoxFieldRefs {
    readonly id: FieldRef<"Box", 'Int'>
    readonly boxId: FieldRef<"Box", 'Int'>
    readonly x1: FieldRef<"Box", 'Int'>
    readonly y1: FieldRef<"Box", 'Int'>
    readonly x2: FieldRef<"Box", 'Int'>
    readonly y2: FieldRef<"Box", 'Int'>
    readonly x3: FieldRef<"Box", 'Int'>
    readonly y3: FieldRef<"Box", 'Int'>
    readonly x4: FieldRef<"Box", 'Int'>
    readonly y4: FieldRef<"Box", 'Int'>
    readonly availability: FieldRef<"Box", 'Int'>
    readonly updatedAt: FieldRef<"Box", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Box findUnique
   */
  export type BoxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter, which Box to fetch.
     */
    where: BoxWhereUniqueInput
  }

  /**
   * Box findUniqueOrThrow
   */
  export type BoxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter, which Box to fetch.
     */
    where: BoxWhereUniqueInput
  }

  /**
   * Box findFirst
   */
  export type BoxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter, which Box to fetch.
     */
    where?: BoxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boxes to fetch.
     */
    orderBy?: BoxOrderByWithRelationInput | BoxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boxes.
     */
    cursor?: BoxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boxes.
     */
    distinct?: BoxScalarFieldEnum | BoxScalarFieldEnum[]
  }

  /**
   * Box findFirstOrThrow
   */
  export type BoxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter, which Box to fetch.
     */
    where?: BoxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boxes to fetch.
     */
    orderBy?: BoxOrderByWithRelationInput | BoxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boxes.
     */
    cursor?: BoxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boxes.
     */
    distinct?: BoxScalarFieldEnum | BoxScalarFieldEnum[]
  }

  /**
   * Box findMany
   */
  export type BoxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter, which Boxes to fetch.
     */
    where?: BoxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boxes to fetch.
     */
    orderBy?: BoxOrderByWithRelationInput | BoxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Boxes.
     */
    cursor?: BoxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boxes.
     */
    skip?: number
    distinct?: BoxScalarFieldEnum | BoxScalarFieldEnum[]
  }

  /**
   * Box create
   */
  export type BoxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * The data needed to create a Box.
     */
    data: XOR<BoxCreateInput, BoxUncheckedCreateInput>
  }

  /**
   * Box createMany
   */
  export type BoxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Boxes.
     */
    data: BoxCreateManyInput | BoxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Box createManyAndReturn
   */
  export type BoxCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * The data used to create many Boxes.
     */
    data: BoxCreateManyInput | BoxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Box update
   */
  export type BoxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * The data needed to update a Box.
     */
    data: XOR<BoxUpdateInput, BoxUncheckedUpdateInput>
    /**
     * Choose, which Box to update.
     */
    where: BoxWhereUniqueInput
  }

  /**
   * Box updateMany
   */
  export type BoxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Boxes.
     */
    data: XOR<BoxUpdateManyMutationInput, BoxUncheckedUpdateManyInput>
    /**
     * Filter which Boxes to update
     */
    where?: BoxWhereInput
    /**
     * Limit how many Boxes to update.
     */
    limit?: number
  }

  /**
   * Box updateManyAndReturn
   */
  export type BoxUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * The data used to update Boxes.
     */
    data: XOR<BoxUpdateManyMutationInput, BoxUncheckedUpdateManyInput>
    /**
     * Filter which Boxes to update
     */
    where?: BoxWhereInput
    /**
     * Limit how many Boxes to update.
     */
    limit?: number
  }

  /**
   * Box upsert
   */
  export type BoxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * The filter to search for the Box to update in case it exists.
     */
    where: BoxWhereUniqueInput
    /**
     * In case the Box found by the `where` argument doesn't exist, create a new Box with this data.
     */
    create: XOR<BoxCreateInput, BoxUncheckedCreateInput>
    /**
     * In case the Box was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoxUpdateInput, BoxUncheckedUpdateInput>
  }

  /**
   * Box delete
   */
  export type BoxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
    /**
     * Filter which Box to delete.
     */
    where: BoxWhereUniqueInput
  }

  /**
   * Box deleteMany
   */
  export type BoxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Boxes to delete
     */
    where?: BoxWhereInput
    /**
     * Limit how many Boxes to delete.
     */
    limit?: number
  }

  /**
   * Box without action
   */
  export type BoxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: BoxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Box
     */
    omit?: BoxOmit<ExtArgs> | null
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


  export const BoxScalarFieldEnum: {
    id: 'id',
    boxId: 'boxId',
    x1: 'x1',
    y1: 'y1',
    x2: 'x2',
    y2: 'y2',
    x3: 'x3',
    y3: 'y3',
    x4: 'x4',
    y4: 'y4',
    availability: 'availability',
    updatedAt: 'updatedAt'
  };

  export type BoxScalarFieldEnum = (typeof BoxScalarFieldEnum)[keyof typeof BoxScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type BoxWhereInput = {
    AND?: BoxWhereInput | BoxWhereInput[]
    OR?: BoxWhereInput[]
    NOT?: BoxWhereInput | BoxWhereInput[]
    id?: IntFilter<"Box"> | number
    boxId?: IntFilter<"Box"> | number
    x1?: IntFilter<"Box"> | number
    y1?: IntFilter<"Box"> | number
    x2?: IntFilter<"Box"> | number
    y2?: IntFilter<"Box"> | number
    x3?: IntFilter<"Box"> | number
    y3?: IntFilter<"Box"> | number
    x4?: IntFilter<"Box"> | number
    y4?: IntFilter<"Box"> | number
    availability?: IntFilter<"Box"> | number
    updatedAt?: DateTimeFilter<"Box"> | Date | string
  }

  export type BoxOrderByWithRelationInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoxWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    boxId?: number
    AND?: BoxWhereInput | BoxWhereInput[]
    OR?: BoxWhereInput[]
    NOT?: BoxWhereInput | BoxWhereInput[]
    x1?: IntFilter<"Box"> | number
    y1?: IntFilter<"Box"> | number
    x2?: IntFilter<"Box"> | number
    y2?: IntFilter<"Box"> | number
    x3?: IntFilter<"Box"> | number
    y3?: IntFilter<"Box"> | number
    x4?: IntFilter<"Box"> | number
    y4?: IntFilter<"Box"> | number
    availability?: IntFilter<"Box"> | number
    updatedAt?: DateTimeFilter<"Box"> | Date | string
  }, "id" | "boxId">

  export type BoxOrderByWithAggregationInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
    updatedAt?: SortOrder
    _count?: BoxCountOrderByAggregateInput
    _avg?: BoxAvgOrderByAggregateInput
    _max?: BoxMaxOrderByAggregateInput
    _min?: BoxMinOrderByAggregateInput
    _sum?: BoxSumOrderByAggregateInput
  }

  export type BoxScalarWhereWithAggregatesInput = {
    AND?: BoxScalarWhereWithAggregatesInput | BoxScalarWhereWithAggregatesInput[]
    OR?: BoxScalarWhereWithAggregatesInput[]
    NOT?: BoxScalarWhereWithAggregatesInput | BoxScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Box"> | number
    boxId?: IntWithAggregatesFilter<"Box"> | number
    x1?: IntWithAggregatesFilter<"Box"> | number
    y1?: IntWithAggregatesFilter<"Box"> | number
    x2?: IntWithAggregatesFilter<"Box"> | number
    y2?: IntWithAggregatesFilter<"Box"> | number
    x3?: IntWithAggregatesFilter<"Box"> | number
    y3?: IntWithAggregatesFilter<"Box"> | number
    x4?: IntWithAggregatesFilter<"Box"> | number
    y4?: IntWithAggregatesFilter<"Box"> | number
    availability?: IntWithAggregatesFilter<"Box"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Box"> | Date | string
  }

  export type BoxCreateInput = {
    boxId: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    availability?: number
    updatedAt?: Date | string
  }

  export type BoxUncheckedCreateInput = {
    id?: number
    boxId: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    availability?: number
    updatedAt?: Date | string
  }

  export type BoxUpdateInput = {
    boxId?: IntFieldUpdateOperationsInput | number
    x1?: IntFieldUpdateOperationsInput | number
    y1?: IntFieldUpdateOperationsInput | number
    x2?: IntFieldUpdateOperationsInput | number
    y2?: IntFieldUpdateOperationsInput | number
    x3?: IntFieldUpdateOperationsInput | number
    y3?: IntFieldUpdateOperationsInput | number
    x4?: IntFieldUpdateOperationsInput | number
    y4?: IntFieldUpdateOperationsInput | number
    availability?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoxUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    boxId?: IntFieldUpdateOperationsInput | number
    x1?: IntFieldUpdateOperationsInput | number
    y1?: IntFieldUpdateOperationsInput | number
    x2?: IntFieldUpdateOperationsInput | number
    y2?: IntFieldUpdateOperationsInput | number
    x3?: IntFieldUpdateOperationsInput | number
    y3?: IntFieldUpdateOperationsInput | number
    x4?: IntFieldUpdateOperationsInput | number
    y4?: IntFieldUpdateOperationsInput | number
    availability?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoxCreateManyInput = {
    id?: number
    boxId: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    availability?: number
    updatedAt?: Date | string
  }

  export type BoxUpdateManyMutationInput = {
    boxId?: IntFieldUpdateOperationsInput | number
    x1?: IntFieldUpdateOperationsInput | number
    y1?: IntFieldUpdateOperationsInput | number
    x2?: IntFieldUpdateOperationsInput | number
    y2?: IntFieldUpdateOperationsInput | number
    x3?: IntFieldUpdateOperationsInput | number
    y3?: IntFieldUpdateOperationsInput | number
    x4?: IntFieldUpdateOperationsInput | number
    y4?: IntFieldUpdateOperationsInput | number
    availability?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoxUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    boxId?: IntFieldUpdateOperationsInput | number
    x1?: IntFieldUpdateOperationsInput | number
    y1?: IntFieldUpdateOperationsInput | number
    x2?: IntFieldUpdateOperationsInput | number
    y2?: IntFieldUpdateOperationsInput | number
    x3?: IntFieldUpdateOperationsInput | number
    y3?: IntFieldUpdateOperationsInput | number
    x4?: IntFieldUpdateOperationsInput | number
    y4?: IntFieldUpdateOperationsInput | number
    availability?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoxCountOrderByAggregateInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoxAvgOrderByAggregateInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
  }

  export type BoxMaxOrderByAggregateInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoxMinOrderByAggregateInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoxSumOrderByAggregateInput = {
    id?: SortOrder
    boxId?: SortOrder
    x1?: SortOrder
    y1?: SortOrder
    x2?: SortOrder
    y2?: SortOrder
    x3?: SortOrder
    y3?: SortOrder
    x4?: SortOrder
    y4?: SortOrder
    availability?: SortOrder
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