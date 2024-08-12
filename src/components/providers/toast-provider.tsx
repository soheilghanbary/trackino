import { Toaster, type ToasterProps } from 'sonner';
import { useTheme } from './theme-provider';

export const ToastProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      richColors
      theme={theme as ToasterProps['theme']}
      position="bottom-right"
      duration={1500}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
};
