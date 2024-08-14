import { CreateTransactionModal } from "@/components/create-transaction-modal";
import { DeleteTransactionModal } from "@/components/delete-transaction-modal";
import { Spinner } from "@/components/icons/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransaction";
import { CardStackIcon } from "@radix-ui/react-icons";
import { TrendingDown, TrendingUp } from "lucide-react";
import CountUp from "react-countup";

const Loading = () => (
  <div className="mx-auto flex min-h-60 w-full items-center justify-center">
    <Spinner className="fill-primary" />
  </div>
);

export default function Dashboard() {
  const { data, isPending } = useTransactions();
  if (isPending || !data) return <Loading />;

  const income = data
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = data
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <section className="container mx-auto flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="whitespace-nowrap font-bold text-2xl">
          Welcome Soheil👋
        </h1>
        <div className="flex items-center gap-2">
          <CreateTransactionModal
            trigger={
              <Button
                variant={"outline"}
                className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
              >
                New Income 🤑
              </Button>
            }
            type="income"
          />
          <CreateTransactionModal
            trigger={
              <Button
                variant={"outline"}
                className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
              >
                New Expense 😤
              </Button>
            }
            type="expense"
          />
        </div>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-md border bg-card p-4 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-md bg-emerald-400/10">
            <TrendingUp className="size-9 text-emerald-500" />
          </div>
          <div>
            <p className="text-start font-medium text-muted-foreground">
              Income
            </p>
            <CountUp
              preserveValue
              redraw={false}
              end={income}
              decimals={2}
              prefix="$"
              className="text-2xl"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-md border bg-card p-4 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-md bg-red-400/10">
            <TrendingDown className="size-9 text-red-500" />
          </div>
          <div>
            <p className="text-start font-medium text-muted-foreground">
              Income
            </p>
            <CountUp
              preserveValue
              redraw={false}
              end={expenses}
              decimals={2}
              prefix="$"
              className="text-2xl"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-md border bg-card p-4 shadow-sm md:col-span-2 lg:col-span-1">
          <div className="flex size-12 items-center justify-center rounded-md bg-violet-400/10">
            <CardStackIcon className="size-9 text-violet-500" />
          </div>
          <div>
            <p className="text-start font-medium text-muted-foreground">
              Income
            </p>
            <CountUp
              preserveValue
              redraw={false}
              end={balance}
              decimals={2}
              prefix="$"
              className="text-2xl"
            />
          </div>
        </div>
      </div>
      <Table className="bg-card">
        <TableCaption>A list of your transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction, i) => (
            <TableRow key={transaction.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell className="whitespace-nowrap">
                {transaction.description}
              </TableCell>
              <TableCell>
                {transaction.type === "income" ? (
                  <Badge className="bg-emerald-300/10 text-emerald-500 hover:bg-emerald-400/20">
                    Income
                  </Badge>
                ) : (
                  <Badge className="bg-red-300/10 text-red-500 hover:bg-red-400/20">
                    Expense
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DeleteTransactionModal id={transaction.id} />
                {/* <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit size={16} className="text-emerald-500" />
                  </Button>
                </div> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
