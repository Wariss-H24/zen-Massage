
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Categorie
 * 
 */
export type Categorie = $Result.DefaultSelection<Prisma.$CategoriePayload>
/**
 * Model Produit
 * 
 */
export type Produit = $Result.DefaultSelection<Prisma.$ProduitPayload>
/**
 * Model Avis
 * 
 */
export type Avis = $Result.DefaultSelection<Prisma.$AvisPayload>
/**
 * Model Like
 * 
 */
export type Like = $Result.DefaultSelection<Prisma.$LikePayload>
/**
 * Model AvisUtile
 * 
 */
export type AvisUtile = $Result.DefaultSelection<Prisma.$AvisUtilePayload>
/**
 * Model TypeSeance
 * 
 */
export type TypeSeance = $Result.DefaultSelection<Prisma.$TypeSeancePayload>
/**
 * Model RendezVous
 * 
 */
export type RendezVous = $Result.DefaultSelection<Prisma.$RendezVousPayload>
/**
 * Model Configuration
 * 
 */
export type Configuration = $Result.DefaultSelection<Prisma.$ConfigurationPayload>
/**
 * Model Commande
 * 
 */
export type Commande = $Result.DefaultSelection<Prisma.$CommandePayload>
/**
 * Model LigneCommande
 * 
 */
