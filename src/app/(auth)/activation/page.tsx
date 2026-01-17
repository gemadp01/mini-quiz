import Activation from "@/app/(auth)/activation/_components/activation";

interface PropTypes {
  status: "true" | "false";
}

const props: PropTypes = {
  status: "false",
};

export default function ActivationPage() {
  return <Activation {...props} />;
}
