import { defineBackend } from "@aws-amplify/backend";
import * as iam from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { validateUsername } from "./functions/valid-username/resource";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  validateUsername,
});

const validateUsernameLambda = backend.validateUsername.resources.lambda

const cognitoStatement = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ["cognito-idp:*"],
  resources: ["*"],
});

validateUsernameLambda.addToRolePolicy(cognitoStatement);