export type LigneCommande = $Result.DefaultSelection<Prisma.$LigneCommandePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const UserRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.categorie`: Exposes CRUD operations for the **Categorie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categorie.findMany()
    * ```
    */
  get categorie(): Prisma.CategorieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produit`: Exposes CRUD operations for the **Produit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produits
    * const produits = await prisma.produit.findMany()
    * ```
    */
  get produit(): Prisma.ProduitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.avis`: Exposes CRUD operations for the **Avis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Avis
    * const avis = await prisma.avis.findMany()
    * ```
    */
  get avis(): Prisma.AvisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): Prisma.LikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.avisUtile`: Exposes CRUD operations for the **AvisUtile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvisUtiles
    * const avisUtiles = await prisma.avisUtile.findMany()
    * ```
    */
  get avisUtile(): Prisma.AvisUtileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.typeSeance`: Exposes CRUD operations for the **TypeSeance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TypeSeances
    * const typeSeances = await prisma.typeSeance.findMany()
    * ```
    */
  get typeSeance(): Prisma.TypeSeanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rendezVous`: Exposes CRUD operations for the **RendezVous** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RendezVous
    * const rendezVous = await prisma.rendezVous.findMany()
    * ```
    */
  get rendezVous(): Prisma.RendezVousDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuration`: Exposes CRUD operations for the **Configuration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configurations
    * const configurations = await prisma.configuration.findMany()
    * ```
    */
  get configuration(): Prisma.ConfigurationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commande`: Exposes CRUD operations for the **Commande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commandes
    * const commandes = await prisma.commande.findMany()
    * ```
    */
  get commande(): Prisma.CommandeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ligneCommande`: Exposes CRUD operations for the **LigneCommande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LigneCommandes
    * const ligneCommandes = await prisma.ligneCommande.findMany()
    * ```
    */
  get ligneCommande(): Prisma.LigneCommandeDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
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
    User: 'User',
    Categorie: 'Categorie',
    Produit: 'Produit',
    Avis: 'Avis',
    Like: 'Like',
    AvisUtile: 'AvisUtile',
    TypeSeance: 'TypeSeance',
    RendezVous: 'RendezVous',
    Configuration: 'Configuration',
    Commande: 'Commande',
    LigneCommande: 'LigneCommande'
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
      modelProps: "user" | "categorie" | "produit" | "avis" | "like" | "avisUtile" | "typeSeance" | "rendezVous" | "configuration" | "commande" | "ligneCommande"
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
      Categorie: {
        payload: Prisma.$CategoriePayload<ExtArgs>
        fields: Prisma.CategorieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategorieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategorieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          findFirst: {
            args: Prisma.CategorieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategorieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          findMany: {
            args: Prisma.CategorieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          create: {
            args: Prisma.CategorieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          createMany: {
            args: Prisma.CategorieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategorieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          delete: {
            args: Prisma.CategorieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          update: {
            args: Prisma.CategorieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          deleteMany: {
            args: Prisma.CategorieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategorieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategorieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          upsert: {
            args: Prisma.CategorieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          aggregate: {
            args: Prisma.CategorieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategorie>
          }
          groupBy: {
            args: Prisma.CategorieGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategorieGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategorieCountArgs<ExtArgs>
            result: $Utils.Optional<CategorieCountAggregateOutputType> | number
          }
        }
      }
      Produit: {
        payload: Prisma.$ProduitPayload<ExtArgs>
        fields: Prisma.ProduitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProduitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProduitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          findFirst: {
            args: Prisma.ProduitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProduitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          findMany: {
            args: Prisma.ProduitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>[]
          }
          create: {
            args: Prisma.ProduitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          createMany: {
            args: Prisma.ProduitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProduitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>[]
          }
          delete: {
            args: Prisma.ProduitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          update: {
            args: Prisma.ProduitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          deleteMany: {
            args: Prisma.ProduitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProduitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProduitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>[]
          }
          upsert: {
            args: Prisma.ProduitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduitPayload>
          }
          aggregate: {
            args: Prisma.ProduitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduit>
          }
          groupBy: {
            args: Prisma.ProduitGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProduitGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProduitCountArgs<ExtArgs>
            result: $Utils.Optional<ProduitCountAggregateOutputType> | number
          }
        }
      }
      Avis: {
        payload: Prisma.$AvisPayload<ExtArgs>
        fields: Prisma.AvisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          findFirst: {
            args: Prisma.AvisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          findMany: {
            args: Prisma.AvisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>[]
          }
          create: {
            args: Prisma.AvisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          createMany: {
            args: Prisma.AvisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>[]
          }
          delete: {
            args: Prisma.AvisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          update: {
            args: Prisma.AvisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          deleteMany: {
            args: Prisma.AvisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>[]
          }
          upsert: {
            args: Prisma.AvisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisPayload>
          }
          aggregate: {
            args: Prisma.AvisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvis>
          }
          groupBy: {
            args: Prisma.AvisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvisCountArgs<ExtArgs>
            result: $Utils.Optional<AvisCountAggregateOutputType> | number
          }
        }
      }
      Like: {
        payload: Prisma.$LikePayload<ExtArgs>
        fields: Prisma.LikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findFirst: {
            args: Prisma.LikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findMany: {
            args: Prisma.LikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          create: {
            args: Prisma.LikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          createMany: {
            args: Prisma.LikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          delete: {
            args: Prisma.LikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          update: {
            args: Prisma.LikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          deleteMany: {
            args: Prisma.LikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          upsert: {
            args: Prisma.LikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          aggregate: {
            args: Prisma.LikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLike>
          }
          groupBy: {
            args: Prisma.LikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LikeCountArgs<ExtArgs>
            result: $Utils.Optional<LikeCountAggregateOutputType> | number
          }
        }
      }
      AvisUtile: {
        payload: Prisma.$AvisUtilePayload<ExtArgs>
        fields: Prisma.AvisUtileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvisUtileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvisUtileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          findFirst: {
            args: Prisma.AvisUtileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvisUtileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          findMany: {
            args: Prisma.AvisUtileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>[]
          }
          create: {
            args: Prisma.AvisUtileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          createMany: {
            args: Prisma.AvisUtileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvisUtileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>[]
          }
          delete: {
            args: Prisma.AvisUtileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          update: {
            args: Prisma.AvisUtileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          deleteMany: {
            args: Prisma.AvisUtileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvisUtileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvisUtileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>[]
          }
          upsert: {
            args: Prisma.AvisUtileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisUtilePayload>
          }
          aggregate: {
            args: Prisma.AvisUtileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvisUtile>
          }
          groupBy: {
            args: Prisma.AvisUtileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvisUtileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvisUtileCountArgs<ExtArgs>
            result: $Utils.Optional<AvisUtileCountAggregateOutputType> | number
          }
        }
      }
      TypeSeance: {
        payload: Prisma.$TypeSeancePayload<ExtArgs>
        fields: Prisma.TypeSeanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TypeSeanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TypeSeanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          findFirst: {
            args: Prisma.TypeSeanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TypeSeanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          findMany: {
            args: Prisma.TypeSeanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>[]
          }
          create: {
            args: Prisma.TypeSeanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          createMany: {
            args: Prisma.TypeSeanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TypeSeanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>[]
          }
          delete: {
            args: Prisma.TypeSeanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          update: {
            args: Prisma.TypeSeanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          deleteMany: {
            args: Prisma.TypeSeanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TypeSeanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TypeSeanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>[]
          }
          upsert: {
            args: Prisma.TypeSeanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypeSeancePayload>
          }
          aggregate: {
            args: Prisma.TypeSeanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTypeSeance>
          }
          groupBy: {
            args: Prisma.TypeSeanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TypeSeanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TypeSeanceCountArgs<ExtArgs>
            result: $Utils.Optional<TypeSeanceCountAggregateOutputType> | number
          }
        }
      }
      RendezVous: {
        payload: Prisma.$RendezVousPayload<ExtArgs>
        fields: Prisma.RendezVousFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RendezVousFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RendezVousFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findFirst: {
            args: Prisma.RendezVousFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RendezVousFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          findMany: {
            args: Prisma.RendezVousFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          create: {
            args: Prisma.RendezVousCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          createMany: {
            args: Prisma.RendezVousCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RendezVousCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          delete: {
            args: Prisma.RendezVousDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          update: {
            args: Prisma.RendezVousUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          deleteMany: {
            args: Prisma.RendezVousDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RendezVousUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RendezVousUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>[]
          }
          upsert: {
            args: Prisma.RendezVousUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RendezVousPayload>
          }
          aggregate: {
            args: Prisma.RendezVousAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRendezVous>
          }
          groupBy: {
            args: Prisma.RendezVousGroupByArgs<ExtArgs>
            result: $Utils.Optional<RendezVousGroupByOutputType>[]
          }
          count: {
            args: Prisma.RendezVousCountArgs<ExtArgs>
            result: $Utils.Optional<RendezVousCountAggregateOutputType> | number
          }
        }
      }
      Configuration: {
        payload: Prisma.$ConfigurationPayload<ExtArgs>
        fields: Prisma.ConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findFirst: {
            args: Prisma.ConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findMany: {
            args: Prisma.ConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          create: {
            args: Prisma.ConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          createMany: {
            args: Prisma.ConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          delete: {
            args: Prisma.ConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          update: {
            args: Prisma.ConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.ConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.ConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          aggregate: {
            args: Prisma.ConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguration>
          }
          groupBy: {
            args: Prisma.ConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationCountAggregateOutputType> | number
          }
        }
      }
      Commande: {
        payload: Prisma.$CommandePayload<ExtArgs>
        fields: Prisma.CommandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          findFirst: {
            args: Prisma.CommandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          findMany: {
            args: Prisma.CommandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>[]
          }
          create: {
            args: Prisma.CommandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          createMany: {
            args: Prisma.CommandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>[]
          }
          delete: {
            args: Prisma.CommandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          update: {
            args: Prisma.CommandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          deleteMany: {
            args: Prisma.CommandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>[]
          }
          upsert: {
            args: Prisma.CommandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandePayload>
          }
          aggregate: {
            args: Prisma.CommandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommande>
          }
          groupBy: {
            args: Prisma.CommandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommandeCountArgs<ExtArgs>
            result: $Utils.Optional<CommandeCountAggregateOutputType> | number
          }
        }
      }
      LigneCommande: {
        payload: Prisma.$LigneCommandePayload<ExtArgs>
        fields: Prisma.LigneCommandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LigneCommandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LigneCommandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          findFirst: {
            args: Prisma.LigneCommandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LigneCommandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          findMany: {
            args: Prisma.LigneCommandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>[]
          }
          create: {
            args: Prisma.LigneCommandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          createMany: {
            args: Prisma.LigneCommandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LigneCommandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>[]
          }
          delete: {
            args: Prisma.LigneCommandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          update: {
            args: Prisma.LigneCommandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          deleteMany: {
            args: Prisma.LigneCommandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LigneCommandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LigneCommandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>[]
          }
          upsert: {
            args: Prisma.LigneCommandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LigneCommandePayload>
          }
          aggregate: {
            args: Prisma.LigneCommandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLigneCommande>
          }
          groupBy: {
            args: Prisma.LigneCommandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LigneCommandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LigneCommandeCountArgs<ExtArgs>
            result: $Utils.Optional<LigneCommandeCountAggregateOutputType> | number
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
    user?: UserOmit
    categorie?: CategorieOmit
    produit?: ProduitOmit
    avis?: AvisOmit
    like?: LikeOmit
    avisUtile?: AvisUtileOmit
    typeSeance?: TypeSeanceOmit
    rendezVous?: RendezVousOmit
    configuration?: ConfigurationOmit
    commande?: CommandeOmit
    ligneCommande?: LigneCommandeOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    avis: number
    likes: number
    rendezVous: number
    commandes: number
    avis_repondus: number
    votes_utiles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | UserCountOutputTypeCountAvisArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
    rendezVous?: boolean | UserCountOutputTypeCountRendezVousArgs
    commandes?: boolean | UserCountOutputTypeCountCommandesArgs
    avis_repondus?: boolean | UserCountOutputTypeCountAvis_repondusArgs
    votes_utiles?: boolean | UserCountOutputTypeCountVotes_utilesArgs
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
  export type UserCountOutputTypeCountAvisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommandeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAvis_repondusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotes_utilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisUtileWhereInput
  }


  /**
   * Count Type CategorieCountOutputType
   */

  export type CategorieCountOutputType = {
    produits: number
  }

  export type CategorieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produits?: boolean | CategorieCountOutputTypeCountProduitsArgs
  }

  // Custom InputTypes
  /**
   * CategorieCountOutputType without action
   */
  export type CategorieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieCountOutputType
     */
    select?: CategorieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategorieCountOutputType without action
   */
  export type CategorieCountOutputTypeCountProduitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduitWhereInput
  }


  /**
   * Count Type ProduitCountOutputType
   */

  export type ProduitCountOutputType = {
    avis: number
    likes: number
    lignes: number
  }

  export type ProduitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | ProduitCountOutputTypeCountAvisArgs
    likes?: boolean | ProduitCountOutputTypeCountLikesArgs
    lignes?: boolean | ProduitCountOutputTypeCountLignesArgs
  }

  // Custom InputTypes
  /**
   * ProduitCountOutputType without action
   */
  export type ProduitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduitCountOutputType
     */
    select?: ProduitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProduitCountOutputType without action
   */
  export type ProduitCountOutputTypeCountAvisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisWhereInput
  }

  /**
   * ProduitCountOutputType without action
   */
  export type ProduitCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * ProduitCountOutputType without action
   */
  export type ProduitCountOutputTypeCountLignesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LigneCommandeWhereInput
  }


  /**
   * Count Type AvisCountOutputType
   */

  export type AvisCountOutputType = {
    votes_utiles: number
  }

  export type AvisCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes_utiles?: boolean | AvisCountOutputTypeCountVotes_utilesArgs
  }

  // Custom InputTypes
  /**
   * AvisCountOutputType without action
   */
  export type AvisCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisCountOutputType
     */
    select?: AvisCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvisCountOutputType without action
   */
  export type AvisCountOutputTypeCountVotes_utilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisUtileWhereInput
  }


  /**
   * Count Type TypeSeanceCountOutputType
   */

  export type TypeSeanceCountOutputType = {
    rendezVous: number
  }

  export type TypeSeanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rendezVous?: boolean | TypeSeanceCountOutputTypeCountRendezVousArgs
  }

  // Custom InputTypes
  /**
   * TypeSeanceCountOutputType without action
   */
  export type TypeSeanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeanceCountOutputType
     */
    select?: TypeSeanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TypeSeanceCountOutputType without action
   */
  export type TypeSeanceCountOutputTypeCountRendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
  }


  /**
   * Count Type CommandeCountOutputType
   */

  export type CommandeCountOutputType = {
    lignes: number
  }

  export type CommandeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lignes?: boolean | CommandeCountOutputTypeCountLignesArgs
  }

  // Custom InputTypes
  /**
   * CommandeCountOutputType without action
   */
  export type CommandeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommandeCountOutputType
     */
    select?: CommandeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommandeCountOutputType without action
   */
  export type CommandeCountOutputTypeCountLignesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LigneCommandeWhereInput
  }


  /**
   * Models
   */

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
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    phone: number
    avatar: number
    role: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
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
    firstName: string
    lastName: string
    phone: string | null
    avatar: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
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
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avis?: boolean | User$avisArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    rendezVous?: boolean | User$rendezVousArgs<ExtArgs>
    commandes?: boolean | User$commandesArgs<ExtArgs>
    avis_repondus?: boolean | User$avis_repondusArgs<ExtArgs>
    votes_utiles?: boolean | User$votes_utilesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "phone" | "avatar" | "role" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | User$avisArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    rendezVous?: boolean | User$rendezVousArgs<ExtArgs>
    commandes?: boolean | User$commandesArgs<ExtArgs>
    avis_repondus?: boolean | User$avis_repondusArgs<ExtArgs>
    votes_utiles?: boolean | User$votes_utilesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      avis: Prisma.$AvisPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
      commandes: Prisma.$CommandePayload<ExtArgs>[]
      avis_repondus: Prisma.$AvisPayload<ExtArgs>[]
      votes_utiles: Prisma.$AvisUtilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      phone: string | null
      avatar: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
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
    avis<T extends User$avisArgs<ExtArgs> = {}>(args?: Subset<T, User$avisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rendezVous<T extends User$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, User$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commandes<T extends User$commandesArgs<ExtArgs> = {}>(args?: Subset<T, User$commandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    avis_repondus<T extends User$avis_repondusArgs<ExtArgs> = {}>(args?: Subset<T, User$avis_repondusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes_utiles<T extends User$votes_utilesArgs<ExtArgs> = {}>(args?: Subset<T, User$votes_utilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
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
   * User.avis
   */
  export type User$avisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    where?: AvisWhereInput
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    cursor?: AvisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * User.likes
   */
  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * User.rendezVous
   */
  export type User$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * User.commandes
   */
  export type User$commandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    where?: CommandeWhereInput
    orderBy?: CommandeOrderByWithRelationInput | CommandeOrderByWithRelationInput[]
    cursor?: CommandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommandeScalarFieldEnum | CommandeScalarFieldEnum[]
  }

  /**
   * User.avis_repondus
   */
  export type User$avis_repondusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    where?: AvisWhereInput
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    cursor?: AvisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * User.votes_utiles
   */
  export type User$votes_utilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    where?: AvisUtileWhereInput
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    cursor?: AvisUtileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvisUtileScalarFieldEnum | AvisUtileScalarFieldEnum[]
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
   * Model Categorie
   */

  export type AggregateCategorie = {
    _count: CategorieCountAggregateOutputType | null
    _avg: CategorieAvgAggregateOutputType | null
    _sum: CategorieSumAggregateOutputType | null
    _min: CategorieMinAggregateOutputType | null
    _max: CategorieMaxAggregateOutputType | null
  }

  export type CategorieAvgAggregateOutputType = {
    ordre: number | null
  }

  export type CategorieSumAggregateOutputType = {
    ordre: number | null
  }

  export type CategorieMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    icone: string | null
    ordre: number | null
    createdAt: Date | null
  }

  export type CategorieMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    icone: string | null
    ordre: number | null
    createdAt: Date | null
  }

  export type CategorieCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    icone: number
    ordre: number
    createdAt: number
    _all: number
  }


  export type CategorieAvgAggregateInputType = {
    ordre?: true
  }

  export type CategorieSumAggregateInputType = {
    ordre?: true
  }

  export type CategorieMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    icone?: true
    ordre?: true
    createdAt?: true
  }

  export type CategorieMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    icone?: true
    ordre?: true
    createdAt?: true
  }

  export type CategorieCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    icone?: true
    ordre?: true
    createdAt?: true
    _all?: true
  }

  export type CategorieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorie to aggregate.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategorieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategorieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategorieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategorieMaxAggregateInputType
  }

  export type GetCategorieAggregateType<T extends CategorieAggregateArgs> = {
        [P in keyof T & keyof AggregateCategorie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategorie[P]>
      : GetScalarType<T[P], AggregateCategorie[P]>
  }




  export type CategorieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategorieWhereInput
    orderBy?: CategorieOrderByWithAggregationInput | CategorieOrderByWithAggregationInput[]
    by: CategorieScalarFieldEnum[] | CategorieScalarFieldEnum
    having?: CategorieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategorieCountAggregateInputType | true
    _avg?: CategorieAvgAggregateInputType
    _sum?: CategorieSumAggregateInputType
    _min?: CategorieMinAggregateInputType
    _max?: CategorieMaxAggregateInputType
  }

  export type CategorieGroupByOutputType = {
    id: string
    nom: string
    description: string | null
    icone: string | null
    ordre: number
    createdAt: Date
    _count: CategorieCountAggregateOutputType | null
    _avg: CategorieAvgAggregateOutputType | null
    _sum: CategorieSumAggregateOutputType | null
    _min: CategorieMinAggregateOutputType | null
    _max: CategorieMaxAggregateOutputType | null
  }

  type GetCategorieGroupByPayload<T extends CategorieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategorieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategorieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategorieGroupByOutputType[P]>
            : GetScalarType<T[P], CategorieGroupByOutputType[P]>
        }
      >
    >


  export type CategorieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    icone?: boolean
    ordre?: boolean
    createdAt?: boolean
    produits?: boolean | Categorie$produitsArgs<ExtArgs>
    _count?: boolean | CategorieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    icone?: boolean
    ordre?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    icone?: boolean
    ordre?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
    icone?: boolean
    ordre?: boolean
    createdAt?: boolean
  }

  export type CategorieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description" | "icone" | "ordre" | "createdAt", ExtArgs["result"]["categorie"]>
  export type CategorieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produits?: boolean | Categorie$produitsArgs<ExtArgs>
    _count?: boolean | CategorieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategorieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategorieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categorie"
    objects: {
      produits: Prisma.$ProduitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string | null
      icone: string | null
      ordre: number
      createdAt: Date
    }, ExtArgs["result"]["categorie"]>
    composites: {}
  }

  type CategorieGetPayload<S extends boolean | null | undefined | CategorieDefaultArgs> = $Result.GetResult<Prisma.$CategoriePayload, S>

  type CategorieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategorieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategorieCountAggregateInputType | true
    }

  export interface CategorieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categorie'], meta: { name: 'Categorie' } }
    /**
     * Find zero or one Categorie that matches the filter.
     * @param {CategorieFindUniqueArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategorieFindUniqueArgs>(args: SelectSubset<T, CategorieFindUniqueArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categorie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategorieFindUniqueOrThrowArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategorieFindUniqueOrThrowArgs>(args: SelectSubset<T, CategorieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindFirstArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategorieFindFirstArgs>(args?: SelectSubset<T, CategorieFindFirstArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindFirstOrThrowArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategorieFindFirstOrThrowArgs>(args?: SelectSubset<T, CategorieFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categorie.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categorie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categorieWithIdOnly = await prisma.categorie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategorieFindManyArgs>(args?: SelectSubset<T, CategorieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categorie.
     * @param {CategorieCreateArgs} args - Arguments to create a Categorie.
     * @example
     * // Create one Categorie
     * const Categorie = await prisma.categorie.create({
     *   data: {
     *     // ... data to create a Categorie
     *   }
     * })
     * 
     */
    create<T extends CategorieCreateArgs>(args: SelectSubset<T, CategorieCreateArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategorieCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categorie = await prisma.categorie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategorieCreateManyArgs>(args?: SelectSubset<T, CategorieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategorieCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categorie = await prisma.categorie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categorieWithIdOnly = await prisma.categorie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategorieCreateManyAndReturnArgs>(args?: SelectSubset<T, CategorieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categorie.
     * @param {CategorieDeleteArgs} args - Arguments to delete one Categorie.
     * @example
     * // Delete one Categorie
     * const Categorie = await prisma.categorie.delete({
     *   where: {
     *     // ... filter to delete one Categorie
     *   }
     * })
     * 
     */
    delete<T extends CategorieDeleteArgs>(args: SelectSubset<T, CategorieDeleteArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categorie.
     * @param {CategorieUpdateArgs} args - Arguments to update one Categorie.
     * @example
     * // Update one Categorie
     * const categorie = await prisma.categorie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategorieUpdateArgs>(args: SelectSubset<T, CategorieUpdateArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategorieDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categorie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategorieDeleteManyArgs>(args?: SelectSubset<T, CategorieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categorie = await prisma.categorie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategorieUpdateManyArgs>(args: SelectSubset<T, CategorieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategorieUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const categorie = await prisma.categorie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categorieWithIdOnly = await prisma.categorie.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategorieUpdateManyAndReturnArgs>(args: SelectSubset<T, CategorieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categorie.
     * @param {CategorieUpsertArgs} args - Arguments to update or create a Categorie.
     * @example
     * // Update or create a Categorie
     * const categorie = await prisma.categorie.upsert({
     *   create: {
     *     // ... data to create a Categorie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categorie we want to update
     *   }
     * })
     */
    upsert<T extends CategorieUpsertArgs>(args: SelectSubset<T, CategorieUpsertArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categorie.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategorieCountArgs>(
      args?: Subset<T, CategorieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategorieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categorie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategorieAggregateArgs>(args: Subset<T, CategorieAggregateArgs>): Prisma.PrismaPromise<GetCategorieAggregateType<T>>

    /**
     * Group by Categorie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieGroupByArgs} args - Group by arguments.
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
      T extends CategorieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategorieGroupByArgs['orderBy'] }
        : { orderBy?: CategorieGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategorieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategorieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categorie model
   */
  readonly fields: CategorieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categorie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategorieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produits<T extends Categorie$produitsArgs<ExtArgs> = {}>(args?: Subset<T, Categorie$produitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Categorie model
   */
  interface CategorieFieldRefs {
    readonly id: FieldRef<"Categorie", 'String'>
    readonly nom: FieldRef<"Categorie", 'String'>
    readonly description: FieldRef<"Categorie", 'String'>
    readonly icone: FieldRef<"Categorie", 'String'>
    readonly ordre: FieldRef<"Categorie", 'Int'>
    readonly createdAt: FieldRef<"Categorie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categorie findUnique
   */
  export type CategorieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie findUniqueOrThrow
   */
  export type CategorieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie findFirst
   */
  export type CategorieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie findFirstOrThrow
   */
  export type CategorieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie findMany
   */
  export type CategorieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie create
   */
  export type CategorieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The data needed to create a Categorie.
     */
    data: XOR<CategorieCreateInput, CategorieUncheckedCreateInput>
  }

  /**
   * Categorie createMany
   */
  export type CategorieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategorieCreateManyInput | CategorieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categorie createManyAndReturn
   */
  export type CategorieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategorieCreateManyInput | CategorieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categorie update
   */
  export type CategorieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The data needed to update a Categorie.
     */
    data: XOR<CategorieUpdateInput, CategorieUncheckedUpdateInput>
    /**
     * Choose, which Categorie to update.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie updateMany
   */
  export type CategorieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategorieUpdateManyMutationInput, CategorieUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Categorie updateManyAndReturn
   */
  export type CategorieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategorieUpdateManyMutationInput, CategorieUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Categorie upsert
   */
  export type CategorieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The filter to search for the Categorie to update in case it exists.
     */
    where: CategorieWhereUniqueInput
    /**
     * In case the Categorie found by the `where` argument doesn't exist, create a new Categorie with this data.
     */
    create: XOR<CategorieCreateInput, CategorieUncheckedCreateInput>
    /**
     * In case the Categorie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategorieUpdateInput, CategorieUncheckedUpdateInput>
  }

  /**
   * Categorie delete
   */
  export type CategorieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter which Categorie to delete.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie deleteMany
   */
  export type CategorieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Categorie.produits
   */
  export type Categorie$produitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    where?: ProduitWhereInput
    orderBy?: ProduitOrderByWithRelationInput | ProduitOrderByWithRelationInput[]
    cursor?: ProduitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProduitScalarFieldEnum | ProduitScalarFieldEnum[]
  }

  /**
   * Categorie without action
   */
  export type CategorieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
  }


  /**
   * Model Produit
   */

  export type AggregateProduit = {
    _count: ProduitCountAggregateOutputType | null
    _avg: ProduitAvgAggregateOutputType | null
    _sum: ProduitSumAggregateOutputType | null
    _min: ProduitMinAggregateOutputType | null
    _max: ProduitMaxAggregateOutputType | null
  }

  export type ProduitAvgAggregateOutputType = {
    prix: number | null
    stock: number | null
    sku_number: number | null
  }

  export type ProduitSumAggregateOutputType = {
    prix: number | null
    stock: number | null
    sku_number: number | null
  }

  export type ProduitMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    prix: number | null
    stock: number | null
    categorie_id: string | null
    sku_number: number | null
    sku: string | null
    publie: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProduitMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    prix: number | null
    stock: number | null
    categorie_id: string | null
    sku_number: number | null
    sku: string | null
    publie: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProduitCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    prix: number
    stock: number
    categorie_id: number
    images: number
    sku_number: number
    sku: number
    publie: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProduitAvgAggregateInputType = {
    prix?: true
    stock?: true
    sku_number?: true
  }

  export type ProduitSumAggregateInputType = {
    prix?: true
    stock?: true
    sku_number?: true
  }

  export type ProduitMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    categorie_id?: true
    sku_number?: true
    sku?: true
    publie?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProduitMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    categorie_id?: true
    sku_number?: true
    sku?: true
    publie?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProduitCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    categorie_id?: true
    images?: true
    sku_number?: true
    sku?: true
    publie?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProduitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produit to aggregate.
     */
    where?: ProduitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produits to fetch.
     */
    orderBy?: ProduitOrderByWithRelationInput | ProduitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProduitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produits
    **/
    _count?: true | ProduitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProduitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProduitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProduitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProduitMaxAggregateInputType
  }

  export type GetProduitAggregateType<T extends ProduitAggregateArgs> = {
        [P in keyof T & keyof AggregateProduit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduit[P]>
      : GetScalarType<T[P], AggregateProduit[P]>
  }




  export type ProduitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduitWhereInput
    orderBy?: ProduitOrderByWithAggregationInput | ProduitOrderByWithAggregationInput[]
    by: ProduitScalarFieldEnum[] | ProduitScalarFieldEnum
    having?: ProduitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProduitCountAggregateInputType | true
    _avg?: ProduitAvgAggregateInputType
    _sum?: ProduitSumAggregateInputType
    _min?: ProduitMinAggregateInputType
    _max?: ProduitMaxAggregateInputType
  }

  export type ProduitGroupByOutputType = {
    id: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images: string[]
    sku_number: number
    sku: string | null
    publie: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProduitCountAggregateOutputType | null
    _avg: ProduitAvgAggregateOutputType | null
    _sum: ProduitSumAggregateOutputType | null
    _min: ProduitMinAggregateOutputType | null
    _max: ProduitMaxAggregateOutputType | null
  }

  type GetProduitGroupByPayload<T extends ProduitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProduitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProduitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProduitGroupByOutputType[P]>
            : GetScalarType<T[P], ProduitGroupByOutputType[P]>
        }
      >
    >


  export type ProduitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    categorie_id?: boolean
    images?: boolean
    sku_number?: boolean
    sku?: boolean
    publie?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    avis?: boolean | Produit$avisArgs<ExtArgs>
    likes?: boolean | Produit$likesArgs<ExtArgs>
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
    lignes?: boolean | Produit$lignesArgs<ExtArgs>
    _count?: boolean | ProduitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produit"]>

  export type ProduitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    categorie_id?: boolean
    images?: boolean
    sku_number?: boolean
    sku?: boolean
    publie?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produit"]>

  export type ProduitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    categorie_id?: boolean
    images?: boolean
    sku_number?: boolean
    sku?: boolean
    publie?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produit"]>

  export type ProduitSelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    categorie_id?: boolean
    images?: boolean
    sku_number?: boolean
    sku?: boolean
    publie?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProduitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description" | "prix" | "stock" | "categorie_id" | "images" | "sku_number" | "sku" | "publie" | "createdAt" | "updatedAt", ExtArgs["result"]["produit"]>
  export type ProduitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | Produit$avisArgs<ExtArgs>
    likes?: boolean | Produit$likesArgs<ExtArgs>
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
    lignes?: boolean | Produit$lignesArgs<ExtArgs>
    _count?: boolean | ProduitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProduitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
  }
  export type ProduitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorie?: boolean | CategorieDefaultArgs<ExtArgs>
  }

  export type $ProduitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produit"
    objects: {
      avis: Prisma.$AvisPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      categorie: Prisma.$CategoriePayload<ExtArgs>
      lignes: Prisma.$LigneCommandePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string
      prix: number
      stock: number
      categorie_id: string
      images: string[]
      sku_number: number
      sku: string | null
      publie: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["produit"]>
    composites: {}
  }

  type ProduitGetPayload<S extends boolean | null | undefined | ProduitDefaultArgs> = $Result.GetResult<Prisma.$ProduitPayload, S>

  type ProduitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProduitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProduitCountAggregateInputType | true
    }

  export interface ProduitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produit'], meta: { name: 'Produit' } }
    /**
     * Find zero or one Produit that matches the filter.
     * @param {ProduitFindUniqueArgs} args - Arguments to find a Produit
     * @example
     * // Get one Produit
     * const produit = await prisma.produit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProduitFindUniqueArgs>(args: SelectSubset<T, ProduitFindUniqueArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProduitFindUniqueOrThrowArgs} args - Arguments to find a Produit
     * @example
     * // Get one Produit
     * const produit = await prisma.produit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProduitFindUniqueOrThrowArgs>(args: SelectSubset<T, ProduitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitFindFirstArgs} args - Arguments to find a Produit
     * @example
     * // Get one Produit
     * const produit = await prisma.produit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProduitFindFirstArgs>(args?: SelectSubset<T, ProduitFindFirstArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitFindFirstOrThrowArgs} args - Arguments to find a Produit
     * @example
     * // Get one Produit
     * const produit = await prisma.produit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProduitFindFirstOrThrowArgs>(args?: SelectSubset<T, ProduitFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produits
     * const produits = await prisma.produit.findMany()
     * 
     * // Get first 10 Produits
     * const produits = await prisma.produit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produitWithIdOnly = await prisma.produit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProduitFindManyArgs>(args?: SelectSubset<T, ProduitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produit.
     * @param {ProduitCreateArgs} args - Arguments to create a Produit.
     * @example
     * // Create one Produit
     * const Produit = await prisma.produit.create({
     *   data: {
     *     // ... data to create a Produit
     *   }
     * })
     * 
     */
    create<T extends ProduitCreateArgs>(args: SelectSubset<T, ProduitCreateArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produits.
     * @param {ProduitCreateManyArgs} args - Arguments to create many Produits.
     * @example
     * // Create many Produits
     * const produit = await prisma.produit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProduitCreateManyArgs>(args?: SelectSubset<T, ProduitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produits and returns the data saved in the database.
     * @param {ProduitCreateManyAndReturnArgs} args - Arguments to create many Produits.
     * @example
     * // Create many Produits
     * const produit = await prisma.produit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produits and only return the `id`
     * const produitWithIdOnly = await prisma.produit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProduitCreateManyAndReturnArgs>(args?: SelectSubset<T, ProduitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produit.
     * @param {ProduitDeleteArgs} args - Arguments to delete one Produit.
     * @example
     * // Delete one Produit
     * const Produit = await prisma.produit.delete({
     *   where: {
     *     // ... filter to delete one Produit
     *   }
     * })
     * 
     */
    delete<T extends ProduitDeleteArgs>(args: SelectSubset<T, ProduitDeleteArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produit.
     * @param {ProduitUpdateArgs} args - Arguments to update one Produit.
     * @example
     * // Update one Produit
     * const produit = await prisma.produit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProduitUpdateArgs>(args: SelectSubset<T, ProduitUpdateArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produits.
     * @param {ProduitDeleteManyArgs} args - Arguments to filter Produits to delete.
     * @example
     * // Delete a few Produits
     * const { count } = await prisma.produit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProduitDeleteManyArgs>(args?: SelectSubset<T, ProduitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produits
     * const produit = await prisma.produit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProduitUpdateManyArgs>(args: SelectSubset<T, ProduitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produits and returns the data updated in the database.
     * @param {ProduitUpdateManyAndReturnArgs} args - Arguments to update many Produits.
     * @example
     * // Update many Produits
     * const produit = await prisma.produit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produits and only return the `id`
     * const produitWithIdOnly = await prisma.produit.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProduitUpdateManyAndReturnArgs>(args: SelectSubset<T, ProduitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produit.
     * @param {ProduitUpsertArgs} args - Arguments to update or create a Produit.
     * @example
     * // Update or create a Produit
     * const produit = await prisma.produit.upsert({
     *   create: {
     *     // ... data to create a Produit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produit we want to update
     *   }
     * })
     */
    upsert<T extends ProduitUpsertArgs>(args: SelectSubset<T, ProduitUpsertArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitCountArgs} args - Arguments to filter Produits to count.
     * @example
     * // Count the number of Produits
     * const count = await prisma.produit.count({
     *   where: {
     *     // ... the filter for the Produits we want to count
     *   }
     * })
    **/
    count<T extends ProduitCountArgs>(
      args?: Subset<T, ProduitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProduitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProduitAggregateArgs>(args: Subset<T, ProduitAggregateArgs>): Prisma.PrismaPromise<GetProduitAggregateType<T>>

    /**
     * Group by Produit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduitGroupByArgs} args - Group by arguments.
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
      T extends ProduitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProduitGroupByArgs['orderBy'] }
        : { orderBy?: ProduitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProduitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProduitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produit model
   */
  readonly fields: ProduitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProduitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avis<T extends Produit$avisArgs<ExtArgs> = {}>(args?: Subset<T, Produit$avisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Produit$likesArgs<ExtArgs> = {}>(args?: Subset<T, Produit$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categorie<T extends CategorieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategorieDefaultArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lignes<T extends Produit$lignesArgs<ExtArgs> = {}>(args?: Subset<T, Produit$lignesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Produit model
   */
  interface ProduitFieldRefs {
    readonly id: FieldRef<"Produit", 'String'>
    readonly nom: FieldRef<"Produit", 'String'>
    readonly description: FieldRef<"Produit", 'String'>
    readonly prix: FieldRef<"Produit", 'Float'>
    readonly stock: FieldRef<"Produit", 'Int'>
    readonly categorie_id: FieldRef<"Produit", 'String'>
    readonly images: FieldRef<"Produit", 'String[]'>
    readonly sku_number: FieldRef<"Produit", 'Int'>
    readonly sku: FieldRef<"Produit", 'String'>
    readonly publie: FieldRef<"Produit", 'Boolean'>
    readonly createdAt: FieldRef<"Produit", 'DateTime'>
    readonly updatedAt: FieldRef<"Produit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Produit findUnique
   */
  export type ProduitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter, which Produit to fetch.
     */
    where: ProduitWhereUniqueInput
  }

  /**
   * Produit findUniqueOrThrow
   */
  export type ProduitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter, which Produit to fetch.
     */
    where: ProduitWhereUniqueInput
  }

  /**
   * Produit findFirst
   */
  export type ProduitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter, which Produit to fetch.
     */
    where?: ProduitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produits to fetch.
     */
    orderBy?: ProduitOrderByWithRelationInput | ProduitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produits.
     */
    cursor?: ProduitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produits.
     */
    distinct?: ProduitScalarFieldEnum | ProduitScalarFieldEnum[]
  }

  /**
   * Produit findFirstOrThrow
   */
  export type ProduitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter, which Produit to fetch.
     */
    where?: ProduitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produits to fetch.
     */
    orderBy?: ProduitOrderByWithRelationInput | ProduitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produits.
     */
    cursor?: ProduitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produits.
     */
    distinct?: ProduitScalarFieldEnum | ProduitScalarFieldEnum[]
  }

  /**
   * Produit findMany
   */
  export type ProduitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter, which Produits to fetch.
     */
    where?: ProduitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produits to fetch.
     */
    orderBy?: ProduitOrderByWithRelationInput | ProduitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produits.
     */
    cursor?: ProduitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produits.
     */
    distinct?: ProduitScalarFieldEnum | ProduitScalarFieldEnum[]
  }

  /**
   * Produit create
   */
  export type ProduitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * The data needed to create a Produit.
     */
    data: XOR<ProduitCreateInput, ProduitUncheckedCreateInput>
  }

  /**
   * Produit createMany
   */
  export type ProduitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produits.
     */
    data: ProduitCreateManyInput | ProduitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produit createManyAndReturn
   */
  export type ProduitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * The data used to create many Produits.
     */
    data: ProduitCreateManyInput | ProduitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produit update
   */
  export type ProduitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * The data needed to update a Produit.
     */
    data: XOR<ProduitUpdateInput, ProduitUncheckedUpdateInput>
    /**
     * Choose, which Produit to update.
     */
    where: ProduitWhereUniqueInput
  }

  /**
   * Produit updateMany
   */
  export type ProduitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produits.
     */
    data: XOR<ProduitUpdateManyMutationInput, ProduitUncheckedUpdateManyInput>
    /**
     * Filter which Produits to update
     */
    where?: ProduitWhereInput
    /**
     * Limit how many Produits to update.
     */
    limit?: number
  }

  /**
   * Produit updateManyAndReturn
   */
  export type ProduitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * The data used to update Produits.
     */
    data: XOR<ProduitUpdateManyMutationInput, ProduitUncheckedUpdateManyInput>
    /**
     * Filter which Produits to update
     */
    where?: ProduitWhereInput
    /**
     * Limit how many Produits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produit upsert
   */
  export type ProduitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * The filter to search for the Produit to update in case it exists.
     */
    where: ProduitWhereUniqueInput
    /**
     * In case the Produit found by the `where` argument doesn't exist, create a new Produit with this data.
     */
    create: XOR<ProduitCreateInput, ProduitUncheckedCreateInput>
    /**
     * In case the Produit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProduitUpdateInput, ProduitUncheckedUpdateInput>
  }

  /**
   * Produit delete
   */
  export type ProduitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
    /**
     * Filter which Produit to delete.
     */
    where: ProduitWhereUniqueInput
  }

  /**
   * Produit deleteMany
   */
  export type ProduitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produits to delete
     */
    where?: ProduitWhereInput
    /**
     * Limit how many Produits to delete.
     */
    limit?: number
  }

  /**
   * Produit.avis
   */
  export type Produit$avisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    where?: AvisWhereInput
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    cursor?: AvisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * Produit.likes
   */
  export type Produit$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Produit.lignes
   */
  export type Produit$lignesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    where?: LigneCommandeWhereInput
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    cursor?: LigneCommandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LigneCommandeScalarFieldEnum | LigneCommandeScalarFieldEnum[]
  }

  /**
   * Produit without action
   */
  export type ProduitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produit
     */
    select?: ProduitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produit
     */
    omit?: ProduitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduitInclude<ExtArgs> | null
  }


  /**
   * Model Avis
   */

  export type AggregateAvis = {
    _count: AvisCountAggregateOutputType | null
    _avg: AvisAvgAggregateOutputType | null
    _sum: AvisSumAggregateOutputType | null
    _min: AvisMinAggregateOutputType | null
    _max: AvisMaxAggregateOutputType | null
  }

  export type AvisAvgAggregateOutputType = {
    note: number | null
  }

  export type AvisSumAggregateOutputType = {
    note: number | null
  }

  export type AvisMinAggregateOutputType = {
    id: string | null
    note: number | null
    titre: string | null
    contenu: string | null
    produit_id: string | null
    utilisateur_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    reponse_admin: string | null
    reponse_admin_at: Date | null
    reponse_admin_id: string | null
    masque: boolean | null
  }

  export type AvisMaxAggregateOutputType = {
    id: string | null
    note: number | null
    titre: string | null
    contenu: string | null
    produit_id: string | null
    utilisateur_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    reponse_admin: string | null
    reponse_admin_at: Date | null
    reponse_admin_id: string | null
    masque: boolean | null
  }

  export type AvisCountAggregateOutputType = {
    id: number
    note: number
    titre: number
    contenu: number
    produit_id: number
    utilisateur_id: number
    createdAt: number
    updatedAt: number
    reponse_admin: number
    reponse_admin_at: number
    reponse_admin_id: number
    masque: number
    _all: number
  }


  export type AvisAvgAggregateInputType = {
    note?: true
  }

  export type AvisSumAggregateInputType = {
    note?: true
  }

  export type AvisMinAggregateInputType = {
    id?: true
    note?: true
    titre?: true
    contenu?: true
    produit_id?: true
    utilisateur_id?: true
    createdAt?: true
    updatedAt?: true
    reponse_admin?: true
    reponse_admin_at?: true
    reponse_admin_id?: true
    masque?: true
  }

  export type AvisMaxAggregateInputType = {
    id?: true
    note?: true
    titre?: true
    contenu?: true
    produit_id?: true
    utilisateur_id?: true
    createdAt?: true
    updatedAt?: true
    reponse_admin?: true
    reponse_admin_at?: true
    reponse_admin_id?: true
    masque?: true
  }

  export type AvisCountAggregateInputType = {
    id?: true
    note?: true
    titre?: true
    contenu?: true
    produit_id?: true
    utilisateur_id?: true
    createdAt?: true
    updatedAt?: true
    reponse_admin?: true
    reponse_admin_at?: true
    reponse_admin_id?: true
    masque?: true
    _all?: true
  }

  export type AvisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avis to aggregate.
     */
    where?: AvisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avis to fetch.
     */
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Avis
    **/
    _count?: true | AvisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvisMaxAggregateInputType
  }

  export type GetAvisAggregateType<T extends AvisAggregateArgs> = {
        [P in keyof T & keyof AggregateAvis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvis[P]>
      : GetScalarType<T[P], AggregateAvis[P]>
  }




  export type AvisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisWhereInput
    orderBy?: AvisOrderByWithAggregationInput | AvisOrderByWithAggregationInput[]
    by: AvisScalarFieldEnum[] | AvisScalarFieldEnum
    having?: AvisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvisCountAggregateInputType | true
    _avg?: AvisAvgAggregateInputType
    _sum?: AvisSumAggregateInputType
    _min?: AvisMinAggregateInputType
    _max?: AvisMaxAggregateInputType
  }

  export type AvisGroupByOutputType = {
    id: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt: Date
    updatedAt: Date
    reponse_admin: string | null
    reponse_admin_at: Date | null
    reponse_admin_id: string | null
    masque: boolean
    _count: AvisCountAggregateOutputType | null
    _avg: AvisAvgAggregateOutputType | null
    _sum: AvisSumAggregateOutputType | null
    _min: AvisMinAggregateOutputType | null
    _max: AvisMaxAggregateOutputType | null
  }

  type GetAvisGroupByPayload<T extends AvisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvisGroupByOutputType[P]>
            : GetScalarType<T[P], AvisGroupByOutputType[P]>
        }
      >
    >


  export type AvisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    titre?: boolean
    contenu?: boolean
    produit_id?: boolean
    utilisateur_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reponse_admin?: boolean
    reponse_admin_at?: boolean
    reponse_admin_id?: boolean
    masque?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
    votes_utiles?: boolean | Avis$votes_utilesArgs<ExtArgs>
    _count?: boolean | AvisCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avis"]>

  export type AvisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    titre?: boolean
    contenu?: boolean
    produit_id?: boolean
    utilisateur_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reponse_admin?: boolean
    reponse_admin_at?: boolean
    reponse_admin_id?: boolean
    masque?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
  }, ExtArgs["result"]["avis"]>

  export type AvisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    titre?: boolean
    contenu?: boolean
    produit_id?: boolean
    utilisateur_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reponse_admin?: boolean
    reponse_admin_at?: boolean
    reponse_admin_id?: boolean
    masque?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
  }, ExtArgs["result"]["avis"]>

  export type AvisSelectScalar = {
    id?: boolean
    note?: boolean
    titre?: boolean
    contenu?: boolean
    produit_id?: boolean
    utilisateur_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reponse_admin?: boolean
    reponse_admin_at?: boolean
    reponse_admin_id?: boolean
    masque?: boolean
  }

  export type AvisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "note" | "titre" | "contenu" | "produit_id" | "utilisateur_id" | "createdAt" | "updatedAt" | "reponse_admin" | "reponse_admin_at" | "reponse_admin_id" | "masque", ExtArgs["result"]["avis"]>
  export type AvisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
    votes_utiles?: boolean | Avis$votes_utilesArgs<ExtArgs>
    _count?: boolean | AvisCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
  }
  export type AvisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    admin_repondant?: boolean | Avis$admin_repondantArgs<ExtArgs>
  }

  export type $AvisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Avis"
    objects: {
      produit: Prisma.$ProduitPayload<ExtArgs>
      utilisateur: Prisma.$UserPayload<ExtArgs>
      admin_repondant: Prisma.$UserPayload<ExtArgs> | null
      votes_utiles: Prisma.$AvisUtilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      note: number
      titre: string
      contenu: string
      produit_id: string
      utilisateur_id: string
      createdAt: Date
      updatedAt: Date
      reponse_admin: string | null
      reponse_admin_at: Date | null
      reponse_admin_id: string | null
      masque: boolean
    }, ExtArgs["result"]["avis"]>
    composites: {}
  }

  type AvisGetPayload<S extends boolean | null | undefined | AvisDefaultArgs> = $Result.GetResult<Prisma.$AvisPayload, S>

  type AvisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvisCountAggregateInputType | true
    }

  export interface AvisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Avis'], meta: { name: 'Avis' } }
    /**
     * Find zero or one Avis that matches the filter.
     * @param {AvisFindUniqueArgs} args - Arguments to find a Avis
     * @example
     * // Get one Avis
     * const avis = await prisma.avis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvisFindUniqueArgs>(args: SelectSubset<T, AvisFindUniqueArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Avis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvisFindUniqueOrThrowArgs} args - Arguments to find a Avis
     * @example
     * // Get one Avis
     * const avis = await prisma.avis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvisFindUniqueOrThrowArgs>(args: SelectSubset<T, AvisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisFindFirstArgs} args - Arguments to find a Avis
     * @example
     * // Get one Avis
     * const avis = await prisma.avis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvisFindFirstArgs>(args?: SelectSubset<T, AvisFindFirstArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisFindFirstOrThrowArgs} args - Arguments to find a Avis
     * @example
     * // Get one Avis
     * const avis = await prisma.avis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvisFindFirstOrThrowArgs>(args?: SelectSubset<T, AvisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Avis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avis
     * const avis = await prisma.avis.findMany()
     * 
     * // Get first 10 Avis
     * const avis = await prisma.avis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avisWithIdOnly = await prisma.avis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvisFindManyArgs>(args?: SelectSubset<T, AvisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Avis.
     * @param {AvisCreateArgs} args - Arguments to create a Avis.
     * @example
     * // Create one Avis
     * const Avis = await prisma.avis.create({
     *   data: {
     *     // ... data to create a Avis
     *   }
     * })
     * 
     */
    create<T extends AvisCreateArgs>(args: SelectSubset<T, AvisCreateArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Avis.
     * @param {AvisCreateManyArgs} args - Arguments to create many Avis.
     * @example
     * // Create many Avis
     * const avis = await prisma.avis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvisCreateManyArgs>(args?: SelectSubset<T, AvisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Avis and returns the data saved in the database.
     * @param {AvisCreateManyAndReturnArgs} args - Arguments to create many Avis.
     * @example
     * // Create many Avis
     * const avis = await prisma.avis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Avis and only return the `id`
     * const avisWithIdOnly = await prisma.avis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvisCreateManyAndReturnArgs>(args?: SelectSubset<T, AvisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Avis.
     * @param {AvisDeleteArgs} args - Arguments to delete one Avis.
     * @example
     * // Delete one Avis
     * const Avis = await prisma.avis.delete({
     *   where: {
     *     // ... filter to delete one Avis
     *   }
     * })
     * 
     */
    delete<T extends AvisDeleteArgs>(args: SelectSubset<T, AvisDeleteArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Avis.
     * @param {AvisUpdateArgs} args - Arguments to update one Avis.
     * @example
     * // Update one Avis
     * const avis = await prisma.avis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvisUpdateArgs>(args: SelectSubset<T, AvisUpdateArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Avis.
     * @param {AvisDeleteManyArgs} args - Arguments to filter Avis to delete.
     * @example
     * // Delete a few Avis
     * const { count } = await prisma.avis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvisDeleteManyArgs>(args?: SelectSubset<T, AvisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avis
     * const avis = await prisma.avis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvisUpdateManyArgs>(args: SelectSubset<T, AvisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avis and returns the data updated in the database.
     * @param {AvisUpdateManyAndReturnArgs} args - Arguments to update many Avis.
     * @example
     * // Update many Avis
     * const avis = await prisma.avis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Avis and only return the `id`
     * const avisWithIdOnly = await prisma.avis.updateManyAndReturn({
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
    updateManyAndReturn<T extends AvisUpdateManyAndReturnArgs>(args: SelectSubset<T, AvisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Avis.
     * @param {AvisUpsertArgs} args - Arguments to update or create a Avis.
     * @example
     * // Update or create a Avis
     * const avis = await prisma.avis.upsert({
     *   create: {
     *     // ... data to create a Avis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Avis we want to update
     *   }
     * })
     */
    upsert<T extends AvisUpsertArgs>(args: SelectSubset<T, AvisUpsertArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Avis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisCountArgs} args - Arguments to filter Avis to count.
     * @example
     * // Count the number of Avis
     * const count = await prisma.avis.count({
     *   where: {
     *     // ... the filter for the Avis we want to count
     *   }
     * })
    **/
    count<T extends AvisCountArgs>(
      args?: Subset<T, AvisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Avis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvisAggregateArgs>(args: Subset<T, AvisAggregateArgs>): Prisma.PrismaPromise<GetAvisAggregateType<T>>

    /**
     * Group by Avis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisGroupByArgs} args - Group by arguments.
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
      T extends AvisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvisGroupByArgs['orderBy'] }
        : { orderBy?: AvisGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Avis model
   */
  readonly fields: AvisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Avis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produit<T extends ProduitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProduitDefaultArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin_repondant<T extends Avis$admin_repondantArgs<ExtArgs> = {}>(args?: Subset<T, Avis$admin_repondantArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    votes_utiles<T extends Avis$votes_utilesArgs<ExtArgs> = {}>(args?: Subset<T, Avis$votes_utilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Avis model
   */
  interface AvisFieldRefs {
    readonly id: FieldRef<"Avis", 'String'>
    readonly note: FieldRef<"Avis", 'Int'>
    readonly titre: FieldRef<"Avis", 'String'>
    readonly contenu: FieldRef<"Avis", 'String'>
    readonly produit_id: FieldRef<"Avis", 'String'>
    readonly utilisateur_id: FieldRef<"Avis", 'String'>
    readonly createdAt: FieldRef<"Avis", 'DateTime'>
    readonly updatedAt: FieldRef<"Avis", 'DateTime'>
    readonly reponse_admin: FieldRef<"Avis", 'String'>
    readonly reponse_admin_at: FieldRef<"Avis", 'DateTime'>
    readonly reponse_admin_id: FieldRef<"Avis", 'String'>
    readonly masque: FieldRef<"Avis", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Avis findUnique
   */
  export type AvisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter, which Avis to fetch.
     */
    where: AvisWhereUniqueInput
  }

  /**
   * Avis findUniqueOrThrow
   */
  export type AvisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter, which Avis to fetch.
     */
    where: AvisWhereUniqueInput
  }

  /**
   * Avis findFirst
   */
  export type AvisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter, which Avis to fetch.
     */
    where?: AvisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avis to fetch.
     */
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avis.
     */
    cursor?: AvisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avis.
     */
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * Avis findFirstOrThrow
   */
  export type AvisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter, which Avis to fetch.
     */
    where?: AvisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avis to fetch.
     */
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avis.
     */
    cursor?: AvisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avis.
     */
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * Avis findMany
   */
  export type AvisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter, which Avis to fetch.
     */
    where?: AvisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avis to fetch.
     */
    orderBy?: AvisOrderByWithRelationInput | AvisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Avis.
     */
    cursor?: AvisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avis.
     */
    distinct?: AvisScalarFieldEnum | AvisScalarFieldEnum[]
  }

  /**
   * Avis create
   */
  export type AvisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * The data needed to create a Avis.
     */
    data: XOR<AvisCreateInput, AvisUncheckedCreateInput>
  }

  /**
   * Avis createMany
   */
  export type AvisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Avis.
     */
    data: AvisCreateManyInput | AvisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avis createManyAndReturn
   */
  export type AvisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * The data used to create many Avis.
     */
    data: AvisCreateManyInput | AvisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Avis update
   */
  export type AvisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * The data needed to update a Avis.
     */
    data: XOR<AvisUpdateInput, AvisUncheckedUpdateInput>
    /**
     * Choose, which Avis to update.
     */
    where: AvisWhereUniqueInput
  }

  /**
   * Avis updateMany
   */
  export type AvisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Avis.
     */
    data: XOR<AvisUpdateManyMutationInput, AvisUncheckedUpdateManyInput>
    /**
     * Filter which Avis to update
     */
    where?: AvisWhereInput
    /**
     * Limit how many Avis to update.
     */
    limit?: number
  }

  /**
   * Avis updateManyAndReturn
   */
  export type AvisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * The data used to update Avis.
     */
    data: XOR<AvisUpdateManyMutationInput, AvisUncheckedUpdateManyInput>
    /**
     * Filter which Avis to update
     */
    where?: AvisWhereInput
    /**
     * Limit how many Avis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Avis upsert
   */
  export type AvisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * The filter to search for the Avis to update in case it exists.
     */
    where: AvisWhereUniqueInput
    /**
     * In case the Avis found by the `where` argument doesn't exist, create a new Avis with this data.
     */
    create: XOR<AvisCreateInput, AvisUncheckedCreateInput>
    /**
     * In case the Avis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvisUpdateInput, AvisUncheckedUpdateInput>
  }

  /**
   * Avis delete
   */
  export type AvisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
    /**
     * Filter which Avis to delete.
     */
    where: AvisWhereUniqueInput
  }

  /**
   * Avis deleteMany
   */
  export type AvisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avis to delete
     */
    where?: AvisWhereInput
    /**
     * Limit how many Avis to delete.
     */
    limit?: number
  }

  /**
   * Avis.admin_repondant
   */
  export type Avis$admin_repondantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  /**
   * Avis.votes_utiles
   */
  export type Avis$votes_utilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    where?: AvisUtileWhereInput
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    cursor?: AvisUtileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvisUtileScalarFieldEnum | AvisUtileScalarFieldEnum[]
  }

  /**
   * Avis without action
   */
  export type AvisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avis
     */
    select?: AvisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avis
     */
    omit?: AvisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisInclude<ExtArgs> | null
  }


  /**
   * Model Like
   */

  export type AggregateLike = {
    _count: LikeCountAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  export type LikeMinAggregateOutputType = {
    id: string | null
    utilisateur_id: string | null
    produit_id: string | null
    createdAt: Date | null
  }

  export type LikeMaxAggregateOutputType = {
    id: string | null
    utilisateur_id: string | null
    produit_id: string | null
    createdAt: Date | null
  }

  export type LikeCountAggregateOutputType = {
    id: number
    utilisateur_id: number
    produit_id: number
    createdAt: number
    _all: number
  }


  export type LikeMinAggregateInputType = {
    id?: true
    utilisateur_id?: true
    produit_id?: true
    createdAt?: true
  }

  export type LikeMaxAggregateInputType = {
    id?: true
    utilisateur_id?: true
    produit_id?: true
    createdAt?: true
  }

  export type LikeCountAggregateInputType = {
    id?: true
    utilisateur_id?: true
    produit_id?: true
    createdAt?: true
    _all?: true
  }

  export type LikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Like to aggregate.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Likes
    **/
    _count?: true | LikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikeMaxAggregateInputType
  }

  export type GetLikeAggregateType<T extends LikeAggregateArgs> = {
        [P in keyof T & keyof AggregateLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLike[P]>
      : GetScalarType<T[P], AggregateLike[P]>
  }




  export type LikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithAggregationInput | LikeOrderByWithAggregationInput[]
    by: LikeScalarFieldEnum[] | LikeScalarFieldEnum
    having?: LikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikeCountAggregateInputType | true
    _min?: LikeMinAggregateInputType
    _max?: LikeMaxAggregateInputType
  }

  export type LikeGroupByOutputType = {
    id: string
    utilisateur_id: string
    produit_id: string
    createdAt: Date
    _count: LikeCountAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  type GetLikeGroupByPayload<T extends LikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikeGroupByOutputType[P]>
            : GetScalarType<T[P], LikeGroupByOutputType[P]>
        }
      >
    >


  export type LikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    produit_id?: boolean
    createdAt?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    produit_id?: boolean
    createdAt?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    produit_id?: boolean
    createdAt?: boolean
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectScalar = {
    id?: boolean
    utilisateur_id?: boolean
    produit_id?: boolean
    createdAt?: boolean
  }

  export type LikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "utilisateur_id" | "produit_id" | "createdAt", ExtArgs["result"]["like"]>
  export type LikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Like"
    objects: {
      produit: Prisma.$ProduitPayload<ExtArgs>
      utilisateur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      utilisateur_id: string
      produit_id: string
      createdAt: Date
    }, ExtArgs["result"]["like"]>
    composites: {}
  }

  type LikeGetPayload<S extends boolean | null | undefined | LikeDefaultArgs> = $Result.GetResult<Prisma.$LikePayload, S>

  type LikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikeCountAggregateInputType | true
    }

  export interface LikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Like'], meta: { name: 'Like' } }
    /**
     * Find zero or one Like that matches the filter.
     * @param {LikeFindUniqueArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LikeFindUniqueArgs>(args: SelectSubset<T, LikeFindUniqueArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LikeFindUniqueOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LikeFindUniqueOrThrowArgs>(args: SelectSubset<T, LikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LikeFindFirstArgs>(args?: SelectSubset<T, LikeFindFirstArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LikeFindFirstOrThrowArgs>(args?: SelectSubset<T, LikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.like.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.like.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LikeFindManyArgs>(args?: SelectSubset<T, LikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Like.
     * @param {LikeCreateArgs} args - Arguments to create a Like.
     * @example
     * // Create one Like
     * const Like = await prisma.like.create({
     *   data: {
     *     // ... data to create a Like
     *   }
     * })
     * 
     */
    create<T extends LikeCreateArgs>(args: SelectSubset<T, LikeCreateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {LikeCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LikeCreateManyArgs>(args?: SelectSubset<T, LikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Likes and returns the data saved in the database.
     * @param {LikeCreateManyAndReturnArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LikeCreateManyAndReturnArgs>(args?: SelectSubset<T, LikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Like.
     * @param {LikeDeleteArgs} args - Arguments to delete one Like.
     * @example
     * // Delete one Like
     * const Like = await prisma.like.delete({
     *   where: {
     *     // ... filter to delete one Like
     *   }
     * })
     * 
     */
    delete<T extends LikeDeleteArgs>(args: SelectSubset<T, LikeDeleteArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Like.
     * @param {LikeUpdateArgs} args - Arguments to update one Like.
     * @example
     * // Update one Like
     * const like = await prisma.like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LikeUpdateArgs>(args: SelectSubset<T, LikeUpdateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LikeDeleteManyArgs>(args?: SelectSubset<T, LikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LikeUpdateManyArgs>(args: SelectSubset<T, LikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes and returns the data updated in the database.
     * @param {LikeUpdateManyAndReturnArgs} args - Arguments to update many Likes.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.updateManyAndReturn({
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
    updateManyAndReturn<T extends LikeUpdateManyAndReturnArgs>(args: SelectSubset<T, LikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Like.
     * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
     * @example
     * // Update or create a Like
     * const like = await prisma.like.upsert({
     *   create: {
     *     // ... data to create a Like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Like we want to update
     *   }
     * })
     */
    upsert<T extends LikeUpsertArgs>(args: SelectSubset<T, LikeUpsertArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.like.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends LikeCountArgs>(
      args?: Subset<T, LikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LikeAggregateArgs>(args: Subset<T, LikeAggregateArgs>): Prisma.PrismaPromise<GetLikeAggregateType<T>>

    /**
     * Group by Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeGroupByArgs} args - Group by arguments.
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
      T extends LikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikeGroupByArgs['orderBy'] }
        : { orderBy?: LikeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Like model
   */
  readonly fields: LikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produit<T extends ProduitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProduitDefaultArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Like model
   */
  interface LikeFieldRefs {
    readonly id: FieldRef<"Like", 'String'>
    readonly utilisateur_id: FieldRef<"Like", 'String'>
    readonly produit_id: FieldRef<"Like", 'String'>
    readonly createdAt: FieldRef<"Like", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Like findUnique
   */
  export type LikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findUniqueOrThrow
   */
  export type LikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findFirst
   */
  export type LikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findFirstOrThrow
   */
  export type LikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findMany
   */
  export type LikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Likes to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like create
   */
  export type LikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to create a Like.
     */
    data: XOR<LikeCreateInput, LikeUncheckedCreateInput>
  }

  /**
   * Like createMany
   */
  export type LikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Like createManyAndReturn
   */
  export type LikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like update
   */
  export type LikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to update a Like.
     */
    data: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
    /**
     * Choose, which Like to update.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like updateMany
   */
  export type LikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
  }

  /**
   * Like updateManyAndReturn
   */
  export type LikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like upsert
   */
  export type LikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The filter to search for the Like to update in case it exists.
     */
    where: LikeWhereUniqueInput
    /**
     * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
     */
    create: XOR<LikeCreateInput, LikeUncheckedCreateInput>
    /**
     * In case the Like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
  }

  /**
   * Like delete
   */
  export type LikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter which Like to delete.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like deleteMany
   */
  export type LikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Likes to delete
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to delete.
     */
    limit?: number
  }

  /**
   * Like without action
   */
  export type LikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
  }


  /**
   * Model AvisUtile
   */

  export type AggregateAvisUtile = {
    _count: AvisUtileCountAggregateOutputType | null
    _min: AvisUtileMinAggregateOutputType | null
    _max: AvisUtileMaxAggregateOutputType | null
  }

  export type AvisUtileMinAggregateOutputType = {
    id: string | null
    avis_id: string | null
    utilisateur_id: string | null
    utile: boolean | null
    createdAt: Date | null
  }

  export type AvisUtileMaxAggregateOutputType = {
    id: string | null
    avis_id: string | null
    utilisateur_id: string | null
    utile: boolean | null
    createdAt: Date | null
  }

  export type AvisUtileCountAggregateOutputType = {
    id: number
    avis_id: number
    utilisateur_id: number
    utile: number
    createdAt: number
    _all: number
  }


  export type AvisUtileMinAggregateInputType = {
    id?: true
    avis_id?: true
    utilisateur_id?: true
    utile?: true
    createdAt?: true
  }

  export type AvisUtileMaxAggregateInputType = {
    id?: true
    avis_id?: true
    utilisateur_id?: true
    utile?: true
    createdAt?: true
  }

  export type AvisUtileCountAggregateInputType = {
    id?: true
    avis_id?: true
    utilisateur_id?: true
    utile?: true
    createdAt?: true
    _all?: true
  }

  export type AvisUtileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvisUtile to aggregate.
     */
    where?: AvisUtileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvisUtiles to fetch.
     */
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvisUtileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvisUtiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvisUtiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvisUtiles
    **/
    _count?: true | AvisUtileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvisUtileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvisUtileMaxAggregateInputType
  }

  export type GetAvisUtileAggregateType<T extends AvisUtileAggregateArgs> = {
        [P in keyof T & keyof AggregateAvisUtile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvisUtile[P]>
      : GetScalarType<T[P], AggregateAvisUtile[P]>
  }




  export type AvisUtileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisUtileWhereInput
    orderBy?: AvisUtileOrderByWithAggregationInput | AvisUtileOrderByWithAggregationInput[]
    by: AvisUtileScalarFieldEnum[] | AvisUtileScalarFieldEnum
    having?: AvisUtileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvisUtileCountAggregateInputType | true
    _min?: AvisUtileMinAggregateInputType
    _max?: AvisUtileMaxAggregateInputType
  }

  export type AvisUtileGroupByOutputType = {
    id: string
    avis_id: string
    utilisateur_id: string
    utile: boolean
    createdAt: Date
    _count: AvisUtileCountAggregateOutputType | null
    _min: AvisUtileMinAggregateOutputType | null
    _max: AvisUtileMaxAggregateOutputType | null
  }

  type GetAvisUtileGroupByPayload<T extends AvisUtileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvisUtileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvisUtileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvisUtileGroupByOutputType[P]>
            : GetScalarType<T[P], AvisUtileGroupByOutputType[P]>
        }
      >
    >


  export type AvisUtileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    avis_id?: boolean
    utilisateur_id?: boolean
    utile?: boolean
    createdAt?: boolean
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avisUtile"]>

  export type AvisUtileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    avis_id?: boolean
    utilisateur_id?: boolean
    utile?: boolean
    createdAt?: boolean
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avisUtile"]>

  export type AvisUtileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    avis_id?: boolean
    utilisateur_id?: boolean
    utile?: boolean
    createdAt?: boolean
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avisUtile"]>

  export type AvisUtileSelectScalar = {
    id?: boolean
    avis_id?: boolean
    utilisateur_id?: boolean
    utile?: boolean
    createdAt?: boolean
  }

  export type AvisUtileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "avis_id" | "utilisateur_id" | "utile" | "createdAt", ExtArgs["result"]["avisUtile"]>
  export type AvisUtileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AvisUtileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AvisUtileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avis?: boolean | AvisDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AvisUtilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvisUtile"
    objects: {
      avis: Prisma.$AvisPayload<ExtArgs>
      utilisateur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      avis_id: string
      utilisateur_id: string
      utile: boolean
      createdAt: Date
    }, ExtArgs["result"]["avisUtile"]>
    composites: {}
  }

  type AvisUtileGetPayload<S extends boolean | null | undefined | AvisUtileDefaultArgs> = $Result.GetResult<Prisma.$AvisUtilePayload, S>

  type AvisUtileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvisUtileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvisUtileCountAggregateInputType | true
    }

  export interface AvisUtileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvisUtile'], meta: { name: 'AvisUtile' } }
    /**
     * Find zero or one AvisUtile that matches the filter.
     * @param {AvisUtileFindUniqueArgs} args - Arguments to find a AvisUtile
     * @example
     * // Get one AvisUtile
     * const avisUtile = await prisma.avisUtile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvisUtileFindUniqueArgs>(args: SelectSubset<T, AvisUtileFindUniqueArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvisUtile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvisUtileFindUniqueOrThrowArgs} args - Arguments to find a AvisUtile
     * @example
     * // Get one AvisUtile
     * const avisUtile = await prisma.avisUtile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvisUtileFindUniqueOrThrowArgs>(args: SelectSubset<T, AvisUtileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvisUtile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileFindFirstArgs} args - Arguments to find a AvisUtile
     * @example
     * // Get one AvisUtile
     * const avisUtile = await prisma.avisUtile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvisUtileFindFirstArgs>(args?: SelectSubset<T, AvisUtileFindFirstArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvisUtile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileFindFirstOrThrowArgs} args - Arguments to find a AvisUtile
     * @example
     * // Get one AvisUtile
     * const avisUtile = await prisma.avisUtile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvisUtileFindFirstOrThrowArgs>(args?: SelectSubset<T, AvisUtileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvisUtiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvisUtiles
     * const avisUtiles = await prisma.avisUtile.findMany()
     * 
     * // Get first 10 AvisUtiles
     * const avisUtiles = await prisma.avisUtile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avisUtileWithIdOnly = await prisma.avisUtile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvisUtileFindManyArgs>(args?: SelectSubset<T, AvisUtileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvisUtile.
     * @param {AvisUtileCreateArgs} args - Arguments to create a AvisUtile.
     * @example
     * // Create one AvisUtile
     * const AvisUtile = await prisma.avisUtile.create({
     *   data: {
     *     // ... data to create a AvisUtile
     *   }
     * })
     * 
     */
    create<T extends AvisUtileCreateArgs>(args: SelectSubset<T, AvisUtileCreateArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvisUtiles.
     * @param {AvisUtileCreateManyArgs} args - Arguments to create many AvisUtiles.
     * @example
     * // Create many AvisUtiles
     * const avisUtile = await prisma.avisUtile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvisUtileCreateManyArgs>(args?: SelectSubset<T, AvisUtileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvisUtiles and returns the data saved in the database.
     * @param {AvisUtileCreateManyAndReturnArgs} args - Arguments to create many AvisUtiles.
     * @example
     * // Create many AvisUtiles
     * const avisUtile = await prisma.avisUtile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvisUtiles and only return the `id`
     * const avisUtileWithIdOnly = await prisma.avisUtile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvisUtileCreateManyAndReturnArgs>(args?: SelectSubset<T, AvisUtileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvisUtile.
     * @param {AvisUtileDeleteArgs} args - Arguments to delete one AvisUtile.
     * @example
     * // Delete one AvisUtile
     * const AvisUtile = await prisma.avisUtile.delete({
     *   where: {
     *     // ... filter to delete one AvisUtile
     *   }
     * })
     * 
     */
    delete<T extends AvisUtileDeleteArgs>(args: SelectSubset<T, AvisUtileDeleteArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvisUtile.
     * @param {AvisUtileUpdateArgs} args - Arguments to update one AvisUtile.
     * @example
     * // Update one AvisUtile
     * const avisUtile = await prisma.avisUtile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvisUtileUpdateArgs>(args: SelectSubset<T, AvisUtileUpdateArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvisUtiles.
     * @param {AvisUtileDeleteManyArgs} args - Arguments to filter AvisUtiles to delete.
     * @example
     * // Delete a few AvisUtiles
     * const { count } = await prisma.avisUtile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvisUtileDeleteManyArgs>(args?: SelectSubset<T, AvisUtileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvisUtiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvisUtiles
     * const avisUtile = await prisma.avisUtile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvisUtileUpdateManyArgs>(args: SelectSubset<T, AvisUtileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvisUtiles and returns the data updated in the database.
     * @param {AvisUtileUpdateManyAndReturnArgs} args - Arguments to update many AvisUtiles.
     * @example
     * // Update many AvisUtiles
     * const avisUtile = await prisma.avisUtile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvisUtiles and only return the `id`
     * const avisUtileWithIdOnly = await prisma.avisUtile.updateManyAndReturn({
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
    updateManyAndReturn<T extends AvisUtileUpdateManyAndReturnArgs>(args: SelectSubset<T, AvisUtileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvisUtile.
     * @param {AvisUtileUpsertArgs} args - Arguments to update or create a AvisUtile.
     * @example
     * // Update or create a AvisUtile
     * const avisUtile = await prisma.avisUtile.upsert({
     *   create: {
     *     // ... data to create a AvisUtile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvisUtile we want to update
     *   }
     * })
     */
    upsert<T extends AvisUtileUpsertArgs>(args: SelectSubset<T, AvisUtileUpsertArgs<ExtArgs>>): Prisma__AvisUtileClient<$Result.GetResult<Prisma.$AvisUtilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvisUtiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileCountArgs} args - Arguments to filter AvisUtiles to count.
     * @example
     * // Count the number of AvisUtiles
     * const count = await prisma.avisUtile.count({
     *   where: {
     *     // ... the filter for the AvisUtiles we want to count
     *   }
     * })
    **/
    count<T extends AvisUtileCountArgs>(
      args?: Subset<T, AvisUtileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvisUtileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvisUtile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvisUtileAggregateArgs>(args: Subset<T, AvisUtileAggregateArgs>): Prisma.PrismaPromise<GetAvisUtileAggregateType<T>>

    /**
     * Group by AvisUtile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisUtileGroupByArgs} args - Group by arguments.
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
      T extends AvisUtileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvisUtileGroupByArgs['orderBy'] }
        : { orderBy?: AvisUtileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvisUtileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvisUtileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvisUtile model
   */
  readonly fields: AvisUtileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvisUtile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvisUtileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avis<T extends AvisDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvisDefaultArgs<ExtArgs>>): Prisma__AvisClient<$Result.GetResult<Prisma.$AvisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AvisUtile model
   */
  interface AvisUtileFieldRefs {
    readonly id: FieldRef<"AvisUtile", 'String'>
    readonly avis_id: FieldRef<"AvisUtile", 'String'>
    readonly utilisateur_id: FieldRef<"AvisUtile", 'String'>
    readonly utile: FieldRef<"AvisUtile", 'Boolean'>
    readonly createdAt: FieldRef<"AvisUtile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvisUtile findUnique
   */
  export type AvisUtileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter, which AvisUtile to fetch.
     */
    where: AvisUtileWhereUniqueInput
  }

  /**
   * AvisUtile findUniqueOrThrow
   */
  export type AvisUtileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter, which AvisUtile to fetch.
     */
    where: AvisUtileWhereUniqueInput
  }

  /**
   * AvisUtile findFirst
   */
  export type AvisUtileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter, which AvisUtile to fetch.
     */
    where?: AvisUtileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvisUtiles to fetch.
     */
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvisUtiles.
     */
    cursor?: AvisUtileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvisUtiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvisUtiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvisUtiles.
     */
    distinct?: AvisUtileScalarFieldEnum | AvisUtileScalarFieldEnum[]
  }

  /**
   * AvisUtile findFirstOrThrow
   */
  export type AvisUtileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter, which AvisUtile to fetch.
     */
    where?: AvisUtileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvisUtiles to fetch.
     */
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvisUtiles.
     */
    cursor?: AvisUtileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvisUtiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvisUtiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvisUtiles.
     */
    distinct?: AvisUtileScalarFieldEnum | AvisUtileScalarFieldEnum[]
  }

  /**
   * AvisUtile findMany
   */
  export type AvisUtileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter, which AvisUtiles to fetch.
     */
    where?: AvisUtileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvisUtiles to fetch.
     */
    orderBy?: AvisUtileOrderByWithRelationInput | AvisUtileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvisUtiles.
     */
    cursor?: AvisUtileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvisUtiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvisUtiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvisUtiles.
     */
    distinct?: AvisUtileScalarFieldEnum | AvisUtileScalarFieldEnum[]
  }

  /**
   * AvisUtile create
   */
  export type AvisUtileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * The data needed to create a AvisUtile.
     */
    data: XOR<AvisUtileCreateInput, AvisUtileUncheckedCreateInput>
  }

  /**
   * AvisUtile createMany
   */
  export type AvisUtileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvisUtiles.
     */
    data: AvisUtileCreateManyInput | AvisUtileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvisUtile createManyAndReturn
   */
  export type AvisUtileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * The data used to create many AvisUtiles.
     */
    data: AvisUtileCreateManyInput | AvisUtileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvisUtile update
   */
  export type AvisUtileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * The data needed to update a AvisUtile.
     */
    data: XOR<AvisUtileUpdateInput, AvisUtileUncheckedUpdateInput>
    /**
     * Choose, which AvisUtile to update.
     */
    where: AvisUtileWhereUniqueInput
  }

  /**
   * AvisUtile updateMany
   */
  export type AvisUtileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvisUtiles.
     */
    data: XOR<AvisUtileUpdateManyMutationInput, AvisUtileUncheckedUpdateManyInput>
    /**
     * Filter which AvisUtiles to update
     */
    where?: AvisUtileWhereInput
    /**
     * Limit how many AvisUtiles to update.
     */
    limit?: number
  }

  /**
   * AvisUtile updateManyAndReturn
   */
  export type AvisUtileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * The data used to update AvisUtiles.
     */
    data: XOR<AvisUtileUpdateManyMutationInput, AvisUtileUncheckedUpdateManyInput>
    /**
     * Filter which AvisUtiles to update
     */
    where?: AvisUtileWhereInput
    /**
     * Limit how many AvisUtiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvisUtile upsert
   */
  export type AvisUtileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * The filter to search for the AvisUtile to update in case it exists.
     */
    where: AvisUtileWhereUniqueInput
    /**
     * In case the AvisUtile found by the `where` argument doesn't exist, create a new AvisUtile with this data.
     */
    create: XOR<AvisUtileCreateInput, AvisUtileUncheckedCreateInput>
    /**
     * In case the AvisUtile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvisUtileUpdateInput, AvisUtileUncheckedUpdateInput>
  }

  /**
   * AvisUtile delete
   */
  export type AvisUtileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
    /**
     * Filter which AvisUtile to delete.
     */
    where: AvisUtileWhereUniqueInput
  }

  /**
   * AvisUtile deleteMany
   */
  export type AvisUtileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvisUtiles to delete
     */
    where?: AvisUtileWhereInput
    /**
     * Limit how many AvisUtiles to delete.
     */
    limit?: number
  }

  /**
   * AvisUtile without action
   */
  export type AvisUtileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvisUtile
     */
    select?: AvisUtileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvisUtile
     */
    omit?: AvisUtileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvisUtileInclude<ExtArgs> | null
  }


  /**
   * Model TypeSeance
   */

  export type AggregateTypeSeance = {
    _count: TypeSeanceCountAggregateOutputType | null
    _avg: TypeSeanceAvgAggregateOutputType | null
    _sum: TypeSeanceSumAggregateOutputType | null
    _min: TypeSeanceMinAggregateOutputType | null
    _max: TypeSeanceMaxAggregateOutputType | null
  }

  export type TypeSeanceAvgAggregateOutputType = {
    duree: number | null
    prix: number | null
  }

  export type TypeSeanceSumAggregateOutputType = {
    duree: number | null
    prix: number | null
  }

  export type TypeSeanceMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    duree: number | null
    prix: number | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TypeSeanceMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    duree: number | null
    prix: number | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TypeSeanceCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    duree: number
    prix: number
    actif: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TypeSeanceAvgAggregateInputType = {
    duree?: true
    prix?: true
  }

  export type TypeSeanceSumAggregateInputType = {
    duree?: true
    prix?: true
  }

  export type TypeSeanceMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    duree?: true
    prix?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TypeSeanceMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    duree?: true
    prix?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TypeSeanceCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    duree?: true
    prix?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TypeSeanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TypeSeance to aggregate.
     */
    where?: TypeSeanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypeSeances to fetch.
     */
    orderBy?: TypeSeanceOrderByWithRelationInput | TypeSeanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TypeSeanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypeSeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypeSeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TypeSeances
    **/
    _count?: true | TypeSeanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TypeSeanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TypeSeanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TypeSeanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TypeSeanceMaxAggregateInputType
  }

  export type GetTypeSeanceAggregateType<T extends TypeSeanceAggregateArgs> = {
        [P in keyof T & keyof AggregateTypeSeance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTypeSeance[P]>
      : GetScalarType<T[P], AggregateTypeSeance[P]>
  }




  export type TypeSeanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TypeSeanceWhereInput
    orderBy?: TypeSeanceOrderByWithAggregationInput | TypeSeanceOrderByWithAggregationInput[]
    by: TypeSeanceScalarFieldEnum[] | TypeSeanceScalarFieldEnum
    having?: TypeSeanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TypeSeanceCountAggregateInputType | true
    _avg?: TypeSeanceAvgAggregateInputType
    _sum?: TypeSeanceSumAggregateInputType
    _min?: TypeSeanceMinAggregateInputType
    _max?: TypeSeanceMaxAggregateInputType
  }

  export type TypeSeanceGroupByOutputType = {
    id: string
    nom: string
    description: string
    duree: number
    prix: number
    actif: boolean
    createdAt: Date
    updatedAt: Date
    _count: TypeSeanceCountAggregateOutputType | null
    _avg: TypeSeanceAvgAggregateOutputType | null
    _sum: TypeSeanceSumAggregateOutputType | null
    _min: TypeSeanceMinAggregateOutputType | null
    _max: TypeSeanceMaxAggregateOutputType | null
  }

  type GetTypeSeanceGroupByPayload<T extends TypeSeanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TypeSeanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TypeSeanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TypeSeanceGroupByOutputType[P]>
            : GetScalarType<T[P], TypeSeanceGroupByOutputType[P]>
        }
      >
    >


  export type TypeSeanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    duree?: boolean
    prix?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rendezVous?: boolean | TypeSeance$rendezVousArgs<ExtArgs>
    _count?: boolean | TypeSeanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["typeSeance"]>

  export type TypeSeanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    duree?: boolean
    prix?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["typeSeance"]>

  export type TypeSeanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    duree?: boolean
    prix?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["typeSeance"]>

  export type TypeSeanceSelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
    duree?: boolean
    prix?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TypeSeanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description" | "duree" | "prix" | "actif" | "createdAt" | "updatedAt", ExtArgs["result"]["typeSeance"]>
  export type TypeSeanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rendezVous?: boolean | TypeSeance$rendezVousArgs<ExtArgs>
    _count?: boolean | TypeSeanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TypeSeanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TypeSeanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TypeSeancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TypeSeance"
    objects: {
      rendezVous: Prisma.$RendezVousPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string
      duree: number
      prix: number
      actif: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["typeSeance"]>
    composites: {}
  }

  type TypeSeanceGetPayload<S extends boolean | null | undefined | TypeSeanceDefaultArgs> = $Result.GetResult<Prisma.$TypeSeancePayload, S>

  type TypeSeanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TypeSeanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TypeSeanceCountAggregateInputType | true
    }

  export interface TypeSeanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TypeSeance'], meta: { name: 'TypeSeance' } }
    /**
     * Find zero or one TypeSeance that matches the filter.
     * @param {TypeSeanceFindUniqueArgs} args - Arguments to find a TypeSeance
     * @example
     * // Get one TypeSeance
     * const typeSeance = await prisma.typeSeance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TypeSeanceFindUniqueArgs>(args: SelectSubset<T, TypeSeanceFindUniqueArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TypeSeance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TypeSeanceFindUniqueOrThrowArgs} args - Arguments to find a TypeSeance
     * @example
     * // Get one TypeSeance
     * const typeSeance = await prisma.typeSeance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TypeSeanceFindUniqueOrThrowArgs>(args: SelectSubset<T, TypeSeanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TypeSeance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceFindFirstArgs} args - Arguments to find a TypeSeance
     * @example
     * // Get one TypeSeance
     * const typeSeance = await prisma.typeSeance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TypeSeanceFindFirstArgs>(args?: SelectSubset<T, TypeSeanceFindFirstArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TypeSeance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceFindFirstOrThrowArgs} args - Arguments to find a TypeSeance
     * @example
     * // Get one TypeSeance
     * const typeSeance = await prisma.typeSeance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TypeSeanceFindFirstOrThrowArgs>(args?: SelectSubset<T, TypeSeanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TypeSeances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TypeSeances
     * const typeSeances = await prisma.typeSeance.findMany()
     * 
     * // Get first 10 TypeSeances
     * const typeSeances = await prisma.typeSeance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const typeSeanceWithIdOnly = await prisma.typeSeance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TypeSeanceFindManyArgs>(args?: SelectSubset<T, TypeSeanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TypeSeance.
     * @param {TypeSeanceCreateArgs} args - Arguments to create a TypeSeance.
     * @example
     * // Create one TypeSeance
     * const TypeSeance = await prisma.typeSeance.create({
     *   data: {
     *     // ... data to create a TypeSeance
     *   }
     * })
     * 
     */
    create<T extends TypeSeanceCreateArgs>(args: SelectSubset<T, TypeSeanceCreateArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TypeSeances.
     * @param {TypeSeanceCreateManyArgs} args - Arguments to create many TypeSeances.
     * @example
     * // Create many TypeSeances
     * const typeSeance = await prisma.typeSeance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TypeSeanceCreateManyArgs>(args?: SelectSubset<T, TypeSeanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TypeSeances and returns the data saved in the database.
     * @param {TypeSeanceCreateManyAndReturnArgs} args - Arguments to create many TypeSeances.
     * @example
     * // Create many TypeSeances
     * const typeSeance = await prisma.typeSeance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TypeSeances and only return the `id`
     * const typeSeanceWithIdOnly = await prisma.typeSeance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TypeSeanceCreateManyAndReturnArgs>(args?: SelectSubset<T, TypeSeanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TypeSeance.
     * @param {TypeSeanceDeleteArgs} args - Arguments to delete one TypeSeance.
     * @example
     * // Delete one TypeSeance
     * const TypeSeance = await prisma.typeSeance.delete({
     *   where: {
     *     // ... filter to delete one TypeSeance
     *   }
     * })
     * 
     */
    delete<T extends TypeSeanceDeleteArgs>(args: SelectSubset<T, TypeSeanceDeleteArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TypeSeance.
     * @param {TypeSeanceUpdateArgs} args - Arguments to update one TypeSeance.
     * @example
     * // Update one TypeSeance
     * const typeSeance = await prisma.typeSeance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TypeSeanceUpdateArgs>(args: SelectSubset<T, TypeSeanceUpdateArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TypeSeances.
     * @param {TypeSeanceDeleteManyArgs} args - Arguments to filter TypeSeances to delete.
     * @example
     * // Delete a few TypeSeances
     * const { count } = await prisma.typeSeance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TypeSeanceDeleteManyArgs>(args?: SelectSubset<T, TypeSeanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TypeSeances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TypeSeances
     * const typeSeance = await prisma.typeSeance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TypeSeanceUpdateManyArgs>(args: SelectSubset<T, TypeSeanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TypeSeances and returns the data updated in the database.
     * @param {TypeSeanceUpdateManyAndReturnArgs} args - Arguments to update many TypeSeances.
     * @example
     * // Update many TypeSeances
     * const typeSeance = await prisma.typeSeance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TypeSeances and only return the `id`
     * const typeSeanceWithIdOnly = await prisma.typeSeance.updateManyAndReturn({
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
    updateManyAndReturn<T extends TypeSeanceUpdateManyAndReturnArgs>(args: SelectSubset<T, TypeSeanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TypeSeance.
     * @param {TypeSeanceUpsertArgs} args - Arguments to update or create a TypeSeance.
     * @example
     * // Update or create a TypeSeance
     * const typeSeance = await prisma.typeSeance.upsert({
     *   create: {
     *     // ... data to create a TypeSeance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TypeSeance we want to update
     *   }
     * })
     */
    upsert<T extends TypeSeanceUpsertArgs>(args: SelectSubset<T, TypeSeanceUpsertArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TypeSeances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceCountArgs} args - Arguments to filter TypeSeances to count.
     * @example
     * // Count the number of TypeSeances
     * const count = await prisma.typeSeance.count({
     *   where: {
     *     // ... the filter for the TypeSeances we want to count
     *   }
     * })
    **/
    count<T extends TypeSeanceCountArgs>(
      args?: Subset<T, TypeSeanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TypeSeanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TypeSeance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TypeSeanceAggregateArgs>(args: Subset<T, TypeSeanceAggregateArgs>): Prisma.PrismaPromise<GetTypeSeanceAggregateType<T>>

    /**
     * Group by TypeSeance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeSeanceGroupByArgs} args - Group by arguments.
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
      T extends TypeSeanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TypeSeanceGroupByArgs['orderBy'] }
        : { orderBy?: TypeSeanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TypeSeanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypeSeanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TypeSeance model
   */
  readonly fields: TypeSeanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TypeSeance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TypeSeanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rendezVous<T extends TypeSeance$rendezVousArgs<ExtArgs> = {}>(args?: Subset<T, TypeSeance$rendezVousArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TypeSeance model
   */
  interface TypeSeanceFieldRefs {
    readonly id: FieldRef<"TypeSeance", 'String'>
    readonly nom: FieldRef<"TypeSeance", 'String'>
    readonly description: FieldRef<"TypeSeance", 'String'>
    readonly duree: FieldRef<"TypeSeance", 'Int'>
    readonly prix: FieldRef<"TypeSeance", 'Int'>
    readonly actif: FieldRef<"TypeSeance", 'Boolean'>
    readonly createdAt: FieldRef<"TypeSeance", 'DateTime'>
    readonly updatedAt: FieldRef<"TypeSeance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TypeSeance findUnique
   */
  export type TypeSeanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter, which TypeSeance to fetch.
     */
    where: TypeSeanceWhereUniqueInput
  }

  /**
   * TypeSeance findUniqueOrThrow
   */
  export type TypeSeanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter, which TypeSeance to fetch.
     */
    where: TypeSeanceWhereUniqueInput
  }

  /**
   * TypeSeance findFirst
   */
  export type TypeSeanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter, which TypeSeance to fetch.
     */
    where?: TypeSeanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypeSeances to fetch.
     */
    orderBy?: TypeSeanceOrderByWithRelationInput | TypeSeanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TypeSeances.
     */
    cursor?: TypeSeanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypeSeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypeSeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TypeSeances.
     */
    distinct?: TypeSeanceScalarFieldEnum | TypeSeanceScalarFieldEnum[]
  }

  /**
   * TypeSeance findFirstOrThrow
   */
  export type TypeSeanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter, which TypeSeance to fetch.
     */
    where?: TypeSeanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypeSeances to fetch.
     */
    orderBy?: TypeSeanceOrderByWithRelationInput | TypeSeanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TypeSeances.
     */
    cursor?: TypeSeanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypeSeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypeSeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TypeSeances.
     */
    distinct?: TypeSeanceScalarFieldEnum | TypeSeanceScalarFieldEnum[]
  }

  /**
   * TypeSeance findMany
   */
  export type TypeSeanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter, which TypeSeances to fetch.
     */
    where?: TypeSeanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TypeSeances to fetch.
     */
    orderBy?: TypeSeanceOrderByWithRelationInput | TypeSeanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TypeSeances.
     */
    cursor?: TypeSeanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TypeSeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TypeSeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TypeSeances.
     */
    distinct?: TypeSeanceScalarFieldEnum | TypeSeanceScalarFieldEnum[]
  }

  /**
   * TypeSeance create
   */
  export type TypeSeanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * The data needed to create a TypeSeance.
     */
    data: XOR<TypeSeanceCreateInput, TypeSeanceUncheckedCreateInput>
  }

  /**
   * TypeSeance createMany
   */
  export type TypeSeanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TypeSeances.
     */
    data: TypeSeanceCreateManyInput | TypeSeanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TypeSeance createManyAndReturn
   */
  export type TypeSeanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * The data used to create many TypeSeances.
     */
    data: TypeSeanceCreateManyInput | TypeSeanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TypeSeance update
   */
  export type TypeSeanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * The data needed to update a TypeSeance.
     */
    data: XOR<TypeSeanceUpdateInput, TypeSeanceUncheckedUpdateInput>
    /**
     * Choose, which TypeSeance to update.
     */
    where: TypeSeanceWhereUniqueInput
  }

  /**
   * TypeSeance updateMany
   */
  export type TypeSeanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TypeSeances.
     */
    data: XOR<TypeSeanceUpdateManyMutationInput, TypeSeanceUncheckedUpdateManyInput>
    /**
     * Filter which TypeSeances to update
     */
    where?: TypeSeanceWhereInput
    /**
     * Limit how many TypeSeances to update.
     */
    limit?: number
  }

  /**
   * TypeSeance updateManyAndReturn
   */
  export type TypeSeanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * The data used to update TypeSeances.
     */
    data: XOR<TypeSeanceUpdateManyMutationInput, TypeSeanceUncheckedUpdateManyInput>
    /**
     * Filter which TypeSeances to update
     */
    where?: TypeSeanceWhereInput
    /**
     * Limit how many TypeSeances to update.
     */
    limit?: number
  }

  /**
   * TypeSeance upsert
   */
  export type TypeSeanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * The filter to search for the TypeSeance to update in case it exists.
     */
    where: TypeSeanceWhereUniqueInput
    /**
     * In case the TypeSeance found by the `where` argument doesn't exist, create a new TypeSeance with this data.
     */
    create: XOR<TypeSeanceCreateInput, TypeSeanceUncheckedCreateInput>
    /**
     * In case the TypeSeance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TypeSeanceUpdateInput, TypeSeanceUncheckedUpdateInput>
  }

  /**
   * TypeSeance delete
   */
  export type TypeSeanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
    /**
     * Filter which TypeSeance to delete.
     */
    where: TypeSeanceWhereUniqueInput
  }

  /**
   * TypeSeance deleteMany
   */
  export type TypeSeanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TypeSeances to delete
     */
    where?: TypeSeanceWhereInput
    /**
     * Limit how many TypeSeances to delete.
     */
    limit?: number
  }

  /**
   * TypeSeance.rendezVous
   */
  export type TypeSeance$rendezVousArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    cursor?: RendezVousWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * TypeSeance without action
   */
  export type TypeSeanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeSeance
     */
    select?: TypeSeanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TypeSeance
     */
    omit?: TypeSeanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeSeanceInclude<ExtArgs> | null
  }


  /**
   * Model RendezVous
   */

  export type AggregateRendezVous = {
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  export type RendezVousAvgAggregateOutputType = {
    duree: number | null
  }

  export type RendezVousSumAggregateOutputType = {
    duree: number | null
  }

  export type RendezVousMinAggregateOutputType = {
    id: string | null
    utilisateur_id: string | null
    date_heure: Date | null
    duree: number | null
    type_seance_id: string | null
    notes: string | null
    statut: $Enums.AppointmentStatus | null
    raison_refus: string | null
    notes_admin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RendezVousMaxAggregateOutputType = {
    id: string | null
    utilisateur_id: string | null
    date_heure: Date | null
    duree: number | null
    type_seance_id: string | null
    notes: string | null
    statut: $Enums.AppointmentStatus | null
    raison_refus: string | null
    notes_admin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RendezVousCountAggregateOutputType = {
    id: number
    utilisateur_id: number
    date_heure: number
    duree: number
    type_seance_id: number
    notes: number
    statut: number
    raison_refus: number
    notes_admin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RendezVousAvgAggregateInputType = {
    duree?: true
  }

  export type RendezVousSumAggregateInputType = {
    duree?: true
  }

  export type RendezVousMinAggregateInputType = {
    id?: true
    utilisateur_id?: true
    date_heure?: true
    duree?: true
    type_seance_id?: true
    notes?: true
    statut?: true
    raison_refus?: true
    notes_admin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RendezVousMaxAggregateInputType = {
    id?: true
    utilisateur_id?: true
    date_heure?: true
    duree?: true
    type_seance_id?: true
    notes?: true
    statut?: true
    raison_refus?: true
    notes_admin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RendezVousCountAggregateInputType = {
    id?: true
    utilisateur_id?: true
    date_heure?: true
    duree?: true
    type_seance_id?: true
    notes?: true
    statut?: true
    raison_refus?: true
    notes_admin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RendezVousAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to aggregate.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RendezVous
    **/
    _count?: true | RendezVousCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RendezVousAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RendezVousSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RendezVousMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RendezVousMaxAggregateInputType
  }

  export type GetRendezVousAggregateType<T extends RendezVousAggregateArgs> = {
        [P in keyof T & keyof AggregateRendezVous]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRendezVous[P]>
      : GetScalarType<T[P], AggregateRendezVous[P]>
  }




  export type RendezVousGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RendezVousWhereInput
    orderBy?: RendezVousOrderByWithAggregationInput | RendezVousOrderByWithAggregationInput[]
    by: RendezVousScalarFieldEnum[] | RendezVousScalarFieldEnum
    having?: RendezVousScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RendezVousCountAggregateInputType | true
    _avg?: RendezVousAvgAggregateInputType
    _sum?: RendezVousSumAggregateInputType
    _min?: RendezVousMinAggregateInputType
    _max?: RendezVousMaxAggregateInputType
  }

  export type RendezVousGroupByOutputType = {
    id: string
    utilisateur_id: string
    date_heure: Date
    duree: number
    type_seance_id: string
    notes: string | null
    statut: $Enums.AppointmentStatus
    raison_refus: string | null
    notes_admin: string | null
    createdAt: Date
    updatedAt: Date
    _count: RendezVousCountAggregateOutputType | null
    _avg: RendezVousAvgAggregateOutputType | null
    _sum: RendezVousSumAggregateOutputType | null
    _min: RendezVousMinAggregateOutputType | null
    _max: RendezVousMaxAggregateOutputType | null
  }

  type GetRendezVousGroupByPayload<T extends RendezVousGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RendezVousGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RendezVousGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
            : GetScalarType<T[P], RendezVousGroupByOutputType[P]>
        }
      >
    >


  export type RendezVousSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    date_heure?: boolean
    duree?: boolean
    type_seance_id?: boolean
    notes?: boolean
    statut?: boolean
    raison_refus?: boolean
    notes_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    date_heure?: boolean
    duree?: boolean
    type_seance_id?: boolean
    notes?: boolean
    statut?: boolean
    raison_refus?: boolean
    notes_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateur_id?: boolean
    date_heure?: boolean
    duree?: boolean
    type_seance_id?: boolean
    notes?: boolean
    statut?: boolean
    raison_refus?: boolean
    notes_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rendezVous"]>

  export type RendezVousSelectScalar = {
    id?: boolean
    utilisateur_id?: boolean
    date_heure?: boolean
    duree?: boolean
    type_seance_id?: boolean
    notes?: boolean
    statut?: boolean
    raison_refus?: boolean
    notes_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RendezVousOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "utilisateur_id" | "date_heure" | "duree" | "type_seance_id" | "notes" | "statut" | "raison_refus" | "notes_admin" | "createdAt" | "updatedAt", ExtArgs["result"]["rendezVous"]>
  export type RendezVousInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RendezVousIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type_seance?: boolean | TypeSeanceDefaultArgs<ExtArgs>
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RendezVousPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RendezVous"
    objects: {
      type_seance: Prisma.$TypeSeancePayload<ExtArgs>
      utilisateur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      utilisateur_id: string
      date_heure: Date
      duree: number
      type_seance_id: string
      notes: string | null
      statut: $Enums.AppointmentStatus
      raison_refus: string | null
      notes_admin: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rendezVous"]>
    composites: {}
  }

  type RendezVousGetPayload<S extends boolean | null | undefined | RendezVousDefaultArgs> = $Result.GetResult<Prisma.$RendezVousPayload, S>

  type RendezVousCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RendezVousFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RendezVousCountAggregateInputType | true
    }

  export interface RendezVousDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RendezVous'], meta: { name: 'RendezVous' } }
    /**
     * Find zero or one RendezVous that matches the filter.
     * @param {RendezVousFindUniqueArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RendezVousFindUniqueArgs>(args: SelectSubset<T, RendezVousFindUniqueArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RendezVous that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RendezVousFindUniqueOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RendezVousFindUniqueOrThrowArgs>(args: SelectSubset<T, RendezVousFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RendezVousFindFirstArgs>(args?: SelectSubset<T, RendezVousFindFirstArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RendezVous that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindFirstOrThrowArgs} args - Arguments to find a RendezVous
     * @example
     * // Get one RendezVous
     * const rendezVous = await prisma.rendezVous.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RendezVousFindFirstOrThrowArgs>(args?: SelectSubset<T, RendezVousFindFirstOrThrowArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RendezVous that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RendezVous
     * const rendezVous = await prisma.rendezVous.findMany()
     * 
     * // Get first 10 RendezVous
     * const rendezVous = await prisma.rendezVous.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RendezVousFindManyArgs>(args?: SelectSubset<T, RendezVousFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RendezVous.
     * @param {RendezVousCreateArgs} args - Arguments to create a RendezVous.
     * @example
     * // Create one RendezVous
     * const RendezVous = await prisma.rendezVous.create({
     *   data: {
     *     // ... data to create a RendezVous
     *   }
     * })
     * 
     */
    create<T extends RendezVousCreateArgs>(args: SelectSubset<T, RendezVousCreateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RendezVous.
     * @param {RendezVousCreateManyArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RendezVousCreateManyArgs>(args?: SelectSubset<T, RendezVousCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RendezVous and returns the data saved in the database.
     * @param {RendezVousCreateManyAndReturnArgs} args - Arguments to create many RendezVous.
     * @example
     * // Create many RendezVous
     * const rendezVous = await prisma.rendezVous.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RendezVousCreateManyAndReturnArgs>(args?: SelectSubset<T, RendezVousCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RendezVous.
     * @param {RendezVousDeleteArgs} args - Arguments to delete one RendezVous.
     * @example
     * // Delete one RendezVous
     * const RendezVous = await prisma.rendezVous.delete({
     *   where: {
     *     // ... filter to delete one RendezVous
     *   }
     * })
     * 
     */
    delete<T extends RendezVousDeleteArgs>(args: SelectSubset<T, RendezVousDeleteArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RendezVous.
     * @param {RendezVousUpdateArgs} args - Arguments to update one RendezVous.
     * @example
     * // Update one RendezVous
     * const rendezVous = await prisma.rendezVous.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RendezVousUpdateArgs>(args: SelectSubset<T, RendezVousUpdateArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RendezVous.
     * @param {RendezVousDeleteManyArgs} args - Arguments to filter RendezVous to delete.
     * @example
     * // Delete a few RendezVous
     * const { count } = await prisma.rendezVous.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RendezVousDeleteManyArgs>(args?: SelectSubset<T, RendezVousDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RendezVousUpdateManyArgs>(args: SelectSubset<T, RendezVousUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RendezVous and returns the data updated in the database.
     * @param {RendezVousUpdateManyAndReturnArgs} args - Arguments to update many RendezVous.
     * @example
     * // Update many RendezVous
     * const rendezVous = await prisma.rendezVous.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RendezVous and only return the `id`
     * const rendezVousWithIdOnly = await prisma.rendezVous.updateManyAndReturn({
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
    updateManyAndReturn<T extends RendezVousUpdateManyAndReturnArgs>(args: SelectSubset<T, RendezVousUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RendezVous.
     * @param {RendezVousUpsertArgs} args - Arguments to update or create a RendezVous.
     * @example
     * // Update or create a RendezVous
     * const rendezVous = await prisma.rendezVous.upsert({
     *   create: {
     *     // ... data to create a RendezVous
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RendezVous we want to update
     *   }
     * })
     */
    upsert<T extends RendezVousUpsertArgs>(args: SelectSubset<T, RendezVousUpsertArgs<ExtArgs>>): Prisma__RendezVousClient<$Result.GetResult<Prisma.$RendezVousPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousCountArgs} args - Arguments to filter RendezVous to count.
     * @example
     * // Count the number of RendezVous
     * const count = await prisma.rendezVous.count({
     *   where: {
     *     // ... the filter for the RendezVous we want to count
     *   }
     * })
    **/
    count<T extends RendezVousCountArgs>(
      args?: Subset<T, RendezVousCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RendezVousCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RendezVousAggregateArgs>(args: Subset<T, RendezVousAggregateArgs>): Prisma.PrismaPromise<GetRendezVousAggregateType<T>>

    /**
     * Group by RendezVous.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RendezVousGroupByArgs} args - Group by arguments.
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
      T extends RendezVousGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RendezVousGroupByArgs['orderBy'] }
        : { orderBy?: RendezVousGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RendezVousGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRendezVousGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RendezVous model
   */
  readonly fields: RendezVousFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RendezVous.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RendezVousClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    type_seance<T extends TypeSeanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TypeSeanceDefaultArgs<ExtArgs>>): Prisma__TypeSeanceClient<$Result.GetResult<Prisma.$TypeSeancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RendezVous model
   */
  interface RendezVousFieldRefs {
    readonly id: FieldRef<"RendezVous", 'String'>
    readonly utilisateur_id: FieldRef<"RendezVous", 'String'>
    readonly date_heure: FieldRef<"RendezVous", 'DateTime'>
    readonly duree: FieldRef<"RendezVous", 'Int'>
    readonly type_seance_id: FieldRef<"RendezVous", 'String'>
    readonly notes: FieldRef<"RendezVous", 'String'>
    readonly statut: FieldRef<"RendezVous", 'AppointmentStatus'>
    readonly raison_refus: FieldRef<"RendezVous", 'String'>
    readonly notes_admin: FieldRef<"RendezVous", 'String'>
    readonly createdAt: FieldRef<"RendezVous", 'DateTime'>
    readonly updatedAt: FieldRef<"RendezVous", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RendezVous findUnique
   */
  export type RendezVousFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findUniqueOrThrow
   */
  export type RendezVousFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous findFirst
   */
  export type RendezVousFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findFirstOrThrow
   */
  export type RendezVousFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous findMany
   */
  export type RendezVousFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter, which RendezVous to fetch.
     */
    where?: RendezVousWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RendezVous to fetch.
     */
    orderBy?: RendezVousOrderByWithRelationInput | RendezVousOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RendezVous.
     */
    cursor?: RendezVousWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RendezVous from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RendezVous.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RendezVous.
     */
    distinct?: RendezVousScalarFieldEnum | RendezVousScalarFieldEnum[]
  }

  /**
   * RendezVous create
   */
  export type RendezVousCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to create a RendezVous.
     */
    data: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
  }

  /**
   * RendezVous createMany
   */
  export type RendezVousCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RendezVous createManyAndReturn
   */
  export type RendezVousCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to create many RendezVous.
     */
    data: RendezVousCreateManyInput | RendezVousCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous update
   */
  export type RendezVousUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The data needed to update a RendezVous.
     */
    data: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
    /**
     * Choose, which RendezVous to update.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous updateMany
   */
  export type RendezVousUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
  }

  /**
   * RendezVous updateManyAndReturn
   */
  export type RendezVousUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * The data used to update RendezVous.
     */
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyInput>
    /**
     * Filter which RendezVous to update
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RendezVous upsert
   */
  export type RendezVousUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * The filter to search for the RendezVous to update in case it exists.
     */
    where: RendezVousWhereUniqueInput
    /**
     * In case the RendezVous found by the `where` argument doesn't exist, create a new RendezVous with this data.
     */
    create: XOR<RendezVousCreateInput, RendezVousUncheckedCreateInput>
    /**
     * In case the RendezVous was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RendezVousUpdateInput, RendezVousUncheckedUpdateInput>
  }

  /**
   * RendezVous delete
   */
  export type RendezVousDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
    /**
     * Filter which RendezVous to delete.
     */
    where: RendezVousWhereUniqueInput
  }

  /**
   * RendezVous deleteMany
   */
  export type RendezVousDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RendezVous to delete
     */
    where?: RendezVousWhereInput
    /**
     * Limit how many RendezVous to delete.
     */
    limit?: number
  }

  /**
   * RendezVous without action
   */
  export type RendezVousDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RendezVous
     */
    select?: RendezVousSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RendezVous
     */
    omit?: RendezVousOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RendezVousInclude<ExtArgs> | null
  }


  /**
   * Model Configuration
   */

  export type AggregateConfiguration = {
    _count: ConfigurationCountAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  export type ConfigurationMinAggregateOutputType = {
    id: string | null
    cle: string | null
    valeur: string | null
    description: string | null
    updatedAt: Date | null
  }

  export type ConfigurationMaxAggregateOutputType = {
    id: string | null
    cle: string | null
    valeur: string | null
    description: string | null
    updatedAt: Date | null
  }

  export type ConfigurationCountAggregateOutputType = {
    id: number
    cle: number
    valeur: number
    description: number
    updatedAt: number
    _all: number
  }


  export type ConfigurationMinAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    updatedAt?: true
  }

  export type ConfigurationMaxAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    updatedAt?: true
  }

  export type ConfigurationCountAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    updatedAt?: true
    _all?: true
  }

  export type ConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuration to aggregate.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configurations
    **/
    _count?: true | ConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigurationMaxAggregateInputType
  }

  export type GetConfigurationAggregateType<T extends ConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguration[P]>
      : GetScalarType<T[P], AggregateConfiguration[P]>
  }




  export type ConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigurationWhereInput
    orderBy?: ConfigurationOrderByWithAggregationInput | ConfigurationOrderByWithAggregationInput[]
    by: ConfigurationScalarFieldEnum[] | ConfigurationScalarFieldEnum
    having?: ConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigurationCountAggregateInputType | true
    _min?: ConfigurationMinAggregateInputType
    _max?: ConfigurationMaxAggregateInputType
  }

  export type ConfigurationGroupByOutputType = {
    id: string
    cle: string
    valeur: string
    description: string | null
    updatedAt: Date
    _count: ConfigurationCountAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  type GetConfigurationGroupByPayload<T extends ConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type ConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectScalar = {
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    updatedAt?: boolean
  }

  export type ConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cle" | "valeur" | "description" | "updatedAt", ExtArgs["result"]["configuration"]>

  export type $ConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Configuration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cle: string
      valeur: string
      description: string | null
      updatedAt: Date
    }, ExtArgs["result"]["configuration"]>
    composites: {}
  }

  type ConfigurationGetPayload<S extends boolean | null | undefined | ConfigurationDefaultArgs> = $Result.GetResult<Prisma.$ConfigurationPayload, S>

  type ConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfigurationCountAggregateInputType | true
    }

  export interface ConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Configuration'], meta: { name: 'Configuration' } }
    /**
     * Find zero or one Configuration that matches the filter.
     * @param {ConfigurationFindUniqueArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfigurationFindUniqueArgs>(args: SelectSubset<T, ConfigurationFindUniqueArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfigurationFindUniqueOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfigurationFindFirstArgs>(args?: SelectSubset<T, ConfigurationFindFirstArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configurations
     * const configurations = await prisma.configuration.findMany()
     * 
     * // Get first 10 Configurations
     * const configurations = await prisma.configuration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configurationWithIdOnly = await prisma.configuration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfigurationFindManyArgs>(args?: SelectSubset<T, ConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuration.
     * @param {ConfigurationCreateArgs} args - Arguments to create a Configuration.
     * @example
     * // Create one Configuration
     * const Configuration = await prisma.configuration.create({
     *   data: {
     *     // ... data to create a Configuration
     *   }
     * })
     * 
     */
    create<T extends ConfigurationCreateArgs>(args: SelectSubset<T, ConfigurationCreateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configurations.
     * @param {ConfigurationCreateManyArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfigurationCreateManyArgs>(args?: SelectSubset<T, ConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configurations and returns the data saved in the database.
     * @param {ConfigurationCreateManyAndReturnArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configurations and only return the `id`
     * const configurationWithIdOnly = await prisma.configuration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Configuration.
     * @param {ConfigurationDeleteArgs} args - Arguments to delete one Configuration.
     * @example
     * // Delete one Configuration
     * const Configuration = await prisma.configuration.delete({
     *   where: {
     *     // ... filter to delete one Configuration
     *   }
     * })
     * 
     */
    delete<T extends ConfigurationDeleteArgs>(args: SelectSubset<T, ConfigurationDeleteArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuration.
     * @param {ConfigurationUpdateArgs} args - Arguments to update one Configuration.
     * @example
     * // Update one Configuration
     * const configuration = await prisma.configuration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfigurationUpdateArgs>(args: SelectSubset<T, ConfigurationUpdateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configurations.
     * @param {ConfigurationDeleteManyArgs} args - Arguments to filter Configurations to delete.
     * @example
     * // Delete a few Configurations
     * const { count } = await prisma.configuration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfigurationDeleteManyArgs>(args?: SelectSubset<T, ConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfigurationUpdateManyArgs>(args: SelectSubset<T, ConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations and returns the data updated in the database.
     * @param {ConfigurationUpdateManyAndReturnArgs} args - Arguments to update many Configurations.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Configurations and only return the `id`
     * const configurationWithIdOnly = await prisma.configuration.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Configuration.
     * @param {ConfigurationUpsertArgs} args - Arguments to update or create a Configuration.
     * @example
     * // Update or create a Configuration
     * const configuration = await prisma.configuration.upsert({
     *   create: {
     *     // ... data to create a Configuration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuration we want to update
     *   }
     * })
     */
    upsert<T extends ConfigurationUpsertArgs>(args: SelectSubset<T, ConfigurationUpsertArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationCountArgs} args - Arguments to filter Configurations to count.
     * @example
     * // Count the number of Configurations
     * const count = await prisma.configuration.count({
     *   where: {
     *     // ... the filter for the Configurations we want to count
     *   }
     * })
    **/
    count<T extends ConfigurationCountArgs>(
      args?: Subset<T, ConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConfigurationAggregateArgs>(args: Subset<T, ConfigurationAggregateArgs>): Prisma.PrismaPromise<GetConfigurationAggregateType<T>>

    /**
     * Group by Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationGroupByArgs} args - Group by arguments.
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
      T extends ConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: ConfigurationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Configuration model
   */
  readonly fields: ConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Configuration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Configuration model
   */
  interface ConfigurationFieldRefs {
    readonly id: FieldRef<"Configuration", 'String'>
    readonly cle: FieldRef<"Configuration", 'String'>
    readonly valeur: FieldRef<"Configuration", 'String'>
    readonly description: FieldRef<"Configuration", 'String'>
    readonly updatedAt: FieldRef<"Configuration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Configuration findUnique
   */
  export type ConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findUniqueOrThrow
   */
  export type ConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findFirst
   */
  export type ConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findFirstOrThrow
   */
  export type ConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findMany
   */
  export type ConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configurations to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration create
   */
  export type ConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to create a Configuration.
     */
    data: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
  }

  /**
   * Configuration createMany
   */
  export type ConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration createManyAndReturn
   */
  export type ConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration update
   */
  export type ConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to update a Configuration.
     */
    data: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
    /**
     * Choose, which Configuration to update.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration updateMany
   */
  export type ConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration updateManyAndReturn
   */
  export type ConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration upsert
   */
  export type ConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The filter to search for the Configuration to update in case it exists.
     */
    where: ConfigurationWhereUniqueInput
    /**
     * In case the Configuration found by the `where` argument doesn't exist, create a new Configuration with this data.
     */
    create: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
    /**
     * In case the Configuration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
  }

  /**
   * Configuration delete
   */
  export type ConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter which Configuration to delete.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration deleteMany
   */
  export type ConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configurations to delete
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to delete.
     */
    limit?: number
  }

  /**
   * Configuration without action
   */
  export type ConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
  }


  /**
   * Model Commande
   */

  export type AggregateCommande = {
    _count: CommandeCountAggregateOutputType | null
    _avg: CommandeAvgAggregateOutputType | null
    _sum: CommandeSumAggregateOutputType | null
    _min: CommandeMinAggregateOutputType | null
    _max: CommandeMaxAggregateOutputType | null
  }

  export type CommandeAvgAggregateOutputType = {
    total: number | null
    frais_livraison: number | null
  }

  export type CommandeSumAggregateOutputType = {
    total: number | null
    frais_livraison: number | null
  }

  export type CommandeMinAggregateOutputType = {
    id: string | null
    numero: string | null
    utilisateur_id: string | null
    statut: $Enums.OrderStatus | null
    total: number | null
    frais_livraison: number | null
    ville: string | null
    adresse: string | null
    telephone: string | null
    mode_paiement: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommandeMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    utilisateur_id: string | null
    statut: $Enums.OrderStatus | null
    total: number | null
    frais_livraison: number | null
    ville: string | null
    adresse: string | null
    telephone: string | null
    mode_paiement: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommandeCountAggregateOutputType = {
    id: number
    numero: number
    utilisateur_id: number
    statut: number
    total: number
    frais_livraison: number
    ville: number
    adresse: number
    telephone: number
    mode_paiement: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommandeAvgAggregateInputType = {
    total?: true
    frais_livraison?: true
  }

  export type CommandeSumAggregateInputType = {
    total?: true
    frais_livraison?: true
  }

  export type CommandeMinAggregateInputType = {
    id?: true
    numero?: true
    utilisateur_id?: true
    statut?: true
    total?: true
    frais_livraison?: true
    ville?: true
    adresse?: true
    telephone?: true
    mode_paiement?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommandeMaxAggregateInputType = {
    id?: true
    numero?: true
    utilisateur_id?: true
    statut?: true
    total?: true
    frais_livraison?: true
    ville?: true
    adresse?: true
    telephone?: true
    mode_paiement?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommandeCountAggregateInputType = {
    id?: true
    numero?: true
    utilisateur_id?: true
    statut?: true
    total?: true
    frais_livraison?: true
    ville?: true
    adresse?: true
    telephone?: true
    mode_paiement?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commande to aggregate.
     */
    where?: CommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commandes to fetch.
     */
    orderBy?: CommandeOrderByWithRelationInput | CommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commandes
    **/
    _count?: true | CommandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommandeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommandeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommandeMaxAggregateInputType
  }

  export type GetCommandeAggregateType<T extends CommandeAggregateArgs> = {
        [P in keyof T & keyof AggregateCommande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommande[P]>
      : GetScalarType<T[P], AggregateCommande[P]>
  }




  export type CommandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommandeWhereInput
    orderBy?: CommandeOrderByWithAggregationInput | CommandeOrderByWithAggregationInput[]
    by: CommandeScalarFieldEnum[] | CommandeScalarFieldEnum
    having?: CommandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommandeCountAggregateInputType | true
    _avg?: CommandeAvgAggregateInputType
    _sum?: CommandeSumAggregateInputType
    _min?: CommandeMinAggregateInputType
    _max?: CommandeMaxAggregateInputType
  }

  export type CommandeGroupByOutputType = {
    id: string
    numero: string
    utilisateur_id: string
    statut: $Enums.OrderStatus
    total: number
    frais_livraison: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: CommandeCountAggregateOutputType | null
    _avg: CommandeAvgAggregateOutputType | null
    _sum: CommandeSumAggregateOutputType | null
    _min: CommandeMinAggregateOutputType | null
    _max: CommandeMaxAggregateOutputType | null
  }

  type GetCommandeGroupByPayload<T extends CommandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommandeGroupByOutputType[P]>
            : GetScalarType<T[P], CommandeGroupByOutputType[P]>
        }
      >
    >


  export type CommandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    utilisateur_id?: boolean
    statut?: boolean
    total?: boolean
    frais_livraison?: boolean
    ville?: boolean
    adresse?: boolean
    telephone?: boolean
    mode_paiement?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    lignes?: boolean | Commande$lignesArgs<ExtArgs>
    _count?: boolean | CommandeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commande"]>

  export type CommandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    utilisateur_id?: boolean
    statut?: boolean
    total?: boolean
    frais_livraison?: boolean
    ville?: boolean
    adresse?: boolean
    telephone?: boolean
    mode_paiement?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commande"]>

  export type CommandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    utilisateur_id?: boolean
    statut?: boolean
    total?: boolean
    frais_livraison?: boolean
    ville?: boolean
    adresse?: boolean
    telephone?: boolean
    mode_paiement?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commande"]>

  export type CommandeSelectScalar = {
    id?: boolean
    numero?: boolean
    utilisateur_id?: boolean
    statut?: boolean
    total?: boolean
    frais_livraison?: boolean
    ville?: boolean
    adresse?: boolean
    telephone?: boolean
    mode_paiement?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "utilisateur_id" | "statut" | "total" | "frais_livraison" | "ville" | "adresse" | "telephone" | "mode_paiement" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["commande"]>
  export type CommandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    lignes?: boolean | Commande$lignesArgs<ExtArgs>
    _count?: boolean | CommandeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commande"
    objects: {
      utilisateur: Prisma.$UserPayload<ExtArgs>
      lignes: Prisma.$LigneCommandePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      utilisateur_id: string
      statut: $Enums.OrderStatus
      total: number
      frais_livraison: number
      ville: string
      adresse: string
      telephone: string
      mode_paiement: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["commande"]>
    composites: {}
  }

  type CommandeGetPayload<S extends boolean | null | undefined | CommandeDefaultArgs> = $Result.GetResult<Prisma.$CommandePayload, S>

  type CommandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommandeCountAggregateInputType | true
    }

  export interface CommandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commande'], meta: { name: 'Commande' } }
    /**
     * Find zero or one Commande that matches the filter.
     * @param {CommandeFindUniqueArgs} args - Arguments to find a Commande
     * @example
     * // Get one Commande
     * const commande = await prisma.commande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommandeFindUniqueArgs>(args: SelectSubset<T, CommandeFindUniqueArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommandeFindUniqueOrThrowArgs} args - Arguments to find a Commande
     * @example
     * // Get one Commande
     * const commande = await prisma.commande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommandeFindUniqueOrThrowArgs>(args: SelectSubset<T, CommandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeFindFirstArgs} args - Arguments to find a Commande
     * @example
     * // Get one Commande
     * const commande = await prisma.commande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommandeFindFirstArgs>(args?: SelectSubset<T, CommandeFindFirstArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeFindFirstOrThrowArgs} args - Arguments to find a Commande
     * @example
     * // Get one Commande
     * const commande = await prisma.commande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommandeFindFirstOrThrowArgs>(args?: SelectSubset<T, CommandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commandes
     * const commandes = await prisma.commande.findMany()
     * 
     * // Get first 10 Commandes
     * const commandes = await prisma.commande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commandeWithIdOnly = await prisma.commande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommandeFindManyArgs>(args?: SelectSubset<T, CommandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commande.
     * @param {CommandeCreateArgs} args - Arguments to create a Commande.
     * @example
     * // Create one Commande
     * const Commande = await prisma.commande.create({
     *   data: {
     *     // ... data to create a Commande
     *   }
     * })
     * 
     */
    create<T extends CommandeCreateArgs>(args: SelectSubset<T, CommandeCreateArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commandes.
     * @param {CommandeCreateManyArgs} args - Arguments to create many Commandes.
     * @example
     * // Create many Commandes
     * const commande = await prisma.commande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommandeCreateManyArgs>(args?: SelectSubset<T, CommandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commandes and returns the data saved in the database.
     * @param {CommandeCreateManyAndReturnArgs} args - Arguments to create many Commandes.
     * @example
     * // Create many Commandes
     * const commande = await prisma.commande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commandes and only return the `id`
     * const commandeWithIdOnly = await prisma.commande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommandeCreateManyAndReturnArgs>(args?: SelectSubset<T, CommandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commande.
     * @param {CommandeDeleteArgs} args - Arguments to delete one Commande.
     * @example
     * // Delete one Commande
     * const Commande = await prisma.commande.delete({
     *   where: {
     *     // ... filter to delete one Commande
     *   }
     * })
     * 
     */
    delete<T extends CommandeDeleteArgs>(args: SelectSubset<T, CommandeDeleteArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commande.
     * @param {CommandeUpdateArgs} args - Arguments to update one Commande.
     * @example
     * // Update one Commande
     * const commande = await prisma.commande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommandeUpdateArgs>(args: SelectSubset<T, CommandeUpdateArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commandes.
     * @param {CommandeDeleteManyArgs} args - Arguments to filter Commandes to delete.
     * @example
     * // Delete a few Commandes
     * const { count } = await prisma.commande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommandeDeleteManyArgs>(args?: SelectSubset<T, CommandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commandes
     * const commande = await prisma.commande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommandeUpdateManyArgs>(args: SelectSubset<T, CommandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commandes and returns the data updated in the database.
     * @param {CommandeUpdateManyAndReturnArgs} args - Arguments to update many Commandes.
     * @example
     * // Update many Commandes
     * const commande = await prisma.commande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commandes and only return the `id`
     * const commandeWithIdOnly = await prisma.commande.updateManyAndReturn({
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
    updateManyAndReturn<T extends CommandeUpdateManyAndReturnArgs>(args: SelectSubset<T, CommandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commande.
     * @param {CommandeUpsertArgs} args - Arguments to update or create a Commande.
     * @example
     * // Update or create a Commande
     * const commande = await prisma.commande.upsert({
     *   create: {
     *     // ... data to create a Commande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commande we want to update
     *   }
     * })
     */
    upsert<T extends CommandeUpsertArgs>(args: SelectSubset<T, CommandeUpsertArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeCountArgs} args - Arguments to filter Commandes to count.
     * @example
     * // Count the number of Commandes
     * const count = await prisma.commande.count({
     *   where: {
     *     // ... the filter for the Commandes we want to count
     *   }
     * })
    **/
    count<T extends CommandeCountArgs>(
      args?: Subset<T, CommandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommandeAggregateArgs>(args: Subset<T, CommandeAggregateArgs>): Prisma.PrismaPromise<GetCommandeAggregateType<T>>

    /**
     * Group by Commande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandeGroupByArgs} args - Group by arguments.
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
      T extends CommandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommandeGroupByArgs['orderBy'] }
        : { orderBy?: CommandeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commande model
   */
  readonly fields: CommandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lignes<T extends Commande$lignesArgs<ExtArgs> = {}>(args?: Subset<T, Commande$lignesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Commande model
   */
  interface CommandeFieldRefs {
    readonly id: FieldRef<"Commande", 'String'>
    readonly numero: FieldRef<"Commande", 'String'>
    readonly utilisateur_id: FieldRef<"Commande", 'String'>
    readonly statut: FieldRef<"Commande", 'OrderStatus'>
    readonly total: FieldRef<"Commande", 'Float'>
    readonly frais_livraison: FieldRef<"Commande", 'Float'>
    readonly ville: FieldRef<"Commande", 'String'>
    readonly adresse: FieldRef<"Commande", 'String'>
    readonly telephone: FieldRef<"Commande", 'String'>
    readonly mode_paiement: FieldRef<"Commande", 'String'>
    readonly notes: FieldRef<"Commande", 'String'>
    readonly createdAt: FieldRef<"Commande", 'DateTime'>
    readonly updatedAt: FieldRef<"Commande", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commande findUnique
   */
  export type CommandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter, which Commande to fetch.
     */
    where: CommandeWhereUniqueInput
  }

  /**
   * Commande findUniqueOrThrow
   */
  export type CommandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter, which Commande to fetch.
     */
    where: CommandeWhereUniqueInput
  }

  /**
   * Commande findFirst
   */
  export type CommandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter, which Commande to fetch.
     */
    where?: CommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commandes to fetch.
     */
    orderBy?: CommandeOrderByWithRelationInput | CommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commandes.
     */
    cursor?: CommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commandes.
     */
    distinct?: CommandeScalarFieldEnum | CommandeScalarFieldEnum[]
  }

  /**
   * Commande findFirstOrThrow
   */
  export type CommandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter, which Commande to fetch.
     */
    where?: CommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commandes to fetch.
     */
    orderBy?: CommandeOrderByWithRelationInput | CommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commandes.
     */
    cursor?: CommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commandes.
     */
    distinct?: CommandeScalarFieldEnum | CommandeScalarFieldEnum[]
  }

  /**
   * Commande findMany
   */
  export type CommandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter, which Commandes to fetch.
     */
    where?: CommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commandes to fetch.
     */
    orderBy?: CommandeOrderByWithRelationInput | CommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commandes.
     */
    cursor?: CommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commandes.
     */
    distinct?: CommandeScalarFieldEnum | CommandeScalarFieldEnum[]
  }

  /**
   * Commande create
   */
  export type CommandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * The data needed to create a Commande.
     */
    data: XOR<CommandeCreateInput, CommandeUncheckedCreateInput>
  }

  /**
   * Commande createMany
   */
  export type CommandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commandes.
     */
    data: CommandeCreateManyInput | CommandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commande createManyAndReturn
   */
  export type CommandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * The data used to create many Commandes.
     */
    data: CommandeCreateManyInput | CommandeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commande update
   */
  export type CommandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * The data needed to update a Commande.
     */
    data: XOR<CommandeUpdateInput, CommandeUncheckedUpdateInput>
    /**
     * Choose, which Commande to update.
     */
    where: CommandeWhereUniqueInput
  }

  /**
   * Commande updateMany
   */
  export type CommandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commandes.
     */
    data: XOR<CommandeUpdateManyMutationInput, CommandeUncheckedUpdateManyInput>
    /**
     * Filter which Commandes to update
     */
    where?: CommandeWhereInput
    /**
     * Limit how many Commandes to update.
     */
    limit?: number
  }

  /**
   * Commande updateManyAndReturn
   */
  export type CommandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * The data used to update Commandes.
     */
    data: XOR<CommandeUpdateManyMutationInput, CommandeUncheckedUpdateManyInput>
    /**
     * Filter which Commandes to update
     */
    where?: CommandeWhereInput
    /**
     * Limit how many Commandes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commande upsert
   */
  export type CommandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * The filter to search for the Commande to update in case it exists.
     */
    where: CommandeWhereUniqueInput
    /**
     * In case the Commande found by the `where` argument doesn't exist, create a new Commande with this data.
     */
    create: XOR<CommandeCreateInput, CommandeUncheckedCreateInput>
    /**
     * In case the Commande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommandeUpdateInput, CommandeUncheckedUpdateInput>
  }

  /**
   * Commande delete
   */
  export type CommandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
    /**
     * Filter which Commande to delete.
     */
    where: CommandeWhereUniqueInput
  }

  /**
   * Commande deleteMany
   */
  export type CommandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commandes to delete
     */
    where?: CommandeWhereInput
    /**
     * Limit how many Commandes to delete.
     */
    limit?: number
  }

  /**
   * Commande.lignes
   */
  export type Commande$lignesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    where?: LigneCommandeWhereInput
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    cursor?: LigneCommandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LigneCommandeScalarFieldEnum | LigneCommandeScalarFieldEnum[]
  }

  /**
   * Commande without action
   */
  export type CommandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commande
     */
    select?: CommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commande
     */
    omit?: CommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandeInclude<ExtArgs> | null
  }


  /**
   * Model LigneCommande
   */

  export type AggregateLigneCommande = {
    _count: LigneCommandeCountAggregateOutputType | null
    _avg: LigneCommandeAvgAggregateOutputType | null
    _sum: LigneCommandeSumAggregateOutputType | null
    _min: LigneCommandeMinAggregateOutputType | null
    _max: LigneCommandeMaxAggregateOutputType | null
  }

  export type LigneCommandeAvgAggregateOutputType = {
    prix_unitaire: number | null
    quantite: number | null
    sous_total: number | null
  }

  export type LigneCommandeSumAggregateOutputType = {
    prix_unitaire: number | null
    quantite: number | null
    sous_total: number | null
  }

  export type LigneCommandeMinAggregateOutputType = {
    id: string | null
    commande_id: string | null
    produit_id: string | null
    nom_produit: string | null
    image: string | null
    prix_unitaire: number | null
    quantite: number | null
    sous_total: number | null
  }

  export type LigneCommandeMaxAggregateOutputType = {
    id: string | null
    commande_id: string | null
    produit_id: string | null
    nom_produit: string | null
    image: string | null
    prix_unitaire: number | null
    quantite: number | null
    sous_total: number | null
  }

  export type LigneCommandeCountAggregateOutputType = {
    id: number
    commande_id: number
    produit_id: number
    nom_produit: number
    image: number
    prix_unitaire: number
    quantite: number
    sous_total: number
    _all: number
  }


  export type LigneCommandeAvgAggregateInputType = {
    prix_unitaire?: true
    quantite?: true
    sous_total?: true
  }

  export type LigneCommandeSumAggregateInputType = {
    prix_unitaire?: true
    quantite?: true
    sous_total?: true
  }

  export type LigneCommandeMinAggregateInputType = {
    id?: true
    commande_id?: true
    produit_id?: true
    nom_produit?: true
    image?: true
    prix_unitaire?: true
    quantite?: true
    sous_total?: true
  }

  export type LigneCommandeMaxAggregateInputType = {
    id?: true
    commande_id?: true
    produit_id?: true
    nom_produit?: true
    image?: true
    prix_unitaire?: true
    quantite?: true
    sous_total?: true
  }

  export type LigneCommandeCountAggregateInputType = {
    id?: true
    commande_id?: true
    produit_id?: true
    nom_produit?: true
    image?: true
    prix_unitaire?: true
    quantite?: true
    sous_total?: true
    _all?: true
  }

  export type LigneCommandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LigneCommande to aggregate.
     */
    where?: LigneCommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LigneCommandes to fetch.
     */
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LigneCommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LigneCommandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LigneCommandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LigneCommandes
    **/
    _count?: true | LigneCommandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LigneCommandeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LigneCommandeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LigneCommandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LigneCommandeMaxAggregateInputType
  }

  export type GetLigneCommandeAggregateType<T extends LigneCommandeAggregateArgs> = {
        [P in keyof T & keyof AggregateLigneCommande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLigneCommande[P]>
      : GetScalarType<T[P], AggregateLigneCommande[P]>
  }




  export type LigneCommandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LigneCommandeWhereInput
    orderBy?: LigneCommandeOrderByWithAggregationInput | LigneCommandeOrderByWithAggregationInput[]
    by: LigneCommandeScalarFieldEnum[] | LigneCommandeScalarFieldEnum
    having?: LigneCommandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LigneCommandeCountAggregateInputType | true
    _avg?: LigneCommandeAvgAggregateInputType
    _sum?: LigneCommandeSumAggregateInputType
    _min?: LigneCommandeMinAggregateInputType
    _max?: LigneCommandeMaxAggregateInputType
  }

  export type LigneCommandeGroupByOutputType = {
    id: string
    commande_id: string
    produit_id: string
    nom_produit: string
    image: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
    _count: LigneCommandeCountAggregateOutputType | null
    _avg: LigneCommandeAvgAggregateOutputType | null
    _sum: LigneCommandeSumAggregateOutputType | null
    _min: LigneCommandeMinAggregateOutputType | null
    _max: LigneCommandeMaxAggregateOutputType | null
  }

  type GetLigneCommandeGroupByPayload<T extends LigneCommandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LigneCommandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LigneCommandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LigneCommandeGroupByOutputType[P]>
            : GetScalarType<T[P], LigneCommandeGroupByOutputType[P]>
        }
      >
    >


  export type LigneCommandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commande_id?: boolean
    produit_id?: boolean
    nom_produit?: boolean
    image?: boolean
    prix_unitaire?: boolean
    quantite?: boolean
    sous_total?: boolean
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ligneCommande"]>

  export type LigneCommandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commande_id?: boolean
    produit_id?: boolean
    nom_produit?: boolean
    image?: boolean
    prix_unitaire?: boolean
    quantite?: boolean
    sous_total?: boolean
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ligneCommande"]>

  export type LigneCommandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commande_id?: boolean
    produit_id?: boolean
    nom_produit?: boolean
    image?: boolean
    prix_unitaire?: boolean
    quantite?: boolean
    sous_total?: boolean
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ligneCommande"]>

  export type LigneCommandeSelectScalar = {
    id?: boolean
    commande_id?: boolean
    produit_id?: boolean
    nom_produit?: boolean
    image?: boolean
    prix_unitaire?: boolean
    quantite?: boolean
    sous_total?: boolean
  }

  export type LigneCommandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commande_id" | "produit_id" | "nom_produit" | "image" | "prix_unitaire" | "quantite" | "sous_total", ExtArgs["result"]["ligneCommande"]>
  export type LigneCommandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }
  export type LigneCommandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }
  export type LigneCommandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commande?: boolean | CommandeDefaultArgs<ExtArgs>
    produit?: boolean | ProduitDefaultArgs<ExtArgs>
  }

  export type $LigneCommandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LigneCommande"
    objects: {
      commande: Prisma.$CommandePayload<ExtArgs>
      produit: Prisma.$ProduitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commande_id: string
      produit_id: string
      nom_produit: string
      image: string | null
      prix_unitaire: number
      quantite: number
      sous_total: number
    }, ExtArgs["result"]["ligneCommande"]>
    composites: {}
  }

  type LigneCommandeGetPayload<S extends boolean | null | undefined | LigneCommandeDefaultArgs> = $Result.GetResult<Prisma.$LigneCommandePayload, S>

  type LigneCommandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LigneCommandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LigneCommandeCountAggregateInputType | true
    }

  export interface LigneCommandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LigneCommande'], meta: { name: 'LigneCommande' } }
    /**
     * Find zero or one LigneCommande that matches the filter.
     * @param {LigneCommandeFindUniqueArgs} args - Arguments to find a LigneCommande
     * @example
     * // Get one LigneCommande
     * const ligneCommande = await prisma.ligneCommande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LigneCommandeFindUniqueArgs>(args: SelectSubset<T, LigneCommandeFindUniqueArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LigneCommande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LigneCommandeFindUniqueOrThrowArgs} args - Arguments to find a LigneCommande
     * @example
     * // Get one LigneCommande
     * const ligneCommande = await prisma.ligneCommande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LigneCommandeFindUniqueOrThrowArgs>(args: SelectSubset<T, LigneCommandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LigneCommande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeFindFirstArgs} args - Arguments to find a LigneCommande
     * @example
     * // Get one LigneCommande
     * const ligneCommande = await prisma.ligneCommande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LigneCommandeFindFirstArgs>(args?: SelectSubset<T, LigneCommandeFindFirstArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LigneCommande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeFindFirstOrThrowArgs} args - Arguments to find a LigneCommande
     * @example
     * // Get one LigneCommande
     * const ligneCommande = await prisma.ligneCommande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LigneCommandeFindFirstOrThrowArgs>(args?: SelectSubset<T, LigneCommandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LigneCommandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LigneCommandes
     * const ligneCommandes = await prisma.ligneCommande.findMany()
     * 
     * // Get first 10 LigneCommandes
     * const ligneCommandes = await prisma.ligneCommande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ligneCommandeWithIdOnly = await prisma.ligneCommande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LigneCommandeFindManyArgs>(args?: SelectSubset<T, LigneCommandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LigneCommande.
     * @param {LigneCommandeCreateArgs} args - Arguments to create a LigneCommande.
     * @example
     * // Create one LigneCommande
     * const LigneCommande = await prisma.ligneCommande.create({
     *   data: {
     *     // ... data to create a LigneCommande
     *   }
     * })
     * 
     */
    create<T extends LigneCommandeCreateArgs>(args: SelectSubset<T, LigneCommandeCreateArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LigneCommandes.
     * @param {LigneCommandeCreateManyArgs} args - Arguments to create many LigneCommandes.
     * @example
     * // Create many LigneCommandes
     * const ligneCommande = await prisma.ligneCommande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LigneCommandeCreateManyArgs>(args?: SelectSubset<T, LigneCommandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LigneCommandes and returns the data saved in the database.
     * @param {LigneCommandeCreateManyAndReturnArgs} args - Arguments to create many LigneCommandes.
     * @example
     * // Create many LigneCommandes
     * const ligneCommande = await prisma.ligneCommande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LigneCommandes and only return the `id`
     * const ligneCommandeWithIdOnly = await prisma.ligneCommande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LigneCommandeCreateManyAndReturnArgs>(args?: SelectSubset<T, LigneCommandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LigneCommande.
     * @param {LigneCommandeDeleteArgs} args - Arguments to delete one LigneCommande.
     * @example
     * // Delete one LigneCommande
     * const LigneCommande = await prisma.ligneCommande.delete({
     *   where: {
     *     // ... filter to delete one LigneCommande
     *   }
     * })
     * 
     */
    delete<T extends LigneCommandeDeleteArgs>(args: SelectSubset<T, LigneCommandeDeleteArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LigneCommande.
     * @param {LigneCommandeUpdateArgs} args - Arguments to update one LigneCommande.
     * @example
     * // Update one LigneCommande
     * const ligneCommande = await prisma.ligneCommande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LigneCommandeUpdateArgs>(args: SelectSubset<T, LigneCommandeUpdateArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LigneCommandes.
     * @param {LigneCommandeDeleteManyArgs} args - Arguments to filter LigneCommandes to delete.
     * @example
     * // Delete a few LigneCommandes
     * const { count } = await prisma.ligneCommande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LigneCommandeDeleteManyArgs>(args?: SelectSubset<T, LigneCommandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LigneCommandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LigneCommandes
     * const ligneCommande = await prisma.ligneCommande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LigneCommandeUpdateManyArgs>(args: SelectSubset<T, LigneCommandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LigneCommandes and returns the data updated in the database.
     * @param {LigneCommandeUpdateManyAndReturnArgs} args - Arguments to update many LigneCommandes.
     * @example
     * // Update many LigneCommandes
     * const ligneCommande = await prisma.ligneCommande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LigneCommandes and only return the `id`
     * const ligneCommandeWithIdOnly = await prisma.ligneCommande.updateManyAndReturn({
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
    updateManyAndReturn<T extends LigneCommandeUpdateManyAndReturnArgs>(args: SelectSubset<T, LigneCommandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LigneCommande.
     * @param {LigneCommandeUpsertArgs} args - Arguments to update or create a LigneCommande.
     * @example
     * // Update or create a LigneCommande
     * const ligneCommande = await prisma.ligneCommande.upsert({
     *   create: {
     *     // ... data to create a LigneCommande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LigneCommande we want to update
     *   }
     * })
     */
    upsert<T extends LigneCommandeUpsertArgs>(args: SelectSubset<T, LigneCommandeUpsertArgs<ExtArgs>>): Prisma__LigneCommandeClient<$Result.GetResult<Prisma.$LigneCommandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LigneCommandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeCountArgs} args - Arguments to filter LigneCommandes to count.
     * @example
     * // Count the number of LigneCommandes
     * const count = await prisma.ligneCommande.count({
     *   where: {
     *     // ... the filter for the LigneCommandes we want to count
     *   }
     * })
    **/
    count<T extends LigneCommandeCountArgs>(
      args?: Subset<T, LigneCommandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LigneCommandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LigneCommande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LigneCommandeAggregateArgs>(args: Subset<T, LigneCommandeAggregateArgs>): Prisma.PrismaPromise<GetLigneCommandeAggregateType<T>>

    /**
     * Group by LigneCommande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LigneCommandeGroupByArgs} args - Group by arguments.
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
      T extends LigneCommandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LigneCommandeGroupByArgs['orderBy'] }
        : { orderBy?: LigneCommandeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LigneCommandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLigneCommandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LigneCommande model
   */
  readonly fields: LigneCommandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LigneCommande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LigneCommandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commande<T extends CommandeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommandeDefaultArgs<ExtArgs>>): Prisma__CommandeClient<$Result.GetResult<Prisma.$CommandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produit<T extends ProduitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProduitDefaultArgs<ExtArgs>>): Prisma__ProduitClient<$Result.GetResult<Prisma.$ProduitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LigneCommande model
   */
  interface LigneCommandeFieldRefs {
    readonly id: FieldRef<"LigneCommande", 'String'>
    readonly commande_id: FieldRef<"LigneCommande", 'String'>
    readonly produit_id: FieldRef<"LigneCommande", 'String'>
    readonly nom_produit: FieldRef<"LigneCommande", 'String'>
    readonly image: FieldRef<"LigneCommande", 'String'>
    readonly prix_unitaire: FieldRef<"LigneCommande", 'Float'>
    readonly quantite: FieldRef<"LigneCommande", 'Int'>
    readonly sous_total: FieldRef<"LigneCommande", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * LigneCommande findUnique
   */
  export type LigneCommandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter, which LigneCommande to fetch.
     */
    where: LigneCommandeWhereUniqueInput
  }

  /**
   * LigneCommande findUniqueOrThrow
   */
  export type LigneCommandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter, which LigneCommande to fetch.
     */
    where: LigneCommandeWhereUniqueInput
  }

  /**
   * LigneCommande findFirst
   */
  export type LigneCommandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter, which LigneCommande to fetch.
     */
    where?: LigneCommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LigneCommandes to fetch.
     */
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LigneCommandes.
     */
    cursor?: LigneCommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LigneCommandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LigneCommandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LigneCommandes.
     */
    distinct?: LigneCommandeScalarFieldEnum | LigneCommandeScalarFieldEnum[]
  }

  /**
   * LigneCommande findFirstOrThrow
   */
  export type LigneCommandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter, which LigneCommande to fetch.
     */
    where?: LigneCommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LigneCommandes to fetch.
     */
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LigneCommandes.
     */
    cursor?: LigneCommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LigneCommandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LigneCommandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LigneCommandes.
     */
    distinct?: LigneCommandeScalarFieldEnum | LigneCommandeScalarFieldEnum[]
  }

  /**
   * LigneCommande findMany
   */
  export type LigneCommandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter, which LigneCommandes to fetch.
     */
    where?: LigneCommandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LigneCommandes to fetch.
     */
    orderBy?: LigneCommandeOrderByWithRelationInput | LigneCommandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LigneCommandes.
     */
    cursor?: LigneCommandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LigneCommandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LigneCommandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LigneCommandes.
     */
    distinct?: LigneCommandeScalarFieldEnum | LigneCommandeScalarFieldEnum[]
  }

  /**
   * LigneCommande create
   */
  export type LigneCommandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * The data needed to create a LigneCommande.
     */
    data: XOR<LigneCommandeCreateInput, LigneCommandeUncheckedCreateInput>
  }

  /**
   * LigneCommande createMany
   */
  export type LigneCommandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LigneCommandes.
     */
    data: LigneCommandeCreateManyInput | LigneCommandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LigneCommande createManyAndReturn
   */
  export type LigneCommandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * The data used to create many LigneCommandes.
     */
    data: LigneCommandeCreateManyInput | LigneCommandeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LigneCommande update
   */
  export type LigneCommandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * The data needed to update a LigneCommande.
     */
    data: XOR<LigneCommandeUpdateInput, LigneCommandeUncheckedUpdateInput>
    /**
     * Choose, which LigneCommande to update.
     */
    where: LigneCommandeWhereUniqueInput
  }

  /**
   * LigneCommande updateMany
   */
  export type LigneCommandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LigneCommandes.
     */
    data: XOR<LigneCommandeUpdateManyMutationInput, LigneCommandeUncheckedUpdateManyInput>
    /**
     * Filter which LigneCommandes to update
     */
    where?: LigneCommandeWhereInput
    /**
     * Limit how many LigneCommandes to update.
     */
    limit?: number
  }

  /**
   * LigneCommande updateManyAndReturn
   */
  export type LigneCommandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * The data used to update LigneCommandes.
     */
    data: XOR<LigneCommandeUpdateManyMutationInput, LigneCommandeUncheckedUpdateManyInput>
    /**
     * Filter which LigneCommandes to update
     */
    where?: LigneCommandeWhereInput
    /**
     * Limit how many LigneCommandes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LigneCommande upsert
   */
  export type LigneCommandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * The filter to search for the LigneCommande to update in case it exists.
     */
    where: LigneCommandeWhereUniqueInput
    /**
     * In case the LigneCommande found by the `where` argument doesn't exist, create a new LigneCommande with this data.
     */
    create: XOR<LigneCommandeCreateInput, LigneCommandeUncheckedCreateInput>
    /**
     * In case the LigneCommande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LigneCommandeUpdateInput, LigneCommandeUncheckedUpdateInput>
  }

  /**
   * LigneCommande delete
   */
  export type LigneCommandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
    /**
     * Filter which LigneCommande to delete.
     */
    where: LigneCommandeWhereUniqueInput
  }

  /**
   * LigneCommande deleteMany
   */
  export type LigneCommandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LigneCommandes to delete
     */
    where?: LigneCommandeWhereInput
    /**
     * Limit how many LigneCommandes to delete.
     */
    limit?: number
  }

  /**
   * LigneCommande without action
   */
  export type LigneCommandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LigneCommande
     */
    select?: LigneCommandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LigneCommande
     */
    omit?: LigneCommandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LigneCommandeInclude<ExtArgs> | null
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
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    avatar: 'avatar',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategorieScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description',
    icone: 'icone',
    ordre: 'ordre',
    createdAt: 'createdAt'
  };

  export type CategorieScalarFieldEnum = (typeof CategorieScalarFieldEnum)[keyof typeof CategorieScalarFieldEnum]


  export const ProduitScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description',
    prix: 'prix',
    stock: 'stock',
    categorie_id: 'categorie_id',
    images: 'images',
    sku_number: 'sku_number',
    sku: 'sku',
    publie: 'publie',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProduitScalarFieldEnum = (typeof ProduitScalarFieldEnum)[keyof typeof ProduitScalarFieldEnum]


  export const AvisScalarFieldEnum: {
    id: 'id',
    note: 'note',
    titre: 'titre',
    contenu: 'contenu',
    produit_id: 'produit_id',
    utilisateur_id: 'utilisateur_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    reponse_admin: 'reponse_admin',
    reponse_admin_at: 'reponse_admin_at',
    reponse_admin_id: 'reponse_admin_id',
    masque: 'masque'
  };

  export type AvisScalarFieldEnum = (typeof AvisScalarFieldEnum)[keyof typeof AvisScalarFieldEnum]


  export const LikeScalarFieldEnum: {
    id: 'id',
    utilisateur_id: 'utilisateur_id',
    produit_id: 'produit_id',
    createdAt: 'createdAt'
  };

  export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum]


  export const AvisUtileScalarFieldEnum: {
    id: 'id',
    avis_id: 'avis_id',
    utilisateur_id: 'utilisateur_id',
    utile: 'utile',
    createdAt: 'createdAt'
  };

  export type AvisUtileScalarFieldEnum = (typeof AvisUtileScalarFieldEnum)[keyof typeof AvisUtileScalarFieldEnum]


  export const TypeSeanceScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description',
    duree: 'duree',
    prix: 'prix',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TypeSeanceScalarFieldEnum = (typeof TypeSeanceScalarFieldEnum)[keyof typeof TypeSeanceScalarFieldEnum]


  export const RendezVousScalarFieldEnum: {
    id: 'id',
    utilisateur_id: 'utilisateur_id',
    date_heure: 'date_heure',
    duree: 'duree',
    type_seance_id: 'type_seance_id',
    notes: 'notes',
    statut: 'statut',
    raison_refus: 'raison_refus',
    notes_admin: 'notes_admin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RendezVousScalarFieldEnum = (typeof RendezVousScalarFieldEnum)[keyof typeof RendezVousScalarFieldEnum]


  export const ConfigurationScalarFieldEnum: {
    id: 'id',
    cle: 'cle',
    valeur: 'valeur',
    description: 'description',
    updatedAt: 'updatedAt'
  };

  export type ConfigurationScalarFieldEnum = (typeof ConfigurationScalarFieldEnum)[keyof typeof ConfigurationScalarFieldEnum]


  export const CommandeScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    utilisateur_id: 'utilisateur_id',
    statut: 'statut',
    total: 'total',
    frais_livraison: 'frais_livraison',
    ville: 'ville',
    adresse: 'adresse',
    telephone: 'telephone',
    mode_paiement: 'mode_paiement',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommandeScalarFieldEnum = (typeof CommandeScalarFieldEnum)[keyof typeof CommandeScalarFieldEnum]


  export const LigneCommandeScalarFieldEnum: {
    id: 'id',
    commande_id: 'commande_id',
    produit_id: 'produit_id',
    nom_produit: 'nom_produit',
    image: 'image',
    prix_unitaire: 'prix_unitaire',
    quantite: 'quantite',
    sous_total: 'sous_total'
  };

  export type LigneCommandeScalarFieldEnum = (typeof LigneCommandeScalarFieldEnum)[keyof typeof LigneCommandeScalarFieldEnum]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avis?: AvisListRelationFilter
    likes?: LikeListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    commandes?: CommandeListRelationFilter
    avis_repondus?: AvisListRelationFilter
    votes_utiles?: AvisUtileListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    avis?: AvisOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    rendezVous?: RendezVousOrderByRelationAggregateInput
    commandes?: CommandeOrderByRelationAggregateInput
    avis_repondus?: AvisOrderByRelationAggregateInput
    votes_utiles?: AvisUtileOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avis?: AvisListRelationFilter
    likes?: LikeListRelationFilter
    rendezVous?: RendezVousListRelationFilter
    commandes?: CommandeListRelationFilter
    avis_repondus?: AvisListRelationFilter
    votes_utiles?: AvisUtileListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
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
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CategorieWhereInput = {
    AND?: CategorieWhereInput | CategorieWhereInput[]
    OR?: CategorieWhereInput[]
    NOT?: CategorieWhereInput | CategorieWhereInput[]
    id?: StringFilter<"Categorie"> | string
    nom?: StringFilter<"Categorie"> | string
    description?: StringNullableFilter<"Categorie"> | string | null
    icone?: StringNullableFilter<"Categorie"> | string | null
    ordre?: IntFilter<"Categorie"> | number
    createdAt?: DateTimeFilter<"Categorie"> | Date | string
    produits?: ProduitListRelationFilter
  }

  export type CategorieOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    icone?: SortOrderInput | SortOrder
    ordre?: SortOrder
    createdAt?: SortOrder
    produits?: ProduitOrderByRelationAggregateInput
  }

  export type CategorieWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nom?: string
    AND?: CategorieWhereInput | CategorieWhereInput[]
    OR?: CategorieWhereInput[]
    NOT?: CategorieWhereInput | CategorieWhereInput[]
    description?: StringNullableFilter<"Categorie"> | string | null
    icone?: StringNullableFilter<"Categorie"> | string | null
    ordre?: IntFilter<"Categorie"> | number
    createdAt?: DateTimeFilter<"Categorie"> | Date | string
    produits?: ProduitListRelationFilter
  }, "id" | "nom">

  export type CategorieOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    icone?: SortOrderInput | SortOrder
    ordre?: SortOrder
    createdAt?: SortOrder
    _count?: CategorieCountOrderByAggregateInput
    _avg?: CategorieAvgOrderByAggregateInput
    _max?: CategorieMaxOrderByAggregateInput
    _min?: CategorieMinOrderByAggregateInput
    _sum?: CategorieSumOrderByAggregateInput
  }

  export type CategorieScalarWhereWithAggregatesInput = {
    AND?: CategorieScalarWhereWithAggregatesInput | CategorieScalarWhereWithAggregatesInput[]
    OR?: CategorieScalarWhereWithAggregatesInput[]
    NOT?: CategorieScalarWhereWithAggregatesInput | CategorieScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Categorie"> | string
    nom?: StringWithAggregatesFilter<"Categorie"> | string
    description?: StringNullableWithAggregatesFilter<"Categorie"> | string | null
    icone?: StringNullableWithAggregatesFilter<"Categorie"> | string | null
    ordre?: IntWithAggregatesFilter<"Categorie"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Categorie"> | Date | string
  }

  export type ProduitWhereInput = {
    AND?: ProduitWhereInput | ProduitWhereInput[]
    OR?: ProduitWhereInput[]
    NOT?: ProduitWhereInput | ProduitWhereInput[]
    id?: StringFilter<"Produit"> | string
    nom?: StringFilter<"Produit"> | string
    description?: StringFilter<"Produit"> | string
    prix?: FloatFilter<"Produit"> | number
    stock?: IntFilter<"Produit"> | number
    categorie_id?: StringFilter<"Produit"> | string
    images?: StringNullableListFilter<"Produit">
    sku_number?: IntFilter<"Produit"> | number
    sku?: StringNullableFilter<"Produit"> | string | null
    publie?: BoolFilter<"Produit"> | boolean
    createdAt?: DateTimeFilter<"Produit"> | Date | string
    updatedAt?: DateTimeFilter<"Produit"> | Date | string
    avis?: AvisListRelationFilter
    likes?: LikeListRelationFilter
    categorie?: XOR<CategorieScalarRelationFilter, CategorieWhereInput>
    lignes?: LigneCommandeListRelationFilter
  }

  export type ProduitOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    categorie_id?: SortOrder
    images?: SortOrder
    sku_number?: SortOrder
    sku?: SortOrderInput | SortOrder
    publie?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avis?: AvisOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    categorie?: CategorieOrderByWithRelationInput
    lignes?: LigneCommandeOrderByRelationAggregateInput
  }

  export type ProduitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku_number?: number
    sku?: string
    AND?: ProduitWhereInput | ProduitWhereInput[]
    OR?: ProduitWhereInput[]
    NOT?: ProduitWhereInput | ProduitWhereInput[]
    nom?: StringFilter<"Produit"> | string
    description?: StringFilter<"Produit"> | string
    prix?: FloatFilter<"Produit"> | number
    stock?: IntFilter<"Produit"> | number
    categorie_id?: StringFilter<"Produit"> | string
    images?: StringNullableListFilter<"Produit">
    publie?: BoolFilter<"Produit"> | boolean
    createdAt?: DateTimeFilter<"Produit"> | Date | string
    updatedAt?: DateTimeFilter<"Produit"> | Date | string
    avis?: AvisListRelationFilter
    likes?: LikeListRelationFilter
    categorie?: XOR<CategorieScalarRelationFilter, CategorieWhereInput>
    lignes?: LigneCommandeListRelationFilter
  }, "id" | "sku_number" | "sku">

  export type ProduitOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    categorie_id?: SortOrder
    images?: SortOrder
    sku_number?: SortOrder
    sku?: SortOrderInput | SortOrder
    publie?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProduitCountOrderByAggregateInput
    _avg?: ProduitAvgOrderByAggregateInput
    _max?: ProduitMaxOrderByAggregateInput
    _min?: ProduitMinOrderByAggregateInput
    _sum?: ProduitSumOrderByAggregateInput
  }

  export type ProduitScalarWhereWithAggregatesInput = {
    AND?: ProduitScalarWhereWithAggregatesInput | ProduitScalarWhereWithAggregatesInput[]
    OR?: ProduitScalarWhereWithAggregatesInput[]
    NOT?: ProduitScalarWhereWithAggregatesInput | ProduitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Produit"> | string
    nom?: StringWithAggregatesFilter<"Produit"> | string
    description?: StringWithAggregatesFilter<"Produit"> | string
    prix?: FloatWithAggregatesFilter<"Produit"> | number
    stock?: IntWithAggregatesFilter<"Produit"> | number
    categorie_id?: StringWithAggregatesFilter<"Produit"> | string
    images?: StringNullableListFilter<"Produit">
    sku_number?: IntWithAggregatesFilter<"Produit"> | number
    sku?: StringNullableWithAggregatesFilter<"Produit"> | string | null
    publie?: BoolWithAggregatesFilter<"Produit"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Produit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Produit"> | Date | string
  }

  export type AvisWhereInput = {
    AND?: AvisWhereInput | AvisWhereInput[]
    OR?: AvisWhereInput[]
    NOT?: AvisWhereInput | AvisWhereInput[]
    id?: StringFilter<"Avis"> | string
    note?: IntFilter<"Avis"> | number
    titre?: StringFilter<"Avis"> | string
    contenu?: StringFilter<"Avis"> | string
    produit_id?: StringFilter<"Avis"> | string
    utilisateur_id?: StringFilter<"Avis"> | string
    createdAt?: DateTimeFilter<"Avis"> | Date | string
    updatedAt?: DateTimeFilter<"Avis"> | Date | string
    reponse_admin?: StringNullableFilter<"Avis"> | string | null
    reponse_admin_at?: DateTimeNullableFilter<"Avis"> | Date | string | null
    reponse_admin_id?: StringNullableFilter<"Avis"> | string | null
    masque?: BoolFilter<"Avis"> | boolean
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin_repondant?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    votes_utiles?: AvisUtileListRelationFilter
  }

  export type AvisOrderByWithRelationInput = {
    id?: SortOrder
    note?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    produit_id?: SortOrder
    utilisateur_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reponse_admin?: SortOrderInput | SortOrder
    reponse_admin_at?: SortOrderInput | SortOrder
    reponse_admin_id?: SortOrderInput | SortOrder
    masque?: SortOrder
    produit?: ProduitOrderByWithRelationInput
    utilisateur?: UserOrderByWithRelationInput
    admin_repondant?: UserOrderByWithRelationInput
    votes_utiles?: AvisUtileOrderByRelationAggregateInput
  }

  export type AvisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    utilisateur_id_produit_id?: AvisUtilisateur_idProduit_idCompoundUniqueInput
    AND?: AvisWhereInput | AvisWhereInput[]
    OR?: AvisWhereInput[]
    NOT?: AvisWhereInput | AvisWhereInput[]
    note?: IntFilter<"Avis"> | number
    titre?: StringFilter<"Avis"> | string
    contenu?: StringFilter<"Avis"> | string
    produit_id?: StringFilter<"Avis"> | string
    utilisateur_id?: StringFilter<"Avis"> | string
    createdAt?: DateTimeFilter<"Avis"> | Date | string
    updatedAt?: DateTimeFilter<"Avis"> | Date | string
    reponse_admin?: StringNullableFilter<"Avis"> | string | null
    reponse_admin_at?: DateTimeNullableFilter<"Avis"> | Date | string | null
    reponse_admin_id?: StringNullableFilter<"Avis"> | string | null
    masque?: BoolFilter<"Avis"> | boolean
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin_repondant?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    votes_utiles?: AvisUtileListRelationFilter
  }, "id" | "utilisateur_id_produit_id">

  export type AvisOrderByWithAggregationInput = {
    id?: SortOrder
    note?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    produit_id?: SortOrder
    utilisateur_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reponse_admin?: SortOrderInput | SortOrder
    reponse_admin_at?: SortOrderInput | SortOrder
    reponse_admin_id?: SortOrderInput | SortOrder
    masque?: SortOrder
    _count?: AvisCountOrderByAggregateInput
    _avg?: AvisAvgOrderByAggregateInput
    _max?: AvisMaxOrderByAggregateInput
    _min?: AvisMinOrderByAggregateInput
    _sum?: AvisSumOrderByAggregateInput
  }

  export type AvisScalarWhereWithAggregatesInput = {
    AND?: AvisScalarWhereWithAggregatesInput | AvisScalarWhereWithAggregatesInput[]
    OR?: AvisScalarWhereWithAggregatesInput[]
    NOT?: AvisScalarWhereWithAggregatesInput | AvisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Avis"> | string
    note?: IntWithAggregatesFilter<"Avis"> | number
    titre?: StringWithAggregatesFilter<"Avis"> | string
    contenu?: StringWithAggregatesFilter<"Avis"> | string
    produit_id?: StringWithAggregatesFilter<"Avis"> | string
    utilisateur_id?: StringWithAggregatesFilter<"Avis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Avis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Avis"> | Date | string
    reponse_admin?: StringNullableWithAggregatesFilter<"Avis"> | string | null
    reponse_admin_at?: DateTimeNullableWithAggregatesFilter<"Avis"> | Date | string | null
    reponse_admin_id?: StringNullableWithAggregatesFilter<"Avis"> | string | null
    masque?: BoolWithAggregatesFilter<"Avis"> | boolean
  }

  export type LikeWhereInput = {
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    id?: StringFilter<"Like"> | string
    utilisateur_id?: StringFilter<"Like"> | string
    produit_id?: StringFilter<"Like"> | string
    createdAt?: DateTimeFilter<"Like"> | Date | string
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LikeOrderByWithRelationInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    produit_id?: SortOrder
    createdAt?: SortOrder
    produit?: ProduitOrderByWithRelationInput
    utilisateur?: UserOrderByWithRelationInput
  }

  export type LikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    utilisateur_id_produit_id?: LikeUtilisateur_idProduit_idCompoundUniqueInput
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    utilisateur_id?: StringFilter<"Like"> | string
    produit_id?: StringFilter<"Like"> | string
    createdAt?: DateTimeFilter<"Like"> | Date | string
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "utilisateur_id_produit_id">

  export type LikeOrderByWithAggregationInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    produit_id?: SortOrder
    createdAt?: SortOrder
    _count?: LikeCountOrderByAggregateInput
    _max?: LikeMaxOrderByAggregateInput
    _min?: LikeMinOrderByAggregateInput
  }

  export type LikeScalarWhereWithAggregatesInput = {
    AND?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    OR?: LikeScalarWhereWithAggregatesInput[]
    NOT?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Like"> | string
    utilisateur_id?: StringWithAggregatesFilter<"Like"> | string
    produit_id?: StringWithAggregatesFilter<"Like"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Like"> | Date | string
  }

  export type AvisUtileWhereInput = {
    AND?: AvisUtileWhereInput | AvisUtileWhereInput[]
    OR?: AvisUtileWhereInput[]
    NOT?: AvisUtileWhereInput | AvisUtileWhereInput[]
    id?: StringFilter<"AvisUtile"> | string
    avis_id?: StringFilter<"AvisUtile"> | string
    utilisateur_id?: StringFilter<"AvisUtile"> | string
    utile?: BoolFilter<"AvisUtile"> | boolean
    createdAt?: DateTimeFilter<"AvisUtile"> | Date | string
    avis?: XOR<AvisScalarRelationFilter, AvisWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AvisUtileOrderByWithRelationInput = {
    id?: SortOrder
    avis_id?: SortOrder
    utilisateur_id?: SortOrder
    utile?: SortOrder
    createdAt?: SortOrder
    avis?: AvisOrderByWithRelationInput
    utilisateur?: UserOrderByWithRelationInput
  }

  export type AvisUtileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    avis_id_utilisateur_id?: AvisUtileAvis_idUtilisateur_idCompoundUniqueInput
    AND?: AvisUtileWhereInput | AvisUtileWhereInput[]
    OR?: AvisUtileWhereInput[]
    NOT?: AvisUtileWhereInput | AvisUtileWhereInput[]
    avis_id?: StringFilter<"AvisUtile"> | string
    utilisateur_id?: StringFilter<"AvisUtile"> | string
    utile?: BoolFilter<"AvisUtile"> | boolean
    createdAt?: DateTimeFilter<"AvisUtile"> | Date | string
    avis?: XOR<AvisScalarRelationFilter, AvisWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "avis_id_utilisateur_id">

  export type AvisUtileOrderByWithAggregationInput = {
    id?: SortOrder
    avis_id?: SortOrder
    utilisateur_id?: SortOrder
    utile?: SortOrder
    createdAt?: SortOrder
    _count?: AvisUtileCountOrderByAggregateInput
    _max?: AvisUtileMaxOrderByAggregateInput
    _min?: AvisUtileMinOrderByAggregateInput
  }

  export type AvisUtileScalarWhereWithAggregatesInput = {
    AND?: AvisUtileScalarWhereWithAggregatesInput | AvisUtileScalarWhereWithAggregatesInput[]
    OR?: AvisUtileScalarWhereWithAggregatesInput[]
    NOT?: AvisUtileScalarWhereWithAggregatesInput | AvisUtileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvisUtile"> | string
    avis_id?: StringWithAggregatesFilter<"AvisUtile"> | string
    utilisateur_id?: StringWithAggregatesFilter<"AvisUtile"> | string
    utile?: BoolWithAggregatesFilter<"AvisUtile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AvisUtile"> | Date | string
  }

  export type TypeSeanceWhereInput = {
    AND?: TypeSeanceWhereInput | TypeSeanceWhereInput[]
    OR?: TypeSeanceWhereInput[]
    NOT?: TypeSeanceWhereInput | TypeSeanceWhereInput[]
    id?: StringFilter<"TypeSeance"> | string
    nom?: StringFilter<"TypeSeance"> | string
    description?: StringFilter<"TypeSeance"> | string
    duree?: IntFilter<"TypeSeance"> | number
    prix?: IntFilter<"TypeSeance"> | number
    actif?: BoolFilter<"TypeSeance"> | boolean
    createdAt?: DateTimeFilter<"TypeSeance"> | Date | string
    updatedAt?: DateTimeFilter<"TypeSeance"> | Date | string
    rendezVous?: RendezVousListRelationFilter
  }

  export type TypeSeanceOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    duree?: SortOrder
    prix?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rendezVous?: RendezVousOrderByRelationAggregateInput
  }

  export type TypeSeanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nom?: string
    AND?: TypeSeanceWhereInput | TypeSeanceWhereInput[]
    OR?: TypeSeanceWhereInput[]
    NOT?: TypeSeanceWhereInput | TypeSeanceWhereInput[]
    description?: StringFilter<"TypeSeance"> | string
    duree?: IntFilter<"TypeSeance"> | number
    prix?: IntFilter<"TypeSeance"> | number
    actif?: BoolFilter<"TypeSeance"> | boolean
    createdAt?: DateTimeFilter<"TypeSeance"> | Date | string
    updatedAt?: DateTimeFilter<"TypeSeance"> | Date | string
    rendezVous?: RendezVousListRelationFilter
  }, "id" | "nom">

  export type TypeSeanceOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    duree?: SortOrder
    prix?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TypeSeanceCountOrderByAggregateInput
    _avg?: TypeSeanceAvgOrderByAggregateInput
    _max?: TypeSeanceMaxOrderByAggregateInput
    _min?: TypeSeanceMinOrderByAggregateInput
    _sum?: TypeSeanceSumOrderByAggregateInput
  }

  export type TypeSeanceScalarWhereWithAggregatesInput = {
    AND?: TypeSeanceScalarWhereWithAggregatesInput | TypeSeanceScalarWhereWithAggregatesInput[]
    OR?: TypeSeanceScalarWhereWithAggregatesInput[]
    NOT?: TypeSeanceScalarWhereWithAggregatesInput | TypeSeanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TypeSeance"> | string
    nom?: StringWithAggregatesFilter<"TypeSeance"> | string
    description?: StringWithAggregatesFilter<"TypeSeance"> | string
    duree?: IntWithAggregatesFilter<"TypeSeance"> | number
    prix?: IntWithAggregatesFilter<"TypeSeance"> | number
    actif?: BoolWithAggregatesFilter<"TypeSeance"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TypeSeance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TypeSeance"> | Date | string
  }

  export type RendezVousWhereInput = {
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    id?: StringFilter<"RendezVous"> | string
    utilisateur_id?: StringFilter<"RendezVous"> | string
    date_heure?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    type_seance_id?: StringFilter<"RendezVous"> | string
    notes?: StringNullableFilter<"RendezVous"> | string | null
    statut?: EnumAppointmentStatusFilter<"RendezVous"> | $Enums.AppointmentStatus
    raison_refus?: StringNullableFilter<"RendezVous"> | string | null
    notes_admin?: StringNullableFilter<"RendezVous"> | string | null
    createdAt?: DateTimeFilter<"RendezVous"> | Date | string
    updatedAt?: DateTimeFilter<"RendezVous"> | Date | string
    type_seance?: XOR<TypeSeanceScalarRelationFilter, TypeSeanceWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RendezVousOrderByWithRelationInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    date_heure?: SortOrder
    duree?: SortOrder
    type_seance_id?: SortOrder
    notes?: SortOrderInput | SortOrder
    statut?: SortOrder
    raison_refus?: SortOrderInput | SortOrder
    notes_admin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type_seance?: TypeSeanceOrderByWithRelationInput
    utilisateur?: UserOrderByWithRelationInput
  }

  export type RendezVousWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RendezVousWhereInput | RendezVousWhereInput[]
    OR?: RendezVousWhereInput[]
    NOT?: RendezVousWhereInput | RendezVousWhereInput[]
    utilisateur_id?: StringFilter<"RendezVous"> | string
    date_heure?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    type_seance_id?: StringFilter<"RendezVous"> | string
    notes?: StringNullableFilter<"RendezVous"> | string | null
    statut?: EnumAppointmentStatusFilter<"RendezVous"> | $Enums.AppointmentStatus
    raison_refus?: StringNullableFilter<"RendezVous"> | string | null
    notes_admin?: StringNullableFilter<"RendezVous"> | string | null
    createdAt?: DateTimeFilter<"RendezVous"> | Date | string
    updatedAt?: DateTimeFilter<"RendezVous"> | Date | string
    type_seance?: XOR<TypeSeanceScalarRelationFilter, TypeSeanceWhereInput>
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RendezVousOrderByWithAggregationInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    date_heure?: SortOrder
    duree?: SortOrder
    type_seance_id?: SortOrder
    notes?: SortOrderInput | SortOrder
    statut?: SortOrder
    raison_refus?: SortOrderInput | SortOrder
    notes_admin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RendezVousCountOrderByAggregateInput
    _avg?: RendezVousAvgOrderByAggregateInput
    _max?: RendezVousMaxOrderByAggregateInput
    _min?: RendezVousMinOrderByAggregateInput
    _sum?: RendezVousSumOrderByAggregateInput
  }

  export type RendezVousScalarWhereWithAggregatesInput = {
    AND?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    OR?: RendezVousScalarWhereWithAggregatesInput[]
    NOT?: RendezVousScalarWhereWithAggregatesInput | RendezVousScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RendezVous"> | string
    utilisateur_id?: StringWithAggregatesFilter<"RendezVous"> | string
    date_heure?: DateTimeWithAggregatesFilter<"RendezVous"> | Date | string
    duree?: IntWithAggregatesFilter<"RendezVous"> | number
    type_seance_id?: StringWithAggregatesFilter<"RendezVous"> | string
    notes?: StringNullableWithAggregatesFilter<"RendezVous"> | string | null
    statut?: EnumAppointmentStatusWithAggregatesFilter<"RendezVous"> | $Enums.AppointmentStatus
    raison_refus?: StringNullableWithAggregatesFilter<"RendezVous"> | string | null
    notes_admin?: StringNullableWithAggregatesFilter<"RendezVous"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RendezVous"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RendezVous"> | Date | string
  }

  export type ConfigurationWhereInput = {
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    id?: StringFilter<"Configuration"> | string
    cle?: StringFilter<"Configuration"> | string
    valeur?: StringFilter<"Configuration"> | string
    description?: StringNullableFilter<"Configuration"> | string | null
    updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }

  export type ConfigurationOrderByWithRelationInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cle?: string
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    valeur?: StringFilter<"Configuration"> | string
    description?: StringNullableFilter<"Configuration"> | string | null
    updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }, "id" | "cle">

  export type ConfigurationOrderByWithAggregationInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ConfigurationCountOrderByAggregateInput
    _max?: ConfigurationMaxOrderByAggregateInput
    _min?: ConfigurationMinOrderByAggregateInput
  }

  export type ConfigurationScalarWhereWithAggregatesInput = {
    AND?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    OR?: ConfigurationScalarWhereWithAggregatesInput[]
    NOT?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Configuration"> | string
    cle?: StringWithAggregatesFilter<"Configuration"> | string
    valeur?: StringWithAggregatesFilter<"Configuration"> | string
    description?: StringNullableWithAggregatesFilter<"Configuration"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Configuration"> | Date | string
  }

  export type CommandeWhereInput = {
    AND?: CommandeWhereInput | CommandeWhereInput[]
    OR?: CommandeWhereInput[]
    NOT?: CommandeWhereInput | CommandeWhereInput[]
    id?: StringFilter<"Commande"> | string
    numero?: StringFilter<"Commande"> | string
    utilisateur_id?: StringFilter<"Commande"> | string
    statut?: EnumOrderStatusFilter<"Commande"> | $Enums.OrderStatus
    total?: FloatFilter<"Commande"> | number
    frais_livraison?: FloatFilter<"Commande"> | number
    ville?: StringFilter<"Commande"> | string
    adresse?: StringFilter<"Commande"> | string
    telephone?: StringFilter<"Commande"> | string
    mode_paiement?: StringFilter<"Commande"> | string
    notes?: StringNullableFilter<"Commande"> | string | null
    createdAt?: DateTimeFilter<"Commande"> | Date | string
    updatedAt?: DateTimeFilter<"Commande"> | Date | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    lignes?: LigneCommandeListRelationFilter
  }

  export type CommandeOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    utilisateur_id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    frais_livraison?: SortOrder
    ville?: SortOrder
    adresse?: SortOrder
    telephone?: SortOrder
    mode_paiement?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateur?: UserOrderByWithRelationInput
    lignes?: LigneCommandeOrderByRelationAggregateInput
  }

  export type CommandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: CommandeWhereInput | CommandeWhereInput[]
    OR?: CommandeWhereInput[]
    NOT?: CommandeWhereInput | CommandeWhereInput[]
    utilisateur_id?: StringFilter<"Commande"> | string
    statut?: EnumOrderStatusFilter<"Commande"> | $Enums.OrderStatus
    total?: FloatFilter<"Commande"> | number
    frais_livraison?: FloatFilter<"Commande"> | number
    ville?: StringFilter<"Commande"> | string
    adresse?: StringFilter<"Commande"> | string
    telephone?: StringFilter<"Commande"> | string
    mode_paiement?: StringFilter<"Commande"> | string
    notes?: StringNullableFilter<"Commande"> | string | null
    createdAt?: DateTimeFilter<"Commande"> | Date | string
    updatedAt?: DateTimeFilter<"Commande"> | Date | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    lignes?: LigneCommandeListRelationFilter
  }, "id" | "numero">

  export type CommandeOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    utilisateur_id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    frais_livraison?: SortOrder
    ville?: SortOrder
    adresse?: SortOrder
    telephone?: SortOrder
    mode_paiement?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommandeCountOrderByAggregateInput
    _avg?: CommandeAvgOrderByAggregateInput
    _max?: CommandeMaxOrderByAggregateInput
    _min?: CommandeMinOrderByAggregateInput
    _sum?: CommandeSumOrderByAggregateInput
  }

  export type CommandeScalarWhereWithAggregatesInput = {
    AND?: CommandeScalarWhereWithAggregatesInput | CommandeScalarWhereWithAggregatesInput[]
    OR?: CommandeScalarWhereWithAggregatesInput[]
    NOT?: CommandeScalarWhereWithAggregatesInput | CommandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commande"> | string
    numero?: StringWithAggregatesFilter<"Commande"> | string
    utilisateur_id?: StringWithAggregatesFilter<"Commande"> | string
    statut?: EnumOrderStatusWithAggregatesFilter<"Commande"> | $Enums.OrderStatus
    total?: FloatWithAggregatesFilter<"Commande"> | number
    frais_livraison?: FloatWithAggregatesFilter<"Commande"> | number
    ville?: StringWithAggregatesFilter<"Commande"> | string
    adresse?: StringWithAggregatesFilter<"Commande"> | string
    telephone?: StringWithAggregatesFilter<"Commande"> | string
    mode_paiement?: StringWithAggregatesFilter<"Commande"> | string
    notes?: StringNullableWithAggregatesFilter<"Commande"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Commande"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Commande"> | Date | string
  }

  export type LigneCommandeWhereInput = {
    AND?: LigneCommandeWhereInput | LigneCommandeWhereInput[]
    OR?: LigneCommandeWhereInput[]
    NOT?: LigneCommandeWhereInput | LigneCommandeWhereInput[]
    id?: StringFilter<"LigneCommande"> | string
    commande_id?: StringFilter<"LigneCommande"> | string
    produit_id?: StringFilter<"LigneCommande"> | string
    nom_produit?: StringFilter<"LigneCommande"> | string
    image?: StringNullableFilter<"LigneCommande"> | string | null
    prix_unitaire?: FloatFilter<"LigneCommande"> | number
    quantite?: IntFilter<"LigneCommande"> | number
    sous_total?: FloatFilter<"LigneCommande"> | number
    commande?: XOR<CommandeScalarRelationFilter, CommandeWhereInput>
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
  }

  export type LigneCommandeOrderByWithRelationInput = {
    id?: SortOrder
    commande_id?: SortOrder
    produit_id?: SortOrder
    nom_produit?: SortOrder
    image?: SortOrderInput | SortOrder
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
    commande?: CommandeOrderByWithRelationInput
    produit?: ProduitOrderByWithRelationInput
  }

  export type LigneCommandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LigneCommandeWhereInput | LigneCommandeWhereInput[]
    OR?: LigneCommandeWhereInput[]
    NOT?: LigneCommandeWhereInput | LigneCommandeWhereInput[]
    commande_id?: StringFilter<"LigneCommande"> | string
    produit_id?: StringFilter<"LigneCommande"> | string
    nom_produit?: StringFilter<"LigneCommande"> | string
    image?: StringNullableFilter<"LigneCommande"> | string | null
    prix_unitaire?: FloatFilter<"LigneCommande"> | number
    quantite?: IntFilter<"LigneCommande"> | number
    sous_total?: FloatFilter<"LigneCommande"> | number
    commande?: XOR<CommandeScalarRelationFilter, CommandeWhereInput>
    produit?: XOR<ProduitScalarRelationFilter, ProduitWhereInput>
  }, "id">

  export type LigneCommandeOrderByWithAggregationInput = {
    id?: SortOrder
    commande_id?: SortOrder
    produit_id?: SortOrder
    nom_produit?: SortOrder
    image?: SortOrderInput | SortOrder
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
    _count?: LigneCommandeCountOrderByAggregateInput
    _avg?: LigneCommandeAvgOrderByAggregateInput
    _max?: LigneCommandeMaxOrderByAggregateInput
    _min?: LigneCommandeMinOrderByAggregateInput
    _sum?: LigneCommandeSumOrderByAggregateInput
  }

  export type LigneCommandeScalarWhereWithAggregatesInput = {
    AND?: LigneCommandeScalarWhereWithAggregatesInput | LigneCommandeScalarWhereWithAggregatesInput[]
    OR?: LigneCommandeScalarWhereWithAggregatesInput[]
    NOT?: LigneCommandeScalarWhereWithAggregatesInput | LigneCommandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LigneCommande"> | string
    commande_id?: StringWithAggregatesFilter<"LigneCommande"> | string
    produit_id?: StringWithAggregatesFilter<"LigneCommande"> | string
    nom_produit?: StringWithAggregatesFilter<"LigneCommande"> | string
    image?: StringNullableWithAggregatesFilter<"LigneCommande"> | string | null
    prix_unitaire?: FloatWithAggregatesFilter<"LigneCommande"> | number
    quantite?: IntWithAggregatesFilter<"LigneCommande"> | number
    sous_total?: FloatWithAggregatesFilter<"LigneCommande"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategorieCreateInput = {
    id?: string
    nom: string
    description?: string | null
    icone?: string | null
    ordre?: number
    createdAt?: Date | string
    produits?: ProduitCreateNestedManyWithoutCategorieInput
  }

  export type CategorieUncheckedCreateInput = {
    id?: string
    nom: string
    description?: string | null
    icone?: string | null
    ordre?: number
    createdAt?: Date | string
    produits?: ProduitUncheckedCreateNestedManyWithoutCategorieInput
  }

  export type CategorieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produits?: ProduitUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produits?: ProduitUncheckedUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieCreateManyInput = {
    id?: string
    nom: string
    description?: string | null
    icone?: string | null
    ordre?: number
    createdAt?: Date | string
  }

  export type CategorieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategorieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduitCreateInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisCreateNestedManyWithoutProduitInput
    likes?: LikeCreateNestedManyWithoutProduitInput
    categorie: CategorieCreateNestedOneWithoutProduitsInput
    lignes?: LigneCommandeCreateNestedManyWithoutProduitInput
  }

  export type ProduitUncheckedCreateInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisUncheckedCreateNestedManyWithoutProduitInput
    likes?: LikeUncheckedCreateNestedManyWithoutProduitInput
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutProduitInput
  }

  export type ProduitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateManyWithoutProduitNestedInput
    likes?: LikeUpdateManyWithoutProduitNestedInput
    categorie?: CategorieUpdateOneRequiredWithoutProduitsNestedInput
    lignes?: LigneCommandeUpdateManyWithoutProduitNestedInput
  }

  export type ProduitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    categorie_id?: StringFieldUpdateOperationsInput | string
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUncheckedUpdateManyWithoutProduitNestedInput
    likes?: LikeUncheckedUpdateManyWithoutProduitNestedInput
    lignes?: LigneCommandeUncheckedUpdateManyWithoutProduitNestedInput
  }

  export type ProduitCreateManyInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProduitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    categorie_id?: StringFieldUpdateOperationsInput | string
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisCreateInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    produit: ProduitCreateNestedOneWithoutAvisInput
    utilisateur: UserCreateNestedOneWithoutAvisInput
    admin_repondant?: UserCreateNestedOneWithoutAvis_repondusInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutAvisInput
  }

  export type AvisUncheckedCreateInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutAvisInput
  }

  export type AvisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    produit?: ProduitUpdateOneRequiredWithoutAvisNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutAvisNestedInput
    admin_repondant?: UserUpdateOneWithoutAvis_repondusNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutAvisNestedInput
  }

  export type AvisCreateManyInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
  }

  export type AvisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AvisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LikeCreateInput = {
    id?: string
    createdAt?: Date | string
    produit: ProduitCreateNestedOneWithoutLikesInput
    utilisateur: UserCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateInput = {
    id?: string
    utilisateur_id: string
    produit_id: string
    createdAt?: Date | string
  }

  export type LikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produit?: ProduitUpdateOneRequiredWithoutLikesNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateManyInput = {
    id?: string
    utilisateur_id: string
    produit_id: string
    createdAt?: Date | string
  }

  export type LikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUtileCreateInput = {
    id?: string
    utile: boolean
    createdAt?: Date | string
    avis: AvisCreateNestedOneWithoutVotes_utilesInput
    utilisateur: UserCreateNestedOneWithoutVotes_utilesInput
  }

  export type AvisUtileUncheckedCreateInput = {
    id?: string
    avis_id: string
    utilisateur_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUtileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateOneRequiredWithoutVotes_utilesNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutVotes_utilesNestedInput
  }

  export type AvisUtileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avis_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUtileCreateManyInput = {
    id?: string
    avis_id: string
    utilisateur_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUtileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUtileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    avis_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypeSeanceCreateInput = {
    id?: string
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rendezVous?: RendezVousCreateNestedManyWithoutType_seanceInput
  }

  export type TypeSeanceUncheckedCreateInput = {
    id?: string
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutType_seanceInput
  }

  export type TypeSeanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rendezVous?: RendezVousUpdateManyWithoutType_seanceNestedInput
  }

  export type TypeSeanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rendezVous?: RendezVousUncheckedUpdateManyWithoutType_seanceNestedInput
  }

  export type TypeSeanceCreateManyInput = {
    id?: string
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TypeSeanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypeSeanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousCreateInput = {
    id?: string
    date_heure: Date | string
    duree: number
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    type_seance: TypeSeanceCreateNestedOneWithoutRendezVousInput
    utilisateur: UserCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateInput = {
    id?: string
    utilisateur_id: string
    date_heure: Date | string
    duree: number
    type_seance_id: string
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RendezVousUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type_seance?: TypeSeanceUpdateOneRequiredWithoutRendezVousNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    type_seance_id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousCreateManyInput = {
    id?: string
    utilisateur_id: string
    date_heure: Date | string
    duree: number
    type_seance_id: string
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RendezVousUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    type_seance_id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationCreateInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type ConfigurationUncheckedCreateInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type ConfigurationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationCreateManyInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    updatedAt?: Date | string
  }

  export type ConfigurationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommandeCreateInput = {
    id?: string
    numero: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutCommandesInput
    lignes?: LigneCommandeCreateNestedManyWithoutCommandeInput
  }

  export type CommandeUncheckedCreateInput = {
    id?: string
    numero: string
    utilisateur_id: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutCommandeInput
  }

  export type CommandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutCommandesNestedInput
    lignes?: LigneCommandeUpdateManyWithoutCommandeNestedInput
  }

  export type CommandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lignes?: LigneCommandeUncheckedUpdateManyWithoutCommandeNestedInput
  }

  export type CommandeCreateManyInput = {
    id?: string
    numero: string
    utilisateur_id: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LigneCommandeCreateInput = {
    id?: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
    commande: CommandeCreateNestedOneWithoutLignesInput
    produit: ProduitCreateNestedOneWithoutLignesInput
  }

  export type LigneCommandeUncheckedCreateInput = {
    id?: string
    commande_id: string
    produit_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type LigneCommandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
    commande?: CommandeUpdateOneRequiredWithoutLignesNestedInput
    produit?: ProduitUpdateOneRequiredWithoutLignesNestedInput
  }

  export type LigneCommandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commande_id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
  }

  export type LigneCommandeCreateManyInput = {
    id?: string
    commande_id: string
    produit_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type LigneCommandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
  }

  export type LigneCommandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commande_id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AvisListRelationFilter = {
    every?: AvisWhereInput
    some?: AvisWhereInput
    none?: AvisWhereInput
  }

  export type LikeListRelationFilter = {
    every?: LikeWhereInput
    some?: LikeWhereInput
    none?: LikeWhereInput
  }

  export type RendezVousListRelationFilter = {
    every?: RendezVousWhereInput
    some?: RendezVousWhereInput
    none?: RendezVousWhereInput
  }

  export type CommandeListRelationFilter = {
    every?: CommandeWhereInput
    some?: CommandeWhereInput
    none?: CommandeWhereInput
  }

  export type AvisUtileListRelationFilter = {
    every?: AvisUtileWhereInput
    some?: AvisUtileWhereInput
    none?: AvisUtileWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AvisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RendezVousOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommandeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvisUtileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type ProduitListRelationFilter = {
    every?: ProduitWhereInput
    some?: ProduitWhereInput
    none?: ProduitWhereInput
  }

  export type ProduitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategorieCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    icone?: SortOrder
    ordre?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorieAvgOrderByAggregateInput = {
    ordre?: SortOrder
  }

  export type CategorieMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    icone?: SortOrder
    ordre?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorieMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    icone?: SortOrder
    ordre?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorieSumOrderByAggregateInput = {
    ordre?: SortOrder
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategorieScalarRelationFilter = {
    is?: CategorieWhereInput
    isNot?: CategorieWhereInput
  }

  export type LigneCommandeListRelationFilter = {
    every?: LigneCommandeWhereInput
    some?: LigneCommandeWhereInput
    none?: LigneCommandeWhereInput
  }

  export type LigneCommandeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProduitCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    categorie_id?: SortOrder
    images?: SortOrder
    sku_number?: SortOrder
    sku?: SortOrder
    publie?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProduitAvgOrderByAggregateInput = {
    prix?: SortOrder
    stock?: SortOrder
    sku_number?: SortOrder
  }

  export type ProduitMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    categorie_id?: SortOrder
    sku_number?: SortOrder
    sku?: SortOrder
    publie?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProduitMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    categorie_id?: SortOrder
    sku_number?: SortOrder
    sku?: SortOrder
    publie?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProduitSumOrderByAggregateInput = {
    prix?: SortOrder
    stock?: SortOrder
    sku_number?: SortOrder
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

  export type ProduitScalarRelationFilter = {
    is?: ProduitWhereInput
    isNot?: ProduitWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AvisUtilisateur_idProduit_idCompoundUniqueInput = {
    utilisateur_id: string
    produit_id: string
  }

  export type AvisCountOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    produit_id?: SortOrder
    utilisateur_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reponse_admin?: SortOrder
    reponse_admin_at?: SortOrder
    reponse_admin_id?: SortOrder
    masque?: SortOrder
  }

  export type AvisAvgOrderByAggregateInput = {
    note?: SortOrder
  }

  export type AvisMaxOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    produit_id?: SortOrder
    utilisateur_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reponse_admin?: SortOrder
    reponse_admin_at?: SortOrder
    reponse_admin_id?: SortOrder
    masque?: SortOrder
  }

  export type AvisMinOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    produit_id?: SortOrder
    utilisateur_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reponse_admin?: SortOrder
    reponse_admin_at?: SortOrder
    reponse_admin_id?: SortOrder
    masque?: SortOrder
  }

  export type AvisSumOrderByAggregateInput = {
    note?: SortOrder
  }

  export type LikeUtilisateur_idProduit_idCompoundUniqueInput = {
    utilisateur_id: string
    produit_id: string
  }

  export type LikeCountOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    produit_id?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeMaxOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    produit_id?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeMinOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    produit_id?: SortOrder
    createdAt?: SortOrder
  }

  export type AvisScalarRelationFilter = {
    is?: AvisWhereInput
    isNot?: AvisWhereInput
  }

  export type AvisUtileAvis_idUtilisateur_idCompoundUniqueInput = {
    avis_id: string
    utilisateur_id: string
  }

  export type AvisUtileCountOrderByAggregateInput = {
    id?: SortOrder
    avis_id?: SortOrder
    utilisateur_id?: SortOrder
    utile?: SortOrder
    createdAt?: SortOrder
  }

  export type AvisUtileMaxOrderByAggregateInput = {
    id?: SortOrder
    avis_id?: SortOrder
    utilisateur_id?: SortOrder
    utile?: SortOrder
    createdAt?: SortOrder
  }

  export type AvisUtileMinOrderByAggregateInput = {
    id?: SortOrder
    avis_id?: SortOrder
    utilisateur_id?: SortOrder
    utile?: SortOrder
    createdAt?: SortOrder
  }

  export type TypeSeanceCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    duree?: SortOrder
    prix?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TypeSeanceAvgOrderByAggregateInput = {
    duree?: SortOrder
    prix?: SortOrder
  }

  export type TypeSeanceMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    duree?: SortOrder
    prix?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TypeSeanceMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    duree?: SortOrder
    prix?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TypeSeanceSumOrderByAggregateInput = {
    duree?: SortOrder
    prix?: SortOrder
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type TypeSeanceScalarRelationFilter = {
    is?: TypeSeanceWhereInput
    isNot?: TypeSeanceWhereInput
  }

  export type RendezVousCountOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    date_heure?: SortOrder
    duree?: SortOrder
    type_seance_id?: SortOrder
    notes?: SortOrder
    statut?: SortOrder
    raison_refus?: SortOrder
    notes_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RendezVousAvgOrderByAggregateInput = {
    duree?: SortOrder
  }

  export type RendezVousMaxOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    date_heure?: SortOrder
    duree?: SortOrder
    type_seance_id?: SortOrder
    notes?: SortOrder
    statut?: SortOrder
    raison_refus?: SortOrder
    notes_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RendezVousMinOrderByAggregateInput = {
    id?: SortOrder
    utilisateur_id?: SortOrder
    date_heure?: SortOrder
    duree?: SortOrder
    type_seance_id?: SortOrder
    notes?: SortOrder
    statut?: SortOrder
    raison_refus?: SortOrder
    notes_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RendezVousSumOrderByAggregateInput = {
    duree?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type ConfigurationCountOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationMaxOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationMinOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type CommandeCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    utilisateur_id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    frais_livraison?: SortOrder
    ville?: SortOrder
    adresse?: SortOrder
    telephone?: SortOrder
    mode_paiement?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommandeAvgOrderByAggregateInput = {
    total?: SortOrder
    frais_livraison?: SortOrder
  }

  export type CommandeMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    utilisateur_id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    frais_livraison?: SortOrder
    ville?: SortOrder
    adresse?: SortOrder
    telephone?: SortOrder
    mode_paiement?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommandeMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    utilisateur_id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    frais_livraison?: SortOrder
    ville?: SortOrder
    adresse?: SortOrder
    telephone?: SortOrder
    mode_paiement?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommandeSumOrderByAggregateInput = {
    total?: SortOrder
    frais_livraison?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type CommandeScalarRelationFilter = {
    is?: CommandeWhereInput
    isNot?: CommandeWhereInput
  }

  export type LigneCommandeCountOrderByAggregateInput = {
    id?: SortOrder
    commande_id?: SortOrder
    produit_id?: SortOrder
    nom_produit?: SortOrder
    image?: SortOrder
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
  }

  export type LigneCommandeAvgOrderByAggregateInput = {
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
  }

  export type LigneCommandeMaxOrderByAggregateInput = {
    id?: SortOrder
    commande_id?: SortOrder
    produit_id?: SortOrder
    nom_produit?: SortOrder
    image?: SortOrder
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
  }

  export type LigneCommandeMinOrderByAggregateInput = {
    id?: SortOrder
    commande_id?: SortOrder
    produit_id?: SortOrder
    nom_produit?: SortOrder
    image?: SortOrder
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
  }

  export type LigneCommandeSumOrderByAggregateInput = {
    prix_unitaire?: SortOrder
    quantite?: SortOrder
    sous_total?: SortOrder
  }

  export type AvisCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput> | AvisCreateWithoutUtilisateurInput[] | AvisUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutUtilisateurInput | AvisCreateOrConnectWithoutUtilisateurInput[]
    createMany?: AvisCreateManyUtilisateurInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput> | LikeCreateWithoutUtilisateurInput[] | LikeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUtilisateurInput | LikeCreateOrConnectWithoutUtilisateurInput[]
    createMany?: LikeCreateManyUtilisateurInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type RendezVousCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type CommandeCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput> | CommandeCreateWithoutUtilisateurInput[] | CommandeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: CommandeCreateOrConnectWithoutUtilisateurInput | CommandeCreateOrConnectWithoutUtilisateurInput[]
    createMany?: CommandeCreateManyUtilisateurInputEnvelope
    connect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
  }

  export type AvisCreateNestedManyWithoutAdmin_repondantInput = {
    create?: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput> | AvisCreateWithoutAdmin_repondantInput[] | AvisUncheckedCreateWithoutAdmin_repondantInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutAdmin_repondantInput | AvisCreateOrConnectWithoutAdmin_repondantInput[]
    createMany?: AvisCreateManyAdmin_repondantInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type AvisUtileCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput> | AvisUtileCreateWithoutUtilisateurInput[] | AvisUtileUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutUtilisateurInput | AvisUtileCreateOrConnectWithoutUtilisateurInput[]
    createMany?: AvisUtileCreateManyUtilisateurInputEnvelope
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
  }

  export type AvisUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput> | AvisCreateWithoutUtilisateurInput[] | AvisUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutUtilisateurInput | AvisCreateOrConnectWithoutUtilisateurInput[]
    createMany?: AvisCreateManyUtilisateurInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput> | LikeCreateWithoutUtilisateurInput[] | LikeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUtilisateurInput | LikeCreateOrConnectWithoutUtilisateurInput[]
    createMany?: LikeCreateManyUtilisateurInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type CommandeUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput> | CommandeCreateWithoutUtilisateurInput[] | CommandeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: CommandeCreateOrConnectWithoutUtilisateurInput | CommandeCreateOrConnectWithoutUtilisateurInput[]
    createMany?: CommandeCreateManyUtilisateurInputEnvelope
    connect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
  }

  export type AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput = {
    create?: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput> | AvisCreateWithoutAdmin_repondantInput[] | AvisUncheckedCreateWithoutAdmin_repondantInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutAdmin_repondantInput | AvisCreateOrConnectWithoutAdmin_repondantInput[]
    createMany?: AvisCreateManyAdmin_repondantInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput> | AvisUtileCreateWithoutUtilisateurInput[] | AvisUtileUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutUtilisateurInput | AvisUtileCreateOrConnectWithoutUtilisateurInput[]
    createMany?: AvisUtileCreateManyUtilisateurInputEnvelope
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AvisUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput> | AvisCreateWithoutUtilisateurInput[] | AvisUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutUtilisateurInput | AvisCreateOrConnectWithoutUtilisateurInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutUtilisateurInput | AvisUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: AvisCreateManyUtilisateurInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutUtilisateurInput | AvisUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutUtilisateurInput | AvisUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput> | LikeCreateWithoutUtilisateurInput[] | LikeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUtilisateurInput | LikeCreateOrConnectWithoutUtilisateurInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUtilisateurInput | LikeUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: LikeCreateManyUtilisateurInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUtilisateurInput | LikeUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUtilisateurInput | LikeUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type RendezVousUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput | RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput | RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutUtilisateurInput | RendezVousUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type CommandeUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput> | CommandeCreateWithoutUtilisateurInput[] | CommandeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: CommandeCreateOrConnectWithoutUtilisateurInput | CommandeCreateOrConnectWithoutUtilisateurInput[]
    upsert?: CommandeUpsertWithWhereUniqueWithoutUtilisateurInput | CommandeUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: CommandeCreateManyUtilisateurInputEnvelope
    set?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    disconnect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    delete?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    connect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    update?: CommandeUpdateWithWhereUniqueWithoutUtilisateurInput | CommandeUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: CommandeUpdateManyWithWhereWithoutUtilisateurInput | CommandeUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: CommandeScalarWhereInput | CommandeScalarWhereInput[]
  }

  export type AvisUpdateManyWithoutAdmin_repondantNestedInput = {
    create?: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput> | AvisCreateWithoutAdmin_repondantInput[] | AvisUncheckedCreateWithoutAdmin_repondantInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutAdmin_repondantInput | AvisCreateOrConnectWithoutAdmin_repondantInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutAdmin_repondantInput | AvisUpsertWithWhereUniqueWithoutAdmin_repondantInput[]
    createMany?: AvisCreateManyAdmin_repondantInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutAdmin_repondantInput | AvisUpdateWithWhereUniqueWithoutAdmin_repondantInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutAdmin_repondantInput | AvisUpdateManyWithWhereWithoutAdmin_repondantInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type AvisUtileUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput> | AvisUtileCreateWithoutUtilisateurInput[] | AvisUtileUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutUtilisateurInput | AvisUtileCreateOrConnectWithoutUtilisateurInput[]
    upsert?: AvisUtileUpsertWithWhereUniqueWithoutUtilisateurInput | AvisUtileUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: AvisUtileCreateManyUtilisateurInputEnvelope
    set?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    disconnect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    delete?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    update?: AvisUtileUpdateWithWhereUniqueWithoutUtilisateurInput | AvisUtileUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: AvisUtileUpdateManyWithWhereWithoutUtilisateurInput | AvisUtileUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
  }

  export type AvisUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput> | AvisCreateWithoutUtilisateurInput[] | AvisUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutUtilisateurInput | AvisCreateOrConnectWithoutUtilisateurInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutUtilisateurInput | AvisUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: AvisCreateManyUtilisateurInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutUtilisateurInput | AvisUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutUtilisateurInput | AvisUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput> | LikeCreateWithoutUtilisateurInput[] | LikeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUtilisateurInput | LikeCreateOrConnectWithoutUtilisateurInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUtilisateurInput | LikeUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: LikeCreateManyUtilisateurInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUtilisateurInput | LikeUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUtilisateurInput | LikeUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput> | RendezVousCreateWithoutUtilisateurInput[] | RendezVousUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutUtilisateurInput | RendezVousCreateOrConnectWithoutUtilisateurInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput | RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: RendezVousCreateManyUtilisateurInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput | RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutUtilisateurInput | RendezVousUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput> | CommandeCreateWithoutUtilisateurInput[] | CommandeUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: CommandeCreateOrConnectWithoutUtilisateurInput | CommandeCreateOrConnectWithoutUtilisateurInput[]
    upsert?: CommandeUpsertWithWhereUniqueWithoutUtilisateurInput | CommandeUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: CommandeCreateManyUtilisateurInputEnvelope
    set?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    disconnect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    delete?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    connect?: CommandeWhereUniqueInput | CommandeWhereUniqueInput[]
    update?: CommandeUpdateWithWhereUniqueWithoutUtilisateurInput | CommandeUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: CommandeUpdateManyWithWhereWithoutUtilisateurInput | CommandeUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: CommandeScalarWhereInput | CommandeScalarWhereInput[]
  }

  export type AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput = {
    create?: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput> | AvisCreateWithoutAdmin_repondantInput[] | AvisUncheckedCreateWithoutAdmin_repondantInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutAdmin_repondantInput | AvisCreateOrConnectWithoutAdmin_repondantInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutAdmin_repondantInput | AvisUpsertWithWhereUniqueWithoutAdmin_repondantInput[]
    createMany?: AvisCreateManyAdmin_repondantInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutAdmin_repondantInput | AvisUpdateWithWhereUniqueWithoutAdmin_repondantInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutAdmin_repondantInput | AvisUpdateManyWithWhereWithoutAdmin_repondantInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput> | AvisUtileCreateWithoutUtilisateurInput[] | AvisUtileUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutUtilisateurInput | AvisUtileCreateOrConnectWithoutUtilisateurInput[]
    upsert?: AvisUtileUpsertWithWhereUniqueWithoutUtilisateurInput | AvisUtileUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: AvisUtileCreateManyUtilisateurInputEnvelope
    set?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    disconnect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    delete?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    update?: AvisUtileUpdateWithWhereUniqueWithoutUtilisateurInput | AvisUtileUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: AvisUtileUpdateManyWithWhereWithoutUtilisateurInput | AvisUtileUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
  }

  export type ProduitCreateNestedManyWithoutCategorieInput = {
    create?: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput> | ProduitCreateWithoutCategorieInput[] | ProduitUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: ProduitCreateOrConnectWithoutCategorieInput | ProduitCreateOrConnectWithoutCategorieInput[]
    createMany?: ProduitCreateManyCategorieInputEnvelope
    connect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
  }

  export type ProduitUncheckedCreateNestedManyWithoutCategorieInput = {
    create?: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput> | ProduitCreateWithoutCategorieInput[] | ProduitUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: ProduitCreateOrConnectWithoutCategorieInput | ProduitCreateOrConnectWithoutCategorieInput[]
    createMany?: ProduitCreateManyCategorieInputEnvelope
    connect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProduitUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput> | ProduitCreateWithoutCategorieInput[] | ProduitUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: ProduitCreateOrConnectWithoutCategorieInput | ProduitCreateOrConnectWithoutCategorieInput[]
    upsert?: ProduitUpsertWithWhereUniqueWithoutCategorieInput | ProduitUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: ProduitCreateManyCategorieInputEnvelope
    set?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    disconnect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    delete?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    connect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    update?: ProduitUpdateWithWhereUniqueWithoutCategorieInput | ProduitUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: ProduitUpdateManyWithWhereWithoutCategorieInput | ProduitUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: ProduitScalarWhereInput | ProduitScalarWhereInput[]
  }

  export type ProduitUncheckedUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput> | ProduitCreateWithoutCategorieInput[] | ProduitUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: ProduitCreateOrConnectWithoutCategorieInput | ProduitCreateOrConnectWithoutCategorieInput[]
    upsert?: ProduitUpsertWithWhereUniqueWithoutCategorieInput | ProduitUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: ProduitCreateManyCategorieInputEnvelope
    set?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    disconnect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    delete?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    connect?: ProduitWhereUniqueInput | ProduitWhereUniqueInput[]
    update?: ProduitUpdateWithWhereUniqueWithoutCategorieInput | ProduitUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: ProduitUpdateManyWithWhereWithoutCategorieInput | ProduitUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: ProduitScalarWhereInput | ProduitScalarWhereInput[]
  }

  export type ProduitCreateimagesInput = {
    set: string[]
  }

  export type AvisCreateNestedManyWithoutProduitInput = {
    create?: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput> | AvisCreateWithoutProduitInput[] | AvisUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutProduitInput | AvisCreateOrConnectWithoutProduitInput[]
    createMany?: AvisCreateManyProduitInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutProduitInput = {
    create?: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput> | LikeCreateWithoutProduitInput[] | LikeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutProduitInput | LikeCreateOrConnectWithoutProduitInput[]
    createMany?: LikeCreateManyProduitInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type CategorieCreateNestedOneWithoutProduitsInput = {
    create?: XOR<CategorieCreateWithoutProduitsInput, CategorieUncheckedCreateWithoutProduitsInput>
    connectOrCreate?: CategorieCreateOrConnectWithoutProduitsInput
    connect?: CategorieWhereUniqueInput
  }

  export type LigneCommandeCreateNestedManyWithoutProduitInput = {
    create?: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput> | LigneCommandeCreateWithoutProduitInput[] | LigneCommandeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutProduitInput | LigneCommandeCreateOrConnectWithoutProduitInput[]
    createMany?: LigneCommandeCreateManyProduitInputEnvelope
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
  }

  export type AvisUncheckedCreateNestedManyWithoutProduitInput = {
    create?: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput> | AvisCreateWithoutProduitInput[] | AvisUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutProduitInput | AvisCreateOrConnectWithoutProduitInput[]
    createMany?: AvisCreateManyProduitInputEnvelope
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutProduitInput = {
    create?: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput> | LikeCreateWithoutProduitInput[] | LikeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutProduitInput | LikeCreateOrConnectWithoutProduitInput[]
    createMany?: LikeCreateManyProduitInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type LigneCommandeUncheckedCreateNestedManyWithoutProduitInput = {
    create?: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput> | LigneCommandeCreateWithoutProduitInput[] | LigneCommandeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutProduitInput | LigneCommandeCreateOrConnectWithoutProduitInput[]
    createMany?: LigneCommandeCreateManyProduitInputEnvelope
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProduitUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AvisUpdateManyWithoutProduitNestedInput = {
    create?: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput> | AvisCreateWithoutProduitInput[] | AvisUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutProduitInput | AvisCreateOrConnectWithoutProduitInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutProduitInput | AvisUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: AvisCreateManyProduitInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutProduitInput | AvisUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutProduitInput | AvisUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutProduitNestedInput = {
    create?: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput> | LikeCreateWithoutProduitInput[] | LikeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutProduitInput | LikeCreateOrConnectWithoutProduitInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutProduitInput | LikeUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: LikeCreateManyProduitInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutProduitInput | LikeUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutProduitInput | LikeUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type CategorieUpdateOneRequiredWithoutProduitsNestedInput = {
    create?: XOR<CategorieCreateWithoutProduitsInput, CategorieUncheckedCreateWithoutProduitsInput>
    connectOrCreate?: CategorieCreateOrConnectWithoutProduitsInput
    upsert?: CategorieUpsertWithoutProduitsInput
    connect?: CategorieWhereUniqueInput
    update?: XOR<XOR<CategorieUpdateToOneWithWhereWithoutProduitsInput, CategorieUpdateWithoutProduitsInput>, CategorieUncheckedUpdateWithoutProduitsInput>
  }

  export type LigneCommandeUpdateManyWithoutProduitNestedInput = {
    create?: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput> | LigneCommandeCreateWithoutProduitInput[] | LigneCommandeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutProduitInput | LigneCommandeCreateOrConnectWithoutProduitInput[]
    upsert?: LigneCommandeUpsertWithWhereUniqueWithoutProduitInput | LigneCommandeUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: LigneCommandeCreateManyProduitInputEnvelope
    set?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    disconnect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    delete?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    update?: LigneCommandeUpdateWithWhereUniqueWithoutProduitInput | LigneCommandeUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: LigneCommandeUpdateManyWithWhereWithoutProduitInput | LigneCommandeUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
  }

  export type AvisUncheckedUpdateManyWithoutProduitNestedInput = {
    create?: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput> | AvisCreateWithoutProduitInput[] | AvisUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: AvisCreateOrConnectWithoutProduitInput | AvisCreateOrConnectWithoutProduitInput[]
    upsert?: AvisUpsertWithWhereUniqueWithoutProduitInput | AvisUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: AvisCreateManyProduitInputEnvelope
    set?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    disconnect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    delete?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    connect?: AvisWhereUniqueInput | AvisWhereUniqueInput[]
    update?: AvisUpdateWithWhereUniqueWithoutProduitInput | AvisUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: AvisUpdateManyWithWhereWithoutProduitInput | AvisUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: AvisScalarWhereInput | AvisScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutProduitNestedInput = {
    create?: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput> | LikeCreateWithoutProduitInput[] | LikeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutProduitInput | LikeCreateOrConnectWithoutProduitInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutProduitInput | LikeUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: LikeCreateManyProduitInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutProduitInput | LikeUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutProduitInput | LikeUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type LigneCommandeUncheckedUpdateManyWithoutProduitNestedInput = {
    create?: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput> | LigneCommandeCreateWithoutProduitInput[] | LigneCommandeUncheckedCreateWithoutProduitInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutProduitInput | LigneCommandeCreateOrConnectWithoutProduitInput[]
    upsert?: LigneCommandeUpsertWithWhereUniqueWithoutProduitInput | LigneCommandeUpsertWithWhereUniqueWithoutProduitInput[]
    createMany?: LigneCommandeCreateManyProduitInputEnvelope
    set?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    disconnect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    delete?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    update?: LigneCommandeUpdateWithWhereUniqueWithoutProduitInput | LigneCommandeUpdateWithWhereUniqueWithoutProduitInput[]
    updateMany?: LigneCommandeUpdateManyWithWhereWithoutProduitInput | LigneCommandeUpdateManyWithWhereWithoutProduitInput[]
    deleteMany?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
  }

  export type ProduitCreateNestedOneWithoutAvisInput = {
    create?: XOR<ProduitCreateWithoutAvisInput, ProduitUncheckedCreateWithoutAvisInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutAvisInput
    connect?: ProduitWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAvisInput = {
    create?: XOR<UserCreateWithoutAvisInput, UserUncheckedCreateWithoutAvisInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvisInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAvis_repondusInput = {
    create?: XOR<UserCreateWithoutAvis_repondusInput, UserUncheckedCreateWithoutAvis_repondusInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvis_repondusInput
    connect?: UserWhereUniqueInput
  }

  export type AvisUtileCreateNestedManyWithoutAvisInput = {
    create?: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput> | AvisUtileCreateWithoutAvisInput[] | AvisUtileUncheckedCreateWithoutAvisInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutAvisInput | AvisUtileCreateOrConnectWithoutAvisInput[]
    createMany?: AvisUtileCreateManyAvisInputEnvelope
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
  }

  export type AvisUtileUncheckedCreateNestedManyWithoutAvisInput = {
    create?: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput> | AvisUtileCreateWithoutAvisInput[] | AvisUtileUncheckedCreateWithoutAvisInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutAvisInput | AvisUtileCreateOrConnectWithoutAvisInput[]
    createMany?: AvisUtileCreateManyAvisInputEnvelope
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
  }

  export type ProduitUpdateOneRequiredWithoutAvisNestedInput = {
    create?: XOR<ProduitCreateWithoutAvisInput, ProduitUncheckedCreateWithoutAvisInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutAvisInput
    upsert?: ProduitUpsertWithoutAvisInput
    connect?: ProduitWhereUniqueInput
    update?: XOR<XOR<ProduitUpdateToOneWithWhereWithoutAvisInput, ProduitUpdateWithoutAvisInput>, ProduitUncheckedUpdateWithoutAvisInput>
  }

  export type UserUpdateOneRequiredWithoutAvisNestedInput = {
    create?: XOR<UserCreateWithoutAvisInput, UserUncheckedCreateWithoutAvisInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvisInput
    upsert?: UserUpsertWithoutAvisInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAvisInput, UserUpdateWithoutAvisInput>, UserUncheckedUpdateWithoutAvisInput>
  }

  export type UserUpdateOneWithoutAvis_repondusNestedInput = {
    create?: XOR<UserCreateWithoutAvis_repondusInput, UserUncheckedCreateWithoutAvis_repondusInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvis_repondusInput
    upsert?: UserUpsertWithoutAvis_repondusInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAvis_repondusInput, UserUpdateWithoutAvis_repondusInput>, UserUncheckedUpdateWithoutAvis_repondusInput>
  }

  export type AvisUtileUpdateManyWithoutAvisNestedInput = {
    create?: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput> | AvisUtileCreateWithoutAvisInput[] | AvisUtileUncheckedCreateWithoutAvisInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutAvisInput | AvisUtileCreateOrConnectWithoutAvisInput[]
    upsert?: AvisUtileUpsertWithWhereUniqueWithoutAvisInput | AvisUtileUpsertWithWhereUniqueWithoutAvisInput[]
    createMany?: AvisUtileCreateManyAvisInputEnvelope
    set?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    disconnect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    delete?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    update?: AvisUtileUpdateWithWhereUniqueWithoutAvisInput | AvisUtileUpdateWithWhereUniqueWithoutAvisInput[]
    updateMany?: AvisUtileUpdateManyWithWhereWithoutAvisInput | AvisUtileUpdateManyWithWhereWithoutAvisInput[]
    deleteMany?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
  }

  export type AvisUtileUncheckedUpdateManyWithoutAvisNestedInput = {
    create?: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput> | AvisUtileCreateWithoutAvisInput[] | AvisUtileUncheckedCreateWithoutAvisInput[]
    connectOrCreate?: AvisUtileCreateOrConnectWithoutAvisInput | AvisUtileCreateOrConnectWithoutAvisInput[]
    upsert?: AvisUtileUpsertWithWhereUniqueWithoutAvisInput | AvisUtileUpsertWithWhereUniqueWithoutAvisInput[]
    createMany?: AvisUtileCreateManyAvisInputEnvelope
    set?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    disconnect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    delete?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    connect?: AvisUtileWhereUniqueInput | AvisUtileWhereUniqueInput[]
    update?: AvisUtileUpdateWithWhereUniqueWithoutAvisInput | AvisUtileUpdateWithWhereUniqueWithoutAvisInput[]
    updateMany?: AvisUtileUpdateManyWithWhereWithoutAvisInput | AvisUtileUpdateManyWithWhereWithoutAvisInput[]
    deleteMany?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
  }

  export type ProduitCreateNestedOneWithoutLikesInput = {
    create?: XOR<ProduitCreateWithoutLikesInput, ProduitUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutLikesInput
    connect?: ProduitWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type ProduitUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<ProduitCreateWithoutLikesInput, ProduitUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutLikesInput
    upsert?: ProduitUpsertWithoutLikesInput
    connect?: ProduitWhereUniqueInput
    update?: XOR<XOR<ProduitUpdateToOneWithWhereWithoutLikesInput, ProduitUpdateWithoutLikesInput>, ProduitUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type AvisCreateNestedOneWithoutVotes_utilesInput = {
    create?: XOR<AvisCreateWithoutVotes_utilesInput, AvisUncheckedCreateWithoutVotes_utilesInput>
    connectOrCreate?: AvisCreateOrConnectWithoutVotes_utilesInput
    connect?: AvisWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVotes_utilesInput = {
    create?: XOR<UserCreateWithoutVotes_utilesInput, UserUncheckedCreateWithoutVotes_utilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotes_utilesInput
    connect?: UserWhereUniqueInput
  }

  export type AvisUpdateOneRequiredWithoutVotes_utilesNestedInput = {
    create?: XOR<AvisCreateWithoutVotes_utilesInput, AvisUncheckedCreateWithoutVotes_utilesInput>
    connectOrCreate?: AvisCreateOrConnectWithoutVotes_utilesInput
    upsert?: AvisUpsertWithoutVotes_utilesInput
    connect?: AvisWhereUniqueInput
    update?: XOR<XOR<AvisUpdateToOneWithWhereWithoutVotes_utilesInput, AvisUpdateWithoutVotes_utilesInput>, AvisUncheckedUpdateWithoutVotes_utilesInput>
  }

  export type UserUpdateOneRequiredWithoutVotes_utilesNestedInput = {
    create?: XOR<UserCreateWithoutVotes_utilesInput, UserUncheckedCreateWithoutVotes_utilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotes_utilesInput
    upsert?: UserUpsertWithoutVotes_utilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVotes_utilesInput, UserUpdateWithoutVotes_utilesInput>, UserUncheckedUpdateWithoutVotes_utilesInput>
  }

  export type RendezVousCreateNestedManyWithoutType_seanceInput = {
    create?: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput> | RendezVousCreateWithoutType_seanceInput[] | RendezVousUncheckedCreateWithoutType_seanceInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutType_seanceInput | RendezVousCreateOrConnectWithoutType_seanceInput[]
    createMany?: RendezVousCreateManyType_seanceInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type RendezVousUncheckedCreateNestedManyWithoutType_seanceInput = {
    create?: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput> | RendezVousCreateWithoutType_seanceInput[] | RendezVousUncheckedCreateWithoutType_seanceInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutType_seanceInput | RendezVousCreateOrConnectWithoutType_seanceInput[]
    createMany?: RendezVousCreateManyType_seanceInputEnvelope
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
  }

  export type RendezVousUpdateManyWithoutType_seanceNestedInput = {
    create?: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput> | RendezVousCreateWithoutType_seanceInput[] | RendezVousUncheckedCreateWithoutType_seanceInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutType_seanceInput | RendezVousCreateOrConnectWithoutType_seanceInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutType_seanceInput | RendezVousUpsertWithWhereUniqueWithoutType_seanceInput[]
    createMany?: RendezVousCreateManyType_seanceInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutType_seanceInput | RendezVousUpdateWithWhereUniqueWithoutType_seanceInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutType_seanceInput | RendezVousUpdateManyWithWhereWithoutType_seanceInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type RendezVousUncheckedUpdateManyWithoutType_seanceNestedInput = {
    create?: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput> | RendezVousCreateWithoutType_seanceInput[] | RendezVousUncheckedCreateWithoutType_seanceInput[]
    connectOrCreate?: RendezVousCreateOrConnectWithoutType_seanceInput | RendezVousCreateOrConnectWithoutType_seanceInput[]
    upsert?: RendezVousUpsertWithWhereUniqueWithoutType_seanceInput | RendezVousUpsertWithWhereUniqueWithoutType_seanceInput[]
    createMany?: RendezVousCreateManyType_seanceInputEnvelope
    set?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    disconnect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    delete?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    connect?: RendezVousWhereUniqueInput | RendezVousWhereUniqueInput[]
    update?: RendezVousUpdateWithWhereUniqueWithoutType_seanceInput | RendezVousUpdateWithWhereUniqueWithoutType_seanceInput[]
    updateMany?: RendezVousUpdateManyWithWhereWithoutType_seanceInput | RendezVousUpdateManyWithWhereWithoutType_seanceInput[]
    deleteMany?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
  }

  export type TypeSeanceCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<TypeSeanceCreateWithoutRendezVousInput, TypeSeanceUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: TypeSeanceCreateOrConnectWithoutRendezVousInput
    connect?: TypeSeanceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRendezVousInput = {
    create?: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UserCreateOrConnectWithoutRendezVousInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type TypeSeanceUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<TypeSeanceCreateWithoutRendezVousInput, TypeSeanceUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: TypeSeanceCreateOrConnectWithoutRendezVousInput
    upsert?: TypeSeanceUpsertWithoutRendezVousInput
    connect?: TypeSeanceWhereUniqueInput
    update?: XOR<XOR<TypeSeanceUpdateToOneWithWhereWithoutRendezVousInput, TypeSeanceUpdateWithoutRendezVousInput>, TypeSeanceUncheckedUpdateWithoutRendezVousInput>
  }

  export type UserUpdateOneRequiredWithoutRendezVousNestedInput = {
    create?: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    connectOrCreate?: UserCreateOrConnectWithoutRendezVousInput
    upsert?: UserUpsertWithoutRendezVousInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRendezVousInput, UserUpdateWithoutRendezVousInput>, UserUncheckedUpdateWithoutRendezVousInput>
  }

  export type UserCreateNestedOneWithoutCommandesInput = {
    create?: XOR<UserCreateWithoutCommandesInput, UserUncheckedCreateWithoutCommandesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommandesInput
    connect?: UserWhereUniqueInput
  }

  export type LigneCommandeCreateNestedManyWithoutCommandeInput = {
    create?: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput> | LigneCommandeCreateWithoutCommandeInput[] | LigneCommandeUncheckedCreateWithoutCommandeInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutCommandeInput | LigneCommandeCreateOrConnectWithoutCommandeInput[]
    createMany?: LigneCommandeCreateManyCommandeInputEnvelope
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
  }

  export type LigneCommandeUncheckedCreateNestedManyWithoutCommandeInput = {
    create?: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput> | LigneCommandeCreateWithoutCommandeInput[] | LigneCommandeUncheckedCreateWithoutCommandeInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutCommandeInput | LigneCommandeCreateOrConnectWithoutCommandeInput[]
    createMany?: LigneCommandeCreateManyCommandeInputEnvelope
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type UserUpdateOneRequiredWithoutCommandesNestedInput = {
    create?: XOR<UserCreateWithoutCommandesInput, UserUncheckedCreateWithoutCommandesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommandesInput
    upsert?: UserUpsertWithoutCommandesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommandesInput, UserUpdateWithoutCommandesInput>, UserUncheckedUpdateWithoutCommandesInput>
  }

  export type LigneCommandeUpdateManyWithoutCommandeNestedInput = {
    create?: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput> | LigneCommandeCreateWithoutCommandeInput[] | LigneCommandeUncheckedCreateWithoutCommandeInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutCommandeInput | LigneCommandeCreateOrConnectWithoutCommandeInput[]
    upsert?: LigneCommandeUpsertWithWhereUniqueWithoutCommandeInput | LigneCommandeUpsertWithWhereUniqueWithoutCommandeInput[]
    createMany?: LigneCommandeCreateManyCommandeInputEnvelope
    set?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    disconnect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    delete?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    update?: LigneCommandeUpdateWithWhereUniqueWithoutCommandeInput | LigneCommandeUpdateWithWhereUniqueWithoutCommandeInput[]
    updateMany?: LigneCommandeUpdateManyWithWhereWithoutCommandeInput | LigneCommandeUpdateManyWithWhereWithoutCommandeInput[]
    deleteMany?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
  }

  export type LigneCommandeUncheckedUpdateManyWithoutCommandeNestedInput = {
    create?: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput> | LigneCommandeCreateWithoutCommandeInput[] | LigneCommandeUncheckedCreateWithoutCommandeInput[]
    connectOrCreate?: LigneCommandeCreateOrConnectWithoutCommandeInput | LigneCommandeCreateOrConnectWithoutCommandeInput[]
    upsert?: LigneCommandeUpsertWithWhereUniqueWithoutCommandeInput | LigneCommandeUpsertWithWhereUniqueWithoutCommandeInput[]
    createMany?: LigneCommandeCreateManyCommandeInputEnvelope
    set?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    disconnect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    delete?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    connect?: LigneCommandeWhereUniqueInput | LigneCommandeWhereUniqueInput[]
    update?: LigneCommandeUpdateWithWhereUniqueWithoutCommandeInput | LigneCommandeUpdateWithWhereUniqueWithoutCommandeInput[]
    updateMany?: LigneCommandeUpdateManyWithWhereWithoutCommandeInput | LigneCommandeUpdateManyWithWhereWithoutCommandeInput[]
    deleteMany?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
  }

  export type CommandeCreateNestedOneWithoutLignesInput = {
    create?: XOR<CommandeCreateWithoutLignesInput, CommandeUncheckedCreateWithoutLignesInput>
    connectOrCreate?: CommandeCreateOrConnectWithoutLignesInput
    connect?: CommandeWhereUniqueInput
  }

  export type ProduitCreateNestedOneWithoutLignesInput = {
    create?: XOR<ProduitCreateWithoutLignesInput, ProduitUncheckedCreateWithoutLignesInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutLignesInput
    connect?: ProduitWhereUniqueInput
  }

  export type CommandeUpdateOneRequiredWithoutLignesNestedInput = {
    create?: XOR<CommandeCreateWithoutLignesInput, CommandeUncheckedCreateWithoutLignesInput>
    connectOrCreate?: CommandeCreateOrConnectWithoutLignesInput
    upsert?: CommandeUpsertWithoutLignesInput
    connect?: CommandeWhereUniqueInput
    update?: XOR<XOR<CommandeUpdateToOneWithWhereWithoutLignesInput, CommandeUpdateWithoutLignesInput>, CommandeUncheckedUpdateWithoutLignesInput>
  }

  export type ProduitUpdateOneRequiredWithoutLignesNestedInput = {
    create?: XOR<ProduitCreateWithoutLignesInput, ProduitUncheckedCreateWithoutLignesInput>
    connectOrCreate?: ProduitCreateOrConnectWithoutLignesInput
    upsert?: ProduitUpsertWithoutLignesInput
    connect?: ProduitWhereUniqueInput
    update?: XOR<XOR<ProduitUpdateToOneWithWhereWithoutLignesInput, ProduitUpdateWithoutLignesInput>, ProduitUncheckedUpdateWithoutLignesInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type AvisCreateWithoutUtilisateurInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    produit: ProduitCreateNestedOneWithoutAvisInput
    admin_repondant?: UserCreateNestedOneWithoutAvis_repondusInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutAvisInput
  }

  export type AvisUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutAvisInput
  }

  export type AvisCreateOrConnectWithoutUtilisateurInput = {
    where: AvisWhereUniqueInput
    create: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput>
  }

  export type AvisCreateManyUtilisateurInputEnvelope = {
    data: AvisCreateManyUtilisateurInput | AvisCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutUtilisateurInput = {
    id?: string
    createdAt?: Date | string
    produit: ProduitCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    produit_id: string
    createdAt?: Date | string
  }

  export type LikeCreateOrConnectWithoutUtilisateurInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput>
  }

  export type LikeCreateManyUtilisateurInputEnvelope = {
    data: LikeCreateManyUtilisateurInput | LikeCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousCreateWithoutUtilisateurInput = {
    id?: string
    date_heure: Date | string
    duree: number
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    type_seance: TypeSeanceCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    date_heure: Date | string
    duree: number
    type_seance_id: string
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RendezVousCreateOrConnectWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput>
  }

  export type RendezVousCreateManyUtilisateurInputEnvelope = {
    data: RendezVousCreateManyUtilisateurInput | RendezVousCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type CommandeCreateWithoutUtilisateurInput = {
    id?: string
    numero: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lignes?: LigneCommandeCreateNestedManyWithoutCommandeInput
  }

  export type CommandeUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    numero: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutCommandeInput
  }

  export type CommandeCreateOrConnectWithoutUtilisateurInput = {
    where: CommandeWhereUniqueInput
    create: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput>
  }

  export type CommandeCreateManyUtilisateurInputEnvelope = {
    data: CommandeCreateManyUtilisateurInput | CommandeCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type AvisCreateWithoutAdmin_repondantInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    produit: ProduitCreateNestedOneWithoutAvisInput
    utilisateur: UserCreateNestedOneWithoutAvisInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutAvisInput
  }

  export type AvisUncheckedCreateWithoutAdmin_repondantInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutAvisInput
  }

  export type AvisCreateOrConnectWithoutAdmin_repondantInput = {
    where: AvisWhereUniqueInput
    create: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput>
  }

  export type AvisCreateManyAdmin_repondantInputEnvelope = {
    data: AvisCreateManyAdmin_repondantInput | AvisCreateManyAdmin_repondantInput[]
    skipDuplicates?: boolean
  }

  export type AvisUtileCreateWithoutUtilisateurInput = {
    id?: string
    utile: boolean
    createdAt?: Date | string
    avis: AvisCreateNestedOneWithoutVotes_utilesInput
  }

  export type AvisUtileUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    avis_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUtileCreateOrConnectWithoutUtilisateurInput = {
    where: AvisUtileWhereUniqueInput
    create: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput>
  }

  export type AvisUtileCreateManyUtilisateurInputEnvelope = {
    data: AvisUtileCreateManyUtilisateurInput | AvisUtileCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type AvisUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: AvisWhereUniqueInput
    update: XOR<AvisUpdateWithoutUtilisateurInput, AvisUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<AvisCreateWithoutUtilisateurInput, AvisUncheckedCreateWithoutUtilisateurInput>
  }

  export type AvisUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: AvisWhereUniqueInput
    data: XOR<AvisUpdateWithoutUtilisateurInput, AvisUncheckedUpdateWithoutUtilisateurInput>
  }

  export type AvisUpdateManyWithWhereWithoutUtilisateurInput = {
    where: AvisScalarWhereInput
    data: XOR<AvisUpdateManyMutationInput, AvisUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type AvisScalarWhereInput = {
    AND?: AvisScalarWhereInput | AvisScalarWhereInput[]
    OR?: AvisScalarWhereInput[]
    NOT?: AvisScalarWhereInput | AvisScalarWhereInput[]
    id?: StringFilter<"Avis"> | string
    note?: IntFilter<"Avis"> | number
    titre?: StringFilter<"Avis"> | string
    contenu?: StringFilter<"Avis"> | string
    produit_id?: StringFilter<"Avis"> | string
    utilisateur_id?: StringFilter<"Avis"> | string
    createdAt?: DateTimeFilter<"Avis"> | Date | string
    updatedAt?: DateTimeFilter<"Avis"> | Date | string
    reponse_admin?: StringNullableFilter<"Avis"> | string | null
    reponse_admin_at?: DateTimeNullableFilter<"Avis"> | Date | string | null
    reponse_admin_id?: StringNullableFilter<"Avis"> | string | null
    masque?: BoolFilter<"Avis"> | boolean
  }

  export type LikeUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutUtilisateurInput, LikeUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<LikeCreateWithoutUtilisateurInput, LikeUncheckedCreateWithoutUtilisateurInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutUtilisateurInput, LikeUncheckedUpdateWithoutUtilisateurInput>
  }

  export type LikeUpdateManyWithWhereWithoutUtilisateurInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type LikeScalarWhereInput = {
    AND?: LikeScalarWhereInput | LikeScalarWhereInput[]
    OR?: LikeScalarWhereInput[]
    NOT?: LikeScalarWhereInput | LikeScalarWhereInput[]
    id?: StringFilter<"Like"> | string
    utilisateur_id?: StringFilter<"Like"> | string
    produit_id?: StringFilter<"Like"> | string
    createdAt?: DateTimeFilter<"Like"> | Date | string
  }

  export type RendezVousUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutUtilisateurInput, RendezVousUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<RendezVousCreateWithoutUtilisateurInput, RendezVousUncheckedCreateWithoutUtilisateurInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutUtilisateurInput, RendezVousUncheckedUpdateWithoutUtilisateurInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutUtilisateurInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type RendezVousScalarWhereInput = {
    AND?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    OR?: RendezVousScalarWhereInput[]
    NOT?: RendezVousScalarWhereInput | RendezVousScalarWhereInput[]
    id?: StringFilter<"RendezVous"> | string
    utilisateur_id?: StringFilter<"RendezVous"> | string
    date_heure?: DateTimeFilter<"RendezVous"> | Date | string
    duree?: IntFilter<"RendezVous"> | number
    type_seance_id?: StringFilter<"RendezVous"> | string
    notes?: StringNullableFilter<"RendezVous"> | string | null
    statut?: EnumAppointmentStatusFilter<"RendezVous"> | $Enums.AppointmentStatus
    raison_refus?: StringNullableFilter<"RendezVous"> | string | null
    notes_admin?: StringNullableFilter<"RendezVous"> | string | null
    createdAt?: DateTimeFilter<"RendezVous"> | Date | string
    updatedAt?: DateTimeFilter<"RendezVous"> | Date | string
  }

  export type CommandeUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: CommandeWhereUniqueInput
    update: XOR<CommandeUpdateWithoutUtilisateurInput, CommandeUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<CommandeCreateWithoutUtilisateurInput, CommandeUncheckedCreateWithoutUtilisateurInput>
  }

  export type CommandeUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: CommandeWhereUniqueInput
    data: XOR<CommandeUpdateWithoutUtilisateurInput, CommandeUncheckedUpdateWithoutUtilisateurInput>
  }

  export type CommandeUpdateManyWithWhereWithoutUtilisateurInput = {
    where: CommandeScalarWhereInput
    data: XOR<CommandeUpdateManyMutationInput, CommandeUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type CommandeScalarWhereInput = {
    AND?: CommandeScalarWhereInput | CommandeScalarWhereInput[]
    OR?: CommandeScalarWhereInput[]
    NOT?: CommandeScalarWhereInput | CommandeScalarWhereInput[]
    id?: StringFilter<"Commande"> | string
    numero?: StringFilter<"Commande"> | string
    utilisateur_id?: StringFilter<"Commande"> | string
    statut?: EnumOrderStatusFilter<"Commande"> | $Enums.OrderStatus
    total?: FloatFilter<"Commande"> | number
    frais_livraison?: FloatFilter<"Commande"> | number
    ville?: StringFilter<"Commande"> | string
    adresse?: StringFilter<"Commande"> | string
    telephone?: StringFilter<"Commande"> | string
    mode_paiement?: StringFilter<"Commande"> | string
    notes?: StringNullableFilter<"Commande"> | string | null
    createdAt?: DateTimeFilter<"Commande"> | Date | string
    updatedAt?: DateTimeFilter<"Commande"> | Date | string
  }

  export type AvisUpsertWithWhereUniqueWithoutAdmin_repondantInput = {
    where: AvisWhereUniqueInput
    update: XOR<AvisUpdateWithoutAdmin_repondantInput, AvisUncheckedUpdateWithoutAdmin_repondantInput>
    create: XOR<AvisCreateWithoutAdmin_repondantInput, AvisUncheckedCreateWithoutAdmin_repondantInput>
  }

  export type AvisUpdateWithWhereUniqueWithoutAdmin_repondantInput = {
    where: AvisWhereUniqueInput
    data: XOR<AvisUpdateWithoutAdmin_repondantInput, AvisUncheckedUpdateWithoutAdmin_repondantInput>
  }

  export type AvisUpdateManyWithWhereWithoutAdmin_repondantInput = {
    where: AvisScalarWhereInput
    data: XOR<AvisUpdateManyMutationInput, AvisUncheckedUpdateManyWithoutAdmin_repondantInput>
  }

  export type AvisUtileUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: AvisUtileWhereUniqueInput
    update: XOR<AvisUtileUpdateWithoutUtilisateurInput, AvisUtileUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<AvisUtileCreateWithoutUtilisateurInput, AvisUtileUncheckedCreateWithoutUtilisateurInput>
  }

  export type AvisUtileUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: AvisUtileWhereUniqueInput
    data: XOR<AvisUtileUpdateWithoutUtilisateurInput, AvisUtileUncheckedUpdateWithoutUtilisateurInput>
  }

  export type AvisUtileUpdateManyWithWhereWithoutUtilisateurInput = {
    where: AvisUtileScalarWhereInput
    data: XOR<AvisUtileUpdateManyMutationInput, AvisUtileUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type AvisUtileScalarWhereInput = {
    AND?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
    OR?: AvisUtileScalarWhereInput[]
    NOT?: AvisUtileScalarWhereInput | AvisUtileScalarWhereInput[]
    id?: StringFilter<"AvisUtile"> | string
    avis_id?: StringFilter<"AvisUtile"> | string
    utilisateur_id?: StringFilter<"AvisUtile"> | string
    utile?: BoolFilter<"AvisUtile"> | boolean
    createdAt?: DateTimeFilter<"AvisUtile"> | Date | string
  }

  export type ProduitCreateWithoutCategorieInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisCreateNestedManyWithoutProduitInput
    likes?: LikeCreateNestedManyWithoutProduitInput
    lignes?: LigneCommandeCreateNestedManyWithoutProduitInput
  }

  export type ProduitUncheckedCreateWithoutCategorieInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisUncheckedCreateNestedManyWithoutProduitInput
    likes?: LikeUncheckedCreateNestedManyWithoutProduitInput
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutProduitInput
  }

  export type ProduitCreateOrConnectWithoutCategorieInput = {
    where: ProduitWhereUniqueInput
    create: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput>
  }

  export type ProduitCreateManyCategorieInputEnvelope = {
    data: ProduitCreateManyCategorieInput | ProduitCreateManyCategorieInput[]
    skipDuplicates?: boolean
  }

  export type ProduitUpsertWithWhereUniqueWithoutCategorieInput = {
    where: ProduitWhereUniqueInput
    update: XOR<ProduitUpdateWithoutCategorieInput, ProduitUncheckedUpdateWithoutCategorieInput>
    create: XOR<ProduitCreateWithoutCategorieInput, ProduitUncheckedCreateWithoutCategorieInput>
  }

  export type ProduitUpdateWithWhereUniqueWithoutCategorieInput = {
    where: ProduitWhereUniqueInput
    data: XOR<ProduitUpdateWithoutCategorieInput, ProduitUncheckedUpdateWithoutCategorieInput>
  }

  export type ProduitUpdateManyWithWhereWithoutCategorieInput = {
    where: ProduitScalarWhereInput
    data: XOR<ProduitUpdateManyMutationInput, ProduitUncheckedUpdateManyWithoutCategorieInput>
  }

  export type ProduitScalarWhereInput = {
    AND?: ProduitScalarWhereInput | ProduitScalarWhereInput[]
    OR?: ProduitScalarWhereInput[]
    NOT?: ProduitScalarWhereInput | ProduitScalarWhereInput[]
    id?: StringFilter<"Produit"> | string
    nom?: StringFilter<"Produit"> | string
    description?: StringFilter<"Produit"> | string
    prix?: FloatFilter<"Produit"> | number
    stock?: IntFilter<"Produit"> | number
    categorie_id?: StringFilter<"Produit"> | string
    images?: StringNullableListFilter<"Produit">
    sku_number?: IntFilter<"Produit"> | number
    sku?: StringNullableFilter<"Produit"> | string | null
    publie?: BoolFilter<"Produit"> | boolean
    createdAt?: DateTimeFilter<"Produit"> | Date | string
    updatedAt?: DateTimeFilter<"Produit"> | Date | string
  }

  export type AvisCreateWithoutProduitInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    utilisateur: UserCreateNestedOneWithoutAvisInput
    admin_repondant?: UserCreateNestedOneWithoutAvis_repondusInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutAvisInput
  }

  export type AvisUncheckedCreateWithoutProduitInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutAvisInput
  }

  export type AvisCreateOrConnectWithoutProduitInput = {
    where: AvisWhereUniqueInput
    create: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput>
  }

  export type AvisCreateManyProduitInputEnvelope = {
    data: AvisCreateManyProduitInput | AvisCreateManyProduitInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutProduitInput = {
    id?: string
    createdAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutProduitInput = {
    id?: string
    utilisateur_id: string
    createdAt?: Date | string
  }

  export type LikeCreateOrConnectWithoutProduitInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput>
  }

  export type LikeCreateManyProduitInputEnvelope = {
    data: LikeCreateManyProduitInput | LikeCreateManyProduitInput[]
    skipDuplicates?: boolean
  }

  export type CategorieCreateWithoutProduitsInput = {
    id?: string
    nom: string
    description?: string | null
    icone?: string | null
    ordre?: number
    createdAt?: Date | string
  }

  export type CategorieUncheckedCreateWithoutProduitsInput = {
    id?: string
    nom: string
    description?: string | null
    icone?: string | null
    ordre?: number
    createdAt?: Date | string
  }

  export type CategorieCreateOrConnectWithoutProduitsInput = {
    where: CategorieWhereUniqueInput
    create: XOR<CategorieCreateWithoutProduitsInput, CategorieUncheckedCreateWithoutProduitsInput>
  }

  export type LigneCommandeCreateWithoutProduitInput = {
    id?: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
    commande: CommandeCreateNestedOneWithoutLignesInput
  }

  export type LigneCommandeUncheckedCreateWithoutProduitInput = {
    id?: string
    commande_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type LigneCommandeCreateOrConnectWithoutProduitInput = {
    where: LigneCommandeWhereUniqueInput
    create: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput>
  }

  export type LigneCommandeCreateManyProduitInputEnvelope = {
    data: LigneCommandeCreateManyProduitInput | LigneCommandeCreateManyProduitInput[]
    skipDuplicates?: boolean
  }

  export type AvisUpsertWithWhereUniqueWithoutProduitInput = {
    where: AvisWhereUniqueInput
    update: XOR<AvisUpdateWithoutProduitInput, AvisUncheckedUpdateWithoutProduitInput>
    create: XOR<AvisCreateWithoutProduitInput, AvisUncheckedCreateWithoutProduitInput>
  }

  export type AvisUpdateWithWhereUniqueWithoutProduitInput = {
    where: AvisWhereUniqueInput
    data: XOR<AvisUpdateWithoutProduitInput, AvisUncheckedUpdateWithoutProduitInput>
  }

  export type AvisUpdateManyWithWhereWithoutProduitInput = {
    where: AvisScalarWhereInput
    data: XOR<AvisUpdateManyMutationInput, AvisUncheckedUpdateManyWithoutProduitInput>
  }

  export type LikeUpsertWithWhereUniqueWithoutProduitInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutProduitInput, LikeUncheckedUpdateWithoutProduitInput>
    create: XOR<LikeCreateWithoutProduitInput, LikeUncheckedCreateWithoutProduitInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutProduitInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutProduitInput, LikeUncheckedUpdateWithoutProduitInput>
  }

  export type LikeUpdateManyWithWhereWithoutProduitInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutProduitInput>
  }

  export type CategorieUpsertWithoutProduitsInput = {
    update: XOR<CategorieUpdateWithoutProduitsInput, CategorieUncheckedUpdateWithoutProduitsInput>
    create: XOR<CategorieCreateWithoutProduitsInput, CategorieUncheckedCreateWithoutProduitsInput>
    where?: CategorieWhereInput
  }

  export type CategorieUpdateToOneWithWhereWithoutProduitsInput = {
    where?: CategorieWhereInput
    data: XOR<CategorieUpdateWithoutProduitsInput, CategorieUncheckedUpdateWithoutProduitsInput>
  }

  export type CategorieUpdateWithoutProduitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategorieUncheckedUpdateWithoutProduitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    ordre?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LigneCommandeUpsertWithWhereUniqueWithoutProduitInput = {
    where: LigneCommandeWhereUniqueInput
    update: XOR<LigneCommandeUpdateWithoutProduitInput, LigneCommandeUncheckedUpdateWithoutProduitInput>
    create: XOR<LigneCommandeCreateWithoutProduitInput, LigneCommandeUncheckedCreateWithoutProduitInput>
  }

  export type LigneCommandeUpdateWithWhereUniqueWithoutProduitInput = {
    where: LigneCommandeWhereUniqueInput
    data: XOR<LigneCommandeUpdateWithoutProduitInput, LigneCommandeUncheckedUpdateWithoutProduitInput>
  }

  export type LigneCommandeUpdateManyWithWhereWithoutProduitInput = {
    where: LigneCommandeScalarWhereInput
    data: XOR<LigneCommandeUpdateManyMutationInput, LigneCommandeUncheckedUpdateManyWithoutProduitInput>
  }

  export type LigneCommandeScalarWhereInput = {
    AND?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
    OR?: LigneCommandeScalarWhereInput[]
    NOT?: LigneCommandeScalarWhereInput | LigneCommandeScalarWhereInput[]
    id?: StringFilter<"LigneCommande"> | string
    commande_id?: StringFilter<"LigneCommande"> | string
    produit_id?: StringFilter<"LigneCommande"> | string
    nom_produit?: StringFilter<"LigneCommande"> | string
    image?: StringNullableFilter<"LigneCommande"> | string | null
    prix_unitaire?: FloatFilter<"LigneCommande"> | number
    quantite?: IntFilter<"LigneCommande"> | number
    sous_total?: FloatFilter<"LigneCommande"> | number
  }

  export type ProduitCreateWithoutAvisInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: LikeCreateNestedManyWithoutProduitInput
    categorie: CategorieCreateNestedOneWithoutProduitsInput
    lignes?: LigneCommandeCreateNestedManyWithoutProduitInput
  }

  export type ProduitUncheckedCreateWithoutAvisInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: LikeUncheckedCreateNestedManyWithoutProduitInput
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutProduitInput
  }

  export type ProduitCreateOrConnectWithoutAvisInput = {
    where: ProduitWhereUniqueInput
    create: XOR<ProduitCreateWithoutAvisInput, ProduitUncheckedCreateWithoutAvisInput>
  }

  export type UserCreateWithoutAvisInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutAvisInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutAvisInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvisInput, UserUncheckedCreateWithoutAvisInput>
  }

  export type UserCreateWithoutAvis_repondusInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutAvis_repondusInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutAvis_repondusInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvis_repondusInput, UserUncheckedCreateWithoutAvis_repondusInput>
  }

  export type AvisUtileCreateWithoutAvisInput = {
    id?: string
    utile: boolean
    createdAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutVotes_utilesInput
  }

  export type AvisUtileUncheckedCreateWithoutAvisInput = {
    id?: string
    utilisateur_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUtileCreateOrConnectWithoutAvisInput = {
    where: AvisUtileWhereUniqueInput
    create: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput>
  }

  export type AvisUtileCreateManyAvisInputEnvelope = {
    data: AvisUtileCreateManyAvisInput | AvisUtileCreateManyAvisInput[]
    skipDuplicates?: boolean
  }

  export type ProduitUpsertWithoutAvisInput = {
    update: XOR<ProduitUpdateWithoutAvisInput, ProduitUncheckedUpdateWithoutAvisInput>
    create: XOR<ProduitCreateWithoutAvisInput, ProduitUncheckedCreateWithoutAvisInput>
    where?: ProduitWhereInput
  }

  export type ProduitUpdateToOneWithWhereWithoutAvisInput = {
    where?: ProduitWhereInput
    data: XOR<ProduitUpdateWithoutAvisInput, ProduitUncheckedUpdateWithoutAvisInput>
  }

  export type ProduitUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: LikeUpdateManyWithoutProduitNestedInput
    categorie?: CategorieUpdateOneRequiredWithoutProduitsNestedInput
    lignes?: LigneCommandeUpdateManyWithoutProduitNestedInput
  }

  export type ProduitUncheckedUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    categorie_id?: StringFieldUpdateOperationsInput | string
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: LikeUncheckedUpdateManyWithoutProduitNestedInput
    lignes?: LigneCommandeUncheckedUpdateManyWithoutProduitNestedInput
  }

  export type UserUpsertWithoutAvisInput = {
    update: XOR<UserUpdateWithoutAvisInput, UserUncheckedUpdateWithoutAvisInput>
    create: XOR<UserCreateWithoutAvisInput, UserUncheckedCreateWithoutAvisInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAvisInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAvisInput, UserUncheckedUpdateWithoutAvisInput>
  }

  export type UserUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUpsertWithoutAvis_repondusInput = {
    update: XOR<UserUpdateWithoutAvis_repondusInput, UserUncheckedUpdateWithoutAvis_repondusInput>
    create: XOR<UserCreateWithoutAvis_repondusInput, UserUncheckedCreateWithoutAvis_repondusInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAvis_repondusInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAvis_repondusInput, UserUncheckedUpdateWithoutAvis_repondusInput>
  }

  export type UserUpdateWithoutAvis_repondusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutAvis_repondusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type AvisUtileUpsertWithWhereUniqueWithoutAvisInput = {
    where: AvisUtileWhereUniqueInput
    update: XOR<AvisUtileUpdateWithoutAvisInput, AvisUtileUncheckedUpdateWithoutAvisInput>
    create: XOR<AvisUtileCreateWithoutAvisInput, AvisUtileUncheckedCreateWithoutAvisInput>
  }

  export type AvisUtileUpdateWithWhereUniqueWithoutAvisInput = {
    where: AvisUtileWhereUniqueInput
    data: XOR<AvisUtileUpdateWithoutAvisInput, AvisUtileUncheckedUpdateWithoutAvisInput>
  }

  export type AvisUtileUpdateManyWithWhereWithoutAvisInput = {
    where: AvisUtileScalarWhereInput
    data: XOR<AvisUtileUpdateManyMutationInput, AvisUtileUncheckedUpdateManyWithoutAvisInput>
  }

  export type ProduitCreateWithoutLikesInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisCreateNestedManyWithoutProduitInput
    categorie: CategorieCreateNestedOneWithoutProduitsInput
    lignes?: LigneCommandeCreateNestedManyWithoutProduitInput
  }

  export type ProduitUncheckedCreateWithoutLikesInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisUncheckedCreateNestedManyWithoutProduitInput
    lignes?: LigneCommandeUncheckedCreateNestedManyWithoutProduitInput
  }

  export type ProduitCreateOrConnectWithoutLikesInput = {
    where: ProduitWhereUniqueInput
    create: XOR<ProduitCreateWithoutLikesInput, ProduitUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutLikesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type ProduitUpsertWithoutLikesInput = {
    update: XOR<ProduitUpdateWithoutLikesInput, ProduitUncheckedUpdateWithoutLikesInput>
    create: XOR<ProduitCreateWithoutLikesInput, ProduitUncheckedCreateWithoutLikesInput>
    where?: ProduitWhereInput
  }

  export type ProduitUpdateToOneWithWhereWithoutLikesInput = {
    where?: ProduitWhereInput
    data: XOR<ProduitUpdateWithoutLikesInput, ProduitUncheckedUpdateWithoutLikesInput>
  }

  export type ProduitUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateManyWithoutProduitNestedInput
    categorie?: CategorieUpdateOneRequiredWithoutProduitsNestedInput
    lignes?: LigneCommandeUpdateManyWithoutProduitNestedInput
  }

  export type ProduitUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    categorie_id?: StringFieldUpdateOperationsInput | string
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUncheckedUpdateManyWithoutProduitNestedInput
    lignes?: LigneCommandeUncheckedUpdateManyWithoutProduitNestedInput
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type AvisCreateWithoutVotes_utilesInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
    produit: ProduitCreateNestedOneWithoutAvisInput
    utilisateur: UserCreateNestedOneWithoutAvisInput
    admin_repondant?: UserCreateNestedOneWithoutAvis_repondusInput
  }

  export type AvisUncheckedCreateWithoutVotes_utilesInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
  }

  export type AvisCreateOrConnectWithoutVotes_utilesInput = {
    where: AvisWhereUniqueInput
    create: XOR<AvisCreateWithoutVotes_utilesInput, AvisUncheckedCreateWithoutVotes_utilesInput>
  }

  export type UserCreateWithoutVotes_utilesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
  }

  export type UserUncheckedCreateWithoutVotes_utilesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
  }

  export type UserCreateOrConnectWithoutVotes_utilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVotes_utilesInput, UserUncheckedCreateWithoutVotes_utilesInput>
  }

  export type AvisUpsertWithoutVotes_utilesInput = {
    update: XOR<AvisUpdateWithoutVotes_utilesInput, AvisUncheckedUpdateWithoutVotes_utilesInput>
    create: XOR<AvisCreateWithoutVotes_utilesInput, AvisUncheckedCreateWithoutVotes_utilesInput>
    where?: AvisWhereInput
  }

  export type AvisUpdateToOneWithWhereWithoutVotes_utilesInput = {
    where?: AvisWhereInput
    data: XOR<AvisUpdateWithoutVotes_utilesInput, AvisUncheckedUpdateWithoutVotes_utilesInput>
  }

  export type AvisUpdateWithoutVotes_utilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    produit?: ProduitUpdateOneRequiredWithoutAvisNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutAvisNestedInput
    admin_repondant?: UserUpdateOneWithoutAvis_repondusNestedInput
  }

  export type AvisUncheckedUpdateWithoutVotes_utilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUpsertWithoutVotes_utilesInput = {
    update: XOR<UserUpdateWithoutVotes_utilesInput, UserUncheckedUpdateWithoutVotes_utilesInput>
    create: XOR<UserCreateWithoutVotes_utilesInput, UserUncheckedCreateWithoutVotes_utilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVotes_utilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVotes_utilesInput, UserUncheckedUpdateWithoutVotes_utilesInput>
  }

  export type UserUpdateWithoutVotes_utilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
  }

  export type UserUncheckedUpdateWithoutVotes_utilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
  }

  export type RendezVousCreateWithoutType_seanceInput = {
    id?: string
    date_heure: Date | string
    duree: number
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutRendezVousInput
  }

  export type RendezVousUncheckedCreateWithoutType_seanceInput = {
    id?: string
    utilisateur_id: string
    date_heure: Date | string
    duree: number
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RendezVousCreateOrConnectWithoutType_seanceInput = {
    where: RendezVousWhereUniqueInput
    create: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput>
  }

  export type RendezVousCreateManyType_seanceInputEnvelope = {
    data: RendezVousCreateManyType_seanceInput | RendezVousCreateManyType_seanceInput[]
    skipDuplicates?: boolean
  }

  export type RendezVousUpsertWithWhereUniqueWithoutType_seanceInput = {
    where: RendezVousWhereUniqueInput
    update: XOR<RendezVousUpdateWithoutType_seanceInput, RendezVousUncheckedUpdateWithoutType_seanceInput>
    create: XOR<RendezVousCreateWithoutType_seanceInput, RendezVousUncheckedCreateWithoutType_seanceInput>
  }

  export type RendezVousUpdateWithWhereUniqueWithoutType_seanceInput = {
    where: RendezVousWhereUniqueInput
    data: XOR<RendezVousUpdateWithoutType_seanceInput, RendezVousUncheckedUpdateWithoutType_seanceInput>
  }

  export type RendezVousUpdateManyWithWhereWithoutType_seanceInput = {
    where: RendezVousScalarWhereInput
    data: XOR<RendezVousUpdateManyMutationInput, RendezVousUncheckedUpdateManyWithoutType_seanceInput>
  }

  export type TypeSeanceCreateWithoutRendezVousInput = {
    id?: string
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TypeSeanceUncheckedCreateWithoutRendezVousInput = {
    id?: string
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TypeSeanceCreateOrConnectWithoutRendezVousInput = {
    where: TypeSeanceWhereUniqueInput
    create: XOR<TypeSeanceCreateWithoutRendezVousInput, TypeSeanceUncheckedCreateWithoutRendezVousInput>
  }

  export type UserCreateWithoutRendezVousInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutRendezVousInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    commandes?: CommandeUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutRendezVousInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
  }

  export type TypeSeanceUpsertWithoutRendezVousInput = {
    update: XOR<TypeSeanceUpdateWithoutRendezVousInput, TypeSeanceUncheckedUpdateWithoutRendezVousInput>
    create: XOR<TypeSeanceCreateWithoutRendezVousInput, TypeSeanceUncheckedCreateWithoutRendezVousInput>
    where?: TypeSeanceWhereInput
  }

  export type TypeSeanceUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: TypeSeanceWhereInput
    data: XOR<TypeSeanceUpdateWithoutRendezVousInput, TypeSeanceUncheckedUpdateWithoutRendezVousInput>
  }

  export type TypeSeanceUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TypeSeanceUncheckedUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duree?: IntFieldUpdateOperationsInput | number
    prix?: IntFieldUpdateOperationsInput | number
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutRendezVousInput = {
    update: XOR<UserUpdateWithoutRendezVousInput, UserUncheckedUpdateWithoutRendezVousInput>
    create: XOR<UserCreateWithoutRendezVousInput, UserUncheckedCreateWithoutRendezVousInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRendezVousInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRendezVousInput, UserUncheckedUpdateWithoutRendezVousInput>
  }

  export type UserUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutRendezVousInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    commandes?: CommandeUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserCreateWithoutCommandesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisCreateNestedManyWithoutUtilisateurInput
    likes?: LikeCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutCommandesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avis?: AvisUncheckedCreateNestedManyWithoutUtilisateurInput
    likes?: LikeUncheckedCreateNestedManyWithoutUtilisateurInput
    rendezVous?: RendezVousUncheckedCreateNestedManyWithoutUtilisateurInput
    avis_repondus?: AvisUncheckedCreateNestedManyWithoutAdmin_repondantInput
    votes_utiles?: AvisUtileUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutCommandesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommandesInput, UserUncheckedCreateWithoutCommandesInput>
  }

  export type LigneCommandeCreateWithoutCommandeInput = {
    id?: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
    produit: ProduitCreateNestedOneWithoutLignesInput
  }

  export type LigneCommandeUncheckedCreateWithoutCommandeInput = {
    id?: string
    produit_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type LigneCommandeCreateOrConnectWithoutCommandeInput = {
    where: LigneCommandeWhereUniqueInput
    create: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput>
  }

  export type LigneCommandeCreateManyCommandeInputEnvelope = {
    data: LigneCommandeCreateManyCommandeInput | LigneCommandeCreateManyCommandeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCommandesInput = {
    update: XOR<UserUpdateWithoutCommandesInput, UserUncheckedUpdateWithoutCommandesInput>
    create: XOR<UserCreateWithoutCommandesInput, UserUncheckedCreateWithoutCommandesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommandesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommandesInput, UserUncheckedUpdateWithoutCommandesInput>
  }

  export type UserUpdateWithoutCommandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutCommandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avis?: AvisUncheckedUpdateManyWithoutUtilisateurNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUtilisateurNestedInput
    rendezVous?: RendezVousUncheckedUpdateManyWithoutUtilisateurNestedInput
    avis_repondus?: AvisUncheckedUpdateManyWithoutAdmin_repondantNestedInput
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type LigneCommandeUpsertWithWhereUniqueWithoutCommandeInput = {
    where: LigneCommandeWhereUniqueInput
    update: XOR<LigneCommandeUpdateWithoutCommandeInput, LigneCommandeUncheckedUpdateWithoutCommandeInput>
    create: XOR<LigneCommandeCreateWithoutCommandeInput, LigneCommandeUncheckedCreateWithoutCommandeInput>
  }

  export type LigneCommandeUpdateWithWhereUniqueWithoutCommandeInput = {
    where: LigneCommandeWhereUniqueInput
    data: XOR<LigneCommandeUpdateWithoutCommandeInput, LigneCommandeUncheckedUpdateWithoutCommandeInput>
  }

  export type LigneCommandeUpdateManyWithWhereWithoutCommandeInput = {
    where: LigneCommandeScalarWhereInput
    data: XOR<LigneCommandeUpdateManyMutationInput, LigneCommandeUncheckedUpdateManyWithoutCommandeInput>
  }

  export type CommandeCreateWithoutLignesInput = {
    id?: string
    numero: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutCommandesInput
  }

  export type CommandeUncheckedCreateWithoutLignesInput = {
    id?: string
    numero: string
    utilisateur_id: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommandeCreateOrConnectWithoutLignesInput = {
    where: CommandeWhereUniqueInput
    create: XOR<CommandeCreateWithoutLignesInput, CommandeUncheckedCreateWithoutLignesInput>
  }

  export type ProduitCreateWithoutLignesInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisCreateNestedManyWithoutProduitInput
    likes?: LikeCreateNestedManyWithoutProduitInput
    categorie: CategorieCreateNestedOneWithoutProduitsInput
  }

  export type ProduitUncheckedCreateWithoutLignesInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    categorie_id: string
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    avis?: AvisUncheckedCreateNestedManyWithoutProduitInput
    likes?: LikeUncheckedCreateNestedManyWithoutProduitInput
  }

  export type ProduitCreateOrConnectWithoutLignesInput = {
    where: ProduitWhereUniqueInput
    create: XOR<ProduitCreateWithoutLignesInput, ProduitUncheckedCreateWithoutLignesInput>
  }

  export type CommandeUpsertWithoutLignesInput = {
    update: XOR<CommandeUpdateWithoutLignesInput, CommandeUncheckedUpdateWithoutLignesInput>
    create: XOR<CommandeCreateWithoutLignesInput, CommandeUncheckedCreateWithoutLignesInput>
    where?: CommandeWhereInput
  }

  export type CommandeUpdateToOneWithWhereWithoutLignesInput = {
    where?: CommandeWhereInput
    data: XOR<CommandeUpdateWithoutLignesInput, CommandeUncheckedUpdateWithoutLignesInput>
  }

  export type CommandeUpdateWithoutLignesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutCommandesNestedInput
  }

  export type CommandeUncheckedUpdateWithoutLignesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduitUpsertWithoutLignesInput = {
    update: XOR<ProduitUpdateWithoutLignesInput, ProduitUncheckedUpdateWithoutLignesInput>
    create: XOR<ProduitCreateWithoutLignesInput, ProduitUncheckedCreateWithoutLignesInput>
    where?: ProduitWhereInput
  }

  export type ProduitUpdateToOneWithWhereWithoutLignesInput = {
    where?: ProduitWhereInput
    data: XOR<ProduitUpdateWithoutLignesInput, ProduitUncheckedUpdateWithoutLignesInput>
  }

  export type ProduitUpdateWithoutLignesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateManyWithoutProduitNestedInput
    likes?: LikeUpdateManyWithoutProduitNestedInput
    categorie?: CategorieUpdateOneRequiredWithoutProduitsNestedInput
  }

  export type ProduitUncheckedUpdateWithoutLignesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    categorie_id?: StringFieldUpdateOperationsInput | string
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUncheckedUpdateManyWithoutProduitNestedInput
    likes?: LikeUncheckedUpdateManyWithoutProduitNestedInput
  }

  export type AvisCreateManyUtilisateurInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
  }

  export type LikeCreateManyUtilisateurInput = {
    id?: string
    produit_id: string
    createdAt?: Date | string
  }

  export type RendezVousCreateManyUtilisateurInput = {
    id?: string
    date_heure: Date | string
    duree: number
    type_seance_id: string
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommandeCreateManyUtilisateurInput = {
    id?: string
    numero: string
    statut?: $Enums.OrderStatus
    total: number
    frais_livraison?: number
    ville: string
    adresse: string
    telephone: string
    mode_paiement: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvisCreateManyAdmin_repondantInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    produit_id: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    masque?: boolean
  }

  export type AvisUtileCreateManyUtilisateurInput = {
    id?: string
    avis_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    produit?: ProduitUpdateOneRequiredWithoutAvisNestedInput
    admin_repondant?: UserUpdateOneWithoutAvis_repondusNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LikeUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produit?: ProduitUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type_seance?: TypeSeanceUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    type_seance_id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    type_seance_id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommandeUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lignes?: LigneCommandeUpdateManyWithoutCommandeNestedInput
  }

  export type CommandeUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lignes?: LigneCommandeUncheckedUpdateManyWithoutCommandeNestedInput
  }

  export type CommandeUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    frais_livraison?: FloatFieldUpdateOperationsInput | number
    ville?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    mode_paiement?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUpdateWithoutAdmin_repondantInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    produit?: ProduitUpdateOneRequiredWithoutAvisNestedInput
    utilisateur?: UserUpdateOneRequiredWithoutAvisNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateWithoutAdmin_repondantInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateManyWithoutAdmin_repondantInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AvisUtileUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateOneRequiredWithoutVotes_utilesNestedInput
  }

  export type AvisUtileUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    avis_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUtileUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    avis_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduitCreateManyCategorieInput = {
    id?: string
    nom: string
    description: string
    prix: number
    stock: number
    images?: ProduitCreateimagesInput | string[]
    sku_number?: number
    sku?: string | null
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProduitUpdateWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUpdateManyWithoutProduitNestedInput
    likes?: LikeUpdateManyWithoutProduitNestedInput
    lignes?: LigneCommandeUpdateManyWithoutProduitNestedInput
  }

  export type ProduitUncheckedUpdateWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avis?: AvisUncheckedUpdateManyWithoutProduitNestedInput
    likes?: LikeUncheckedUpdateManyWithoutProduitNestedInput
    lignes?: LigneCommandeUncheckedUpdateManyWithoutProduitNestedInput
  }

  export type ProduitUncheckedUpdateManyWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProduitUpdateimagesInput | string[]
    sku_number?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisCreateManyProduitInput = {
    id?: string
    note: number
    titre: string
    contenu: string
    utilisateur_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reponse_admin?: string | null
    reponse_admin_at?: Date | string | null
    reponse_admin_id?: string | null
    masque?: boolean
  }

  export type LikeCreateManyProduitInput = {
    id?: string
    utilisateur_id: string
    createdAt?: Date | string
  }

  export type LigneCommandeCreateManyProduitInput = {
    id?: string
    commande_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type AvisUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    utilisateur?: UserUpdateOneRequiredWithoutAvisNestedInput
    admin_repondant?: UserUpdateOneWithoutAvis_repondusNestedInput
    votes_utiles?: AvisUtileUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
    votes_utiles?: AvisUtileUncheckedUpdateManyWithoutAvisNestedInput
  }

  export type AvisUncheckedUpdateManyWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reponse_admin?: NullableStringFieldUpdateOperationsInput | string | null
    reponse_admin_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reponse_admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    masque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LikeUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LigneCommandeUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
    commande?: CommandeUpdateOneRequiredWithoutLignesNestedInput
  }

  export type LigneCommandeUncheckedUpdateWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    commande_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
  }

  export type LigneCommandeUncheckedUpdateManyWithoutProduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    commande_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
  }

  export type AvisUtileCreateManyAvisInput = {
    id?: string
    utilisateur_id: string
    utile: boolean
    createdAt?: Date | string
  }

  export type AvisUtileUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutVotes_utilesNestedInput
  }

  export type AvisUtileUncheckedUpdateWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisUtileUncheckedUpdateManyWithoutAvisInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    utile?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousCreateManyType_seanceInput = {
    id?: string
    utilisateur_id: string
    date_heure: Date | string
    duree: number
    notes?: string | null
    statut?: $Enums.AppointmentStatus
    raison_refus?: string | null
    notes_admin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RendezVousUpdateWithoutType_seanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutRendezVousNestedInput
  }

  export type RendezVousUncheckedUpdateWithoutType_seanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RendezVousUncheckedUpdateManyWithoutType_seanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    utilisateur_id?: StringFieldUpdateOperationsInput | string
    date_heure?: DateTimeFieldUpdateOperationsInput | Date | string
    duree?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    raison_refus?: NullableStringFieldUpdateOperationsInput | string | null
    notes_admin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LigneCommandeCreateManyCommandeInput = {
    id?: string
    produit_id: string
    nom_produit: string
    image?: string | null
    prix_unitaire: number
    quantite: number
    sous_total: number
  }

  export type LigneCommandeUpdateWithoutCommandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
    produit?: ProduitUpdateOneRequiredWithoutLignesNestedInput
  }

  export type LigneCommandeUncheckedUpdateWithoutCommandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
  }

  export type LigneCommandeUncheckedUpdateManyWithoutCommandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    produit_id?: StringFieldUpdateOperationsInput | string
    nom_produit?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    prix_unitaire?: FloatFieldUpdateOperationsInput | number
    quantite?: IntFieldUpdateOperationsInput | number
    sous_total?: FloatFieldUpdateOperationsInput | number
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