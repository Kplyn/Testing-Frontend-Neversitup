import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./todoAction";

const initialState = { todos: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { todos: [state.todos, action.payload] };
    case UPDATE_TODO:
      return {
        todos: state.todos.map((todo) => (todo.id == action.payload.id ? action.payload : todo)),
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
