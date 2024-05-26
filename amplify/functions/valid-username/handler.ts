import { Handler } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { ListUsersRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

const cognito = new CognitoIdentityServiceProvider();

export const handler: Handler = async (event) => {
  const { userPoolId, request } = event;
  const username = request.userAttributes.preferred_username;

  try {
    const params: ListUsersRequest = {
      UserPoolId: userPoolId,
      Filter: `preferred_username = "${username}"`,
    };
    const res = await cognito.listUsers(params).promise();
    if (res.Users && res.Users.length > 0) {
      throw new Error("User already exists");
    }
    return event;
  } catch (err) {
    throw err;
  }
};
