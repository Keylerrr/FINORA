export const API_URL = "http://localhost:3001/";

export async function obtenerUsuarios() {
  const response = await fetch(`${API_URL}/usuarios`);
  return await response.json();
}

export async function agregarUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return await response.json();
}