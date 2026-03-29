"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { Toast } from "@/components/ui/toast";

export function ContactForm() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          title: `${data.name}님의 문의`,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setToast({ message: "메시지가 전송되었습니다!", type: "success" });
      reset();
    } catch {
      setToast({
        message: "메시지 전송에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    }
  };

  const onError = () => {
    const firstErrorField = (["name", "email", "message"] as const).find(
      (field) => errors[field],
    );
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  };

  const handleCloseToast = useCallback(() => setToast(null), []);

  const inputClassName =
    "w-full px-4 py-3 border border-border rounded-lg text-base transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none bg-transparent";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="mx-auto max-w-lg space-y-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="홍길동"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClassName}
            {...register("name")}
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              aria-live="polite"
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClassName}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              aria-live="polite"
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            메시지
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="메시지를 입력해주세요"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClassName} resize-none`}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              aria-live="polite"
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          메시지 보내기
        </button>
      </form>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </AnimatePresence>
    </>
  );
}
