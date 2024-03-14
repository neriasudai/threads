import * as React from "react";

import { cn } from "~/utils/misc";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string | string[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, type, ...props }, ref) => {
    const hasErrors = !!errors;
    const errorMessages = Array.isArray(errors) ? errors : [errors];
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid",
            className
          )}
          ref={ref}
          {...props}
        />
        {hasErrors && (
          <div
            className="p-4 mt-2 mb-2 text-md rounded-lg bg-gray-300 text-red-400"
            role="alert"
          >
            {errorMessages.filter(Boolean).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
