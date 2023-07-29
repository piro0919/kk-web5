"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import Reaptcha from "reaptcha";
import { useBoolean } from "usehooks-ts";
import Contact, { ContactProps } from "@/components/Contact";

export default function Client(): JSX.Element {
  const ref = useRef<Reaptcha>(null);
  const [values, setValues] =
    useState<Parameters<ContactProps["onSubmit"]>[0]>();
  const {
    setFalse: offIsSubmitting,
    setTrue: onIsSubmitting,
    value: isSubmitting,
  } = useBoolean(false);
  const handleSubmit = useCallback<ContactProps["onSubmit"]>(async (values) => {
    if (!ref.current) {
      return;
    }

    setValues(values);

    await ref.current.execute();
  }, []);
  const handleVerify = useCallback<ContactProps["onVerify"]>(
    async (recaptchaResponse) => {
      onIsSubmitting();

      try {
        if (!values) {
          return;
        }

        setCookie("token", recaptchaResponse);

        const content = axios.post("/email", values);

        await toast.promise(content, {
          error: "送信に失敗しました",
          pending: "送信しています…",
          success: "メッセージを送信しました",
        });
      } finally {
        offIsSubmitting();
      }
    },
    [offIsSubmitting, onIsSubmitting, values],
  );

  return (
    <Contact
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onVerify={handleVerify}
      ref={ref}
    />
  );
}
