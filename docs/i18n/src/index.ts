/**
 * Module: @solid-primitives/i18n
 */

export type BaseRecordDict = { readonly [K: string | number]: unknown };
export type BaseArrayDict = readonly unknown[];
export type BaseDict = BaseRecordDict | BaseArrayDict;

const isDict = (value: unknown): value is BaseDict =>
  value != null &&
  ((value = Object.getPrototypeOf(value)), value === Array.prototype || value === Object.prototype);

const isRecordDict = (value: unknown): value is BaseRecordDict =>
  value != null && Object.getPrototypeOf(value) === Object.prototype;

type JoinPath<A, B> = A extends string | number
  ? B extends string | number
    ? `${A}.${B}`
    : A
  : B extends string | number
    ? B
    : "";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Flatten a nested dictionary into a flat dictionary.
 *
 * @example
 * ```ts
 * type Dict = {
 *   a: {
 *     foo: string;
 *     b: { bar: number }
 *   }
 * }
 *
 * type FlatDict = Flatten<Dict>;
 *
 * type FlatDict = {
 *   a: {
 *     foo: string;
 *     b: { bar: number }
 *   },
 *   "a.foo": string;
 *   "a.b": { bar: number} ,
 *   "a.b.bar": number;
 * }
 * ```
 */
export type Flatten<T extends BaseDict, P = {}> = number extends T
  ? /* catch any */ BaseRecordDict
  : T extends (infer V)[]
    ? /* array */ { readonly [K in JoinPath<P, number>]?: V } & (V extends BaseDict
        ? Partial<Flatten<V, JoinPath<P, number>>>
        : {})
    : /* record */ UnionToIntersection<
        { [K in keyof T]: T[K] extends BaseDict ? Flatten<T[K], JoinPath<P, K>> : never }[keyof T]
      > & { readonly [K in keyof T as JoinPath<P, K>]: T[K] };

function visitDict(flat_dict: Record<string, unknown>, dict: BaseDict, path: string): void {
  for (const [key, value] of Object.entries(dict)) {
    const key_path = `${path}.${key}`;
    flat_dict[key_path] = value;
    isDict(value) && visitDict(flat_dict, value, key_path);
  }
}

/**
 * Flatten a nested dictionary into a flat dictionary.
 *
 * This way each nested property is available as a flat key.
 *
 * @example
 * ```ts
 * const dict = {
 *   a: {
 *     foo: "foo",
 *     b: { bar: 1 }
 *   }
 * }
 *
 * const flat_dict = flatten(dict);
 *
 * flat_dict === {
 *   a: {
 *     foo: "foo",
 *     b: { bar: 1 }
 *   },
 *   "a.foo": "foo",
 *   "a.b": { bar: 1 },
 *   "a.b.bar": 1,
 * }
 * ```
 */
export function flatten<T extends BaseDict>(dict: T): Flatten<T> {
  const flat_dict: Record<string, unknown> = { ...dict };
  for (const [key, value] of Object.entries(dict)) {
    isDict(value) && visitDict(flat_dict, value, key);
  }
  return flat_dict as Flatten<T>;
}

export type Prefixed<T extends BaseRecordDict, P extends string> = {
  readonly [K in keyof T as `${P}.${K & (string | number)}`]: T[K];
};

/**
 * Prefix all *(own)* keys in the dictionary with the provided prefix.
 *
 * Useful for namespacing a dictionary when combining multiple dictionaries.
 *
 * @example
 * ```ts
 * const dict = {
 *   hello: "hello",
 *   goodbye: "goodbye",
 *   food: { meat: "meat" },
 * }
 *
 * const prefixed_dict = prefix(dict, "greetings");
 *
 * prefixed_dict === {
 *   "greetings.hello": "hello",
 *   "greetings.goodbye": "goodbye",
 *   "greetings.food": { meat: "meat" },
 * }
 * ```
 */
export const prefix: <T extends BaseRecordDict, P extends string>(
  dict: T,
  prefix: P,
) => Prefixed<T, P> = (dict: BaseRecordDict, prefix: string): any => {
  prefix += ".";
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(dict)) {
    result[prefix + key] = value;
  }
  return result;
};

export type BaseTemplateArgs = Record<string, string | number | boolean>;

/**
 * A string branded with arguments needed to resolve the template.
 */
export type Template<T extends BaseTemplateArgs> = string & { __template_args: T };

export type TemplateArgs<T extends Template<any>> = T extends Template<infer R> ? R : never;

/**
 * Identity function that returns the same string branded as {@link Template} with the arguments needed to resolve the template.
 *
 * @example
 * ```ts
 * const template = i18n.template<{ name: string }>("hello {{ name }}!");
 *
 * // same as
 * const template = "hello {{ name }}!" as Template<{ name: string }>;
 * ```
 */
export const template = <T extends BaseTemplateArgs>(source: string): Template<T> => source as any;

