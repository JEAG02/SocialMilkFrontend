const API_URL =
  "http://192.168.153.77:5264/api/v1/tasks";

export async function getTasks(
  profileId: string
) {

  const response = await fetch(
    `${API_URL}?profileId=${profileId}`
  );

  if (!response.ok) {
    throw new Error(
      "Error obteniendo tareas"
    );
  }

  return response.json();
}

// =========================
// CREATE
// =========================

export async function createTask(
  task: any
) {

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(task),
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    console.log(error);

    throw new Error(
      "Error creando tarea"
    );
  }

  return response.json();
}

// =========================
// UPDATE STATUS
// =========================

export async function updateTaskStatus(
  id: string,
  status: number
) {

  const response = await fetch(
    `${API_URL}/${id}/status`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error actualizando tarea"
    );
  }

  return response.json();
}

// =========================
// DELETE
// =========================

export async function deleteTask(
  id: string
) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error eliminando tarea"
    );
  }

  return response.json();
}