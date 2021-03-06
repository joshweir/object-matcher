export declare type TMatcherNode = {
  val: string;
  type: 'objkey' | 'array';
};
export declare type TPrimitiveMatcher = string | number | boolean;
export declare type TPatternMatcher = {
  pattern: string;
  flags?: string;
};
export declare type TUndefinedMatcher = {
  isUndefined: true;
};
export declare type TIsNullMatcher = {
  isNull: true;
};
export declare type TIsFalsyMatcher = {
  isFalsy: true;
};
export declare type TIsTruthyMatcher = {
  isTruthy: true;
};
export declare type TIsEmptyMatcher = {
  isEmpty: true;
};
export declare type TMatcherType =
  | TPrimitiveMatcher
  | TPatternMatcher
  | TUndefinedMatcher
  | TIsNullMatcher
  | TIsFalsyMatcher
  | TIsTruthyMatcher
  | TIsEmptyMatcher;
export declare type TMatcher = {
  key: string;
  match: TMatcherType;
};
export declare const isMatcherNode: (thing: any, verbose?: boolean | undefined) => thing is TMatcherNode;
export declare const isPrimitiveMatcher: (thing: any) => thing is TPrimitiveMatcher;
export declare const isPatternMatcher: (thing: any, verbose?: boolean | undefined) => thing is TPatternMatcher;
export declare const isUndefinedMatcher: (thing: any) => thing is TUndefinedMatcher;
export declare const isNullMatcher: (thing: any) => thing is TIsNullMatcher;
export declare const isFalsyMatcher: (thing: any) => thing is TIsFalsyMatcher;
export declare const isTruthyMatcher: (thing: any) => thing is TIsTruthyMatcher;
export declare const isEmptyMatcher: (thing: any) => thing is TIsEmptyMatcher;
export declare const isMatcherType: (thing: any, verbose?: boolean | undefined) => thing is TMatcherType;
export declare const isMatcher: (thing: any, verbose?: boolean | undefined) => thing is TMatcher;
//# sourceMappingURL=types.d.ts.map
