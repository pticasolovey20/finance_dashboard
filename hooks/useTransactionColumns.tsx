import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import { TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { getStatusColor, getTypeColor } from "@/lib/transaction";
import { ITransactionData } from "@/types/transactionTypes";

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

        id: "amount",
        accessorKey: "amount",
        enableSorting: true,
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Amount" column={column} />,
        cell: (data) => {
          const amount = data.getValue() as string;
          const type = data.table.getRow(data.row.id).original.type;
          const color = getTypeColor(type);

          return <span style={{ color }}>{amount}</span>;
        },
      },

      {
        enableResizing: false,
        size: 150,

        id: "date",
        accessorKey: "date",
        enableSorting: true,
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
        enableColumnFilter: true,

        header: ({ column }) => <ColumnHeader title="Status" column={column} />,
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const color = getStatusColor(status);

          return (
            <Badge
              variant="secondary"
              style={{ color }}
              className={cn(
                "font-mono tabular-nums text-sm",
                "w-full flex justify-center rounded-md px-1"
              )}
            >
              {status}
            </Badge>
          );
        },
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
