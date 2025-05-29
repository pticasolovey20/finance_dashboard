import { useEffect, useMemo, useRef, useState } from "react";
import { ColumnSizingState, ColumnDef } from "@tanstack/react-table";

export const useColumnSizing = <TableData>(columns: ColumnDef<TableData>[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const initialSizing = useMemo<ColumnSizingState>(() => {
    if (!containerWidth) return {};

    const columnWidth = Math.floor(containerWidth / columns.length);
    const sizing: ColumnSizingState = {};

    columns.forEach((column) => {
      if (column.id) sizing[column.id] = columnWidth;
    });

    return sizing;
  }, [containerWidth, columns]);

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  useEffect(() => {
    if (Object.keys(initialSizing).length > 0) setColumnSizing(initialSizing);
  }, [initialSizing]);

  const totalTableWidth = useMemo(() => {
    return Object.values(columnSizing).reduce((acc, state) => acc + state, 0);
  }, [columnSizing]);

  return {
    containerRef,
    columnSizing,
    setColumnSizing,
    totalTableWidth,
  };
};
