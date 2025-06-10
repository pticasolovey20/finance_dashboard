import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ITransactionData } from "@/types/transactionTypes";

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
        size: 200,

        id: "status",
        accessorKey: "Status",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Status" column={column} />,
        cell: ({ getValue }) => getValue(),
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
