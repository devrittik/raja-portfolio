/** Small collection helpers shared across the codebase. */

export function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const k = key(item);
      (acc[k] ??= []).push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

export function sortByKey<T>(items: T[], key: (item: T) => string, desc = false): T[] {
  return [...items].sort((a, b) =>
    desc ? key(b).localeCompare(key(a)) : key(a).localeCompare(key(b)),
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
