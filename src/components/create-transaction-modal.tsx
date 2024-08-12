import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAddTransaction } from '@/hooks/useTransaction';
import {
  type CreateTransactionSchema,
  createTransactionSchema,
} from '@/schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

type TransactionFormProps = {
  onClose?: () => void;
  type: 'income' | 'expense';
};

const TransactionForm = ({ onClose, type }: TransactionFormProps) => {
  const { mutate, isPending } = useAddTransaction();
  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      description: '',
      date: new Date(),
      type,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess() {
        toast.success('Transaction created.');
        form.reset();
        onClose?.();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input autoComplete="off" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button disabled={isPending} type="submit">
            Save
          </Button>
          <Button
            disabled={isPending}
            type="button"
            variant={'secondary'}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export function CreateTransactionModal({
  type,
  trigger,
}: {
  type: 'income' | 'expense';
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Create New{' '}
            <span
              className={
                type === 'income' ? 'text-emerald-500' : 'text-red-500'
              }
            >
              {type}
            </span>{' '}
            Transaction
          </DialogTitle>
          <DialogDescription>
            you can create a new transaction here.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm type={type} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
