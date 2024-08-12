import { api } from '@/lib/api';
import type { CreateTransactionSchema } from '@/schemas/transaction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await api.transactions.$get();
      return res.json();
    },
  });

export const useAddTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateTransactionSchema) => {
      const res = await api.transactions.$post({ json: values });
      return res.json();
    },
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      }),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
