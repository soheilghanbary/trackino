import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAddTransaction } from '@/hooks/useTransaction';
import {
  type CreateTransactionSchema,
  createTransactionSchema,
} from '@/schemas/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

type SelectCategoryProps = Pick<TransactionFormProps, 'type'> & {
  onChange: (categoryId: string) => void;
};

const SelectCategory = ({ type, onChange }: SelectCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, selectOption] = useState<{
    id: string;
    name: string;
    icon: string;
  }>({
    id: '',
    name: '',
    icon: '',
  });
  const { data, isLoading } = useQuery<Category[]>({
    queryKey: ['categories', type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedOption.id
            ? `${selectedOption.icon} ${selectedOption.name}`
            : 'Select Category'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter categories..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {isLoading
                ? null
                : data?.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={c.name}
                      onSelect={() => {
                        onChange(c.id);
                        selectOption(c);
                        setOpen(false);
                      }}
                    >
                      {c.icon} {c.name}
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

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
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <SelectCategory type={type} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 items-center gap-4">
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
