import { KeysType } from "./src/types/keys";

const Keys: KeysType = {
  clientId: "00000000-0000-0000-0000-000000000000",

  tenantId: "00000000-0000-0000-0000-000000000000",

  clientSecret: "secret",

  redirectUri: "http://localhost:5173/auth/success",

  binusTokenUrl: "http://localhost:43585/auth/token_binus",

  subDomain: new Map<string, string>([
    ["default", "http://localhost:43585"],
    ["secondary-api", "https://api-v1-dev.example.com"],
    ["backup-api", "https://api-v2-dev.example.com"],
  ]),

  environtment: "DEV",

  divisionId: "00000000-0000-0000-0000-000000000000",

  reduxSecretKey: "s-e-c-r-e-t",

  logoutRedirectUri: "http://localhost:5173/",
};

export default Keys;
