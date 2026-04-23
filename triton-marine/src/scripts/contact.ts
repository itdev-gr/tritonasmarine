const PLACEHOLDER_KEY = "your_key_here";
const ENDPOINT = "https://api.web3forms.com/submit";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setError(form: HTMLFormElement, message: string) {
  const el = form.querySelector<HTMLElement>("[data-contact-error]");
  if (el) el.textContent = message;
}

function clearError(form: HTMLFormElement) {
  const el = form.querySelector<HTMLElement>("[data-contact-error]");
  if (el) el.textContent = "";
}

function setSubmitting(form: HTMLFormElement, submitting: boolean) {
  const btn = form.querySelector<HTMLButtonElement>("[data-contact-submit]");
  const spinner = form.querySelector<HTMLElement>("[data-contact-spinner]");
  const label = form.querySelector<HTMLElement>("[data-contact-submit-label]");
  if (!btn || !spinner || !label) return;
  btn.disabled = submitting;
  spinner.classList.toggle("hidden", !submitting);
  const locale = form.dataset.locale;
  if (submitting) {
    label.textContent = locale === "gr" ? "Αποστολή…" : "Sending…";
  } else {
    label.textContent = locale === "gr" ? "Αποστολή" : "Send message";
  }
}

function showSuccess(form: HTMLFormElement) {
  const success =
    form.parentElement?.querySelector<HTMLElement>("[data-contact-success]") ??
    form.querySelector<HTMLElement>("[data-contact-success]");
  const message = form.dataset.msgSuccess ?? "Thanks!";
  if (!success) return;
  success.textContent = message;
  success.classList.remove("hidden");
  form.style.display = "none";
}

async function submit(form: HTMLFormElement) {
  clearError(form);

  const formData = new FormData(form);
  const botcheck = formData.get("botcheck");
  if (botcheck) return;

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    setError(form, form.dataset.msgRequired ?? "Required.");
    return;
  }
  if (!isEmail(email)) {
    setError(form, form.dataset.msgEmail ?? "Invalid email.");
    return;
  }

  const key = import.meta.env.PUBLIC_WEB3FORMS_KEY;
  if (!key || key === PLACEHOLDER_KEY) {
    setError(form, form.dataset.msgNotConfigured ?? "Contact form not configured.");
    return;
  }

  setSubmitting(form, true);

  const payload: Record<string, string> = {
    access_key: key,
    name,
    email,
    subject,
    message,
  };
  const phone = String(formData.get("phone") ?? "").trim();
  if (phone) payload.phone = phone;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      showSuccess(form);
    } else {
      setError(form, form.dataset.msgError ?? "Error.");
      setSubmitting(form, false);
    }
  } catch {
    setError(form, form.dataset.msgError ?? "Error.");
    setSubmitting(form, false);
  }
}

export function initContactForms() {
  const forms = document.querySelectorAll<HTMLFormElement>("[data-contact-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void submit(form);
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForms);
  } else {
    initContactForms();
  }
}
