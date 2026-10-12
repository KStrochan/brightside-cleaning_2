"use client";

import { useActionState, useId, type CSSProperties } from "react";
import { useFormStatus } from "react-dom";
import { HONEYPOT_FIELD, type FormState, type Lead } from "@/lib/lead";

type LeadFormProps = {
  action: (prev: FormState, data: FormData) => Promise<FormState>;
  /** Prefills the message, e.g. with an estimate the visitor just calculated. */
  defaultMessage?: string;
  submitLabel?: string;
};

const initialState: FormState = { status: "idle" };

const SPARKS = [
  { x: "-26px", y: "-22px" },
  { x: "28px", y: "-18px" },
  { x: "-20px", y: "24px" },
  { x: "26px", y: "22px" },
];

/** A tick that draws itself with a small burst of sparks, shown once the form has gone through. */
function DoneMark() {
  return (
    <span aria-hidden="true" className="relative mr-3 inline-grid h-10 w-10 shrink-0 place-items-center align-middle">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="done-spark absolute h-2 w-2 rounded-full bg-sponge"
          style={{ "--x": s.x, "--y": s.y } as CSSProperties}
        />
      ))}
      <svg viewBox="0 0 52 52" className="done-mark h-10 w-10">
        <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const honeypotStyle = {
  position: "absolute",
  left: "-10000px",
  width: "1px",
  height: "1px",
  overflow: "hidden",
} as const;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="lead-form__submit" disabled={pending}>
      {pending ? "Sending…" : label}
    </button>
  );
}

type FieldProps = {
  name: keyof Lead;
  label: string;
  error?: string;
  defaultValue?: string;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
};

function Field({ name, label, error, defaultValue, multiline, type = "text", autoComplete }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    defaultValue,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "lead-form__control",
  };

  return (
    <div className="lead-form__field">
      <label htmlFor={id} className="lead-form__label">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} {...shared} />
      ) : (
        <input type={type} autoComplete={autoComplete} {...shared} />
      )}
      {error ? (
        <p id={errorId} role="alert" className="lead-form__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({ action, defaultMessage, submitLabel = "Send message" }: LeadFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.errors ?? {};
  const values = state.values;

  return (
    <form action={formAction} noValidate className="lead-form">
      <Field name="name" label="Name" autoComplete="name" error={errors.name} defaultValue={values?.name} />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email}
        defaultValue={values?.email}
      />
      <Field
        name="message"
        label="Message"
        multiline
        error={errors.message}
        defaultValue={values?.message ?? defaultMessage}
      />

      <div aria-hidden="true" style={honeypotStyle}>
        <label htmlFor="lead-website">Leave this field empty</label>
        <input id="lead-website" type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton label={submitLabel} />

      <p role="status" aria-live="polite" className="lead-form__status">
        {state.status === "sent" || state.status === "demo" ? <DoneMark /> : null}
        {state.status === "sent" ? "Thank you. Your message is on its way and we'll reply soon." : null}
        {state.status === "demo"
          ? "This is a demo site, so your message was not delivered anywhere. Nothing was stored."
          : null}
      </p>

      {state.status === "error" ? (
        <p role="alert" className="lead-form__error">
          Something went wrong and your message didn&apos;t go through. Please try again in a minute.
        </p>
      ) : null}
    </form>
  );
}
