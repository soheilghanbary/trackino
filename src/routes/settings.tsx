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
import type { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

const Loading = () => (
  <div className="mx-auto flex min-h-60 w-full items-center justify-center">
    <Spinner className="fill-primary" />
  </div>
);

export function Settings() {
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
    onSuccess: (data: User) => {
      toast.success("User Name updated Successfully!!! 🎉", {
        id: "update-currency",
      });
    },
    onError: (e) => {
      toast.error("Something went wrong", {
        id: "update-currency",
      });
    },
  });

  if (isLoading || !data) return <Loading />;

  return (
    <div className="container max-w-md p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>you can update account details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
    </div>
  );
}
