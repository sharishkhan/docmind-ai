import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn("glass-panel rounded-2xl", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold tracking-normal text-text", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm leading-6 text-muted", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("pt-4", className)} {...props} />;
}
