import { useState, useEffect, useMemo, RefObject } from 'react';

interface UseVirtualScrollOptions {
  itemsCount: number;
  itemHeight: number;
  containerRef: RefObject<HTMLElement>;
  overscan?: number;
}

export interface VirtualRow {
  index: number;
  offsetTop: number;
}

export function useVirtualScroll({
  itemsCount,
  itemHeight,
  containerRef,
  overscan = 4,
}: UseVirtualScrollOptions) {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(600);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Listen to scroll on element or window
    const handleScroll = () => {
      setScrollTop(element.scrollTop);
    };

    // Update viewport height with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewportHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element);
    element.addEventListener('scroll', handleScroll, { passive: true });

    // Initial measure
    setScrollTop(element.scrollTop);
    if (element.clientHeight > 0) {
      setViewportHeight(element.clientHeight);
    }

    return () => {
      element.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  const totalHeight = itemsCount * itemHeight;

  const { startIndex, endIndex, virtualRows } = useMemo(() => {
    if (itemsCount === 0) {
      return { startIndex: 0, endIndex: 0, virtualRows: [] };
    }

    const calculatedStart = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(viewportHeight / itemHeight);
    const calculatedEnd = Math.min(itemsCount - 1, calculatedStart + visibleCount + overscan * 2);

    const rows: VirtualRow[] = [];
    for (let i = calculatedStart; i <= calculatedEnd; i++) {
      rows.push({
        index: i,
        offsetTop: i * itemHeight,
      });
    }

    return {
      startIndex: calculatedStart,
      endIndex: calculatedEnd,
      virtualRows: rows,
    };
  }, [itemsCount, itemHeight, scrollTop, viewportHeight, overscan]);

  return {
    virtualRows,
    totalHeight,
    startIndex,
    endIndex,
    scrollTop,
    viewportHeight,
  };
}
