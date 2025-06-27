import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { TransactionType } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

import { ITransactionData } from "@/types/transactionTypes";
import { getStatusColor, getTypeColor } from "@/lib/transaction";

import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import ColumnHeader from "@/components/table/ColumnHeader";

export const useTransactionColumns = (): ColumnDef<ITransactionData>[] => {
  return useMemo(
    () => [
      {
        enableResizing: false,
        size: 150,

        id: "type",
        accessorKey: "type",

        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          const order = {
            income: 1,
            expense: 2,
          };

          const a = rowA.getValue(columnId) as string;
          const b = rowB.getValue(columnId) as string;

          const aKey = a as keyof typeof order;
          const bKey = b as keyof typeof order;

          return (order[aKey] || 99) - (order[bKey] || 99);
        },

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Type" column={column} />,
        cell: ({ getValue }) => {
          const type = getValue() as string;
          const color = getTypeColor(type);

          return (
            <div className="flex items-center gap-2">
              {type === TransactionType.income ? (
                <ArrowUp color={color} size={20} />
              ) : (
                <ArrowDown color={color} size={20} />
              )}

              <span>{type}</span>
            </div>
          );
        },
      },

      {
        minSize: 150,
        size: 200,

        id: "categoryId",
        accessorKey: "categoryId",

        enableSorting: true,
        sortingFn: "alphanumeric",

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Category" column={column} />,
        cell: ({ getValue }) => <span className="capitalize">{getValue() as string}</span>,
      },

      {
        minSize: 200,
        size: 400,

        id: "id",
        accessorKey: "id",

        enableSorting: true,
        sortingFn: "alphanumeric",

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="ID" column={column} />,
        cell: ({ getValue }) => getValue(),
      },

      {
        minSize: 150,
        size: 150,

        id: "amount",
        accessorKey: "amount",

        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          const a = parseFloat(rowA.getValue(columnId));
          const b = parseFloat(rowB.getValue(columnId));

          return a - b;
        },

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
        cell: (data) => {
          const amount = data.getValue() as string;
          const type = data.table.getRow(data.row.id).original.type;
          const color = getTypeColor(type);

          return (
            <span style={{ color }}>
              {type === "income" ? "+" : "-"} {amount}
            </span>
          );
        },
      },

      {
        enableResizing: false,
        size: 150,

        id: "date",
        accessorKey: "date",

        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          return new Date(rowA.getValue(columnId)).getTime() - new Date(rowB.getValue(columnId)).getTime();
        },

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Date" column={column} />,
        cell: ({ getValue }) => formatDate(getValue() as string),
      },

      {
        enableResizing: false,
        size: 150,

        id: "status",
        accessorKey: "status",

        enableSorting: true,
        sortingFn: "alphanumeric",

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Status" column={column} />,
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const color = getStatusColor(status);

          return (
            <Badge
              variant="secondary"
              style={{ color, height: "26px" }}
              className={cn("font-mono tabular-nums text-sm", "w-full flex justify-center rounded-md px-1")}
            >
              {status}
            </Badge>
          );
        },
      },

      {
        minSize: 350,
        size: 800,

        id: "note",
        accessorKey: "note",

        enableSorting: true,
        sortingFn: "alphanumeric",

        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Note" column={column} />,
        cell: ({ getValue }) => getValue(),
      },
    ],

    []
  );
};
