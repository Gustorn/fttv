export { RehydrateAction } from "./actions";

export const concatDedupe = <T, U>(original: T[], extra: T[], keySelector: (value: T) => U): T[] => {
	const extraSet = new Set(extra.map(keySelector));
	return [...original.filter(value => !extraSet.has(keySelector(value))), ...extra];
};
