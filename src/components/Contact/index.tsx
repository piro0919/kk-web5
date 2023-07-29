"use client";
import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, Flex, Heading, Input, Text, VStack } from "@kuma-ui/core";
import { ForwardedRef, forwardRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Reaptcha, { Props } from "reaptcha";
import styles from "./style.module.scss";

type FieldValues = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type ContactProps = Pick<Props, "onVerify"> & {
  onSubmit: SubmitHandler<FieldValues>;
};

function Contact(
  { onSubmit, onVerify }: ContactProps,
  ref: ForwardedRef<Reaptcha>,
): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
    },
  });

  return (
    <>
      <Box height="0px" overflow="hidden" style={{ opacity: 0 }} width="0px">
        <Heading as="h2">CONTACT</Heading>
      </Box>
      <Flex
        alignItems="center"
        height="100%"
        justify="center"
        pb={32}
        pt={12}
        px={12}
      >
        <form
          className={styles.form}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <Reaptcha
              onVerify={onVerify}
              ref={ref}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              theme="dark"
            />
          ) : null}
          <VStack gap={32}>
            <VStack gap={24}>
              <VStack gap={4}>
                <Box as="label" fontSize="1.0rem" htmlFor="name">
                  Name
                  <Box as="abbr" pl={4}>
                    *
                  </Box>
                </Box>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }): JSX.Element => (
                    <Input
                      {...field}
                      autoFocus={true}
                      bg="colors.lightWhite"
                      color="colors.black"
                      fontFamily="arial"
                      id="name"
                      px={6}
                      py={4}
                    />
                  )}
                  rules={{
                    required: "お名前を入力してください",
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }): JSX.Element => (
                    <Text
                      color="colors.brandRed"
                      fontFamily="arial"
                      fontSize="1.2rem"
                    >
                      {message}
                    </Text>
                  )}
                />
              </VStack>
              <VStack gap={4}>
                <Box as="label" fontSize="1.0rem" htmlFor="email">
                  Email
                  <Box as="abbr" pl={4}>
                    *
                  </Box>
                </Box>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }): JSX.Element => (
                    <Input
                      {...field}
                      bg="colors.lightWhite"
                      color="colors.black"
                      fontFamily="arial"
                      id="email"
                      px={6}
                      py={4}
                      type="email"
                    />
                  )}
                  rules={{
                    required: "メールアドレスを入力してください",
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }): JSX.Element => (
                    <Text
                      color="colors.brandRed"
                      fontFamily="arial"
                      fontSize="1.2rem"
                    >
                      {message}
                    </Text>
                  )}
                />
              </VStack>
              <VStack gap={4}>
                <Box as="label" fontSize="1.0rem" htmlFor="subject">
                  Subject
                  <Box as="abbr" pl={4}>
                    *
                  </Box>
                </Box>
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }): JSX.Element => (
                    <Input
                      {...field}
                      bg="colors.lightWhite"
                      color="colors.black"
                      fontFamily="arial"
                      id="subject"
                      px={6}
                      py={4}
                    />
                  )}
                  rules={{
                    required: "件名を入力してください",
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="subject"
                  render={({ message }): JSX.Element => (
                    <Text
                      color="colors.brandRed"
                      fontFamily="arial"
                      fontSize="1.2rem"
                    >
                      {message}
                    </Text>
                  )}
                />
              </VStack>
              <VStack gap={4}>
                <Box as="label" fontSize="1.0rem" htmlFor="message">
                  Message
                  <Box as="abbr" pl={4}>
                    *
                  </Box>
                </Box>
                <TextareaAutosize
                  {...register("message", {
                    required: "本文を入力してください",
                  })}
                  className={styles.textareaAutosize}
                  id="message"
                  minRows={6}
                />
                <ErrorMessage
                  errors={errors}
                  name="message"
                  render={({ message }): JSX.Element => (
                    <Text
                      color="colors.brandRed"
                      fontFamily="arial"
                      fontSize="1.2rem"
                    >
                      {message}
                    </Text>
                  )}
                />
              </VStack>
            </VStack>
            <Flex justify="center">
              <Button
                bg="colors.brandBlue"
                color="colors.lightWhite"
                fontFamily="arial"
                px={24}
                py={8}
              >
                送信する
              </Button>
            </Flex>
          </VStack>
        </form>
      </Flex>
    </>
  );
}

export default forwardRef<Reaptcha, ContactProps>(Contact);
