import { buildMatcherNodes, buildRegExpFromPatternMatcher } from './matcher';

export type TMatcherNode = {
  val: string;
  type: 'objkey' | 'array';
};

export type TPrimitiveMatcher = string | number | boolean;
export type TPatternMatcher = { pattern: string; flags?: string };
export type TUndefinedMatcher = { isUndefined: true };
export type TIsNullMatcher = { isNull: true };
export type TIsFalsyMatcher = { isFalsy: true };
export type TIsTruthyMatcher = { isTruthy: true };

export type TMatcherType =
  | TPrimitiveMatcher
  | TPatternMatcher
  | TUndefinedMatcher
  | TIsNullMatcher
  | TIsFalsyMatcher
  | TIsTruthyMatcher;

export type TMatcher = {
  key: string;
  match: TMatcherType;
};

export const isMatcherNode = (thing: any): thing is TMatcherNode => {
  if (typeof thing.type !== 'string' || ['objkey', 'array'].indexOf(thing.type) === -1) {
    throw new Error(`invalid matcher node, type should be 'objkey', 'array': ${JSON.stringify(thing)}`);
  }
  if (typeof thing.val !== 'string' || !thing.val) {
    throw new Error(`invalid matcher node, val should be a string that is not empty: ${JSON.stringify(thing)}`);
  }
  if (thing.type === 'array' && ['any', 'all'].indexOf(thing.val) === -1) {
    throw new Error(
      `invalid matcher node, type was identified as 'array' but val was not 'any', 'all': ${JSON.stringify(thing)}`,
    );
  }

  return true;
};

export const isPrimitiveMatcher = (thing: any): thing is TPrimitiveMatcher =>
  ['string', 'number', 'boolean'].indexOf(typeof thing) > -1;
export const isPatternMatcher = (thing: any): thing is TPatternMatcher => {
  if (!thing.pattern || typeof thing.pattern !== 'string' || !thing.pattern.length) {
    return false;
  }

  try {
    buildRegExpFromPatternMatcher(thing);
  } catch (e) {
    throw new Error(`could not build RegExp from pattern matcher: ${JSON.stringify(thing)} error: ${e.toString()}`);
  }

  return true;
};
export const isUndefinedMatcher = (thing: any): thing is TUndefinedMatcher =>
  thing.isUndefined && thing.isUndefined === true;
export const isNullMatcher = (thing: any): thing is TIsNullMatcher => thing.isNull && thing.isNull === true;
export const isFalsyMatcher = (thing: any): thing is TIsFalsyMatcher => thing.isFalsy && thing.isFalsy === true;
export const isTruthyMatcher = (thing: any): thing is TIsTruthyMatcher => thing.isTruthy && thing.isTruthy === true;

export const isMatcherType = (thing: any): thing is TMatcherType => {
  if (isPrimitiveMatcher(thing)) {
    return true;
  }

  if (
    typeof thing === 'object' &&
    (isPatternMatcher(thing) ||
      isUndefinedMatcher(thing) ||
      isNullMatcher(thing) ||
      isFalsyMatcher(thing) ||
      isTruthyMatcher(thing))
  ) {
    return true;
  }

  return false;
};

export const isMatcher = (thing: any): thing is TMatcher => {
  if (!thing.key || !thing.key.length) {
    throw new Error(`matcher invalid, key is required: ${JSON.stringify(thing)}`);
  }
  if (!isMatcherType(thing.match)) {
    throw new Error(`matcher invalid: ${thing.match}`);
  }
  const matcherNodes = buildMatcherNodes(thing.key);
  if (matcherNodes.filter(isMatcherNode).length === matcherNodes.length) {
    return true;
  }

  return false;
};
