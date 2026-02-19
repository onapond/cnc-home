"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const baseStyles =
  "w-full p-3 border border-gray-300 rounded-lg text-base bg-white transition-all duration-250 ease-in-out focus:outline-none focus:ring-2 focus:ring-light-roast focus:border-light-roast";

const errorStyles = "border-red-400 focus:ring-red-400 focus:border-red-400";
const labelStyles = "block mb-2 font-semibold text-dark-roast";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({ label, error, id, className = "", ...props }: InputFieldProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseStyles} ${error ? errorStyles : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextAreaField({ label, error, id, className = "", ...props }: TextAreaFieldProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${baseStyles} min-h-[120px] resize-y ${error ? errorStyles : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, error, id, options, className = "", ...props }: SelectFieldProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${baseStyles} ${error ? errorStyles : ""} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
