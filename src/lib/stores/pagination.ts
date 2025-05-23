import type { Readable } from 'svelte/store';
import { derived, get, writable } from 'svelte/store';

import { has } from '$lib/utilities/has';

export const defaultItemsPerPage = 100;
export const options: string[] = ['100', '250', '500'];
export const perPageKey = 'per-page';
export const currentPageKey = 'page';
export const MAX_PAGE_SIZE = options[options.length - 1];

type PaginationMethods<T> = {
  adjustPageSize: (n: number | string) => void;
  next: () => void;
  previous: () => void;
  jumpToPage: (x: number | string) => void;
  jumpToHashPage: (hash: string) => void;
  jumpToIndex: (x: number | string) => void;
  findIndex: (fn: (item: T) => boolean) => number;
  findPage: (fn: (item: T) => boolean) => number;
  nextRow: () => void;
  previousRow: () => void;
  setActiveRowIndex: (activeRowIndex: number | undefined) => void;
};

type PaginationStore<T> = PaginationMethods<T> &
  Readable<{
    items: T[];
    initialItem: T;
    hasPrevious: boolean;
    hasNext: boolean;
    startingIndex: number;
    endingIndex: number;
    length: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    activeRowIndex: number | undefined;
    pageShortcuts: number[];
  }>;

export const getPageForIndex = (i: number, pageSize: number): number => {
  return Math.floor(i / pageSize) + 1;
};

