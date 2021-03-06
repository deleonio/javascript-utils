import { querySelectorAll } from "query-selector-all-shadow-root";

export const getElementsByName = <T extends Element>(
  name: string,
  node?: Document | HTMLElement | ShadowRoot
): T[] => {
  return querySelectorAll<T>(`[name="${name}"]`, node);
};
