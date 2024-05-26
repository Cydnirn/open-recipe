import { defineAuth } from "@aws-amplify/backend";
import { validateUsername } from "../functions/valid-username/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    },
    profilePicture: {
      mutable: true,
      required: false,
    },
  },
  triggers: {
    preSignUp: validateUsername,
  },
});
