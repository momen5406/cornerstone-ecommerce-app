import { UserResponse } from "@/interfaces/login";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
    token: string;
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserResponse;
    token: string;
  }
}