/**
 * Resolve a {@link Template} with the provided {@link TemplateArgs}.
 */
export type TemplateResolver<O = string> = <T extends string>(
  template: T,
  ...args: ResolveArgs<T, O>
) => O;

/**
 * Simple template resolver that replaces `{{ key }}` with the value of `args.key`.
 *
 * @example
 * ```ts
 * resolveTemplate("hello {{ name }}!", { name: "John" });
 * // => "hello John!"
 * ```
 */
export const resolveTemplate: TemplateResolver = (string: string, args?: BaseTemplateArgs) => {
  if (args)
    for (const [key, value] of Object.entries(args))
      string = string.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value as string);
  return string;
};

/**
 * Template resolver that does nothing. It's used as a fallback when no template resolver is provided.
 */
export const identityResolveTemplate = (v => v) as TemplateResolver;

export type Resolved<T, O> = T extends (...args: any[]) => infer R ? R : T extends O ? O : T;

export type ResolveArgs<T, O> = T extends (...args: infer A) => any
  ? A
  : T extends Template<infer R>
    ? [args: R]
    : T extends O
      ? [args?: BaseTemplateArgs]
      : [];

export type Resolver<T, O> = (...args: ResolveArgs<T, O>) => Resolved<T, O>;
export type NullableResolver<T, O> = (...args: ResolveArgs<T, O>) => Resolved<T, O> | undefined;

export type Translator<T extends BaseRecordDict, O = string> = <K extends keyof T>(
  path: K,
  ...args: ResolveArgs<T[K], O>
) => Resolved<T[K], O>;

export type NullableTranslator<T extends BaseRecordDict, O = string> = <K extends keyof T>(
  path: K,
  ...args: ResolveArgs<T[K], O>
) => Resolved<T[K], O> | undefined;

/**
 * Create a translator function that will resolve the path in the dictionary and return the value.
 *
 * If the value is a function it will call it with the provided arguments.
 *
 * If the value is a string it will resolve the template using {@link resolveTemplate} with the provided arguments.
 *
 * Otherwise it will return the value as is.
 *
 * @param dict A function that returns the dictionary to use for translation. Will be called on each translation.
 * @param resolveTemplate A function that will resolve the template. Defaults to {@link identityResolveTemplate}.
 *
 * @example
 * ```ts
 * const dict = {
 *   hello: "hello {{ name }}!",
 *   goodbye: (name: string) => `goodbye ${name}!`,
 *   food: {
 *     meat: "meat",
 *   }
 * }
 * const flat_dict = i18n.flatten(dict);
 *
 * const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
 *
 * t("hello", { name: "John" }) // => "hello John!"
 * t("goodbye", "John") // => "goodbye John!"
 * t("food.meat") // => "meat"
 * ```
 */
export function translator<T extends BaseRecordDict, O = string>(
  dict: () => T,
  resolveTemplate?: TemplateResolver<O>,
): Translator<T, O>;
export function translator<T extends BaseRecordDict, O = string>(
  dict: () => T | undefined,
  resolveTemplate?: TemplateResolver<O>,
): NullableTranslator<T, O>;
export function translator<T extends BaseRecordDict>(
  dict: () => T | undefined,
  resolveTemplate: TemplateResolver = identityResolveTemplate,
): any {
  return (path: string, ...args: any[]) => {
    if (path[0] === ".") path = path.slice(1);

    const value = dict()?.[path];

    switch (typeof value) {
      case "function":
        return value(...args);
      case "string":
        return resolveTemplate(value, args[0]);
      default:
        return value;
    }
  };
}

export type Scopes<T extends string> = {
  [K in T]: K extends `${infer S}.${infer R}` ? S | `${S}.${Scopes<R>}` : never;
}[T];

export type Scoped<T extends BaseRecordDict, S extends Scopes<keyof T & string>> = {
  readonly [K in keyof T as K extends `${S}.${infer R}` ? R : never]: T[K];
};

/**
 * Scopes the provided {@link Translator} to the given {@link scope}.
 *
 * @example
 * ```ts
 * const dict = {
 *   greetings: {
 *     hello: "hello {{ name }}!",
 *     hi: "hi {{ name }}!",
 *   },
 *   goodbye: (name: string) => `goodbye ${name}!`,
 * }
 * const flat_dict = i18n.flatten(dict);
 *
 * const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
 *
 * const greetings = i18n.scopedTranslator(t, "greetings");
 *
 * greetings("hello", { name: "John" }) // => "hello John!"
 * greetings("hi", { name: "John" }) // => "hi John!"
 * greetings("goodbye", "John") // => undefined
 * ```
 */
