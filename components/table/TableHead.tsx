import { Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";

import { TableHeader } from "@/components/ui/table";
import TableHeadRow from "@/components/table/TableHeadRow";

interface ITableHeadProps<TableData> {
  table: Table<TableData>;
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
}

const TableHead = <TableData,>({
  table,
  columnVirtualizer,
  virtualPaddingLeft,
  virtualPaddingRight,
}: ITableHeadProps<TableData>) => {
  return (
    <TableHeader className="top-0 sticky grid bg-background z-30">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableHeadRow
          key={headerGroup.id}
          headerGroup={headerGroup}
          columnVirtualizer={columnVirtualizer}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </TableHeader>
  );
};

export default TableHead;
