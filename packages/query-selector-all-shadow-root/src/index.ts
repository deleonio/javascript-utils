const pushNodes = <T extends Node>(
  set: Set<T>,
  domNodes: NodeListOf<T> | T[]
): void => {
  domNodes.forEach((domNode: T): void => {
    if (set.has(domNode) === false) {
      set.add(domNode);
    }
  });
};

export const querySelectorAll = <T extends Element>(
  selector: string,
  node: Document | HTMLElement | ShadowRoot = document
): T[] => {
  if (
    (node as unknown) instanceof Document ||
    (node as unknown) instanceof HTMLElement ||
    (node as unknown) instanceof ShadowRoot
  ) {
    const domNodes: Set<T> = new Set();
    pushNodes<T>(domNodes, (node as Document).querySelectorAll<T>(selector));
    const nodeList: NodeListOf<HTMLElement> = (
      node as Document
    ).querySelectorAll<HTMLElement>('[class*="hydrated"]');
    for (let i = 0; i < nodeList.length; i++) {
      const shadowRoot: ShadowRoot = nodeList[i].shadowRoot as ShadowRoot;
      if (typeof shadowRoot === "object" && shadowRoot !== null) {
        pushNodes<T>(domNodes, querySelectorAll<T>(selector, shadowRoot));
      } else {
        pushNodes<T>(domNodes, querySelectorAll<T>(selector, nodeList[i]));
      }
    }
    return Array.from(domNodes);
  } else {
    throw new Error(
      `The parameter document for the method querySelectorAll is not type of Document, HTMLElement or ShadowRoot.`
    );
  }
};
