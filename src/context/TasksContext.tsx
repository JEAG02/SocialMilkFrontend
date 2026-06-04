import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import { useAuth } from "./AuthContext";

import {
  getTasks,
  createTask as createTaskService,
  updateTaskStatus,
  deleteTask as deleteTaskService,
} from "../services/tasksService";

// =========================
// STATUS TYPES
// =========================

type TaskStatus =
  | 0
  | 1
  | 2;

// 0 = Pending
// 1 = In Progress
// 2 = Completed

export interface Task {

  taskId: string;

  taskTitle: string;

  taskDescription?: string;

  status: TaskStatus;

  dueDate?: string;

  priority: number;
}

interface TasksContextData {

  tasks: Task[];

  loading: boolean;

  loadTasks: () => Promise<void>;

  createTask: (
    task: any
  ) => Promise<void>;

  moveToInProgress: (
    id: string
  ) => Promise<void>;

  moveToCompleted: (
    id: string
  ) => Promise<void>;

  moveToPending: (
    id: string
  ) => Promise<void>;

  deleteTask: (
    id: string
  ) => Promise<void>;
}

const TasksContext =
  createContext(
    {} as TasksContextData
  );

export function TasksProvider({
  children,
}: any) {

  const { isAuthenticated, loading: authLoading } = useAuth();

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // LOAD TASKS
  // =========================

  const loadTasks =
    async () => {

    try {

      setLoading(true);

      const data =
        await getTasks();

      console.log("TASKS:");
      console.log(data);

      setTasks(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD (cuando auth esté lista)
  // =========================

  useEffect(() => {

    if (!authLoading && isAuthenticated) {
      loadTasks();
    }

  }, [authLoading, isAuthenticated]);

  // =========================
  // CREATE TASK
  // =========================

  const createTask =
    async (task: any) => {

    try {

      await createTaskService({

        taskTitle:
          task.taskTitle,

        taskDescription:
          task.taskDescription,

        dueDate:
          task.dueDate,

        priority:
          task.priority || 1,
      });

      await loadTasks();

    } catch (error) {

      console.log(error);

      throw error;
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const changeStatus =
    async (
      id: string,
      status: TaskStatus
    ) => {

    try {

      await updateTaskStatus(
        id,
        status
      );

      await loadTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // MOVE TO IN PROGRESS
  // =========================

  const moveToInProgress =
    async (
      id: string
    ) => {

    await changeStatus(
      id,
      1
    );
  };

  // =========================
  // MOVE TO COMPLETED
  // =========================

  const moveToCompleted =
    async (
      id: string
    ) => {

    await changeStatus(
      id,
      2
    );
  };

  // =========================
  // MOVE TO PENDING
  // =========================

  const moveToPending =
    async (
      id: string
    ) => {

    await changeStatus(
      id,
      0
    );
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask =
    async (
      id: string
    ) => {

    try {

      await deleteTaskService(
        id
      );

      await loadTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <TasksContext.Provider
      value={{
        tasks,
        loading,

        loadTasks,

        createTask,

        moveToInProgress,

        moveToCompleted,

        moveToPending,

        deleteTask,
      }}
    >

      {children}

    </TasksContext.Provider>
  );
}

export function useTasks() {

  return useContext(
    TasksContext
  );
}