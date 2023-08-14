import bridge from "@vkontakte/vk-bridge";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

interface generateHashInterface {
  hash: string;
  hmac: string;
  ts: number;
}

export default function generateHash(payload = "") {
  return new Promise<generateHashInterface>((resolve) => {
    bridge
      .send("VKWebAppCreateHash", {
        payload,
      })
      .then((data) => {
        console.info(`[generateHash()] ${JSON.stringify(data)}`);

        const hmac = Base64.stringify(
          hmacSHA512(
            `${
              window.location.href
                .slice(window.location.href.indexOf("?") + 1)
                .split("#")[0]
            }-${data.ts}`,
            new URLSearchParams(window.location.search).get(
              "vk_user_id"
            ) as string
          )
        );

        resolve({
          // @ts-ignore
          hash: data.sign,
          hmac,
          ts: data.ts,
        });
      });
  });
}
