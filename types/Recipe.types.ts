import { NullableString } from "aws-sdk/clients/glue";

export interface IRecipe {
  id: string;
  title: string;
  picture?: NullableString;
  ingredients: string[];
  description: string;
  instructions: string[];
  state: "draft" | "published" | "private" | null;
  owner: string;
}
