import { useReducer } from "react";
import { IRecipe as Recipe } from "@/types/Recipe.types";
import { Schema } from "@/amplify/data/resource";

interface Action {
  type: string;
  payload?: any;
}

const initialState: Recipe = {
  id: "",
  title: "",
  picture: "",
  ingredients: [],
  description: "",
  instructions: [],
  owner: "",
  state: "draft",
};

const stateMap = (data:Schema["Recipe"]["type"]):Recipe => {
    return {
        id: data.id,
        title: data.title,
        picture: data.picture ?? "",
        ingredients: data.ingredients ?? [],
        description: data.description,
        instructions: data.instructions ?? [],
        owner: data.owner ?? "",
        state: data.state ?? "draft",
    }
}

const updateRecipe = (state: Recipe, payload: any): Recipe => {
  return { ...state, ...payload };
};

const actions = (state: Recipe, action: Action) => {
  switch (action.type) {
    case "updateRecipe":
      return updateRecipe(state, action.payload);
    default:
      return state;
  }
};

export default function FormReducer(data: Schema["Recipe"]["type"]) {
  const [state, dispatch] = useReducer(actions, stateMap(data));

  const updateId = (id: string) => {
    dispatch({ type: "updateRecipe", payload: { id } });
  };

  const updatePicture = (picture: string) => {
    dispatch({ type: "updateRecipe", payload: { picture } });
  };

  const updateName = (title: string) => {
    dispatch({ type: "updateRecipe", payload: { title } });
  };

  const updateDescription = (description: string) => {
    dispatch({ type: "updateRecipe", payload: { description } });
  };

  const updateIngredients = (ingredients: string) => {
    dispatch({
      type: "updateRecipe",
      payload: {
        ingredients: Array.from(new Set([...state.ingredients, ingredients])),
      },
    });
  };

  const deleteIngredient = (index: number) => {
    dispatch({
      type: "updateRecipe",
      payload: { ingredients: state.ingredients.filter((_, i) => i !== index) },
    });
  };

  const updateSteps = (step: string) => {
    dispatch({
      type: "updateRecipe",
      payload: {
        instructions: Array.from(new Set([...state.instructions, step])),
      },
    });
  };

  const deleteStep = (index: number) => {
    dispatch({
      type: "updateRecipe",
      payload: {
        instructions: state.instructions.filter((_, i) => i !== index),
      },
    });
  };

  return {
    state,
    updateName,
    updatePicture,
    updateDescription,
    updateIngredients,
    deleteIngredient,
    updateSteps,
    deleteStep,
    updateId,
  };
}
