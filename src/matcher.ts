import {
  TMatcher,
  TMatcherNode,
  TPatternMatcher,
  isFalsyMatcher,
  isNullMatcher,
  isPatternMatcher,
  isPrimitiveMatcher,
  isTruthyMatcher,
  isUndefinedMatcher,
} from './types';

// to be an array matcher node it must be:
// [any] or [all]
const getArrayMatcherNode = (key: string): TMatcherNode | undefined =>
  ['[all]', '[any]'].indexOf(key) > -1
    ? {
        val: key.slice(1, -1),
        type: 'array',
      }
    : undefined;

const buildMatcherNode = (key: string): TMatcherNode => getArrayMatcherNode(key) || { val: key, type: 'objkey' };

export const buildMatcherNodes = (key: string): TMatcherNode[] =>
  key.split('.').reduce((acc, curr) => [...acc, buildMatcherNode(curr)], [] as TMatcherNode[]);

export const buildRegExpFromPatternMatcher = ({ pattern: inputPattern, flags }: TPatternMatcher): RegExp => {
  const pattern =
    inputPattern.slice(0, 1) === '/' && inputPattern.slice(-1) === '/' ? inputPattern.slice(1, -1) : inputPattern;
  if (!pattern || !pattern.length) {
    throw new Error(`pattern matcher regexp pattern is invalid: ${inputPattern}`);
  }

  return new RegExp(pattern, flags);
};

const thingMatches = (matcher: TMatcher) => (thing: any): boolean => {
  if (isFalsyMatcher(matcher.match)) {
    return !thing;
  }

  if (isTruthyMatcher(matcher.match)) {
    return !!thing;
  }

  if (isUndefinedMatcher(matcher.match)) {
    return typeof thing === 'undefined';
  }

  if (isNullMatcher(matcher.match)) {
    return thing === null;
  }

  if (isPatternMatcher(matcher.match)) {
    // fall back to empty string because if thing is undefined or null it will always be a match!
    return buildRegExpFromPatternMatcher(matcher.match).test(thing || '');
  }

  if (isPrimitiveMatcher(matcher.match)) {
    return thing === matcher.match;
  }

  throw new Error(`matcher match type unrecognised: ${matcher}`);
};

const matcherNodesMatchObject = (matcherNodes: TMatcherNode[], matcher: TMatcher, obj: any): boolean => {
  if (matcherNodes.length <= 0) {
    throw new Error(`matcherNodes is empty`);
  }

  const [{ type, val }] = matcherNodes;

  if (matcherNodes.length > 1) {
    if (type === 'objkey') {
      const maybeMatch = obj[val];
      return maybeMatch ? matcherNodesMatchObject(matcherNodes.slice(1), matcher, maybeMatch) : false;
    }

    if (!(obj instanceof Array)) {
      return false;
    }

    // array
    if (val === 'any') {
      return !!obj.filter((item) => matcherNodesMatchObject(matcherNodes.slice(1), matcher, item)).length;
    }

    // val === 'all'
    return obj.filter((item) => matcherNodesMatchObject(matcherNodes.slice(1), matcher, item)).length === obj.length;
  }

  // matcherNodes.length === 1
  if (type === 'array') {
    if (!(obj instanceof Array)) {
      return false;
    }

    if (val === 'any') {
      return !!obj.filter(thingMatches(matcher)).length;
    }

    // val === 'all'
    return obj.filter(thingMatches(matcher)).length === obj.length;
  }

  return obj ? thingMatches(matcher)(obj[val]) : false;
};

export const matcherMatchesObject = (matcher: TMatcher, obj?: {} | any[]): boolean =>
  matcherNodesMatchObject(buildMatcherNodes(matcher.key), matcher, obj);