export function scopedTranslator<T extends BaseRecordDict, O, S extends Scopes<keyof T & string>>(
  translator: Translator<T, O>,
  scope: S,
): Translator<Scoped<T, S>, O>;
export function scopedTranslator<T extends BaseRecordDict, O, S extends Scopes<keyof T & string>>(
  translator: NullableTranslator<T, O>,
  scope: S,
): NullableTranslator<Scoped<T, S>, O>;
export function scopedTranslator<O>(
  translator: Translator<BaseRecordDict, O>,
  scope: string,
): Translator<Scoped<BaseRecordDict, never>, O> {
  return (path, ...args) => translator(`${scope}.${path}`, ...args);
}

export type ChainedTranslator<T extends BaseRecordDict, O = string> = {
  readonly [K in keyof T]: T[K] extends BaseRecordDict
    ? ChainedTranslator<T[K], O>
    : Resolver<T[K], O>;
};

export type NullableChainedTranslator<T extends BaseRecordDict, O = string> = {
  readonly [K in keyof T]: T[K] extends BaseRecordDict
    ? NullableChainedTranslator<T[K], O>
    : NullableResolver<T[K], O>;
};

/**
 * Create an object-chained translator that will resolve the path in the dictionary and return the value.
 *
 * @param init_dict The initial dictionary used for getting the structure of nested objects.
 * @param translate {@link Translator} function that will resolve the path in the dictionary and return the value.
 *
 * @example
 * ```ts
 * const dict = {
 *   greetings: {
 *     hello: "hello {{ name }}!",
 *     hi: "hi!",
 *   },
 *   goodbye: (name: string) => `goodbye ${name}!`,
 * }
 * const flat_dict = i18n.flatten(dict);
 *
 * const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
 *
 * const chained = i18n.chainedTranslator(dict, t);
 *
 * chained.greetings.hello({ name: "John" }) // => "hello John!"
 * chained.greetings.hi() // => "hi!"
 * chained.goodbye("John") // => "goodbye John!"
 * ```
 */
export function chainedTranslator<T extends BaseRecordDict, O>(
  init_dict: T,
  translate: Translator<T, O>,
  path?: string,
): ChainedTranslator<T, O>;
export function chainedTranslator<T extends BaseRecordDict, O>(
  init_dict: T,
  translate: NullableTranslator<T, O>,
  path?: string,
): NullableChainedTranslator<T, O>;
export function chainedTranslator<T extends BaseRecordDict, O>(
  init_dict: T,
  translate: Translator<T, O>,
  path: string = "",
): any {
  const result: any = { ...init_dict };

  for (const [key, value] of Object.entries(init_dict)) {
    const key_path = `${path}.${key}`;

    result[key] = isRecordDict(value)
      ? chainedTranslator(value, translate, key_path)
      : (...args: any[]) =>
          translate(
            key_path,
            // @ts-expect-error
            ...args,
          );
  }

  return result;
}

/**
 * Create an object-chained translator *(implemented using a Proxy)* that will resolve the path in the dictionary and return the value.
 *
 * @param translate {@link Translator} function that will resolve the path in the dictionary and return the value.
 *
 * @example
 * ```ts
 * const dict = {
 *   greetings: {
 *     hello: "hello {{ name }}!",
 *     hi: "hi!",
 *   },
 *   goodbye: (name: string) => `goodbye ${name}!`,
 * }
 * const flat_dict = i18n.flatten(dict);
 *
 * const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
 *
 * const proxy = i18n.proxyTranslator(t);
 *
 * proxy.greetings.hello({ name: "John" }) // => "hello John!"
 * proxy.greetings.hi() // => "hi!"
 * proxy.goodbye("John") // => "goodbye John!"
 * ```
 */
export function proxyTranslator<T extends BaseRecordDict, O>(
  translate: Translator<T, O>,
  path?: string,
): ChainedTranslator<T, O>;
export function proxyTranslator<T extends BaseRecordDict, O>(
  translate: NullableTranslator<T, O>,
  path?: string,
): NullableChainedTranslator<T, O>;
export function proxyTranslator<T extends BaseRecordDict, O>(
  translate: Translator<T, O>,
  path: string = "",
): any {
  return new Proxy(translate.bind(void 0, path), new Traps(translate, path));
}

class Traps<O> {
  constructor(
    private readonly translate: Translator<BaseRecordDict, O>,
    private readonly path: string,
  ) {}

  get(target: any, prop: PropertyKey): any {
    if (typeof prop !== "string") return Reflect.get(target, prop);
    return (proxyTranslator as any)(this.translate, `${this.path}.${prop}`);
  }

  has(target: any, prop: PropertyKey): boolean {
    if (typeof prop !== "string") return Reflect.has(target, prop);
    return (proxyTranslator as any)(this.translate, `${this.path}.${prop}`) !== undefined;
  }

  getOwnPropertyDescriptor(target: any, prop: PropertyKey): PropertyDescriptor | undefined {
    if (typeof prop !== "string") return Reflect.getOwnPropertyDescriptor(target, prop);
    return {
      enumerable: true,
      get: () => (proxyTranslator as any)(this.translate, `${this.path}.${prop}`),
    };
  }
}