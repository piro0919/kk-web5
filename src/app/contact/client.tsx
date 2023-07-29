"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useCallback, useRef, useState } from "react";
import Reaptcha from "reaptcha";
import Contact, { ContactProps } from "@/components/Contact";

export default function Client(): JSX.Element {
  const ref = useRef<Reaptcha>(null);
  const [values, setValues] =
    useState<Parameters<ContactProps["onSubmit"]>[0]>();
  const handleSubmit = useCallback<ContactProps["onSubmit"]>(async (values) => {
    if (!ref.current) {
      return;
    }

    setValues(values);

    await ref.current.execute();
  }, []);
  const handleVerify = useCallback<ContactProps["onVerify"]>(
    async (recaptchaResponse) => {
      if (!values) {
        return;
      }

      setCookie("token", recaptchaResponse);

      await axios.post("/email", values);
    },
    [values],
  );

  return <Contact onSubmit={handleSubmit} onVerify={handleVerify} ref={ref} />;
}
