import { env } from "@/env";
import { RenewTokenResponseInterface } from "@/interfaces/RenewTokenResponseInterface";
import axios from "axios";

interface Props {
  renewtoken: string;
}

const getRenewToken = async (props: Props) => {
  return axios<RenewTokenResponseInterface>({
    method: "post",
    url: env.MYKU_BASE_API + "/auth/renew",
    headers: {
      "app-key": env.MYKU_APP_KEY,
      "x-access-token": props.renewtoken,
    },
    data: {
      renewtoken: props.renewtoken,
    },
  });
};

export default getRenewToken;