import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { ITransactionData } from "@/types/transactions";

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

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="ID" column={column} />,
      },

      {
        size: 200,

        id: "type",
        accessorKey: "type",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Type" column={column} />,
      },

      {
        size: 300,

        id: "amount",
        accessorKey: "amount",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => getValue(),
        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
      },

      {
        size: 400,

        id: "date",
        accessorKey: "date",
        enableSorting: true,
        enableColumnFilter: true,

        cell: ({ getValue }) => formatDate(getValue() as string),
        header: ({ column }) => <ColumnHeader title="Date" column={column} />,
      },

      {
        size: 500,

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
