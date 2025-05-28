import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ITransactionData } from "@/types/transactions";

import ColumnHeader from "@/components/table/ColumnHeader";

export const useTransactionColumns = (): ColumnDef<ITransactionData>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "id",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="ID" column={column} />,
      },

      {
        accessorKey: "type",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Type" column={column} />,
      },

      {
        accessorKey: "amount",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
      },

      {
        accessorKey: "date",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => formatDate(getValue() as string),
        header: ({ column }) => <ColumnHeader title="Date" column={column} />,
      },

      {
        accessorKey: "note",
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Note" column={column} />,
      },
    ],
    []
  );
};
