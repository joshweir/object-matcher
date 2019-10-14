import { matcherMatchesObject } from './matcher';
import { TMatcher } from './types';

describe('matcherMatchesObject', () => {
  describe('when thing is an array of primitives', () => {
    test('is falsy when thing is not an array', () => {
      const matcher: TMatcher = {
        key: '[any]',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, {})).toBeFalsy();
    });

    describe('when primitive matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: 'bar',
          };
          const thing = ['foo', 'bar'];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: 'bar',
          };
          const thing = ['bar', 'bar'];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: 'bar',
          };
          const thing = ['foo', 'baz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: 'bar',
          };
          const thing = ['bar', 'bar', 'baz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when pattern matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { pattern: 'BA[a-z]', flags: 'i' },
          };
          const thing = ['foo', 'bar'];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { pattern: 'BA[a-z]', flags: 'i' },
          };
          const thing = ['bar', 'baz'];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { pattern: 'BA[a-z]', flags: 'i' },
          };
          const thing = ['foo', 'faz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { pattern: 'BA[a-z]', flags: 'i' },
          };
          const thing = ['bar', 'bar', 'faz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when isNull matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isNull: true },
          };
          const thing = ['foo', null];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isNull: true },
          };
          const thing = [null, null];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isNull: true },
          };
          const thing = ['foo', 'faz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isNull: true },
          };
          const thing = ['bar', null, null];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when isUndefined matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isUndefined: true },
          };
          const thing = ['foo', undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isUndefined: true },
          };
          const thing = [undefined, undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isUndefined: true },
          };
          const thing = ['foo', 'faz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
          expect(matcherMatchesObject(matcher, [])).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isUndefined: true },
          };
          const thing = ['bar', undefined, undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when isTruthy matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isTruthy: true },
          };
          const thing = ['foo', 0];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isTruthy: true },
          };
          const thing = ['foo', 'bar'];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isTruthy: true },
          };
          const thing = [0, ''];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
          expect(matcherMatchesObject(matcher, [])).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isTruthy: true },
          };
          const thing = ['bar', 0, 'foo'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when isFalsy matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isFalsy: true },
          };
          const thing = ['foo', 0];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isFalsy: true },
          };
          const thing = ['', 0];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isFalsy: true },
          };
          const thing = ['foo', 'bar'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
          expect(matcherMatchesObject(matcher, [])).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isFalsy: true },
          };
          const thing = ['', 0, 'foo'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    describe('when isEmpty matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item is undefined', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isEmpty: true },
          };
          const thing = ['foo', undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [any] matcher is in play, and at least one array item is an empty array', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isEmpty: true },
          };
          const thing = ['foo', []];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [any] matcher is in play, and at least one array item is an empty object', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isEmpty: true },
          };
          const thing = ['foo', {}];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items are undefined', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isEmpty: true },
          };
          const thing = [undefined, undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items are empty arrays', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isEmpty: true },
          };
          const thing = [[], []];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items are empty objects', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isEmpty: true },
          };
          const thing = [{}, {}];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items are falsy, empty array or empty object', () => {
          const matcher: TMatcher = {
            key: '[any]',
            match: { isEmpty: true },
          };
          const thing = ['foo', 'faz'];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
          expect(matcherMatchesObject(matcher, [])).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[all]',
            match: { isEmpty: true },
          };
          const thing = ['bar', undefined, undefined];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });
  });

  describe('when thing is an array of arrays', () => {
    test('is falsy when thing is not an array or arrays', () => {
      const matcher: TMatcher = {
        key: '[any].[any]',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, [])).toBeFalsy();
      expect(matcherMatchesObject(matcher, ['foo'])).toBeFalsy();
      expect(matcherMatchesObject(matcher, [{}])).toBeFalsy();
    });

    test('is truthy if thing is not an array with at least one array', () => {
      const matcher: TMatcher = {
        key: '[any].[any]',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, [{}, ['foo']])).toBeTruthy();
    });

    describe('when primitive matcher is in use', () => {
      describe('is truthy', () => {
        test('when an array [any] matcher is in play, and at least one array item matches', () => {
          const matcher: TMatcher = {
            key: '[any].[any]',
            match: 'bar',
          };
          const thing = [['foo', 'bar'], []];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: '[all].[any]',
            match: 'bar',
          };
          const thing = [['bar', 'bar'], ['foo', 'bar']];
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: '[any].[any]',
            match: 'bar',
          };
          const thing = [['foo', 'baz'], ['wee']];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: '[any].[all]',
            match: 'bar',
          };
          const thing = [['bar', 'bar', 'baz'], ['bar', 'fuck']];
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });
  });

  describe('when thing is an array of objects', () => {
    test('is falsy when thing is not an array', () => {
      const matcher: TMatcher = {
        key: '[any].someKey',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, {})).toBeFalsy();
    });

    test('is falsy when not an array of objects', () => {
      const matcher: TMatcher = {
        key: '[any].someKey',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, ['asdf'])).toBeFalsy();
    });

    test('is falsy when array of objects doesnt have specified key', () => {
      const matcher: TMatcher = {
        key: '[any].someKey',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, [{}])).toBeFalsy();
    });
  });

  describe('when thing is an object', () => {
    test('is falsy when thing is not an object', () => {
      const matcher: TMatcher = {
        key: 'someKey',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, [])).toBeFalsy();
    });

    test('is falsy when thing does not have specified key', () => {
      const matcher: TMatcher = {
        key: 'someKey',
        match: { pattern: '[a-z]' },
      };
      expect(matcherMatchesObject(matcher, {})).toBeFalsy();
    });

    describe('when primitive matcher is in use', () => {
      describe('is truthy', () => {
        test('when key matches', () => {
          const matcher: TMatcher = {
            key: 'someKey',
            match: 'bar',
          };
          const thing = { someOtherKey: 'foo', someKey: 'bar' };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when key matches (key is a uri)', () => {
          const matcher: TMatcher = {
            key: 'some:uri:123',
            match: 'bar',
          };
          const thing = { someOtherKey: 'foo', 'some:uri:123': 'bar' };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when nested key matches (key is a uri)', () => {
          const matcher: TMatcher = {
            key: 'foo:bar:baz.some:uri:123',
            match: 'bar',
          };
          const thing = { someOtherKey: 'foo', 'foo:bar:baz': { 'some:uri:123': 'bar' } };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [any] matcher is in play, and some array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[any]',
            match: 'bar',
          };
          const thing = { someKey: ['baz', 'bar'] };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play, and all array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[all]',
            match: 'bar',
          };
          const thing = { someKey: ['bar', 'bar'] };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [any] matcher is in play and is array of objects, and some array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[any].otherKey',
            match: 'bar',
          };
          const thing = { someKey: [{ otherKey: 'baz' }, { otherKey: 'bar' }] };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });

        test('when an array [all] matcher is in play and is array of objects, and all array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[all].otherKey',
            match: 'bar',
          };
          const thing = { someKey: [{ otherKey: 'bar' }, { otherKey: 'bar' }] };
          expect(matcherMatchesObject(matcher, thing)).toBeTruthy();
        });
      });

      describe('is falsy', () => {
        test('when input object is undefined', () => {
          const matcher: TMatcher = {
            key: 'someKey',
            match: 'bar',
          };
          const thing = undefined;
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when key does not match', () => {
          const matcher: TMatcher = {
            key: 'someKey',
            match: 'bar',
          };
          const thing = { someOtherKey: 'bar' };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when key does not match (with uri)', () => {
          const matcher: TMatcher = {
            key: 'some:uri:123',
            match: 'bar',
          };
          const thing = { someOtherKey: 'bar' };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when key values does not match', () => {
          const matcher: TMatcher = {
            key: 'someKey',
            match: 'bar',
          };
          const thing = { someKey: 'baz' };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when key values does not match (key is uri)', () => {
          const matcher: TMatcher = {
            key: 'some:uri:123',
            match: 'bar',
          };
          const thing = { 'some:uri:123': 'baz' };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [any] matcher is in play, and none of the array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[any].otherKey',
            match: 'bar',
          };
          const thing = { someKey: [{ otherKey: 'foo' }, { fooKey: 'bar' }] };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });

        test('when an array [all] matcher is in play, and not all the array items match', () => {
          const matcher: TMatcher = {
            key: 'someKey.[all].otherKey',
            match: 'bar',
          };
          const thing = { someKey: [{ otherKey: 'bar' }, { otherKey: 'bar' }, { otherKey: 'baz' }] };
          expect(matcherMatchesObject(matcher, thing)).toBeFalsy();
        });
      });
    });

    // TODO: write tests for remaining matchers
  });
});
