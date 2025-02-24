"use client";
// Importar los hooks useEffect y useState
import { useEffect, useState } from "react";

// Definir el tipo de usuario
interface Usuario {
  userId: number;
  username: string;
  apellido: string;
}

// Definir el componente
export default function ListaUsuario() {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  // Estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener la lista de usuarios
  useEffect(() => {
    // Funcion para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        // Realizar la peticion a la API
        const res = await fetch("http://localhost:3000/users"); //VIENE DESDE EL BACKEND
        // Validar la respuesta
        if (!res.ok) {
          // Manejo de errores
          const errorText = await res.text();
          console.log("Error response: ", errorText);
          // Generar un error personalizado
          throw new Error("fallo en la peticion");
        }
        // Convertir la respuesta a JSON
        const data = await res.json();
        // Actualizar el estado
        setUsuarios(data);

      } catch (e: unknown) {
        // Manejo de errores
        if (e instanceof Error) {
          // Generar un error personalizado
          console.error("Error en la peticion: ", e);
          // Actualizar el estado de error
          setError(e.message);
        }
      }
    };

    // Llamar a la funcion para obtener la lista de usuarios
    fetchUsers();
  }, []);

  if (error) {
    // Mostrar el error
    return (
      <div className="p-4 mb-4 text-red-300 bg-red-900 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    // Contenedor principal
    <div className="container mx-auto p-4 bg-black">
      // Lista de usuarios
      {usuarios.length === 0 ? (
        // Mostrar mensaje de carga
        <div className="flex items-center justify-center p-4 text-gray-400">
          Cargando usuarios...
        </div>
      ) : (
        // Lista de usuarios
          <ul className="divide-y divide-gray-700">
          // Iterar sobre la lista de usuarios
            {usuarios.map((usuario: Usuario) => (
              <li
              // Clave única para cada usuario
                key={usuario.userId}
              className="py-4 flex items-center hover:bg-gray-900 px-4 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {usuario.username.charAt(0)}
              </div>
                <div>
                <p className="text-sm font-medium text-white">{usuario.username}</p>
                <p className="text-sm text-gray-400">ID: {usuario.userId}</p>
                <p className="text-sm text-gray-400">Apellido: {usuario.apellido}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
