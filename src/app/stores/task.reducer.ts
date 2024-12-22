import { Task } from '../models/task.model';
import { addTask, deleteTask, updateTask } from './task.actions';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
  tasks: Task[];
}

export const initialState: AppState = {
  //tasks: []
  tasks: [
    { id: 1, title: 'Task 1', description: 'This is task 1' },
    { id: 2, title: 'Task 2', description: 'This is task 2' }
  ]
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t))
  })),
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id)
  }))
);



// export function taskReducer(state = initialState, action: TaskActions): AppState {

//   switch (action.type){
//     case addTask.type:
//       return {... state, tasks:[...state.tasks, action.task]}
//       case updateTask.type:
//         return {
//           ...state,
//           tasks: state.tasks.map(task => (task.id === action.task.id ? action.task: task))
//         };
//         case deleteTask.type:
//           return {
//             ...state,
//             tasks: state.tasks.filter(task => task.id !== action.id)
//           };
//     default:
//       return state;
//   }

// }
