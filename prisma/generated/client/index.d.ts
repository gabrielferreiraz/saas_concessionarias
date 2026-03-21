
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Store
 * 
 */
export type Store = $Result.DefaultSelection<Prisma.$StorePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model StoreRequest
 * 
 */
export type StoreRequest = $Result.DefaultSelection<Prisma.$StoreRequestPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model LeadEvent
 * 
 */
export type LeadEvent = $Result.DefaultSelection<Prisma.$LeadEventPayload>
/**
 * Model VehicleImage
 * 
 */
export type VehicleImage = $Result.DefaultSelection<Prisma.$VehicleImagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  STORE_ADMIN: 'STORE_ADMIN',
  STORE_USER: 'STORE_USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StoreRequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type StoreRequestStatus = (typeof StoreRequestStatus)[keyof typeof StoreRequestStatus]


export const AttendanceStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus]


export const Status: {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  SOLD: 'SOLD'
};

export type Status = (typeof Status)[keyof typeof Status]


export const StoreStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CANCELLED: 'CANCELLED'
};

export type StoreStatus = (typeof StoreStatus)[keyof typeof StoreStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StoreRequestStatus = $Enums.StoreRequestStatus

export const StoreRequestStatus: typeof $Enums.StoreRequestStatus

export type AttendanceStatus = $Enums.AttendanceStatus

export const AttendanceStatus: typeof $Enums.AttendanceStatus

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type StoreStatus = $Enums.StoreStatus

export const StoreStatus: typeof $Enums.StoreStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Stores
 * const stores = await prisma.store.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Stores
   * const stores = await prisma.store.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.storeRequest`: Exposes CRUD operations for the **StoreRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoreRequests
    * const storeRequests = await prisma.storeRequest.findMany()
    * ```
    */
  get storeRequest(): Prisma.StoreRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadEvent`: Exposes CRUD operations for the **LeadEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadEvents
    * const leadEvents = await prisma.leadEvent.findMany()
    * ```
    */
  get leadEvent(): Prisma.LeadEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleImage`: Exposes CRUD operations for the **VehicleImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleImages
    * const vehicleImages = await prisma.vehicleImage.findMany()
    * ```
    */
  get vehicleImage(): Prisma.VehicleImageDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Store: 'Store',
    User: 'User',
    StoreRequest: 'StoreRequest',
    Vehicle: 'Vehicle',
    LeadEvent: 'LeadEvent',
    VehicleImage: 'VehicleImage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "store" | "user" | "storeRequest" | "vehicle" | "leadEvent" | "vehicleImage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Store: {
        payload: Prisma.$StorePayload<ExtArgs>
        fields: Prisma.StoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findFirst: {
            args: Prisma.StoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findMany: {
            args: Prisma.StoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          create: {
            args: Prisma.StoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          createMany: {
            args: Prisma.StoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          delete: {
            args: Prisma.StoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          update: {
            args: Prisma.StoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          deleteMany: {
            args: Prisma.StoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          upsert: {
            args: Prisma.StoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.StoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
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
      StoreRequest: {
        payload: Prisma.$StoreRequestPayload<ExtArgs>
        fields: Prisma.StoreRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          findFirst: {
            args: Prisma.StoreRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          findMany: {
            args: Prisma.StoreRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>[]
          }
          create: {
            args: Prisma.StoreRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          createMany: {
            args: Prisma.StoreRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>[]
          }
          delete: {
            args: Prisma.StoreRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          update: {
            args: Prisma.StoreRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          deleteMany: {
            args: Prisma.StoreRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>[]
          }
          upsert: {
            args: Prisma.StoreRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreRequestPayload>
          }
          aggregate: {
            args: Prisma.StoreRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoreRequest>
          }
          groupBy: {
            args: Prisma.StoreRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreRequestCountArgs<ExtArgs>
            result: $Utils.Optional<StoreRequestCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      LeadEvent: {
        payload: Prisma.$LeadEventPayload<ExtArgs>
        fields: Prisma.LeadEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          findFirst: {
            args: Prisma.LeadEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          findMany: {
            args: Prisma.LeadEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>[]
          }
          create: {
            args: Prisma.LeadEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          createMany: {
            args: Prisma.LeadEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>[]
          }
          delete: {
            args: Prisma.LeadEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          update: {
            args: Prisma.LeadEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          deleteMany: {
            args: Prisma.LeadEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>[]
          }
          upsert: {
            args: Prisma.LeadEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadEventPayload>
          }
          aggregate: {
            args: Prisma.LeadEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadEvent>
          }
          groupBy: {
            args: Prisma.LeadEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadEventCountArgs<ExtArgs>
            result: $Utils.Optional<LeadEventCountAggregateOutputType> | number
          }
        }
      }
      VehicleImage: {
        payload: Prisma.$VehicleImagePayload<ExtArgs>
        fields: Prisma.VehicleImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          findFirst: {
            args: Prisma.VehicleImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          findMany: {
            args: Prisma.VehicleImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>[]
          }
          create: {
            args: Prisma.VehicleImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          createMany: {
            args: Prisma.VehicleImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>[]
          }
          delete: {
            args: Prisma.VehicleImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          update: {
            args: Prisma.VehicleImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          deleteMany: {
            args: Prisma.VehicleImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>[]
          }
          upsert: {
            args: Prisma.VehicleImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleImagePayload>
          }
          aggregate: {
            args: Prisma.VehicleImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleImage>
          }
          groupBy: {
            args: Prisma.VehicleImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleImageCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleImageCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    store?: StoreOmit
    user?: UserOmit
    storeRequest?: StoreRequestOmit
    vehicle?: VehicleOmit
    leadEvent?: LeadEventOmit
    vehicleImage?: VehicleImageOmit
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
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    vehicles: number
    users: number
    leadEvents: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | StoreCountOutputTypeCountVehiclesArgs
    users?: boolean | StoreCountOutputTypeCountUsersArgs
    leadEvents?: boolean | StoreCountOutputTypeCountLeadEventsArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountLeadEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadEventWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    images: number
    leadEvents: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | VehicleCountOutputTypeCountImagesArgs
    leadEvents?: boolean | VehicleCountOutputTypeCountLeadEventsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleImageWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountLeadEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    subdomain: string | null
    customDomain: string | null
    logoUrl: string | null
    primaryColor: string | null
    whatsapp: string | null
    status: $Enums.StoreStatus | null
    createdAt: Date | null
  }

  export type StoreMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    subdomain: string | null
    customDomain: string | null
    logoUrl: string | null
    primaryColor: string | null
    whatsapp: string | null
    status: $Enums.StoreStatus | null
    createdAt: Date | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    subdomain: number
    customDomain: number
    logoUrl: number
    primaryColor: number
    whatsapp: number
    status: number
    createdAt: number
    _all: number
  }


  export type StoreMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    subdomain?: true
    customDomain?: true
    logoUrl?: true
    primaryColor?: true
    whatsapp?: true
    status?: true
    createdAt?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    subdomain?: true
    customDomain?: true
    logoUrl?: true
    primaryColor?: true
    whatsapp?: true
    status?: true
    createdAt?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    subdomain?: true
    customDomain?: true
    logoUrl?: true
    primaryColor?: true
    whatsapp?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Store to aggregate.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithAggregationInput | StoreOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: string
    name: string
    slug: string
    subdomain: string
    customDomain: string | null
    logoUrl: string | null
    primaryColor: string
    whatsapp: string
    status: $Enums.StoreStatus
    createdAt: Date
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    subdomain?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    whatsapp?: boolean
    status?: boolean
    createdAt?: boolean
    vehicles?: boolean | Store$vehiclesArgs<ExtArgs>
    users?: boolean | Store$usersArgs<ExtArgs>
    leadEvents?: boolean | Store$leadEventsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    subdomain?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    whatsapp?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["store"]>

  export type StoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    subdomain?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    whatsapp?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["store"]>

  export type StoreSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    subdomain?: boolean
    customDomain?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    whatsapp?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type StoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "subdomain" | "customDomain" | "logoUrl" | "primaryColor" | "whatsapp" | "status" | "createdAt", ExtArgs["result"]["store"]>
  export type StoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | Store$vehiclesArgs<ExtArgs>
    users?: boolean | Store$usersArgs<ExtArgs>
    leadEvents?: boolean | Store$leadEventsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Store"
    objects: {
      vehicles: Prisma.$VehiclePayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
      leadEvents: Prisma.$LeadEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      /**
       * Subdomínio interno da plataforma, ex: "premium-cars"
       */
      subdomain: string
      /**
       * Domínio customizado completo, ex: "www.premiumcars.com.br"
       */
      customDomain: string | null
      logoUrl: string | null
      primaryColor: string
      whatsapp: string
      status: $Enums.StoreStatus
      createdAt: Date
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = $Result.GetResult<Prisma.$StorePayload, S>

  type StoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface StoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Store'], meta: { name: 'Store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreFindUniqueArgs>(args: SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreFindFirstArgs>(args?: SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreFindManyArgs>(args?: SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends StoreCreateArgs>(args: SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreCreateManyArgs>(args?: SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {StoreCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends StoreDeleteArgs>(args: SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreUpdateArgs>(args: SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreDeleteManyArgs>(args?: SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreUpdateManyArgs>(args: SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {StoreUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
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
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends StoreUpsertArgs>(args: SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
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
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Store model
   */
  readonly fields: StoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicles<T extends Store$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, Store$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Store$usersArgs<ExtArgs> = {}>(args?: Subset<T, Store$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leadEvents<T extends Store$leadEventsArgs<ExtArgs> = {}>(args?: Subset<T, Store$leadEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Store model
   */
  interface StoreFieldRefs {
    readonly id: FieldRef<"Store", 'String'>
    readonly name: FieldRef<"Store", 'String'>
    readonly slug: FieldRef<"Store", 'String'>
    readonly subdomain: FieldRef<"Store", 'String'>
    readonly customDomain: FieldRef<"Store", 'String'>
    readonly logoUrl: FieldRef<"Store", 'String'>
    readonly primaryColor: FieldRef<"Store", 'String'>
    readonly whatsapp: FieldRef<"Store", 'String'>
    readonly status: FieldRef<"Store", 'StoreStatus'>
    readonly createdAt: FieldRef<"Store", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Store findUnique
   */
  export type StoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findFirst
   */
  export type StoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findMany
   */
  export type StoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Stores to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store create
   */
  export type StoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Store.
     */
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }

  /**
   * Store createMany
   */
  export type StoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Store createManyAndReturn
   */
  export type StoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Store update
   */
  export type StoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Store.
     */
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store updateManyAndReturn
   */
  export type StoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store upsert
   */
  export type StoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Store to update in case it exists.
     */
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     */
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }

  /**
   * Store delete
   */
  export type StoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter which Store to delete.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stores to delete
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to delete.
     */
    limit?: number
  }

  /**
   * Store.vehicles
   */
  export type Store$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    cursor?: VehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Store.users
   */
  export type Store$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Store.leadEvents
   */
  export type Store$leadEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    where?: LeadEventWhereInput
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    cursor?: LeadEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadEventScalarFieldEnum | LeadEventScalarFieldEnum[]
  }

  /**
   * Store without action
   */
  export type StoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.UserRole | null
    storeId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.UserRole | null
    storeId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    storeId: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    storeId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    storeId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    storeId?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    role: $Enums.UserRole
    storeId: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
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
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    storeId?: boolean
    createdAt?: boolean
    store?: boolean | User$storeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    storeId?: boolean
    createdAt?: boolean
    store?: boolean | User$storeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    storeId?: boolean
    createdAt?: boolean
    store?: boolean | User$storeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    storeId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "storeId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | User$storeArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | User$storeArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | User$storeArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      store: Prisma.$StorePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      role: $Enums.UserRole
      storeId: string | null
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
    store<T extends User$storeArgs<ExtArgs> = {}>(args?: Subset<T, User$storeArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly storeId: FieldRef<"User", 'String'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
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
   * User.store
   */
  export type User$storeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    where?: StoreWhereInput
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
   * Model StoreRequest
   */

  export type AggregateStoreRequest = {
    _count: StoreRequestCountAggregateOutputType | null
    _min: StoreRequestMinAggregateOutputType | null
    _max: StoreRequestMaxAggregateOutputType | null
  }

  export type StoreRequestMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    whatsapp: string | null
    storeName: string | null
    subdomain: string | null
    message: string | null
    status: $Enums.StoreRequestStatus | null
    rejectedNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreRequestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    whatsapp: string | null
    storeName: string | null
    subdomain: string | null
    message: string | null
    status: $Enums.StoreRequestStatus | null
    rejectedNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreRequestCountAggregateOutputType = {
    id: number
    name: number
    email: number
    whatsapp: number
    storeName: number
    subdomain: number
    message: number
    status: number
    rejectedNote: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StoreRequestMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    whatsapp?: true
    storeName?: true
    subdomain?: true
    message?: true
    status?: true
    rejectedNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreRequestMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    whatsapp?: true
    storeName?: true
    subdomain?: true
    message?: true
    status?: true
    rejectedNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreRequestCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    whatsapp?: true
    storeName?: true
    subdomain?: true
    message?: true
    status?: true
    rejectedNote?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StoreRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreRequest to aggregate.
     */
    where?: StoreRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreRequests to fetch.
     */
    orderBy?: StoreRequestOrderByWithRelationInput | StoreRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoreRequests
    **/
    _count?: true | StoreRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreRequestMaxAggregateInputType
  }

  export type GetStoreRequestAggregateType<T extends StoreRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateStoreRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoreRequest[P]>
      : GetScalarType<T[P], AggregateStoreRequest[P]>
  }




  export type StoreRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreRequestWhereInput
    orderBy?: StoreRequestOrderByWithAggregationInput | StoreRequestOrderByWithAggregationInput[]
    by: StoreRequestScalarFieldEnum[] | StoreRequestScalarFieldEnum
    having?: StoreRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreRequestCountAggregateInputType | true
    _min?: StoreRequestMinAggregateInputType
    _max?: StoreRequestMaxAggregateInputType
  }

  export type StoreRequestGroupByOutputType = {
    id: string
    name: string
    email: string
    whatsapp: string
    storeName: string
    subdomain: string
    message: string | null
    status: $Enums.StoreRequestStatus
    rejectedNote: string | null
    createdAt: Date
    updatedAt: Date
    _count: StoreRequestCountAggregateOutputType | null
    _min: StoreRequestMinAggregateOutputType | null
    _max: StoreRequestMaxAggregateOutputType | null
  }

  type GetStoreRequestGroupByPayload<T extends StoreRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreRequestGroupByOutputType[P]>
            : GetScalarType<T[P], StoreRequestGroupByOutputType[P]>
        }
      >
    >


  export type StoreRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    whatsapp?: boolean
    storeName?: boolean
    subdomain?: boolean
    message?: boolean
    status?: boolean
    rejectedNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storeRequest"]>

  export type StoreRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    whatsapp?: boolean
    storeName?: boolean
    subdomain?: boolean
    message?: boolean
    status?: boolean
    rejectedNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storeRequest"]>

  export type StoreRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    whatsapp?: boolean
    storeName?: boolean
    subdomain?: boolean
    message?: boolean
    status?: boolean
    rejectedNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["storeRequest"]>

  export type StoreRequestSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    whatsapp?: boolean
    storeName?: boolean
    subdomain?: boolean
    message?: boolean
    status?: boolean
    rejectedNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StoreRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "whatsapp" | "storeName" | "subdomain" | "message" | "status" | "rejectedNote" | "createdAt" | "updatedAt", ExtArgs["result"]["storeRequest"]>

  export type $StoreRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoreRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      whatsapp: string
      storeName: string
      subdomain: string
      message: string | null
      status: $Enums.StoreRequestStatus
      rejectedNote: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["storeRequest"]>
    composites: {}
  }

  type StoreRequestGetPayload<S extends boolean | null | undefined | StoreRequestDefaultArgs> = $Result.GetResult<Prisma.$StoreRequestPayload, S>

  type StoreRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreRequestCountAggregateInputType | true
    }

  export interface StoreRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoreRequest'], meta: { name: 'StoreRequest' } }
    /**
     * Find zero or one StoreRequest that matches the filter.
     * @param {StoreRequestFindUniqueArgs} args - Arguments to find a StoreRequest
     * @example
     * // Get one StoreRequest
     * const storeRequest = await prisma.storeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreRequestFindUniqueArgs>(args: SelectSubset<T, StoreRequestFindUniqueArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoreRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreRequestFindUniqueOrThrowArgs} args - Arguments to find a StoreRequest
     * @example
     * // Get one StoreRequest
     * const storeRequest = await prisma.storeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestFindFirstArgs} args - Arguments to find a StoreRequest
     * @example
     * // Get one StoreRequest
     * const storeRequest = await prisma.storeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreRequestFindFirstArgs>(args?: SelectSubset<T, StoreRequestFindFirstArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestFindFirstOrThrowArgs} args - Arguments to find a StoreRequest
     * @example
     * // Get one StoreRequest
     * const storeRequest = await prisma.storeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoreRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoreRequests
     * const storeRequests = await prisma.storeRequest.findMany()
     * 
     * // Get first 10 StoreRequests
     * const storeRequests = await prisma.storeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeRequestWithIdOnly = await prisma.storeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreRequestFindManyArgs>(args?: SelectSubset<T, StoreRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoreRequest.
     * @param {StoreRequestCreateArgs} args - Arguments to create a StoreRequest.
     * @example
     * // Create one StoreRequest
     * const StoreRequest = await prisma.storeRequest.create({
     *   data: {
     *     // ... data to create a StoreRequest
     *   }
     * })
     * 
     */
    create<T extends StoreRequestCreateArgs>(args: SelectSubset<T, StoreRequestCreateArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoreRequests.
     * @param {StoreRequestCreateManyArgs} args - Arguments to create many StoreRequests.
     * @example
     * // Create many StoreRequests
     * const storeRequest = await prisma.storeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreRequestCreateManyArgs>(args?: SelectSubset<T, StoreRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoreRequests and returns the data saved in the database.
     * @param {StoreRequestCreateManyAndReturnArgs} args - Arguments to create many StoreRequests.
     * @example
     * // Create many StoreRequests
     * const storeRequest = await prisma.storeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoreRequests and only return the `id`
     * const storeRequestWithIdOnly = await prisma.storeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoreRequest.
     * @param {StoreRequestDeleteArgs} args - Arguments to delete one StoreRequest.
     * @example
     * // Delete one StoreRequest
     * const StoreRequest = await prisma.storeRequest.delete({
     *   where: {
     *     // ... filter to delete one StoreRequest
     *   }
     * })
     * 
     */
    delete<T extends StoreRequestDeleteArgs>(args: SelectSubset<T, StoreRequestDeleteArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoreRequest.
     * @param {StoreRequestUpdateArgs} args - Arguments to update one StoreRequest.
     * @example
     * // Update one StoreRequest
     * const storeRequest = await prisma.storeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreRequestUpdateArgs>(args: SelectSubset<T, StoreRequestUpdateArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoreRequests.
     * @param {StoreRequestDeleteManyArgs} args - Arguments to filter StoreRequests to delete.
     * @example
     * // Delete a few StoreRequests
     * const { count } = await prisma.storeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreRequestDeleteManyArgs>(args?: SelectSubset<T, StoreRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoreRequests
     * const storeRequest = await prisma.storeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreRequestUpdateManyArgs>(args: SelectSubset<T, StoreRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreRequests and returns the data updated in the database.
     * @param {StoreRequestUpdateManyAndReturnArgs} args - Arguments to update many StoreRequests.
     * @example
     * // Update many StoreRequests
     * const storeRequest = await prisma.storeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoreRequests and only return the `id`
     * const storeRequestWithIdOnly = await prisma.storeRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends StoreRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoreRequest.
     * @param {StoreRequestUpsertArgs} args - Arguments to update or create a StoreRequest.
     * @example
     * // Update or create a StoreRequest
     * const storeRequest = await prisma.storeRequest.upsert({
     *   create: {
     *     // ... data to create a StoreRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoreRequest we want to update
     *   }
     * })
     */
    upsert<T extends StoreRequestUpsertArgs>(args: SelectSubset<T, StoreRequestUpsertArgs<ExtArgs>>): Prisma__StoreRequestClient<$Result.GetResult<Prisma.$StoreRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoreRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestCountArgs} args - Arguments to filter StoreRequests to count.
     * @example
     * // Count the number of StoreRequests
     * const count = await prisma.storeRequest.count({
     *   where: {
     *     // ... the filter for the StoreRequests we want to count
     *   }
     * })
    **/
    count<T extends StoreRequestCountArgs>(
      args?: Subset<T, StoreRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoreRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StoreRequestAggregateArgs>(args: Subset<T, StoreRequestAggregateArgs>): Prisma.PrismaPromise<GetStoreRequestAggregateType<T>>

    /**
     * Group by StoreRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreRequestGroupByArgs} args - Group by arguments.
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
      T extends StoreRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreRequestGroupByArgs['orderBy'] }
        : { orderBy?: StoreRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StoreRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoreRequest model
   */
  readonly fields: StoreRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoreRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the StoreRequest model
   */
  interface StoreRequestFieldRefs {
    readonly id: FieldRef<"StoreRequest", 'String'>
    readonly name: FieldRef<"StoreRequest", 'String'>
    readonly email: FieldRef<"StoreRequest", 'String'>
    readonly whatsapp: FieldRef<"StoreRequest", 'String'>
    readonly storeName: FieldRef<"StoreRequest", 'String'>
    readonly subdomain: FieldRef<"StoreRequest", 'String'>
    readonly message: FieldRef<"StoreRequest", 'String'>
    readonly status: FieldRef<"StoreRequest", 'StoreRequestStatus'>
    readonly rejectedNote: FieldRef<"StoreRequest", 'String'>
    readonly createdAt: FieldRef<"StoreRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"StoreRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoreRequest findUnique
   */
  export type StoreRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter, which StoreRequest to fetch.
     */
    where: StoreRequestWhereUniqueInput
  }

  /**
   * StoreRequest findUniqueOrThrow
   */
  export type StoreRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter, which StoreRequest to fetch.
     */
    where: StoreRequestWhereUniqueInput
  }

  /**
   * StoreRequest findFirst
   */
  export type StoreRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter, which StoreRequest to fetch.
     */
    where?: StoreRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreRequests to fetch.
     */
    orderBy?: StoreRequestOrderByWithRelationInput | StoreRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreRequests.
     */
    cursor?: StoreRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreRequests.
     */
    distinct?: StoreRequestScalarFieldEnum | StoreRequestScalarFieldEnum[]
  }

  /**
   * StoreRequest findFirstOrThrow
   */
  export type StoreRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter, which StoreRequest to fetch.
     */
    where?: StoreRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreRequests to fetch.
     */
    orderBy?: StoreRequestOrderByWithRelationInput | StoreRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreRequests.
     */
    cursor?: StoreRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreRequests.
     */
    distinct?: StoreRequestScalarFieldEnum | StoreRequestScalarFieldEnum[]
  }

  /**
   * StoreRequest findMany
   */
  export type StoreRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter, which StoreRequests to fetch.
     */
    where?: StoreRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreRequests to fetch.
     */
    orderBy?: StoreRequestOrderByWithRelationInput | StoreRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoreRequests.
     */
    cursor?: StoreRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreRequests.
     */
    distinct?: StoreRequestScalarFieldEnum | StoreRequestScalarFieldEnum[]
  }

  /**
   * StoreRequest create
   */
  export type StoreRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a StoreRequest.
     */
    data: XOR<StoreRequestCreateInput, StoreRequestUncheckedCreateInput>
  }

  /**
   * StoreRequest createMany
   */
  export type StoreRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoreRequests.
     */
    data: StoreRequestCreateManyInput | StoreRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreRequest createManyAndReturn
   */
  export type StoreRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * The data used to create many StoreRequests.
     */
    data: StoreRequestCreateManyInput | StoreRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreRequest update
   */
  export type StoreRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a StoreRequest.
     */
    data: XOR<StoreRequestUpdateInput, StoreRequestUncheckedUpdateInput>
    /**
     * Choose, which StoreRequest to update.
     */
    where: StoreRequestWhereUniqueInput
  }

  /**
   * StoreRequest updateMany
   */
  export type StoreRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoreRequests.
     */
    data: XOR<StoreRequestUpdateManyMutationInput, StoreRequestUncheckedUpdateManyInput>
    /**
     * Filter which StoreRequests to update
     */
    where?: StoreRequestWhereInput
    /**
     * Limit how many StoreRequests to update.
     */
    limit?: number
  }

  /**
   * StoreRequest updateManyAndReturn
   */
  export type StoreRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * The data used to update StoreRequests.
     */
    data: XOR<StoreRequestUpdateManyMutationInput, StoreRequestUncheckedUpdateManyInput>
    /**
     * Filter which StoreRequests to update
     */
    where?: StoreRequestWhereInput
    /**
     * Limit how many StoreRequests to update.
     */
    limit?: number
  }

  /**
   * StoreRequest upsert
   */
  export type StoreRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the StoreRequest to update in case it exists.
     */
    where: StoreRequestWhereUniqueInput
    /**
     * In case the StoreRequest found by the `where` argument doesn't exist, create a new StoreRequest with this data.
     */
    create: XOR<StoreRequestCreateInput, StoreRequestUncheckedCreateInput>
    /**
     * In case the StoreRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreRequestUpdateInput, StoreRequestUncheckedUpdateInput>
  }

  /**
   * StoreRequest delete
   */
  export type StoreRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
    /**
     * Filter which StoreRequest to delete.
     */
    where: StoreRequestWhereUniqueInput
  }

  /**
   * StoreRequest deleteMany
   */
  export type StoreRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreRequests to delete
     */
    where?: StoreRequestWhereInput
    /**
     * Limit how many StoreRequests to delete.
     */
    limit?: number
  }

  /**
   * StoreRequest without action
   */
  export type StoreRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreRequest
     */
    select?: StoreRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreRequest
     */
    omit?: StoreRequestOmit<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
    price: number | null
    km: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
    price: number | null
    km: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    make: string | null
    model: string | null
    year: number | null
    price: number | null
    km: number | null
    color: string | null
    fuelType: string | null
    transmission: string | null
    description: string | null
    featured: boolean | null
    status: $Enums.Status | null
    storeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    make: string | null
    model: string | null
    year: number | null
    price: number | null
    km: number | null
    color: string | null
    fuelType: string | null
    transmission: string | null
    description: string | null
    featured: boolean | null
    status: $Enums.Status | null
    storeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    make: number
    model: number
    year: number
    price: number
    km: number
    color: number
    fuelType: number
    transmission: number
    description: number
    featured: number
    status: number
    storeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
    price?: true
    km?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
    price?: true
    km?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    price?: true
    km?: true
    color?: true
    fuelType?: true
    transmission?: true
    description?: true
    featured?: true
    status?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    price?: true
    km?: true
    color?: true
    fuelType?: true
    transmission?: true
    description?: true
    featured?: true
    status?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    price?: true
    km?: true
    color?: true
    fuelType?: true
    transmission?: true
    description?: true
    featured?: true
    status?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color: string | null
    fuelType: string | null
    transmission: string | null
    description: string | null
    featured: boolean
    status: $Enums.Status
    storeId: string
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    km?: boolean
    color?: boolean
    fuelType?: boolean
    transmission?: boolean
    description?: boolean
    featured?: boolean
    status?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    images?: boolean | Vehicle$imagesArgs<ExtArgs>
    leadEvents?: boolean | Vehicle$leadEventsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    km?: boolean
    color?: boolean
    fuelType?: boolean
    transmission?: boolean
    description?: boolean
    featured?: boolean
    status?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    km?: boolean
    color?: boolean
    fuelType?: boolean
    transmission?: boolean
    description?: boolean
    featured?: boolean
    status?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    km?: boolean
    color?: boolean
    fuelType?: boolean
    transmission?: boolean
    description?: boolean
    featured?: boolean
    status?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "make" | "model" | "year" | "price" | "km" | "color" | "fuelType" | "transmission" | "description" | "featured" | "status" | "storeId" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    images?: boolean | Vehicle$imagesArgs<ExtArgs>
    leadEvents?: boolean | Vehicle$leadEventsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      images: Prisma.$VehicleImagePayload<ExtArgs>[]
      leadEvents: Prisma.$LeadEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      make: string
      model: string
      year: number
      price: number
      km: number
      color: string | null
      fuelType: string | null
      transmission: string | null
      description: string | null
      featured: boolean
      status: $Enums.Status
      storeId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
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
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Vehicle$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leadEvents<T extends Vehicle$leadEventsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$leadEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly make: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly price: FieldRef<"Vehicle", 'Float'>
    readonly km: FieldRef<"Vehicle", 'Int'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly fuelType: FieldRef<"Vehicle", 'String'>
    readonly transmission: FieldRef<"Vehicle", 'String'>
    readonly description: FieldRef<"Vehicle", 'String'>
    readonly featured: FieldRef<"Vehicle", 'Boolean'>
    readonly status: FieldRef<"Vehicle", 'Status'>
    readonly storeId: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.images
   */
  export type Vehicle$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    where?: VehicleImageWhereInput
    orderBy?: VehicleImageOrderByWithRelationInput | VehicleImageOrderByWithRelationInput[]
    cursor?: VehicleImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleImageScalarFieldEnum | VehicleImageScalarFieldEnum[]
  }

  /**
   * Vehicle.leadEvents
   */
  export type Vehicle$leadEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    where?: LeadEventWhereInput
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    cursor?: LeadEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadEventScalarFieldEnum | LeadEventScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model LeadEvent
   */

  export type AggregateLeadEvent = {
    _count: LeadEventCountAggregateOutputType | null
    _min: LeadEventMinAggregateOutputType | null
    _max: LeadEventMaxAggregateOutputType | null
  }

  export type LeadEventMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    storeId: string | null
    type: string | null
    contactName: string | null
    contactPhone: string | null
    attendanceStatus: $Enums.AttendanceStatus | null
    assignedTo: string | null
    createdAt: Date | null
  }

  export type LeadEventMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    storeId: string | null
    type: string | null
    contactName: string | null
    contactPhone: string | null
    attendanceStatus: $Enums.AttendanceStatus | null
    assignedTo: string | null
    createdAt: Date | null
  }

  export type LeadEventCountAggregateOutputType = {
    id: number
    vehicleId: number
    storeId: number
    type: number
    contactName: number
    contactPhone: number
    attendanceStatus: number
    assignedTo: number
    createdAt: number
    _all: number
  }


  export type LeadEventMinAggregateInputType = {
    id?: true
    vehicleId?: true
    storeId?: true
    type?: true
    contactName?: true
    contactPhone?: true
    attendanceStatus?: true
    assignedTo?: true
    createdAt?: true
  }

  export type LeadEventMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    storeId?: true
    type?: true
    contactName?: true
    contactPhone?: true
    attendanceStatus?: true
    assignedTo?: true
    createdAt?: true
  }

  export type LeadEventCountAggregateInputType = {
    id?: true
    vehicleId?: true
    storeId?: true
    type?: true
    contactName?: true
    contactPhone?: true
    attendanceStatus?: true
    assignedTo?: true
    createdAt?: true
    _all?: true
  }

  export type LeadEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadEvent to aggregate.
     */
    where?: LeadEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadEvents to fetch.
     */
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadEvents
    **/
    _count?: true | LeadEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadEventMaxAggregateInputType
  }

  export type GetLeadEventAggregateType<T extends LeadEventAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadEvent[P]>
      : GetScalarType<T[P], AggregateLeadEvent[P]>
  }




  export type LeadEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadEventWhereInput
    orderBy?: LeadEventOrderByWithAggregationInput | LeadEventOrderByWithAggregationInput[]
    by: LeadEventScalarFieldEnum[] | LeadEventScalarFieldEnum
    having?: LeadEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadEventCountAggregateInputType | true
    _min?: LeadEventMinAggregateInputType
    _max?: LeadEventMaxAggregateInputType
  }

  export type LeadEventGroupByOutputType = {
    id: string
    vehicleId: string | null
    storeId: string
    type: string
    contactName: string | null
    contactPhone: string | null
    attendanceStatus: $Enums.AttendanceStatus
    assignedTo: string | null
    createdAt: Date
    _count: LeadEventCountAggregateOutputType | null
    _min: LeadEventMinAggregateOutputType | null
    _max: LeadEventMaxAggregateOutputType | null
  }

  type GetLeadEventGroupByPayload<T extends LeadEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadEventGroupByOutputType[P]>
            : GetScalarType<T[P], LeadEventGroupByOutputType[P]>
        }
      >
    >


  export type LeadEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    storeId?: boolean
    type?: boolean
    contactName?: boolean
    contactPhone?: boolean
    attendanceStatus?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadEvent"]>

  export type LeadEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    storeId?: boolean
    type?: boolean
    contactName?: boolean
    contactPhone?: boolean
    attendanceStatus?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadEvent"]>

  export type LeadEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    storeId?: boolean
    type?: boolean
    contactName?: boolean
    contactPhone?: boolean
    attendanceStatus?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadEvent"]>

  export type LeadEventSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    storeId?: boolean
    type?: boolean
    contactName?: boolean
    contactPhone?: boolean
    attendanceStatus?: boolean
    assignedTo?: boolean
    createdAt?: boolean
  }

  export type LeadEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "storeId" | "type" | "contactName" | "contactPhone" | "attendanceStatus" | "assignedTo" | "createdAt", ExtArgs["result"]["leadEvent"]>
  export type LeadEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type LeadEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type LeadEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | LeadEvent$vehicleArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $LeadEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadEvent"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string | null
      storeId: string
      type: string
      contactName: string | null
      contactPhone: string | null
      attendanceStatus: $Enums.AttendanceStatus
      assignedTo: string | null
      createdAt: Date
    }, ExtArgs["result"]["leadEvent"]>
    composites: {}
  }

  type LeadEventGetPayload<S extends boolean | null | undefined | LeadEventDefaultArgs> = $Result.GetResult<Prisma.$LeadEventPayload, S>

  type LeadEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadEventCountAggregateInputType | true
    }

  export interface LeadEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadEvent'], meta: { name: 'LeadEvent' } }
    /**
     * Find zero or one LeadEvent that matches the filter.
     * @param {LeadEventFindUniqueArgs} args - Arguments to find a LeadEvent
     * @example
     * // Get one LeadEvent
     * const leadEvent = await prisma.leadEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadEventFindUniqueArgs>(args: SelectSubset<T, LeadEventFindUniqueArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadEventFindUniqueOrThrowArgs} args - Arguments to find a LeadEvent
     * @example
     * // Get one LeadEvent
     * const leadEvent = await prisma.leadEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadEventFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventFindFirstArgs} args - Arguments to find a LeadEvent
     * @example
     * // Get one LeadEvent
     * const leadEvent = await prisma.leadEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadEventFindFirstArgs>(args?: SelectSubset<T, LeadEventFindFirstArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventFindFirstOrThrowArgs} args - Arguments to find a LeadEvent
     * @example
     * // Get one LeadEvent
     * const leadEvent = await prisma.leadEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadEventFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadEvents
     * const leadEvents = await prisma.leadEvent.findMany()
     * 
     * // Get first 10 LeadEvents
     * const leadEvents = await prisma.leadEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadEventWithIdOnly = await prisma.leadEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadEventFindManyArgs>(args?: SelectSubset<T, LeadEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadEvent.
     * @param {LeadEventCreateArgs} args - Arguments to create a LeadEvent.
     * @example
     * // Create one LeadEvent
     * const LeadEvent = await prisma.leadEvent.create({
     *   data: {
     *     // ... data to create a LeadEvent
     *   }
     * })
     * 
     */
    create<T extends LeadEventCreateArgs>(args: SelectSubset<T, LeadEventCreateArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadEvents.
     * @param {LeadEventCreateManyArgs} args - Arguments to create many LeadEvents.
     * @example
     * // Create many LeadEvents
     * const leadEvent = await prisma.leadEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadEventCreateManyArgs>(args?: SelectSubset<T, LeadEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadEvents and returns the data saved in the database.
     * @param {LeadEventCreateManyAndReturnArgs} args - Arguments to create many LeadEvents.
     * @example
     * // Create many LeadEvents
     * const leadEvent = await prisma.leadEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadEvents and only return the `id`
     * const leadEventWithIdOnly = await prisma.leadEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadEventCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadEvent.
     * @param {LeadEventDeleteArgs} args - Arguments to delete one LeadEvent.
     * @example
     * // Delete one LeadEvent
     * const LeadEvent = await prisma.leadEvent.delete({
     *   where: {
     *     // ... filter to delete one LeadEvent
     *   }
     * })
     * 
     */
    delete<T extends LeadEventDeleteArgs>(args: SelectSubset<T, LeadEventDeleteArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadEvent.
     * @param {LeadEventUpdateArgs} args - Arguments to update one LeadEvent.
     * @example
     * // Update one LeadEvent
     * const leadEvent = await prisma.leadEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadEventUpdateArgs>(args: SelectSubset<T, LeadEventUpdateArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadEvents.
     * @param {LeadEventDeleteManyArgs} args - Arguments to filter LeadEvents to delete.
     * @example
     * // Delete a few LeadEvents
     * const { count } = await prisma.leadEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadEventDeleteManyArgs>(args?: SelectSubset<T, LeadEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadEvents
     * const leadEvent = await prisma.leadEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadEventUpdateManyArgs>(args: SelectSubset<T, LeadEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadEvents and returns the data updated in the database.
     * @param {LeadEventUpdateManyAndReturnArgs} args - Arguments to update many LeadEvents.
     * @example
     * // Update many LeadEvents
     * const leadEvent = await prisma.leadEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadEvents and only return the `id`
     * const leadEventWithIdOnly = await prisma.leadEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeadEventUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadEvent.
     * @param {LeadEventUpsertArgs} args - Arguments to update or create a LeadEvent.
     * @example
     * // Update or create a LeadEvent
     * const leadEvent = await prisma.leadEvent.upsert({
     *   create: {
     *     // ... data to create a LeadEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadEvent we want to update
     *   }
     * })
     */
    upsert<T extends LeadEventUpsertArgs>(args: SelectSubset<T, LeadEventUpsertArgs<ExtArgs>>): Prisma__LeadEventClient<$Result.GetResult<Prisma.$LeadEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventCountArgs} args - Arguments to filter LeadEvents to count.
     * @example
     * // Count the number of LeadEvents
     * const count = await prisma.leadEvent.count({
     *   where: {
     *     // ... the filter for the LeadEvents we want to count
     *   }
     * })
    **/
    count<T extends LeadEventCountArgs>(
      args?: Subset<T, LeadEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeadEventAggregateArgs>(args: Subset<T, LeadEventAggregateArgs>): Prisma.PrismaPromise<GetLeadEventAggregateType<T>>

    /**
     * Group by LeadEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadEventGroupByArgs} args - Group by arguments.
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
      T extends LeadEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadEventGroupByArgs['orderBy'] }
        : { orderBy?: LeadEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeadEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadEvent model
   */
  readonly fields: LeadEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends LeadEvent$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, LeadEvent$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LeadEvent model
   */
  interface LeadEventFieldRefs {
    readonly id: FieldRef<"LeadEvent", 'String'>
    readonly vehicleId: FieldRef<"LeadEvent", 'String'>
    readonly storeId: FieldRef<"LeadEvent", 'String'>
    readonly type: FieldRef<"LeadEvent", 'String'>
    readonly contactName: FieldRef<"LeadEvent", 'String'>
    readonly contactPhone: FieldRef<"LeadEvent", 'String'>
    readonly attendanceStatus: FieldRef<"LeadEvent", 'AttendanceStatus'>
    readonly assignedTo: FieldRef<"LeadEvent", 'String'>
    readonly createdAt: FieldRef<"LeadEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadEvent findUnique
   */
  export type LeadEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadEvent to fetch.
     */
    where: LeadEventWhereUniqueInput
  }

  /**
   * LeadEvent findUniqueOrThrow
   */
  export type LeadEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadEvent to fetch.
     */
    where: LeadEventWhereUniqueInput
  }

  /**
   * LeadEvent findFirst
   */
  export type LeadEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadEvent to fetch.
     */
    where?: LeadEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadEvents to fetch.
     */
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadEvents.
     */
    cursor?: LeadEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadEvents.
     */
    distinct?: LeadEventScalarFieldEnum | LeadEventScalarFieldEnum[]
  }

  /**
   * LeadEvent findFirstOrThrow
   */
  export type LeadEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadEvent to fetch.
     */
    where?: LeadEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadEvents to fetch.
     */
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadEvents.
     */
    cursor?: LeadEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadEvents.
     */
    distinct?: LeadEventScalarFieldEnum | LeadEventScalarFieldEnum[]
  }

  /**
   * LeadEvent findMany
   */
  export type LeadEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadEvents to fetch.
     */
    where?: LeadEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadEvents to fetch.
     */
    orderBy?: LeadEventOrderByWithRelationInput | LeadEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadEvents.
     */
    cursor?: LeadEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadEvents.
     */
    distinct?: LeadEventScalarFieldEnum | LeadEventScalarFieldEnum[]
  }

  /**
   * LeadEvent create
   */
  export type LeadEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadEvent.
     */
    data: XOR<LeadEventCreateInput, LeadEventUncheckedCreateInput>
  }

  /**
   * LeadEvent createMany
   */
  export type LeadEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadEvents.
     */
    data: LeadEventCreateManyInput | LeadEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadEvent createManyAndReturn
   */
  export type LeadEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * The data used to create many LeadEvents.
     */
    data: LeadEventCreateManyInput | LeadEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadEvent update
   */
  export type LeadEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadEvent.
     */
    data: XOR<LeadEventUpdateInput, LeadEventUncheckedUpdateInput>
    /**
     * Choose, which LeadEvent to update.
     */
    where: LeadEventWhereUniqueInput
  }

  /**
   * LeadEvent updateMany
   */
  export type LeadEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadEvents.
     */
    data: XOR<LeadEventUpdateManyMutationInput, LeadEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadEvents to update
     */
    where?: LeadEventWhereInput
    /**
     * Limit how many LeadEvents to update.
     */
    limit?: number
  }

  /**
   * LeadEvent updateManyAndReturn
   */
  export type LeadEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * The data used to update LeadEvents.
     */
    data: XOR<LeadEventUpdateManyMutationInput, LeadEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadEvents to update
     */
    where?: LeadEventWhereInput
    /**
     * Limit how many LeadEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadEvent upsert
   */
  export type LeadEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadEvent to update in case it exists.
     */
    where: LeadEventWhereUniqueInput
    /**
     * In case the LeadEvent found by the `where` argument doesn't exist, create a new LeadEvent with this data.
     */
    create: XOR<LeadEventCreateInput, LeadEventUncheckedCreateInput>
    /**
     * In case the LeadEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadEventUpdateInput, LeadEventUncheckedUpdateInput>
  }

  /**
   * LeadEvent delete
   */
  export type LeadEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
    /**
     * Filter which LeadEvent to delete.
     */
    where: LeadEventWhereUniqueInput
  }

  /**
   * LeadEvent deleteMany
   */
  export type LeadEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadEvents to delete
     */
    where?: LeadEventWhereInput
    /**
     * Limit how many LeadEvents to delete.
     */
    limit?: number
  }

  /**
   * LeadEvent.vehicle
   */
  export type LeadEvent$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * LeadEvent without action
   */
  export type LeadEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadEvent
     */
    select?: LeadEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadEvent
     */
    omit?: LeadEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadEventInclude<ExtArgs> | null
  }


  /**
   * Model VehicleImage
   */

  export type AggregateVehicleImage = {
    _count: VehicleImageCountAggregateOutputType | null
    _avg: VehicleImageAvgAggregateOutputType | null
    _sum: VehicleImageSumAggregateOutputType | null
    _min: VehicleImageMinAggregateOutputType | null
    _max: VehicleImageMaxAggregateOutputType | null
  }

  export type VehicleImageAvgAggregateOutputType = {
    order: number | null
  }

  export type VehicleImageSumAggregateOutputType = {
    order: number | null
  }

  export type VehicleImageMinAggregateOutputType = {
    id: string | null
    url: string | null
    isCover: boolean | null
    order: number | null
    vehicleId: string | null
  }

  export type VehicleImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
    isCover: boolean | null
    order: number | null
    vehicleId: string | null
  }

  export type VehicleImageCountAggregateOutputType = {
    id: number
    url: number
    isCover: number
    order: number
    vehicleId: number
    _all: number
  }


  export type VehicleImageAvgAggregateInputType = {
    order?: true
  }

  export type VehicleImageSumAggregateInputType = {
    order?: true
  }

  export type VehicleImageMinAggregateInputType = {
    id?: true
    url?: true
    isCover?: true
    order?: true
    vehicleId?: true
  }

  export type VehicleImageMaxAggregateInputType = {
    id?: true
    url?: true
    isCover?: true
    order?: true
    vehicleId?: true
  }

  export type VehicleImageCountAggregateInputType = {
    id?: true
    url?: true
    isCover?: true
    order?: true
    vehicleId?: true
    _all?: true
  }

  export type VehicleImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleImage to aggregate.
     */
    where?: VehicleImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleImages to fetch.
     */
    orderBy?: VehicleImageOrderByWithRelationInput | VehicleImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleImages
    **/
    _count?: true | VehicleImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleImageMaxAggregateInputType
  }

  export type GetVehicleImageAggregateType<T extends VehicleImageAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleImage[P]>
      : GetScalarType<T[P], AggregateVehicleImage[P]>
  }




  export type VehicleImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleImageWhereInput
    orderBy?: VehicleImageOrderByWithAggregationInput | VehicleImageOrderByWithAggregationInput[]
    by: VehicleImageScalarFieldEnum[] | VehicleImageScalarFieldEnum
    having?: VehicleImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleImageCountAggregateInputType | true
    _avg?: VehicleImageAvgAggregateInputType
    _sum?: VehicleImageSumAggregateInputType
    _min?: VehicleImageMinAggregateInputType
    _max?: VehicleImageMaxAggregateInputType
  }

  export type VehicleImageGroupByOutputType = {
    id: string
    url: string
    isCover: boolean
    order: number
    vehicleId: string
    _count: VehicleImageCountAggregateOutputType | null
    _avg: VehicleImageAvgAggregateOutputType | null
    _sum: VehicleImageSumAggregateOutputType | null
    _min: VehicleImageMinAggregateOutputType | null
    _max: VehicleImageMaxAggregateOutputType | null
  }

  type GetVehicleImageGroupByPayload<T extends VehicleImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleImageGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleImageGroupByOutputType[P]>
        }
      >
    >


  export type VehicleImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    isCover?: boolean
    order?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleImage"]>

  export type VehicleImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    isCover?: boolean
    order?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleImage"]>

  export type VehicleImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    isCover?: boolean
    order?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleImage"]>

  export type VehicleImageSelectScalar = {
    id?: boolean
    url?: boolean
    isCover?: boolean
    order?: boolean
    vehicleId?: boolean
  }

  export type VehicleImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "isCover" | "order" | "vehicleId", ExtArgs["result"]["vehicleImage"]>
  export type VehicleImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleImage"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      isCover: boolean
      order: number
      vehicleId: string
    }, ExtArgs["result"]["vehicleImage"]>
    composites: {}
  }

  type VehicleImageGetPayload<S extends boolean | null | undefined | VehicleImageDefaultArgs> = $Result.GetResult<Prisma.$VehicleImagePayload, S>

  type VehicleImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleImageCountAggregateInputType | true
    }

  export interface VehicleImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleImage'], meta: { name: 'VehicleImage' } }
    /**
     * Find zero or one VehicleImage that matches the filter.
     * @param {VehicleImageFindUniqueArgs} args - Arguments to find a VehicleImage
     * @example
     * // Get one VehicleImage
     * const vehicleImage = await prisma.vehicleImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleImageFindUniqueArgs>(args: SelectSubset<T, VehicleImageFindUniqueArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleImageFindUniqueOrThrowArgs} args - Arguments to find a VehicleImage
     * @example
     * // Get one VehicleImage
     * const vehicleImage = await prisma.vehicleImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleImageFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageFindFirstArgs} args - Arguments to find a VehicleImage
     * @example
     * // Get one VehicleImage
     * const vehicleImage = await prisma.vehicleImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleImageFindFirstArgs>(args?: SelectSubset<T, VehicleImageFindFirstArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageFindFirstOrThrowArgs} args - Arguments to find a VehicleImage
     * @example
     * // Get one VehicleImage
     * const vehicleImage = await prisma.vehicleImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleImageFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleImages
     * const vehicleImages = await prisma.vehicleImage.findMany()
     * 
     * // Get first 10 VehicleImages
     * const vehicleImages = await prisma.vehicleImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleImageWithIdOnly = await prisma.vehicleImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleImageFindManyArgs>(args?: SelectSubset<T, VehicleImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleImage.
     * @param {VehicleImageCreateArgs} args - Arguments to create a VehicleImage.
     * @example
     * // Create one VehicleImage
     * const VehicleImage = await prisma.vehicleImage.create({
     *   data: {
     *     // ... data to create a VehicleImage
     *   }
     * })
     * 
     */
    create<T extends VehicleImageCreateArgs>(args: SelectSubset<T, VehicleImageCreateArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleImages.
     * @param {VehicleImageCreateManyArgs} args - Arguments to create many VehicleImages.
     * @example
     * // Create many VehicleImages
     * const vehicleImage = await prisma.vehicleImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleImageCreateManyArgs>(args?: SelectSubset<T, VehicleImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleImages and returns the data saved in the database.
     * @param {VehicleImageCreateManyAndReturnArgs} args - Arguments to create many VehicleImages.
     * @example
     * // Create many VehicleImages
     * const vehicleImage = await prisma.vehicleImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleImages and only return the `id`
     * const vehicleImageWithIdOnly = await prisma.vehicleImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleImageCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleImage.
     * @param {VehicleImageDeleteArgs} args - Arguments to delete one VehicleImage.
     * @example
     * // Delete one VehicleImage
     * const VehicleImage = await prisma.vehicleImage.delete({
     *   where: {
     *     // ... filter to delete one VehicleImage
     *   }
     * })
     * 
     */
    delete<T extends VehicleImageDeleteArgs>(args: SelectSubset<T, VehicleImageDeleteArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleImage.
     * @param {VehicleImageUpdateArgs} args - Arguments to update one VehicleImage.
     * @example
     * // Update one VehicleImage
     * const vehicleImage = await prisma.vehicleImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleImageUpdateArgs>(args: SelectSubset<T, VehicleImageUpdateArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleImages.
     * @param {VehicleImageDeleteManyArgs} args - Arguments to filter VehicleImages to delete.
     * @example
     * // Delete a few VehicleImages
     * const { count } = await prisma.vehicleImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleImageDeleteManyArgs>(args?: SelectSubset<T, VehicleImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleImages
     * const vehicleImage = await prisma.vehicleImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleImageUpdateManyArgs>(args: SelectSubset<T, VehicleImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleImages and returns the data updated in the database.
     * @param {VehicleImageUpdateManyAndReturnArgs} args - Arguments to update many VehicleImages.
     * @example
     * // Update many VehicleImages
     * const vehicleImage = await prisma.vehicleImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleImages and only return the `id`
     * const vehicleImageWithIdOnly = await prisma.vehicleImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleImageUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleImage.
     * @param {VehicleImageUpsertArgs} args - Arguments to update or create a VehicleImage.
     * @example
     * // Update or create a VehicleImage
     * const vehicleImage = await prisma.vehicleImage.upsert({
     *   create: {
     *     // ... data to create a VehicleImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleImage we want to update
     *   }
     * })
     */
    upsert<T extends VehicleImageUpsertArgs>(args: SelectSubset<T, VehicleImageUpsertArgs<ExtArgs>>): Prisma__VehicleImageClient<$Result.GetResult<Prisma.$VehicleImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageCountArgs} args - Arguments to filter VehicleImages to count.
     * @example
     * // Count the number of VehicleImages
     * const count = await prisma.vehicleImage.count({
     *   where: {
     *     // ... the filter for the VehicleImages we want to count
     *   }
     * })
    **/
    count<T extends VehicleImageCountArgs>(
      args?: Subset<T, VehicleImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleImageAggregateArgs>(args: Subset<T, VehicleImageAggregateArgs>): Prisma.PrismaPromise<GetVehicleImageAggregateType<T>>

    /**
     * Group by VehicleImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleImageGroupByArgs} args - Group by arguments.
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
      T extends VehicleImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleImageGroupByArgs['orderBy'] }
        : { orderBy?: VehicleImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleImage model
   */
  readonly fields: VehicleImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the VehicleImage model
   */
  interface VehicleImageFieldRefs {
    readonly id: FieldRef<"VehicleImage", 'String'>
    readonly url: FieldRef<"VehicleImage", 'String'>
    readonly isCover: FieldRef<"VehicleImage", 'Boolean'>
    readonly order: FieldRef<"VehicleImage", 'Int'>
    readonly vehicleId: FieldRef<"VehicleImage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VehicleImage findUnique
   */
  export type VehicleImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter, which VehicleImage to fetch.
     */
    where: VehicleImageWhereUniqueInput
  }

  /**
   * VehicleImage findUniqueOrThrow
   */
  export type VehicleImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter, which VehicleImage to fetch.
     */
    where: VehicleImageWhereUniqueInput
  }

  /**
   * VehicleImage findFirst
   */
  export type VehicleImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter, which VehicleImage to fetch.
     */
    where?: VehicleImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleImages to fetch.
     */
    orderBy?: VehicleImageOrderByWithRelationInput | VehicleImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleImages.
     */
    cursor?: VehicleImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleImages.
     */
    distinct?: VehicleImageScalarFieldEnum | VehicleImageScalarFieldEnum[]
  }

  /**
   * VehicleImage findFirstOrThrow
   */
  export type VehicleImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter, which VehicleImage to fetch.
     */
    where?: VehicleImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleImages to fetch.
     */
    orderBy?: VehicleImageOrderByWithRelationInput | VehicleImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleImages.
     */
    cursor?: VehicleImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleImages.
     */
    distinct?: VehicleImageScalarFieldEnum | VehicleImageScalarFieldEnum[]
  }

  /**
   * VehicleImage findMany
   */
  export type VehicleImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter, which VehicleImages to fetch.
     */
    where?: VehicleImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleImages to fetch.
     */
    orderBy?: VehicleImageOrderByWithRelationInput | VehicleImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleImages.
     */
    cursor?: VehicleImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleImages.
     */
    distinct?: VehicleImageScalarFieldEnum | VehicleImageScalarFieldEnum[]
  }

  /**
   * VehicleImage create
   */
  export type VehicleImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleImage.
     */
    data: XOR<VehicleImageCreateInput, VehicleImageUncheckedCreateInput>
  }

  /**
   * VehicleImage createMany
   */
  export type VehicleImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleImages.
     */
    data: VehicleImageCreateManyInput | VehicleImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleImage createManyAndReturn
   */
  export type VehicleImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleImages.
     */
    data: VehicleImageCreateManyInput | VehicleImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleImage update
   */
  export type VehicleImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleImage.
     */
    data: XOR<VehicleImageUpdateInput, VehicleImageUncheckedUpdateInput>
    /**
     * Choose, which VehicleImage to update.
     */
    where: VehicleImageWhereUniqueInput
  }

  /**
   * VehicleImage updateMany
   */
  export type VehicleImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleImages.
     */
    data: XOR<VehicleImageUpdateManyMutationInput, VehicleImageUncheckedUpdateManyInput>
    /**
     * Filter which VehicleImages to update
     */
    where?: VehicleImageWhereInput
    /**
     * Limit how many VehicleImages to update.
     */
    limit?: number
  }

  /**
   * VehicleImage updateManyAndReturn
   */
  export type VehicleImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * The data used to update VehicleImages.
     */
    data: XOR<VehicleImageUpdateManyMutationInput, VehicleImageUncheckedUpdateManyInput>
    /**
     * Filter which VehicleImages to update
     */
    where?: VehicleImageWhereInput
    /**
     * Limit how many VehicleImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleImage upsert
   */
  export type VehicleImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleImage to update in case it exists.
     */
    where: VehicleImageWhereUniqueInput
    /**
     * In case the VehicleImage found by the `where` argument doesn't exist, create a new VehicleImage with this data.
     */
    create: XOR<VehicleImageCreateInput, VehicleImageUncheckedCreateInput>
    /**
     * In case the VehicleImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleImageUpdateInput, VehicleImageUncheckedUpdateInput>
  }

  /**
   * VehicleImage delete
   */
  export type VehicleImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
    /**
     * Filter which VehicleImage to delete.
     */
    where: VehicleImageWhereUniqueInput
  }

  /**
   * VehicleImage deleteMany
   */
  export type VehicleImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleImages to delete
     */
    where?: VehicleImageWhereInput
    /**
     * Limit how many VehicleImages to delete.
     */
    limit?: number
  }

  /**
   * VehicleImage without action
   */
  export type VehicleImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleImage
     */
    select?: VehicleImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleImage
     */
    omit?: VehicleImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleImageInclude<ExtArgs> | null
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


  export const StoreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    subdomain: 'subdomain',
    customDomain: 'customDomain',
    logoUrl: 'logoUrl',
    primaryColor: 'primaryColor',
    whatsapp: 'whatsapp',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    storeId: 'storeId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StoreRequestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    whatsapp: 'whatsapp',
    storeName: 'storeName',
    subdomain: 'subdomain',
    message: 'message',
    status: 'status',
    rejectedNote: 'rejectedNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StoreRequestScalarFieldEnum = (typeof StoreRequestScalarFieldEnum)[keyof typeof StoreRequestScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    make: 'make',
    model: 'model',
    year: 'year',
    price: 'price',
    km: 'km',
    color: 'color',
    fuelType: 'fuelType',
    transmission: 'transmission',
    description: 'description',
    featured: 'featured',
    status: 'status',
    storeId: 'storeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const LeadEventScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    storeId: 'storeId',
    type: 'type',
    contactName: 'contactName',
    contactPhone: 'contactPhone',
    attendanceStatus: 'attendanceStatus',
    assignedTo: 'assignedTo',
    createdAt: 'createdAt'
  };

  export type LeadEventScalarFieldEnum = (typeof LeadEventScalarFieldEnum)[keyof typeof LeadEventScalarFieldEnum]


  export const VehicleImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    isCover: 'isCover',
    order: 'order',
    vehicleId: 'vehicleId'
  };

  export type VehicleImageScalarFieldEnum = (typeof VehicleImageScalarFieldEnum)[keyof typeof VehicleImageScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'StoreStatus'
   */
  export type EnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus'>
    


  /**
   * Reference to a field of type 'StoreStatus[]'
   */
  export type ListEnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'StoreRequestStatus'
   */
  export type EnumStoreRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreRequestStatus'>
    


  /**
   * Reference to a field of type 'StoreRequestStatus[]'
   */
  export type ListEnumStoreRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreRequestStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'AttendanceStatus'
   */
  export type EnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus'>
    


  /**
   * Reference to a field of type 'AttendanceStatus[]'
   */
  export type ListEnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type StoreWhereInput = {
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    id?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    slug?: StringFilter<"Store"> | string
    subdomain?: StringFilter<"Store"> | string
    customDomain?: StringNullableFilter<"Store"> | string | null
    logoUrl?: StringNullableFilter<"Store"> | string | null
    primaryColor?: StringFilter<"Store"> | string
    whatsapp?: StringFilter<"Store"> | string
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeFilter<"Store"> | Date | string
    vehicles?: VehicleListRelationFilter
    users?: UserListRelationFilter
    leadEvents?: LeadEventListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    whatsapp?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    vehicles?: VehicleOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
    leadEvents?: LeadEventOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    subdomain?: string
    customDomain?: string
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    name?: StringFilter<"Store"> | string
    logoUrl?: StringNullableFilter<"Store"> | string | null
    primaryColor?: StringFilter<"Store"> | string
    whatsapp?: StringFilter<"Store"> | string
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeFilter<"Store"> | Date | string
    vehicles?: VehicleListRelationFilter
    users?: UserListRelationFilter
    leadEvents?: LeadEventListRelationFilter
  }, "id" | "slug" | "subdomain" | "customDomain">

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrder
    whatsapp?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: StoreCountOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    OR?: StoreScalarWhereWithAggregatesInput[]
    NOT?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Store"> | string
    name?: StringWithAggregatesFilter<"Store"> | string
    slug?: StringWithAggregatesFilter<"Store"> | string
    subdomain?: StringWithAggregatesFilter<"Store"> | string
    customDomain?: StringNullableWithAggregatesFilter<"Store"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Store"> | string | null
    primaryColor?: StringWithAggregatesFilter<"Store"> | string
    whatsapp?: StringWithAggregatesFilter<"Store"> | string
    status?: EnumStoreStatusWithAggregatesFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    storeId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    store?: XOR<StoreNullableScalarRelationFilter, StoreWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    storeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    store?: StoreOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    storeId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    store?: XOR<StoreNullableScalarRelationFilter, StoreWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    storeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    storeId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StoreRequestWhereInput = {
    AND?: StoreRequestWhereInput | StoreRequestWhereInput[]
    OR?: StoreRequestWhereInput[]
    NOT?: StoreRequestWhereInput | StoreRequestWhereInput[]
    id?: StringFilter<"StoreRequest"> | string
    name?: StringFilter<"StoreRequest"> | string
    email?: StringFilter<"StoreRequest"> | string
    whatsapp?: StringFilter<"StoreRequest"> | string
    storeName?: StringFilter<"StoreRequest"> | string
    subdomain?: StringFilter<"StoreRequest"> | string
    message?: StringNullableFilter<"StoreRequest"> | string | null
    status?: EnumStoreRequestStatusFilter<"StoreRequest"> | $Enums.StoreRequestStatus
    rejectedNote?: StringNullableFilter<"StoreRequest"> | string | null
    createdAt?: DateTimeFilter<"StoreRequest"> | Date | string
    updatedAt?: DateTimeFilter<"StoreRequest"> | Date | string
  }

  export type StoreRequestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    whatsapp?: SortOrder
    storeName?: SortOrder
    subdomain?: SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectedNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StoreRequestWhereInput | StoreRequestWhereInput[]
    OR?: StoreRequestWhereInput[]
    NOT?: StoreRequestWhereInput | StoreRequestWhereInput[]
    name?: StringFilter<"StoreRequest"> | string
    email?: StringFilter<"StoreRequest"> | string
    whatsapp?: StringFilter<"StoreRequest"> | string
    storeName?: StringFilter<"StoreRequest"> | string
    subdomain?: StringFilter<"StoreRequest"> | string
    message?: StringNullableFilter<"StoreRequest"> | string | null
    status?: EnumStoreRequestStatusFilter<"StoreRequest"> | $Enums.StoreRequestStatus
    rejectedNote?: StringNullableFilter<"StoreRequest"> | string | null
    createdAt?: DateTimeFilter<"StoreRequest"> | Date | string
    updatedAt?: DateTimeFilter<"StoreRequest"> | Date | string
  }, "id">

  export type StoreRequestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    whatsapp?: SortOrder
    storeName?: SortOrder
    subdomain?: SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectedNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StoreRequestCountOrderByAggregateInput
    _max?: StoreRequestMaxOrderByAggregateInput
    _min?: StoreRequestMinOrderByAggregateInput
  }

  export type StoreRequestScalarWhereWithAggregatesInput = {
    AND?: StoreRequestScalarWhereWithAggregatesInput | StoreRequestScalarWhereWithAggregatesInput[]
    OR?: StoreRequestScalarWhereWithAggregatesInput[]
    NOT?: StoreRequestScalarWhereWithAggregatesInput | StoreRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StoreRequest"> | string
    name?: StringWithAggregatesFilter<"StoreRequest"> | string
    email?: StringWithAggregatesFilter<"StoreRequest"> | string
    whatsapp?: StringWithAggregatesFilter<"StoreRequest"> | string
    storeName?: StringWithAggregatesFilter<"StoreRequest"> | string
    subdomain?: StringWithAggregatesFilter<"StoreRequest"> | string
    message?: StringNullableWithAggregatesFilter<"StoreRequest"> | string | null
    status?: EnumStoreRequestStatusWithAggregatesFilter<"StoreRequest"> | $Enums.StoreRequestStatus
    rejectedNote?: StringNullableWithAggregatesFilter<"StoreRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StoreRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StoreRequest"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    price?: FloatFilter<"Vehicle"> | number
    km?: IntFilter<"Vehicle"> | number
    color?: StringNullableFilter<"Vehicle"> | string | null
    fuelType?: StringNullableFilter<"Vehicle"> | string | null
    transmission?: StringNullableFilter<"Vehicle"> | string | null
    description?: StringNullableFilter<"Vehicle"> | string | null
    featured?: BoolFilter<"Vehicle"> | boolean
    status?: EnumStatusFilter<"Vehicle"> | $Enums.Status
    storeId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    images?: VehicleImageListRelationFilter
    leadEvents?: LeadEventListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
    color?: SortOrderInput | SortOrder
    fuelType?: SortOrderInput | SortOrder
    transmission?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    featured?: SortOrder
    status?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    store?: StoreOrderByWithRelationInput
    images?: VehicleImageOrderByRelationAggregateInput
    leadEvents?: LeadEventOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    price?: FloatFilter<"Vehicle"> | number
    km?: IntFilter<"Vehicle"> | number
    color?: StringNullableFilter<"Vehicle"> | string | null
    fuelType?: StringNullableFilter<"Vehicle"> | string | null
    transmission?: StringNullableFilter<"Vehicle"> | string | null
    description?: StringNullableFilter<"Vehicle"> | string | null
    featured?: BoolFilter<"Vehicle"> | boolean
    status?: EnumStatusFilter<"Vehicle"> | $Enums.Status
    storeId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    images?: VehicleImageListRelationFilter
    leadEvents?: LeadEventListRelationFilter
  }, "id">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
    color?: SortOrderInput | SortOrder
    fuelType?: SortOrderInput | SortOrder
    transmission?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    featured?: SortOrder
    status?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    make?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    year?: IntWithAggregatesFilter<"Vehicle"> | number
    price?: FloatWithAggregatesFilter<"Vehicle"> | number
    km?: IntWithAggregatesFilter<"Vehicle"> | number
    color?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    fuelType?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    transmission?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    description?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    featured?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    status?: EnumStatusWithAggregatesFilter<"Vehicle"> | $Enums.Status
    storeId?: StringWithAggregatesFilter<"Vehicle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type LeadEventWhereInput = {
    AND?: LeadEventWhereInput | LeadEventWhereInput[]
    OR?: LeadEventWhereInput[]
    NOT?: LeadEventWhereInput | LeadEventWhereInput[]
    id?: StringFilter<"LeadEvent"> | string
    vehicleId?: StringNullableFilter<"LeadEvent"> | string | null
    storeId?: StringFilter<"LeadEvent"> | string
    type?: StringFilter<"LeadEvent"> | string
    contactName?: StringNullableFilter<"LeadEvent"> | string | null
    contactPhone?: StringNullableFilter<"LeadEvent"> | string | null
    attendanceStatus?: EnumAttendanceStatusFilter<"LeadEvent"> | $Enums.AttendanceStatus
    assignedTo?: StringNullableFilter<"LeadEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadEvent"> | Date | string
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type LeadEventOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    type?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    attendanceStatus?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type LeadEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadEventWhereInput | LeadEventWhereInput[]
    OR?: LeadEventWhereInput[]
    NOT?: LeadEventWhereInput | LeadEventWhereInput[]
    vehicleId?: StringNullableFilter<"LeadEvent"> | string | null
    storeId?: StringFilter<"LeadEvent"> | string
    type?: StringFilter<"LeadEvent"> | string
    contactName?: StringNullableFilter<"LeadEvent"> | string | null
    contactPhone?: StringNullableFilter<"LeadEvent"> | string | null
    attendanceStatus?: EnumAttendanceStatusFilter<"LeadEvent"> | $Enums.AttendanceStatus
    assignedTo?: StringNullableFilter<"LeadEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadEvent"> | Date | string
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id">

  export type LeadEventOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    type?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    attendanceStatus?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LeadEventCountOrderByAggregateInput
    _max?: LeadEventMaxOrderByAggregateInput
    _min?: LeadEventMinOrderByAggregateInput
  }

  export type LeadEventScalarWhereWithAggregatesInput = {
    AND?: LeadEventScalarWhereWithAggregatesInput | LeadEventScalarWhereWithAggregatesInput[]
    OR?: LeadEventScalarWhereWithAggregatesInput[]
    NOT?: LeadEventScalarWhereWithAggregatesInput | LeadEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadEvent"> | string
    vehicleId?: StringNullableWithAggregatesFilter<"LeadEvent"> | string | null
    storeId?: StringWithAggregatesFilter<"LeadEvent"> | string
    type?: StringWithAggregatesFilter<"LeadEvent"> | string
    contactName?: StringNullableWithAggregatesFilter<"LeadEvent"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"LeadEvent"> | string | null
    attendanceStatus?: EnumAttendanceStatusWithAggregatesFilter<"LeadEvent"> | $Enums.AttendanceStatus
    assignedTo?: StringNullableWithAggregatesFilter<"LeadEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeadEvent"> | Date | string
  }

  export type VehicleImageWhereInput = {
    AND?: VehicleImageWhereInput | VehicleImageWhereInput[]
    OR?: VehicleImageWhereInput[]
    NOT?: VehicleImageWhereInput | VehicleImageWhereInput[]
    id?: StringFilter<"VehicleImage"> | string
    url?: StringFilter<"VehicleImage"> | string
    isCover?: BoolFilter<"VehicleImage"> | boolean
    order?: IntFilter<"VehicleImage"> | number
    vehicleId?: StringFilter<"VehicleImage"> | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type VehicleImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    isCover?: SortOrder
    order?: SortOrder
    vehicleId?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type VehicleImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleImageWhereInput | VehicleImageWhereInput[]
    OR?: VehicleImageWhereInput[]
    NOT?: VehicleImageWhereInput | VehicleImageWhereInput[]
    url?: StringFilter<"VehicleImage"> | string
    isCover?: BoolFilter<"VehicleImage"> | boolean
    order?: IntFilter<"VehicleImage"> | number
    vehicleId?: StringFilter<"VehicleImage"> | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id">

  export type VehicleImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    isCover?: SortOrder
    order?: SortOrder
    vehicleId?: SortOrder
    _count?: VehicleImageCountOrderByAggregateInput
    _avg?: VehicleImageAvgOrderByAggregateInput
    _max?: VehicleImageMaxOrderByAggregateInput
    _min?: VehicleImageMinOrderByAggregateInput
    _sum?: VehicleImageSumOrderByAggregateInput
  }

  export type VehicleImageScalarWhereWithAggregatesInput = {
    AND?: VehicleImageScalarWhereWithAggregatesInput | VehicleImageScalarWhereWithAggregatesInput[]
    OR?: VehicleImageScalarWhereWithAggregatesInput[]
    NOT?: VehicleImageScalarWhereWithAggregatesInput | VehicleImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleImage"> | string
    url?: StringWithAggregatesFilter<"VehicleImage"> | string
    isCover?: BoolWithAggregatesFilter<"VehicleImage"> | boolean
    order?: IntWithAggregatesFilter<"VehicleImage"> | number
    vehicleId?: StringWithAggregatesFilter<"VehicleImage"> | string
  }

  export type StoreCreateInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutStoreInput
    users?: UserCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutStoreInput
    users?: UserUncheckedCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutStoreNestedInput
    users?: UserUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutStoreNestedInput
    users?: UserUncheckedUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
  }

  export type StoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    store?: StoreCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    storeId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    storeId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreRequestCreateInput = {
    id?: string
    name: string
    email: string
    whatsapp: string
    storeName: string
    subdomain: string
    message?: string | null
    status?: $Enums.StoreRequestStatus
    rejectedNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreRequestUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    whatsapp: string
    storeName: string
    subdomain: string
    message?: string | null
    status?: $Enums.StoreRequestStatus
    rejectedNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreRequestStatusFieldUpdateOperationsInput | $Enums.StoreRequestStatus
    rejectedNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreRequestStatusFieldUpdateOperationsInput | $Enums.StoreRequestStatus
    rejectedNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreRequestCreateManyInput = {
    id?: string
    name: string
    email: string
    whatsapp: string
    storeName: string
    subdomain: string
    message?: string | null
    status?: $Enums.StoreRequestStatus
    rejectedNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreRequestStatusFieldUpdateOperationsInput | $Enums.StoreRequestStatus
    rejectedNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreRequestStatusFieldUpdateOperationsInput | $Enums.StoreRequestStatus
    rejectedNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    store: StoreCreateNestedOneWithoutVehiclesInput
    images?: VehicleImageCreateNestedManyWithoutVehicleInput
    leadEvents?: LeadEventCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    storeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: VehicleImageUncheckedCreateNestedManyWithoutVehicleInput
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutVehiclesNestedInput
    images?: VehicleImageUpdateManyWithoutVehicleNestedInput
    leadEvents?: LeadEventUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: VehicleImageUncheckedUpdateManyWithoutVehicleNestedInput
    leadEvents?: LeadEventUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    storeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventCreateInput = {
    id?: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
    vehicle?: VehicleCreateNestedOneWithoutLeadEventsInput
    store: StoreCreateNestedOneWithoutLeadEventsInput
  }

  export type LeadEventUncheckedCreateInput = {
    id?: string
    vehicleId?: string | null
    storeId: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type LeadEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneWithoutLeadEventsNestedInput
    store?: StoreUpdateOneRequiredWithoutLeadEventsNestedInput
  }

  export type LeadEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventCreateManyInput = {
    id?: string
    vehicleId?: string | null
    storeId: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type LeadEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleImageCreateInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
    vehicle: VehicleCreateNestedOneWithoutImagesInput
  }

  export type VehicleImageUncheckedCreateInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
    vehicleId: string
  }

  export type VehicleImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    vehicle?: VehicleUpdateOneRequiredWithoutImagesNestedInput
  }

  export type VehicleImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    vehicleId?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleImageCreateManyInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
    vehicleId: string
  }

  export type VehicleImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    vehicleId?: StringFieldUpdateOperationsInput | string
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

  export type EnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
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

  export type VehicleListRelationFilter = {
    every?: VehicleWhereInput
    some?: VehicleWhereInput
    none?: VehicleWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type LeadEventListRelationFilter = {
    every?: LeadEventWhereInput
    some?: LeadEventWhereInput
    none?: LeadEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    whatsapp?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    whatsapp?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    whatsapp?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type EnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StoreNullableScalarRelationFilter = {
    is?: StoreWhereInput | null
    isNot?: StoreWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumStoreRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreRequestStatus | EnumStoreRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreRequestStatusFilter<$PrismaModel> | $Enums.StoreRequestStatus
  }

  export type StoreRequestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    whatsapp?: SortOrder
    storeName?: SortOrder
    subdomain?: SortOrder
    message?: SortOrder
    status?: SortOrder
    rejectedNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    whatsapp?: SortOrder
    storeName?: SortOrder
    subdomain?: SortOrder
    message?: SortOrder
    status?: SortOrder
    rejectedNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreRequestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    whatsapp?: SortOrder
    storeName?: SortOrder
    subdomain?: SortOrder
    message?: SortOrder
    status?: SortOrder
    rejectedNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStoreRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreRequestStatus | EnumStoreRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreRequestStatusFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type StoreScalarRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type VehicleImageListRelationFilter = {
    every?: VehicleImageWhereInput
    some?: VehicleImageWhereInput
    none?: VehicleImageWhereInput
  }

  export type VehicleImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
    color?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    description?: SortOrder
    featured?: SortOrder
    status?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
    color?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    description?: SortOrder
    featured?: SortOrder
    status?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
    color?: SortOrder
    fuelType?: SortOrder
    transmission?: SortOrder
    description?: SortOrder
    featured?: SortOrder
    status?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
    km?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type EnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type LeadEventCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    storeId?: SortOrder
    type?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    attendanceStatus?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadEventMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    storeId?: SortOrder
    type?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    attendanceStatus?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadEventMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    storeId?: SortOrder
    type?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    attendanceStatus?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type VehicleImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isCover?: SortOrder
    order?: SortOrder
    vehicleId?: SortOrder
  }

  export type VehicleImageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type VehicleImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isCover?: SortOrder
    order?: SortOrder
    vehicleId?: SortOrder
  }

  export type VehicleImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isCover?: SortOrder
    order?: SortOrder
    vehicleId?: SortOrder
  }

  export type VehicleImageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type VehicleCreateNestedManyWithoutStoreInput = {
    create?: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput> | VehicleCreateWithoutStoreInput[] | VehicleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutStoreInput | VehicleCreateOrConnectWithoutStoreInput[]
    createMany?: VehicleCreateManyStoreInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutStoreInput = {
    create?: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput> | UserCreateWithoutStoreInput[] | UserUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStoreInput | UserCreateOrConnectWithoutStoreInput[]
    createMany?: UserCreateManyStoreInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type LeadEventCreateNestedManyWithoutStoreInput = {
    create?: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput> | LeadEventCreateWithoutStoreInput[] | LeadEventUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutStoreInput | LeadEventCreateOrConnectWithoutStoreInput[]
    createMany?: LeadEventCreateManyStoreInputEnvelope
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput> | VehicleCreateWithoutStoreInput[] | VehicleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutStoreInput | VehicleCreateOrConnectWithoutStoreInput[]
    createMany?: VehicleCreateManyStoreInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput> | UserCreateWithoutStoreInput[] | UserUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStoreInput | UserCreateOrConnectWithoutStoreInput[]
    createMany?: UserCreateManyStoreInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type LeadEventUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput> | LeadEventCreateWithoutStoreInput[] | LeadEventUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutStoreInput | LeadEventCreateOrConnectWithoutStoreInput[]
    createMany?: LeadEventCreateManyStoreInputEnvelope
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumStoreStatusFieldUpdateOperationsInput = {
    set?: $Enums.StoreStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VehicleUpdateManyWithoutStoreNestedInput = {
    create?: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput> | VehicleCreateWithoutStoreInput[] | VehicleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutStoreInput | VehicleCreateOrConnectWithoutStoreInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutStoreInput | VehicleUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: VehicleCreateManyStoreInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutStoreInput | VehicleUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutStoreInput | VehicleUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type UserUpdateManyWithoutStoreNestedInput = {
    create?: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput> | UserCreateWithoutStoreInput[] | UserUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStoreInput | UserCreateOrConnectWithoutStoreInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutStoreInput | UserUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: UserCreateManyStoreInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutStoreInput | UserUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: UserUpdateManyWithWhereWithoutStoreInput | UserUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type LeadEventUpdateManyWithoutStoreNestedInput = {
    create?: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput> | LeadEventCreateWithoutStoreInput[] | LeadEventUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutStoreInput | LeadEventCreateOrConnectWithoutStoreInput[]
    upsert?: LeadEventUpsertWithWhereUniqueWithoutStoreInput | LeadEventUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: LeadEventCreateManyStoreInputEnvelope
    set?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    disconnect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    delete?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    update?: LeadEventUpdateWithWhereUniqueWithoutStoreInput | LeadEventUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: LeadEventUpdateManyWithWhereWithoutStoreInput | LeadEventUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput> | VehicleCreateWithoutStoreInput[] | VehicleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutStoreInput | VehicleCreateOrConnectWithoutStoreInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutStoreInput | VehicleUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: VehicleCreateManyStoreInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutStoreInput | VehicleUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutStoreInput | VehicleUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput> | UserCreateWithoutStoreInput[] | UserUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStoreInput | UserCreateOrConnectWithoutStoreInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutStoreInput | UserUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: UserCreateManyStoreInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutStoreInput | UserUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: UserUpdateManyWithWhereWithoutStoreInput | UserUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type LeadEventUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput> | LeadEventCreateWithoutStoreInput[] | LeadEventUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutStoreInput | LeadEventCreateOrConnectWithoutStoreInput[]
    upsert?: LeadEventUpsertWithWhereUniqueWithoutStoreInput | LeadEventUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: LeadEventCreateManyStoreInputEnvelope
    set?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    disconnect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    delete?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    update?: LeadEventUpdateWithWhereUniqueWithoutStoreInput | LeadEventUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: LeadEventUpdateManyWithWhereWithoutStoreInput | LeadEventUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
  }

  export type StoreCreateNestedOneWithoutUsersInput = {
    create?: XOR<StoreCreateWithoutUsersInput, StoreUncheckedCreateWithoutUsersInput>
    connectOrCreate?: StoreCreateOrConnectWithoutUsersInput
    connect?: StoreWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type StoreUpdateOneWithoutUsersNestedInput = {
    create?: XOR<StoreCreateWithoutUsersInput, StoreUncheckedCreateWithoutUsersInput>
    connectOrCreate?: StoreCreateOrConnectWithoutUsersInput
    upsert?: StoreUpsertWithoutUsersInput
    disconnect?: StoreWhereInput | boolean
    delete?: StoreWhereInput | boolean
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutUsersInput, StoreUpdateWithoutUsersInput>, StoreUncheckedUpdateWithoutUsersInput>
  }

  export type EnumStoreRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.StoreRequestStatus
  }

  export type StoreCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<StoreCreateWithoutVehiclesInput, StoreUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutVehiclesInput
    connect?: StoreWhereUniqueInput
  }

  export type VehicleImageCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput> | VehicleImageCreateWithoutVehicleInput[] | VehicleImageUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleImageCreateOrConnectWithoutVehicleInput | VehicleImageCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleImageCreateManyVehicleInputEnvelope
    connect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
  }

  export type LeadEventCreateNestedManyWithoutVehicleInput = {
    create?: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput> | LeadEventCreateWithoutVehicleInput[] | LeadEventUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutVehicleInput | LeadEventCreateOrConnectWithoutVehicleInput[]
    createMany?: LeadEventCreateManyVehicleInputEnvelope
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
  }

  export type VehicleImageUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput> | VehicleImageCreateWithoutVehicleInput[] | VehicleImageUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleImageCreateOrConnectWithoutVehicleInput | VehicleImageCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleImageCreateManyVehicleInputEnvelope
    connect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
  }

  export type LeadEventUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput> | LeadEventCreateWithoutVehicleInput[] | LeadEventUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutVehicleInput | LeadEventCreateOrConnectWithoutVehicleInput[]
    createMany?: LeadEventCreateManyVehicleInputEnvelope
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type StoreUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<StoreCreateWithoutVehiclesInput, StoreUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutVehiclesInput
    upsert?: StoreUpsertWithoutVehiclesInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutVehiclesInput, StoreUpdateWithoutVehiclesInput>, StoreUncheckedUpdateWithoutVehiclesInput>
  }

  export type VehicleImageUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput> | VehicleImageCreateWithoutVehicleInput[] | VehicleImageUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleImageCreateOrConnectWithoutVehicleInput | VehicleImageCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleImageUpsertWithWhereUniqueWithoutVehicleInput | VehicleImageUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleImageCreateManyVehicleInputEnvelope
    set?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    disconnect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    delete?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    connect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    update?: VehicleImageUpdateWithWhereUniqueWithoutVehicleInput | VehicleImageUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleImageUpdateManyWithWhereWithoutVehicleInput | VehicleImageUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleImageScalarWhereInput | VehicleImageScalarWhereInput[]
  }

  export type LeadEventUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput> | LeadEventCreateWithoutVehicleInput[] | LeadEventUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutVehicleInput | LeadEventCreateOrConnectWithoutVehicleInput[]
    upsert?: LeadEventUpsertWithWhereUniqueWithoutVehicleInput | LeadEventUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: LeadEventCreateManyVehicleInputEnvelope
    set?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    disconnect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    delete?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    update?: LeadEventUpdateWithWhereUniqueWithoutVehicleInput | LeadEventUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: LeadEventUpdateManyWithWhereWithoutVehicleInput | LeadEventUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
  }

  export type VehicleImageUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput> | VehicleImageCreateWithoutVehicleInput[] | VehicleImageUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleImageCreateOrConnectWithoutVehicleInput | VehicleImageCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleImageUpsertWithWhereUniqueWithoutVehicleInput | VehicleImageUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleImageCreateManyVehicleInputEnvelope
    set?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    disconnect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    delete?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    connect?: VehicleImageWhereUniqueInput | VehicleImageWhereUniqueInput[]
    update?: VehicleImageUpdateWithWhereUniqueWithoutVehicleInput | VehicleImageUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleImageUpdateManyWithWhereWithoutVehicleInput | VehicleImageUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleImageScalarWhereInput | VehicleImageScalarWhereInput[]
  }

  export type LeadEventUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput> | LeadEventCreateWithoutVehicleInput[] | LeadEventUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: LeadEventCreateOrConnectWithoutVehicleInput | LeadEventCreateOrConnectWithoutVehicleInput[]
    upsert?: LeadEventUpsertWithWhereUniqueWithoutVehicleInput | LeadEventUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: LeadEventCreateManyVehicleInputEnvelope
    set?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    disconnect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    delete?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    connect?: LeadEventWhereUniqueInput | LeadEventWhereUniqueInput[]
    update?: LeadEventUpdateWithWhereUniqueWithoutVehicleInput | LeadEventUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: LeadEventUpdateManyWithWhereWithoutVehicleInput | LeadEventUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutLeadEventsInput = {
    create?: XOR<VehicleCreateWithoutLeadEventsInput, VehicleUncheckedCreateWithoutLeadEventsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutLeadEventsInput
    connect?: VehicleWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutLeadEventsInput = {
    create?: XOR<StoreCreateWithoutLeadEventsInput, StoreUncheckedCreateWithoutLeadEventsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutLeadEventsInput
    connect?: StoreWhereUniqueInput
  }

  export type EnumAttendanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AttendanceStatus
  }

  export type VehicleUpdateOneWithoutLeadEventsNestedInput = {
    create?: XOR<VehicleCreateWithoutLeadEventsInput, VehicleUncheckedCreateWithoutLeadEventsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutLeadEventsInput
    upsert?: VehicleUpsertWithoutLeadEventsInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutLeadEventsInput, VehicleUpdateWithoutLeadEventsInput>, VehicleUncheckedUpdateWithoutLeadEventsInput>
  }

  export type StoreUpdateOneRequiredWithoutLeadEventsNestedInput = {
    create?: XOR<StoreCreateWithoutLeadEventsInput, StoreUncheckedCreateWithoutLeadEventsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutLeadEventsInput
    upsert?: StoreUpsertWithoutLeadEventsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutLeadEventsInput, StoreUpdateWithoutLeadEventsInput>, StoreUncheckedUpdateWithoutLeadEventsInput>
  }

  export type VehicleCreateNestedOneWithoutImagesInput = {
    create?: XOR<VehicleCreateWithoutImagesInput, VehicleUncheckedCreateWithoutImagesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutImagesInput
    connect?: VehicleWhereUniqueInput
  }

  export type VehicleUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<VehicleCreateWithoutImagesInput, VehicleUncheckedCreateWithoutImagesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutImagesInput
    upsert?: VehicleUpsertWithoutImagesInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutImagesInput, VehicleUpdateWithoutImagesInput>, VehicleUncheckedUpdateWithoutImagesInput>
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

  export type NestedEnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
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

  export type NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumStoreRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreRequestStatus | EnumStoreRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreRequestStatusFilter<$PrismaModel> | $Enums.StoreRequestStatus
  }

  export type NestedEnumStoreRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreRequestStatus | EnumStoreRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreRequestStatus[] | ListEnumStoreRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreRequestStatusFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedEnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
  }

  export type NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
  }

  export type VehicleCreateWithoutStoreInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: VehicleImageCreateNestedManyWithoutVehicleInput
    leadEvents?: LeadEventCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutStoreInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: VehicleImageUncheckedCreateNestedManyWithoutVehicleInput
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutStoreInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput>
  }

  export type VehicleCreateManyStoreInputEnvelope = {
    data: VehicleCreateManyStoreInput | VehicleCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutStoreInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutStoreInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutStoreInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput>
  }

  export type UserCreateManyStoreInputEnvelope = {
    data: UserCreateManyStoreInput | UserCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type LeadEventCreateWithoutStoreInput = {
    id?: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
    vehicle?: VehicleCreateNestedOneWithoutLeadEventsInput
  }

  export type LeadEventUncheckedCreateWithoutStoreInput = {
    id?: string
    vehicleId?: string | null
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type LeadEventCreateOrConnectWithoutStoreInput = {
    where: LeadEventWhereUniqueInput
    create: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput>
  }

  export type LeadEventCreateManyStoreInputEnvelope = {
    data: LeadEventCreateManyStoreInput | LeadEventCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithWhereUniqueWithoutStoreInput = {
    where: VehicleWhereUniqueInput
    update: XOR<VehicleUpdateWithoutStoreInput, VehicleUncheckedUpdateWithoutStoreInput>
    create: XOR<VehicleCreateWithoutStoreInput, VehicleUncheckedCreateWithoutStoreInput>
  }

  export type VehicleUpdateWithWhereUniqueWithoutStoreInput = {
    where: VehicleWhereUniqueInput
    data: XOR<VehicleUpdateWithoutStoreInput, VehicleUncheckedUpdateWithoutStoreInput>
  }

  export type VehicleUpdateManyWithWhereWithoutStoreInput = {
    where: VehicleScalarWhereInput
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyWithoutStoreInput>
  }

  export type VehicleScalarWhereInput = {
    AND?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    OR?: VehicleScalarWhereInput[]
    NOT?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    price?: FloatFilter<"Vehicle"> | number
    km?: IntFilter<"Vehicle"> | number
    color?: StringNullableFilter<"Vehicle"> | string | null
    fuelType?: StringNullableFilter<"Vehicle"> | string | null
    transmission?: StringNullableFilter<"Vehicle"> | string | null
    description?: StringNullableFilter<"Vehicle"> | string | null
    featured?: BoolFilter<"Vehicle"> | boolean
    status?: EnumStatusFilter<"Vehicle"> | $Enums.Status
    storeId?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutStoreInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutStoreInput, UserUncheckedUpdateWithoutStoreInput>
    create: XOR<UserCreateWithoutStoreInput, UserUncheckedCreateWithoutStoreInput>
  }

  export type UserUpdateWithWhereUniqueWithoutStoreInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutStoreInput, UserUncheckedUpdateWithoutStoreInput>
  }

  export type UserUpdateManyWithWhereWithoutStoreInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutStoreInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    storeId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type LeadEventUpsertWithWhereUniqueWithoutStoreInput = {
    where: LeadEventWhereUniqueInput
    update: XOR<LeadEventUpdateWithoutStoreInput, LeadEventUncheckedUpdateWithoutStoreInput>
    create: XOR<LeadEventCreateWithoutStoreInput, LeadEventUncheckedCreateWithoutStoreInput>
  }

  export type LeadEventUpdateWithWhereUniqueWithoutStoreInput = {
    where: LeadEventWhereUniqueInput
    data: XOR<LeadEventUpdateWithoutStoreInput, LeadEventUncheckedUpdateWithoutStoreInput>
  }

  export type LeadEventUpdateManyWithWhereWithoutStoreInput = {
    where: LeadEventScalarWhereInput
    data: XOR<LeadEventUpdateManyMutationInput, LeadEventUncheckedUpdateManyWithoutStoreInput>
  }

  export type LeadEventScalarWhereInput = {
    AND?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
    OR?: LeadEventScalarWhereInput[]
    NOT?: LeadEventScalarWhereInput | LeadEventScalarWhereInput[]
    id?: StringFilter<"LeadEvent"> | string
    vehicleId?: StringNullableFilter<"LeadEvent"> | string | null
    storeId?: StringFilter<"LeadEvent"> | string
    type?: StringFilter<"LeadEvent"> | string
    contactName?: StringNullableFilter<"LeadEvent"> | string | null
    contactPhone?: StringNullableFilter<"LeadEvent"> | string | null
    attendanceStatus?: EnumAttendanceStatusFilter<"LeadEvent"> | $Enums.AttendanceStatus
    assignedTo?: StringNullableFilter<"LeadEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadEvent"> | Date | string
  }

  export type StoreCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutUsersInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutUsersInput, StoreUncheckedCreateWithoutUsersInput>
  }

  export type StoreUpsertWithoutUsersInput = {
    update: XOR<StoreUpdateWithoutUsersInput, StoreUncheckedUpdateWithoutUsersInput>
    create: XOR<StoreCreateWithoutUsersInput, StoreUncheckedCreateWithoutUsersInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutUsersInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutUsersInput, StoreUncheckedUpdateWithoutUsersInput>
  }

  export type StoreUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateWithoutVehiclesInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutVehiclesInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutStoreInput
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutVehiclesInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutVehiclesInput, StoreUncheckedCreateWithoutVehiclesInput>
  }

  export type VehicleImageCreateWithoutVehicleInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
  }

  export type VehicleImageUncheckedCreateWithoutVehicleInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
  }

  export type VehicleImageCreateOrConnectWithoutVehicleInput = {
    where: VehicleImageWhereUniqueInput
    create: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleImageCreateManyVehicleInputEnvelope = {
    data: VehicleImageCreateManyVehicleInput | VehicleImageCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type LeadEventCreateWithoutVehicleInput = {
    id?: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutLeadEventsInput
  }

  export type LeadEventUncheckedCreateWithoutVehicleInput = {
    id?: string
    storeId: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type LeadEventCreateOrConnectWithoutVehicleInput = {
    where: LeadEventWhereUniqueInput
    create: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput>
  }

  export type LeadEventCreateManyVehicleInputEnvelope = {
    data: LeadEventCreateManyVehicleInput | LeadEventCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithoutVehiclesInput = {
    update: XOR<StoreUpdateWithoutVehiclesInput, StoreUncheckedUpdateWithoutVehiclesInput>
    create: XOR<StoreCreateWithoutVehiclesInput, StoreUncheckedCreateWithoutVehiclesInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutVehiclesInput, StoreUncheckedUpdateWithoutVehiclesInput>
  }

  export type StoreUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutStoreNestedInput
    leadEvents?: LeadEventUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type VehicleImageUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VehicleImageWhereUniqueInput
    update: XOR<VehicleImageUpdateWithoutVehicleInput, VehicleImageUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleImageCreateWithoutVehicleInput, VehicleImageUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleImageUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VehicleImageWhereUniqueInput
    data: XOR<VehicleImageUpdateWithoutVehicleInput, VehicleImageUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleImageUpdateManyWithWhereWithoutVehicleInput = {
    where: VehicleImageScalarWhereInput
    data: XOR<VehicleImageUpdateManyMutationInput, VehicleImageUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleImageScalarWhereInput = {
    AND?: VehicleImageScalarWhereInput | VehicleImageScalarWhereInput[]
    OR?: VehicleImageScalarWhereInput[]
    NOT?: VehicleImageScalarWhereInput | VehicleImageScalarWhereInput[]
    id?: StringFilter<"VehicleImage"> | string
    url?: StringFilter<"VehicleImage"> | string
    isCover?: BoolFilter<"VehicleImage"> | boolean
    order?: IntFilter<"VehicleImage"> | number
    vehicleId?: StringFilter<"VehicleImage"> | string
  }

  export type LeadEventUpsertWithWhereUniqueWithoutVehicleInput = {
    where: LeadEventWhereUniqueInput
    update: XOR<LeadEventUpdateWithoutVehicleInput, LeadEventUncheckedUpdateWithoutVehicleInput>
    create: XOR<LeadEventCreateWithoutVehicleInput, LeadEventUncheckedCreateWithoutVehicleInput>
  }

  export type LeadEventUpdateWithWhereUniqueWithoutVehicleInput = {
    where: LeadEventWhereUniqueInput
    data: XOR<LeadEventUpdateWithoutVehicleInput, LeadEventUncheckedUpdateWithoutVehicleInput>
  }

  export type LeadEventUpdateManyWithWhereWithoutVehicleInput = {
    where: LeadEventScalarWhereInput
    data: XOR<LeadEventUpdateManyMutationInput, LeadEventUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleCreateWithoutLeadEventsInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    store: StoreCreateNestedOneWithoutVehiclesInput
    images?: VehicleImageCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutLeadEventsInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    storeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: VehicleImageUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutLeadEventsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutLeadEventsInput, VehicleUncheckedCreateWithoutLeadEventsInput>
  }

  export type StoreCreateWithoutLeadEventsInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutStoreInput
    users?: UserCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutLeadEventsInput = {
    id?: string
    name: string
    slug: string
    subdomain: string
    customDomain?: string | null
    logoUrl?: string | null
    primaryColor?: string
    whatsapp: string
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutStoreInput
    users?: UserUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutLeadEventsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutLeadEventsInput, StoreUncheckedCreateWithoutLeadEventsInput>
  }

  export type VehicleUpsertWithoutLeadEventsInput = {
    update: XOR<VehicleUpdateWithoutLeadEventsInput, VehicleUncheckedUpdateWithoutLeadEventsInput>
    create: XOR<VehicleCreateWithoutLeadEventsInput, VehicleUncheckedCreateWithoutLeadEventsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutLeadEventsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutLeadEventsInput, VehicleUncheckedUpdateWithoutLeadEventsInput>
  }

  export type VehicleUpdateWithoutLeadEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutVehiclesNestedInput
    images?: VehicleImageUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutLeadEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: VehicleImageUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type StoreUpsertWithoutLeadEventsInput = {
    update: XOR<StoreUpdateWithoutLeadEventsInput, StoreUncheckedUpdateWithoutLeadEventsInput>
    create: XOR<StoreCreateWithoutLeadEventsInput, StoreUncheckedCreateWithoutLeadEventsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutLeadEventsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutLeadEventsInput, StoreUncheckedUpdateWithoutLeadEventsInput>
  }

  export type StoreUpdateWithoutLeadEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutStoreNestedInput
    users?: UserUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutLeadEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutStoreNestedInput
    users?: UserUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type VehicleCreateWithoutImagesInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    store: StoreCreateNestedOneWithoutVehiclesInput
    leadEvents?: LeadEventCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutImagesInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    storeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leadEvents?: LeadEventUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutImagesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutImagesInput, VehicleUncheckedCreateWithoutImagesInput>
  }

  export type VehicleUpsertWithoutImagesInput = {
    update: XOR<VehicleUpdateWithoutImagesInput, VehicleUncheckedUpdateWithoutImagesInput>
    create: XOR<VehicleCreateWithoutImagesInput, VehicleUncheckedCreateWithoutImagesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutImagesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutImagesInput, VehicleUncheckedUpdateWithoutImagesInput>
  }

  export type VehicleUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutVehiclesNestedInput
    leadEvents?: LeadEventUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadEvents?: LeadEventUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyStoreInput = {
    id?: string
    make: string
    model: string
    year: number
    price: number
    km: number
    color?: string | null
    fuelType?: string | null
    transmission?: string | null
    description?: string | null
    featured?: boolean
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateManyStoreInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type LeadEventCreateManyStoreInput = {
    id?: string
    vehicleId?: string | null
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type VehicleUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: VehicleImageUpdateManyWithoutVehicleNestedInput
    leadEvents?: LeadEventUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: VehicleImageUncheckedUpdateManyWithoutVehicleNestedInput
    leadEvents?: LeadEventUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    km?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    fuelType?: NullableStringFieldUpdateOperationsInput | string | null
    transmission?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneWithoutLeadEventsNestedInput
  }

  export type LeadEventUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleImageCreateManyVehicleInput = {
    id?: string
    url: string
    isCover?: boolean
    order?: number
  }

  export type LeadEventCreateManyVehicleInput = {
    id?: string
    storeId: string
    type: string
    contactName?: string | null
    contactPhone?: string | null
    attendanceStatus?: $Enums.AttendanceStatus
    assignedTo?: string | null
    createdAt?: Date | string
  }

  export type VehicleImageUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleImageUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleImageUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isCover?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type LeadEventUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutLeadEventsNestedInput
  }

  export type LeadEventUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadEventUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    attendanceStatus?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
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