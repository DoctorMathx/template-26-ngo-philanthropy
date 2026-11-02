"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { cn, isEmail } from "@/lib/utils";

const TOPICS = ["Progress Report & data", "Grant opportunities", "Pooled fund updates", "Press releases"];

export function NewsletterForm({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>(["Progress Report & data"]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className={cn("flex items-start gap-2 text-[15px]", dark ? "text-white" : "text-navy")}>
        <Check className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" /> Subscribed. Check {email} to confirm — we send one email a month, never more.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!isEmail(email)) return setError("Enter a valid email address.");
        if (!topics.length) return setError("Choose at least one topic.");
        setError("");
        setDone(true);
      }}
    >
      <label htmlFor={`${id}-email`} className={cn("label", dark && "!text-white")}>Email address</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          className="input flex-1"
          placeholder="you@organisation.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
        />
        <button type="submit" className={cn("btn", dark ? "btn-light" : "btn-navy")}>Subscribe</button>
      </div>
      {error && <p id={`${id}-err`} className={cn("field-error", dark && "!text-[#FFB4A8]")}>{error}</p>}
      {!compact && (
        <fieldset className="mt-4">
          <legend className={cn("text-[13px] font-semibold mb-2", dark ? "text-on-dark-muted" : "text-ink-2")}>Topics</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {TOPICS.map((t) => (
              <label key={t} className={cn("flex items-center gap-2 text-[13.5px] min-h-[40px] cursor-pointer", dark ? "text-on-dark" : "text-ink-2")}>
                <input type="checkbox" className="w-4 h-4 accent-[color:var(--cobalt)]" checked={topics.includes(t)} onChange={(e) => setTopics(e.target.checked ? [...topics, t] : topics.filter((x) => x !== t))} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </form>
  );
}
