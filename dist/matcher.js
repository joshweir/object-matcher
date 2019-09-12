'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('./types');
const getArrayMatcherNode = (key) =>
  ['[all]', '[any]'].indexOf(key) > -1
    ? {
        val: key.slice(1, -1),
        type: 'array',
      }
    : undefined;
const buildMatcherNode = (key) => getArrayMatcherNode(key) || { val: key, type: 'objkey' };
exports.buildMatcherNodes = (key) => key.split('.').reduce((acc, curr) => [...acc, buildMatcherNode(curr)], []);
exports.buildRegExpFromPatternMatcher = ({ pattern: inputPattern, flags }) => {
  const pattern =
    inputPattern.slice(0, 1) === '/' && inputPattern.slice(-1) === '/' ? inputPattern.slice(1, -1) : inputPattern;
  if (!pattern || !pattern.length) {
    throw new Error(`pattern matcher regexp pattern is invalid: ${inputPattern}`);
  }
  return new RegExp(pattern, flags);
};
const thingMatches = (matcher) => (thing) => {
  if (types_1.isFalsyMatcher(matcher.match)) {
    return !thing;
  }
  if (types_1.isTruthyMatcher(matcher.match)) {
    return !!thing;
  }
  if (types_1.isUndefinedMatcher(matcher.match)) {
    return typeof thing === 'undefined';
  }
  if (types_1.isNullMatcher(matcher.match)) {
    return thing === null;
  }
  if (types_1.isEmptyMatcher(matcher.match)) {
    if (!thing) {
      return true;
    }
    if (typeof thing === 'object') {
      if (thing instanceof Array) {
        return !thing.length;
      }
      return Object.keys(thing).length <= 0;
    }
    return false;
  }
  if (types_1.isPatternMatcher(matcher.match)) {
    return exports.buildRegExpFromPatternMatcher(matcher.match).test(thing || '');
  }
  if (types_1.isPrimitiveMatcher(matcher.match)) {
    return thing === matcher.match;
  }
  throw new Error(`matcher match type unrecognised: ${JSON.stringify(matcher, null, 2)}`);
};
const matcherNodesMatchObject = (matcherNodes, matcher, obj) => {
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
    if (val === 'any') {
      return !!obj.filter((item) => matcherNodesMatchObject(matcherNodes.slice(1), matcher, item)).length;
    }
    return obj.filter((item) => matcherNodesMatchObject(matcherNodes.slice(1), matcher, item)).length === obj.length;
  }
  if (type === 'array') {
    if (!(obj instanceof Array)) {
      return false;
    }
    if (val === 'any') {
      return !!obj.filter(thingMatches(matcher)).length;
    }
    return obj.filter(thingMatches(matcher)).length === obj.length;
  }
  return obj ? thingMatches(matcher)(obj[val]) : false;
};
exports.matcherMatchesObject = (matcher, obj) =>
  matcherNodesMatchObject(exports.buildMatcherNodes(matcher.key), matcher, obj);
//# sourceMappingURL=matcher.js.map