export const getPageShortcuts = (
  currentPage: number,
  totalPages: number,
): number[] => {
  if (totalPages <= 9) {
    return new Array(totalPages).fill(0).map((_, idx) => idx + 1);
  }

  if (currentPage < 5) {
    return [1, 2, 3, 4, 5, NaN, totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage >= 5 && currentPage <= totalPages - 5) {
    return [
      1,
      2,
      NaN,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      NaN,
      totalPages - 1,
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 5) {
    return [
      1,
      2,
      NaN,
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [];
};

export const getStartingIndexForPage = (
  page: number,
  itemsPerPage: number,
  items: ArrayLike<unknown>,
): number => {
  if (isNaN(page)) return 0;

  if (page <= 1) return 0;
  if (page > getTotalPages(itemsPerPage, items)) {
    const index = items.length - itemsPerPage;
    return index > 0 ? index : 0;
  }

  return Math.floor(itemsPerPage * (page - 1));
};

export const getNearestStartingIndex = (
  index: number,
  itemsPerPage: number,
  items: ArrayLike<unknown>,
): number => {
  const page = getPageForIndex(index, itemsPerPage);
  return getStartingIndexForPage(page, itemsPerPage, items);
};

export const getMaxRowIndex = (
  itemsOfPage: number,
  itemsPerPage: number,
): number => {
  return Math.min(itemsOfPage - 1, itemsPerPage - 1);
};

export const getValidPage = (
  page: number,
  itemsPerPage: number,
  items: ArrayLike<unknown>,
): number => {
  if (isNaN(page)) return 0;
  const lastPage = getTotalPages(itemsPerPage, items);

  if (page <= 0) return 1;
  if (page > lastPage) return lastPage;

  return page;
};

export const getTotalPages = (
  pageSize: number,
  items: ArrayLike<unknown>,
): number => {
  return Math.ceil(items.length / pageSize);
};

export const getIndex = (index: number, things: ArrayLike<unknown>): number => {
  if (isNaN(index)) return 0;
  if (index < 0) return 0;
  if (index < things.length) return index;
  return things.length - 1;
};

export const outOfBounds = (
  index: number,
  things: ArrayLike<unknown>,
): boolean => {
  if (index >= things.length) return true;
  if (index < 0) return true;
  return false;
};

/**
 * Creates a Svelte store for viewing pages of a larger data set.
 */
export const pagination = <T>(
  items: Readonly<T[]> = [],
  perPage: number | string = defaultItemsPerPage,
  currentPage: string | number = 0,
): PaginationStore<T> => {
  perPage = perPageFromSearchParameter(perPage);

  const start = getNearestStartingIndex(toNumber(currentPage), perPage, items);

  const pageSize = writable(perPage);
  const index = writable(start);
  const activeRowIndex = writable(undefined);

  const adjustPageSize = (n: number | string) => {
    pageSize.set(toNumber(n));
  };

  const next = () => {
    setActiveRowIndex();
    index.update((index) => {
      const nextIndex = index + get(pageSize);
      if (outOfBounds(nextIndex, items)) return index;
      return getIndex(nextIndex, items);
    });
  };

  const previous = () => {
    setActiveRowIndex();
    index.update((index) => {
      const nextStart = index - get(pageSize);
      return getIndex(nextStart, items);
    });
  };

  const jumpToPage = (page: number | string) => {
    const itemsPerPage = get(pageSize);
    const nextIndex = getStartingIndexForPage(
      Number(page),
      itemsPerPage,
      items,
    );
    const pageItemSize = items.slice(
      nextIndex,
      nextIndex + itemsPerPage,
    ).length;
    if (get(activeRowIndex) > pageItemSize - 1) {
      activeRowIndex.set(pageItemSize - 1);
    }
    return index.set(nextIndex);
  };

  const jumpToIndex = (i: number | string) => {
    const page = getPageForIndex(Number(i), get(pageSize));
    jumpToPage(page);
  };

  const jumpToHashPage = (hash: string) => {
    const hashId = hash?.slice(1);
    if (hashId) {
      const itemIndex = items.findIndex(
        (item: unknown) => has(item, 'id') && item?.id === hashId,
      );
      if (itemIndex !== -1) {
        const hashPage = getPageForIndex(itemIndex, get(pageSize));
        if (hashPage !== currentPage) {
          jumpToPage(hashPage);
        }
      }
    }
  };

  const findIndex = (fn: (item: T) => boolean): number => {
    for (let i = 0; i < items.length; i++) {
      if (fn(items[i])) return i;
    }
  };

  const findPage = (fn: (item: T) => boolean): number => {
    const i = findIndex(fn);
    return getPageForIndex(i, get(pageSize));
  };

  const setActiveRowIndex = (nextIndex: number | undefined = undefined) => {
    if (nextIndex === undefined) activeRowIndex.set(nextIndex);
    const pageItemSize = items.slice(
      get(index),
      get(index) + get(pageSize),
    ).length;
    const maxRowIndex = getMaxRowIndex(pageItemSize, get(pageSize));
    if (nextIndex <= maxRowIndex) {
      activeRowIndex.set(nextIndex);
    }
  };

  const nextRow = () => {
    const pageItemSize = items.slice(
      get(index),
      get(index) + get(pageSize),
    ).length;
    const maxRowIndex = getMaxRowIndex(pageItemSize, get(pageSize));
    if (get(activeRowIndex) === undefined) {
      activeRowIndex.set(0);
    } else if (get(activeRowIndex) < maxRowIndex) {
      activeRowIndex.set(get(activeRowIndex) + 1);
    }
  };

  const previousRow = () => {
    const nextIndex = get(activeRowIndex) >= 1 ? get(activeRowIndex) - 1 : 0;
    activeRowIndex.set(nextIndex);
  };

  const { subscribe } = derived(
    [index, pageSize, activeRowIndex],
    ([$index, $pageSize, $activeRowIndex]) => {
      const totalPages = getTotalPages($pageSize, items);
      const currentPage = getPageForIndex($index, $pageSize);
      return {
        items: items.slice($index, $index + $pageSize),
        initialItem: items[0],
        hasPrevious: !outOfBounds($index - $pageSize, items),
        hasNext: !outOfBounds($index + $pageSize, items),
        startingIndex: $index,
        endingIndex: getIndex($index + $pageSize - 1, items),
        length: items.length,
        pageSize: $pageSize,
        currentPage,
        totalPages,
        activeRowIndex: $activeRowIndex,
        pageShortcuts: getPageShortcuts(currentPage, totalPages),
      };
    },
  );

  return {
    subscribe,
    adjustPageSize,
    next,
    previous,
    jumpToPage,
    jumpToIndex,
    jumpToHashPage,
    findIndex,
    findPage,
    nextRow,
    previousRow,
    setActiveRowIndex,
  };
};

export const perPageFromSearchParameter = (
  perPage: number | string = defaultItemsPerPage,
): number => {
  const asNumber = toNumber(perPage);

  if (isNaN(asNumber)) return defaultItemsPerPage;
  if (!asNumber) return defaultItemsPerPage;

  return asNumber;
};

const toNumber = (perPage: number | string = 0): number => {
  const asNumber = Number(perPage);

  if (isNaN(asNumber)) return 0;
  if (!asNumber) return 0;

  return Math.abs(asNumber);
};
