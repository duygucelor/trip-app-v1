import { CognitoUser } from "@aws-amplify/auth";

type MyCognitoAttributes = { family_name: string; given_name: string };
type MySession = { idToken: { jwtToken: string } };
export type MyCognitoUser = CognitoUser & {
  attributes: MyCognitoAttributes;
} & { signInUserSession: MySession } & { username: string };
