import { TMatcher, TMatcherNode, TPatternMatcher } from './types';
export declare const buildMatcherNodes: (key: string) => TMatcherNode[];
export declare const buildRegExpFromPatternMatcher: ({ pattern: inputPattern, flags }: TPatternMatcher) => RegExp;
export declare const matcherMatchesObject: (matcher: TMatcher, obj?: {} | any[] | undefined) => boolean;
//# sourceMappingURL=matcher.d.ts.map
