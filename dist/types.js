'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const matcher_1 = require('./matcher');
exports.isMatcherNode = (thing) => {
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
exports.isPrimitiveMatcher = (thing) => ['string', 'number', 'boolean'].indexOf(typeof thing) > -1;
exports.isPatternMatcher = (thing) => {
  if (!thing.pattern || typeof thing.pattern !== 'string' || !thing.pattern.length) {
    return false;
  }
  try {
    matcher_1.buildRegExpFromPatternMatcher(thing);
  } catch (e) {
    throw new Error(`could not build RegExp from pattern matcher: ${JSON.stringify(thing)} error: ${e.toString()}`);
  }
  return true;
};
exports.isUndefinedMatcher = (thing) => thing.isUndefined && thing.isUndefined === true;
exports.isNullMatcher = (thing) => thing.isNull && thing.isNull === true;
exports.isFalsyMatcher = (thing) => thing.isFalsy && thing.isFalsy === true;
exports.isTruthyMatcher = (thing) => thing.isTruthy && thing.isTruthy === true;
exports.isMatcherType = (thing) => {
  if (exports.isPrimitiveMatcher(thing)) {
    return true;
  }
  if (
    typeof thing === 'object' &&
    (exports.isPatternMatcher(thing) ||
      exports.isUndefinedMatcher(thing) ||
      exports.isNullMatcher(thing) ||
      exports.isFalsyMatcher(thing) ||
      exports.isTruthyMatcher(thing))
  ) {
    return true;
  }
  return false;
};
exports.isMatcher = (thing) => {
  if (!thing.key || !thing.key.length) {
    throw new Error(`matcher invalid, key is required: ${JSON.stringify(thing)}`);
  }
  if (!exports.isMatcherType(thing.match)) {
    throw new Error(`matcher invalid: ${thing.match}`);
  }
  const matcherNodes = matcher_1.buildMatcherNodes(thing.key);
  if (matcherNodes.filter(exports.isMatcherNode).length === matcherNodes.length) {
    return true;
  }
  return false;
};
//# sourceMappingURL=types.js.map
