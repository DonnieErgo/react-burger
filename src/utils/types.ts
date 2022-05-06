import { Location } from 'history'

export type TIngredient = {
  readonly id?: string;
  readonly _id: string;
  readonly name: string
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  index: number;
  count: number;
};

export type TOrder = {
  readonly order: {
    readonly ingredients: Object[];
    readonly number: number;
  };
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
  readonly ingredients: Object[];
  readonly _id: string;
};

export type TLocation = {
  background?: Location<TLocation>;
  from?: {pathname: string};
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TResetPasswordData = {
  token: string;
  password: string;
};

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
};