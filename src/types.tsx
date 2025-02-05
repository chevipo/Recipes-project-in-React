import { User } from "./User";

export type Puser = Partial<User>
export type ActionReducer = {
  type: "LOGIN" | "SIGN_UP" | "UPDATE";
  data: User; 
}
export type ContextType = [Puser, React.Dispatch<ActionReducer>];
export class Recipe{
   id:number =0
   title:string=""
   description:string=""
   authorId: number=0
   ingredients: string[]=[""];
   instructions: string="";
  constructor() {
  }
}
