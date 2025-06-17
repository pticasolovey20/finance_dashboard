import { TransactionStatus, TransactionType } from "@prisma/client";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case TransactionStatus.completed:
      return "#22c55e";

    case TransactionStatus.cancelled:
    case TransactionStatus.failed:
      return "#ef4444";

    default:
      return "";
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case TransactionType.income:
      return "#22c55e";

    case TransactionType.expense:
      return "#ef4444";

    default:
      return "";
  }
};
