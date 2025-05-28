import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ITransactionData } from "@/types/transactions";

import ColumnHeader from "@/components/table/ColumnHeader";

export const useTransactionColumns = (): ColumnDef<ITransactionData>[] => {
  return useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="ID" column={column} />,
      },

      {
        id: "amount",
        accessorKey: "type",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Type" column={column} />,
      },

      {
        id: "amount",
        accessorKey: "amount",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
      },

      {
        id: "date",
        accessorKey: "date",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => formatDate(getValue() as string),
        header: ({ column }) => <ColumnHeader title="Date" column={column} />,
      },

      {
        id: "note",
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
