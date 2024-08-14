import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { CircleOff } from 'lucide-react';
import { useTheme } from './providers/theme-provider';
import { Button } from './ui/button';

type Props = {
  icon: string;
  onChange: (icon: string) => void;
};

export function CategoryPicker({ icon, onChange }: Props) {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex h-28 w-full flex-col items-center justify-center gap-2"
          variant={'outline'}
        >
          {icon ? (
            <span className="text-4xl">{icon}</span>
          ) : (
            <CircleOff className="size-8" />
          )}
          {icon ? 'Change Icon' : 'Select Icon'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full" align="center">
        <Picker
          data={data}
          theme={theme}
          onEmojiSelect={(emoji: { native: string }) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}
