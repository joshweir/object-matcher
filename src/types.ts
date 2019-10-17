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
export type TIsEmptyMatcher = { isEmpty: true };

export type TMatcherType =
  | TPrimitiveMatcher
  | TPatternMatcher
  | TUndefinedMatcher
  | TIsNullMatcher
  | TIsFalsyMatcher
  | TIsTruthyMatcher
  | TIsEmptyMatcher;

export type TMatcher = {
  key: string;
  match: TMatcherType;
};

export const isMatcherNode = (thing: any, verbose?: boolean): thing is TMatcherNode => {
  if (typeof thing.type !== 'string' || ['objkey', 'array'].indexOf(thing.type) === -1) {
    if (verbose) console.log(`invalid matcher node, type should be 'objkey', 'array': ${JSON.stringify(thing)}`);
    return false;
  }
  if (typeof thing.val !== 'string' || !thing.val) {
    if (verbose)
      console.log(`invalid matcher node, val should be a string that is not empty: ${JSON.stringify(thing)}`);
    return false;
  }
  if (thing.type === 'array' && ['any', 'all'].indexOf(thing.val) === -1) {
    if (verbose) {
      console.log(
        `invalid matcher node, type was identified as 'array' but val was not 'any', 'all': ${JSON.stringify(thing)}`,
      );
    }
    return false;
  }

  return true;
};

export const isPrimitiveMatcher = (thing: any): thing is TPrimitiveMatcher =>
  ['string', 'number', 'boolean'].indexOf(typeof thing) > -1;
export const isPatternMatcher = (thing: any, verbose?: boolean): thing is TPatternMatcher => {
  if (!thing.pattern || typeof thing.pattern !== 'string' || !thing.pattern.length) {
    return false;
  }

  try {
    buildRegExpFromPatternMatcher(thing);
  } catch (e) {
    if (verbose)
      console.log(`could not build RegExp from pattern matcher: ${JSON.stringify(thing)} error: ${e.toString()}`);
    return false;
  }

  return true;
};
export const isUndefinedMatcher = (thing: any): thing is TUndefinedMatcher =>
  thing.isUndefined && thing.isUndefined === true;
export const isNullMatcher = (thing: any): thing is TIsNullMatcher => thing.isNull && thing.isNull === true;
export const isFalsyMatcher = (thing: any): thing is TIsFalsyMatcher => thing.isFalsy && thing.isFalsy === true;
export const isTruthyMatcher = (thing: any): thing is TIsTruthyMatcher => thing.isTruthy && thing.isTruthy === true;
export const isEmptyMatcher = (thing: any): thing is TIsEmptyMatcher => thing.isEmpty && thing.isEmpty === true;

export const isMatcherType = (thing: any, verbose?: boolean): thing is TMatcherType => {
  if (isPrimitiveMatcher(thing)) {
    return true;
  }

  if (
    typeof thing === 'object' &&
    (isPatternMatcher(thing, verbose) ||
      isUndefinedMatcher(thing) ||
      isNullMatcher(thing) ||
      isFalsyMatcher(thing) ||
      isTruthyMatcher(thing) ||
      isEmptyMatcher(thing))
  ) {
    return true;
  }

  return false;
};

export const isMatcher = (thing: any, verbose?: boolean): thing is TMatcher => {
  if (!thing.key || !thing.key.length) {
    if (verbose) console.log(`matcher invalid, key is required: ${JSON.stringify(thing)}`);
    return false;
  }
  if (!isMatcherType(thing.match, verbose)) {
    if (verbose) console.log(`matcher invalid: ${thing.match}`);
    return false;
  }
  const matcherNodes = buildMatcherNodes(thing.key);
  if (matcherNodes.filter((n) => isMatcherNode(n, verbose)).length === matcherNodes.length) {
    return true;
  }

  return false;
};
