import { defineFunction } from "@aws-amplify/backend";

export const validateUsername = defineFunction({
  name: "validateUsername",
  timeoutSeconds: 15,
});
