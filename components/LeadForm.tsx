"use client";

import { useRef, useState } from "react";
import {
  leadSchema,
  PROJECT_TYPES,
  TIMELINES,
  CONTACT_METHODS,
  type LeadInput,
} from "@/lib/lead-schema";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 text-body outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink";
const labelCls = "mb-2 block text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summary = useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setErrors({});

    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;

    const candidate: LeadInput = {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      projectType: data.projectType as LeadInput["projectType"],
      timeline: data.timeline as LeadInput["timeline"],
      contactMethod: data.contactMethod as LeadInput["contactMethod"],
      message: data.message ?? "",
      consent: (data.consent === "on") as true,
      website: data.website ?? "",
    };

    // Same schema the route uses, so the client cannot show a different verdict.
    const parsed = leadSchema.safeParse(candidate);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setFormError("Certains champs sont à corriger.");
      summary.current?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string; fieldErrors?: Record<string, string> }
        | null;

      // Only a genuine 2xx counts as sent.
      if (!response.ok || !result?.ok) {
        if (result?.fieldErrors) setErrors(result.fieldErrors);
        setFormError(
          result?.error ??
            `Votre demande n’a pas pu être transmise. Téléphonez au ${SITE.phone}.`,
        );
        setStatus("error");
        summary.current?.focus();
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        `Votre demande n’a pas pu être transmise. Vérifiez votre connexion, ou téléphonez au ${SITE.phone}.`,
      );
      setStatus("error");
      summary.current?.focus();
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-ink/15 bg-paper-warm p-10 md:p-14"
      >
        <h2 className="text-h2">Votre demande est reçue</h2>
        <p className="mt-5 max-w-lg text-lede text-ink-soft">
          Je vous reviens en un jour ouvrable, par le moyen que vous avez choisi. Si c’est urgent,
          téléphonez-moi directement au{" "}
          <a href={`tel:${SITE.phoneHref}`} className="border-b border-ink/30 hover:border-ink">
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div
        ref={summary}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={
          formError
            ? "rounded-2xl border border-coral bg-coral/10 px-5 py-4 text-[0.95rem]"
            : "sr-only"
        }
      >
        {formError}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="Prénom" error={errors.firstName}>
          <input id="firstName" name="firstName" autoComplete="given-name" className={field} required />
        </Field>
        <Field id="lastName" label="Nom" error={errors.lastName}>
          <input id="lastName" name="lastName" autoComplete="family-name" className={field} required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Courriel" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={field} required />
        </Field>
        <Field id="phone" label="Téléphone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="819 272-8422"
            className={field}
            required
          />
        </Field>
      </div>

      <Field id="projectType" label="Votre projet" error={errors.projectType}>
        <select id="projectType" name="projectType" className={field} required defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {Object.entries(PROJECT_TYPES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="timeline" label="Votre échéance" error={errors.timeline}>
        <select id="timeline" name="timeline" className={field} required defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {Object.entries(TIMELINES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className={labelCls}>Comment vous joindre</legend>
        <div className="flex flex-wrap gap-3">
          {Object.entries(CONTACT_METHODS).map(([value, label], i) => (
            <label
              key={value}
              className="cursor-pointer rounded-full border border-ink/15 px-5 py-2.5 text-[0.95rem] transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper"
            >
              <input
                type="radio"
                name="contactMethod"
                value={value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
        {errors.contactMethod && <FieldError>{errors.contactMethod}</FieldError>}
      </fieldset>

      <Field id="message" label="Précisions (facultatif)" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} resize-y`}
          placeholder="Ce que vous voulez acheter, une date à respecter, une question précise…"
        />
      </Field>

      {/* Honeypot. Hidden from everyone, including screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-ink"
          />
          <span>
            J’accepte que {SITE.broker} me contacte au sujet de ma demande. Vos renseignements
            servent uniquement à répondre à cette demande et ne sont jamais vendus.
          </span>
        </label>
        {errors.consent && <FieldError>{errors.consent}</FieldError>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-3 rounded-full bg-citron px-8 py-4 font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      <p className="text-sm leading-relaxed text-ink-soft">
        Aucun taux ni aucune approbation ne sont garantis par ce formulaire. Il sert à organiser un
        premier appel.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[0.85rem] text-coral">{children}</p>;
}
