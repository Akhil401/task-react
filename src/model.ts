export interface Todo {
  _id: number;
  todo: string;
  completed: boolean;
}

export interface AuthFormData {
   email: string;
   password: string;
}
 
export interface Message {
   text: string;
   type: "success" | "error";
}
 
