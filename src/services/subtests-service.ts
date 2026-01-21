import { instance } from "@/libs/axios/instance";

const subtestsServices = {
  getSubtests: (token: string) =>
    instance.get("/subtests", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default subtestsServices;
