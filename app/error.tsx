"use client";
import { ErrorView } from "@/views";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return <ErrorView error={error} />;
}
