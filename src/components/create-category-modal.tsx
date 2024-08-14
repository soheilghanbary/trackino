import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { CategoryPicker } from './category-picker';
import { DialogHeader } from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

type Props = {
  type: 'income' | 'expense';
};

const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  icon: z.string().min(1, { message: 'Category label is required' }),
  type: z.enum(['income', 'expense']),
});

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

const CategoryForm = ({ type, onClose }: Props & { onClose: () => void }) => {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      icon: '',
      type,
    },
  });

  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateCategorySchema) => {
      const res = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess(res) {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success(res.msg);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
    onClose();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <CategoryPicker icon={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export function CreateCategoryModal({ type }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <PlusSquare className="mr-2 size-4" />
          Create Category
        </Button>
      </DialogTrigger>
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
            Category
          </DialogTitle>
          <DialogDescription>
            you can create a new category here.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm type={type} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
