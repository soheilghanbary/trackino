import { CreateCategoryModal } from "@/components/create-category-modal";
import { Spinner } from "@/components/icons/spinner";
import { SelectCurrency } from "@/components/select-currency";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Category } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const Loading = () => (
  <div className="mx-auto flex min-h-40 w-full items-center justify-center">
    <Spinner className="fill-primary" />
  </div>
);

export default function Settings() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/auth/user").then((res) => res.json()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      toast.loading("Updating...", {
        id: "update-currency",
      });
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ name: nameRef.current?.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("User Name updated Successfully!!! 🎉", {
        id: "update-currency",
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "update-currency",
      });
    },
  });

  if (isLoading || !data) return <Loading />;

  return (
    <div className="container grid gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>you can update account details</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <TextField label="Full Name" ref={nameRef} defaultValue={data.name} />
          <div className={"grid gap-2 [&>label]:text-sm"}>
            <Label>Currency</Label>
            <SelectCurrency />
          </div>
        </CardContent>
        <CardFooter className="border-separate border-t bg-muted/20 p-4">
          <Button disabled={isPending} onClick={() => mutate()}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      <CategoryList type="income" />
      <CategoryList type="expense" />
    </div>
  );
}

const CategoryList = ({ type }: { type: "income" | "expense" }) => {
  const { data, isLoading } = useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {type === "income" ? (
            <span className="text-teal-500">Income</span>
          ) : (
            <span className="text-rose-500">Expense</span>
          )}{" "}
          Categories
          <CardDescription className="mt-1 font-normal">
            you can manage {type} categories
          </CardDescription>
        </CardTitle>
        <CreateCategoryModal type={type} />
      </CardHeader>
      <CardContent className="grid grid-cols-5 items-center gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          data?.map((category) => (
            <div
              key={category.id}
              className="flex-col items-center justify-center rounded-md border p-2 text-center shadow-sm"
            >
              <div className="mb-4">
                <p className="text-4xl/snug">{category.icon}</p>
                <p className="font-medium">{category.name}</p>
              </div>
              <Button
                disabled={isPending}
                onClick={() => mutate(category.id)}
                variant={"secondary"}
                className="w-full"
              >
                <TrashIcon className="mr-2 size-4 text-rose-500" />
                Remove
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
