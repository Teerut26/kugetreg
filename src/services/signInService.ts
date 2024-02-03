import { env } from "@/env";
import { SignInServiceResponseInterface } from "@/interfaces/SignInServiceResponseInterface";
import { RSADecrypt } from "@/utils/RSA";
import axios from "axios";
import crypto from "crypto";

const encodeString = (str: string) => {
  return crypto
    .publicEncrypt(
      {
        key: env.MYKU_PUBLIC_KEY.replace(/\\n/gm, "\n"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(str, "utf8"),
    )
    .toString("base64");
};

const SignInService = (args: { username: string; password: string }) => {
  args.password = RSADecrypt(
    Buffer.from(args.password, "base64").toString("utf-8"),
  );
  return axios.post<SignInServiceResponseInterface>(
    env.MYKU_BASE_API + "/auth/login",
    {
      username: encodeString(args.username),
      password: encodeString(args.password),
    },
    {
      headers: {
        "app-key": env.MYKU_APP_KEY,
      },
    },
  );
};

export default SignInService;
