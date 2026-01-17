import Activation from "@/app/(auth)/activation/_components/activation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activation | Mini Quiz",
};

interface PropTypes {
  status: "true" | "false";
}

const props: PropTypes = {
  status: "false",
};

export default function ActivationPage() {
  return <Activation {...props} />;
}
