import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ITransactionData } from "@/types/transactionTypes";

import { Badge } from "@/components/ui/badge";
import ColumnHeader from "@/components/table/ColumnHeader";

export const useTransactionColumns = (): ColumnDef<ITransactionData>[] => {
  return useMemo(
    () => [
      {
        size: 400,

        id: "id",
        accessorKey: "id",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="ID" column={column} />,
        cell: ({ getValue }) => getValue(),
      },

      {
        size: 200,

        id: "type",
        accessorKey: "type",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Type" column={column} />,
        cell: ({ getValue }) => getValue(),
      },

      {
        enableResizing: false,
        size: 150,

        id: "status",
        accessorKey: "status",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Status" column={column} />,
        cell: ({ getValue }) => (
          <Badge
            variant="secondary"
            className={cn(
              "font-mono tabular-nums text-sm",
              "w-full flex justify-center rounded-md px-1"
            )}
          >
            {getValue() as ReactNode}
          </Badge>
        ),
      },

      {
        size: 200,

        id: "amount",
        accessorKey: "amount",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
        cell: ({ getValue }) => getValue(),
      },

      {
        size: 300,

        id: "date",
        accessorKey: "date",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Date" column={column} />,
        cell: ({ getValue }) => formatDate(getValue() as string),
      },

      {
        size: 700,

        id: "note",
        accessorKey: "note",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Note" column={column} />,
        cell: ({ getValue }) => getValue(),
      },
    ],
    []
  );
};
