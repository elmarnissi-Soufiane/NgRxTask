import { createSelector } from "@ngrx/store";
import { AppState } from "./task.reducer";
import { state } from "@angular/animations";

export const selectTasks = (state: AppState) => state.tasks;

export const selectTaskById = (id: number) =>
  createSelector (selectTasks, tasks => tasks.find(tasks => tasks.id === id));
