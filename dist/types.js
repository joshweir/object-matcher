'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const matcher_1 = require('./matcher');
exports.isMatcherNode = (thing, verbose) => {
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
exports.isPrimitiveMatcher = (thing) => ['string', 'number', 'boolean'].indexOf(typeof thing) > -1;
exports.isPatternMatcher = (thing, verbose) => {
  if (!thing.pattern || typeof thing.pattern !== 'string' || !thing.pattern.length) {
    return false;
  }
  try {
    matcher_1.buildRegExpFromPatternMatcher(thing);
  } catch (e) {
    if (verbose)
      console.log(`could not build RegExp from pattern matcher: ${JSON.stringify(thing)} error: ${e.toString()}`);
    return false;
  }
  return true;
};
exports.isUndefinedMatcher = (thing) => thing.isUndefined && thing.isUndefined === true;
exports.isNullMatcher = (thing) => thing.isNull && thing.isNull === true;
exports.isFalsyMatcher = (thing) => thing.isFalsy && thing.isFalsy === true;
exports.isTruthyMatcher = (thing) => thing.isTruthy && thing.isTruthy === true;
exports.isEmptyMatcher = (thing) => thing.isEmpty && thing.isEmpty === true;
exports.isMatcherType = (thing, verbose) => {
  if (exports.isPrimitiveMatcher(thing)) {
    return true;
  }
  if (
    typeof thing === 'object' &&
    (exports.isPatternMatcher(thing, verbose) ||
      exports.isUndefinedMatcher(thing) ||
      exports.isNullMatcher(thing) ||
      exports.isFalsyMatcher(thing) ||
      exports.isTruthyMatcher(thing) ||
      exports.isEmptyMatcher(thing))
  ) {
    return true;
  }
  return false;
};
exports.isMatcher = (thing, verbose) => {
  if (!thing.key || !thing.key.length) {
    if (verbose) console.log(`matcher invalid, key is required: ${JSON.stringify(thing)}`);
    return false;
  }
  if (!exports.isMatcherType(thing.match, verbose)) {
    if (verbose) console.log(`matcher invalid: ${thing.match}`);
    return false;
  }
  const matcherNodes = matcher_1.buildMatcherNodes(thing.key);
  if (matcherNodes.filter((n) => exports.isMatcherNode(n, verbose)).length === matcherNodes.length) {
    return true;
  }
  return false;
};
//# sourceMappingURL=types.js.map
