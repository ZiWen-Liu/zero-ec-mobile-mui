import Consts from "@/constants/const-old";
import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";

export function updateSessionTokenMaxAge() {
  const sessionToken = getCookie(Consts.WEEE_SESSION_TOKEN);
  if (!!sessionToken) {
    setCookie(Consts.WEEE_SESSION_TOKEN, sessionToken, null, {
      maxAge: Consts.WEEE_SESSION_TOKEN_MAX_AGE,
    });
  }
}
