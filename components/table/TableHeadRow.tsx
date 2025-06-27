import { HeaderGroup } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";

import { TableHead, TableRow } from "@/components/ui/table";
import TableHeadCell from "@/components/table/TableHeadCell";

interface ITableHeadRowProps<TableData> {
  headerGroup: HeaderGroup<TableData>;
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
}

const TableHeadRow = <TableData,>({
  headerGroup,
  columnVirtualizer,
  virtualPaddingLeft,
  virtualPaddingRight,
}: ITableHeadRowProps<TableData>) => {
  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <TableRow className="flex w-full">
      {virtualPaddingLeft ? <TableHead className="flex" style={{ width: virtualPaddingLeft }} /> : null}

      {virtualColumns.map((virtualColumn, index) => {
        const header = headerGroup.headers[virtualColumn.index];
        const isLast = index === virtualColumns.length - 1;

        return <TableHeadCell key={header.id} header={header} isLast={isLast} />;
      })}

      {virtualPaddingRight ? <TableHead className="flex" style={{ width: virtualPaddingRight }} /> : null}
    </TableRow>
  );
};

export default TableHeadRow;
