import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-12 w-full rounded-xl border border-input bg-background/60 px-4 text-sm transition-all duration-200 placeholder:text-muted-foreground/70",
          "focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--signal)_14%,transparent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid &&
            "border-destructive/60 focus-visible:border-destructive focus-visible:ring-[color-mix(in_oklab,var(--destructive)_16%,transparent)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground/70",
        "focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--signal)_14%,transparent)]",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        invalid &&
          "border-destructive/60 focus-visible:border-destructive focus-visible:ring-[color-mix(in_oklab,var(--destructive)_16%,transparent)]",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Input, Textarea, Label };
