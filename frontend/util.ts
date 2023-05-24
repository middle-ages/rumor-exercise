export const camelCaseKey =
  <K extends string>(key: K) =>
  <V, T extends Record<K, V>>(object: T) => {
    return {
      ...object,
      [key.replaceAll(/_([a-z])/g, match => match.slice(1).toUpperCase())]:
        object[key],
    } as T
  }
