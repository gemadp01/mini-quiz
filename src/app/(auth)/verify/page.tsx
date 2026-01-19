import Activation from "@/app/(auth)/verify/_components/activation";
import authServices from "@/services/auth-service";
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

type PageProps = {
  searchParams: {
    token?: string;
  };
};

export default async function ActivationPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  try {
    if (!token) {
      throw new Error("Token not found");
    }

    const result = await authServices.activation(token);

    console.log(result);
    return;

    // return <Activation status={result.status} message={result.statusText} />;
  } catch (error) {
    const err = error as Error;
    console.log(err);

    return <Activation status={false} message={err.message} />;
    // status = err.message;
  }
}
