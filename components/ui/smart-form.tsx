"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn, isEmail, isPhone } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select" | "checkbox" | "date" | "url";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  half?: boolean;
  help?: string;
  defaultValue?: string;
};

type Values = Record<string, string>;

function validate(fields: FieldDef[], v: Values) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const val = (v[f.name] ?? "").trim();
    if (f.type === "checkbox") {
      if (f.required && val !== "true") errors[f.name] = "Please confirm to continue.";
      continue;
    }
    if (f.required && !val) {
      errors[f.name] = `${f.label.replace(/\s*\(.*\)$/, "")} is required.`;
      continue;
    }
    if (!val) continue;
    if (f.type === "email" && !isEmail(val)) errors[f.name] = "Enter a valid email address.";
    if (f.type === "tel" && !isPhone(val)) errors[f.name] = "Enter a valid phone number.";
    if (f.type === "url" && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(val)) errors[f.name] = "Enter a valid web address.";
    if (f.minLength && val.length < f.minLength) errors[f.name] = `Please write at least ${f.minLength} characters (${val.length} so far).`;
    if (f.maxLength && val.length > f.maxLength) errors[f.name] = `Please keep this under ${f.maxLength} characters.`;
    if (f.type === "number") {
      const clean = val.replace(/[,\s$₦]/g, "");
      if (!/^\d+$/.test(clean)) errors[f.name] = "Enter a whole number.";
      else {
        const n = parseInt(clean, 10);
        if (f.min !== undefined && n < f.min) errors[f.name] = `Minimum is ${f.min.toLocaleString("en-NG")}.`;
        if (f.max !== undefined && n > f.max) errors[f.name] = `Maximum is ${f.max.toLocaleString("en-NG")}.`;
      }
    }
  }
  return errors;
}

export function SmartForm({
  fields,
  submitLabel = "Submit",
  successTitle = "Thank you",
  successBody = "We’ve received your message and will be in touch within two working days.",
  className,
  summaryTemplate,
}: {
  fields: FieldDef[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  className?: string;
  /** Shown after success; "{field}" placeholders are replaced with submitted values (serialisable, unlike a callback). */
  summaryTemplate?: string;
}) {
  const uid = useId();
  const initial: Values = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]));
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [summary, setSummary] = useState("");

  const set = (name: string, val: string) => {
    const next = { ...values, [name]: val };
    setValues(next);
    if (touched) setErrors(validate(fields, next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = fields.find((f) => errs[f.name]);
      if (first) document.getElementById(`${uid}-${first.name}`)?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setSummary(summaryTemplate ? summaryTemplate.replace(/\{(\w+)\}/g, (_, k: string) => (values[k] ?? "").trim() || "—") : "");
      setStatus("done");
    }, 700);
  };

  if (status === "done") {
    return (
      <div className={cn("py-10 px-2", className)} role="status" aria-live="polite">
        <CheckCircle2 className="w-10 h-10 text-[color:var(--success)]" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-4 hd-3 text-navy">{successTitle}</h3>
        <p className="mt-2 text-ink-2 max-w-lg">{successBody}</p>
        {summary && <p className="mt-4 text-[14px] font-semibold text-navy bg-paper border-l-4 border-[color:var(--cobalt)] px-4 py-3">{summary}</p>}
        <button
          type="button"
          className="btn btn-outline btn-sm mt-6"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setTouched(false);
            setStatus("idle");
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={cn("grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5", className)}>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const errId = `${id}-err`;
        const helpId = `${id}-help`;
        const describedBy = [err ? errId : null, f.help ? helpId : null].filter(Boolean).join(" ") || undefined;
        const common = {
          id,
          name: f.name,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
          "aria-required": f.required || undefined,
        } as const;
        const len = (values[f.name] ?? "").length;
        return (
          <div key={f.name} className={cn(f.half ? "sm:col-span-1" : "sm:col-span-2")}>
            {f.type === "checkbox" ? (
              <label htmlFor={id} className="flex items-start gap-3 text-[14px] text-ink-2 cursor-pointer min-h-[44px]">
                <input {...common} type="checkbox" checked={values[f.name] === "true"} onChange={(e) => set(f.name, e.target.checked ? "true" : "")} className="mt-0.5 w-5 h-5 accent-[color:var(--cobalt)] shrink-0" />
                <span>{f.label}</span>
              </label>
            ) : (
              <>
                <label htmlFor={id} className="label">
                  {f.label} {f.required && <span className="text-[color:var(--danger)]" aria-hidden="true">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea {...common} className="input" placeholder={f.placeholder} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} />
                ) : f.type === "select" ? (
                  <select {...common} className="input" value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}>
                    <option value="">{f.placeholder ?? "Select…"}</option>
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...common}
                    type={f.type === "number" ? "text" : f.type ?? "text"}
                    inputMode={f.type === "number" ? "numeric" : undefined}
                    className="input"
                    placeholder={f.placeholder}
                    value={values[f.name]}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
                <div className="flex justify-between gap-3">
                  <div>
                    {err && <p id={errId} className="field-error">{err}</p>}
                    {f.help && !err && <p id={helpId} className="mt-1.5 text-[12.5px] text-muted">{f.help}</p>}
                  </div>
                  {f.type === "textarea" && f.maxLength && (
                    <p className={cn("mt-1.5 text-[12px] tabular shrink-0", len > f.maxLength ? "text-[color:var(--danger)]" : "text-muted")} aria-live="polite">{len}/{f.maxLength}</p>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        {touched && Object.keys(errors).length > 0 && (
          <p role="alert" className="text-[13.5px] text-[color:var(--danger)] font-medium">
            Please fix {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "field" : "fields"} above.
          </p>
        )}
      </div>
    </form>
  );
}
