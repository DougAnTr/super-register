import VerificationCodesController from "../app/verification-codes/verification-codes.controller";
import RouteConfig from "../interfaces/route-config.interface";

export const verificationCodesRoutes: RouteConfig = {
  controller: VerificationCodesController,
  routes: [
    {
      endpoint: "/verify-account/:userId",
      execFunction: "update",
      method: "put",
    },
    {
      endpoint: "/send-code",
      execFunction: "store",
      method: "post",
    },
  ],
};
