"use client";
import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  name: string;
}

export default function ListaUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users"); //viene del backend
        if (!res.ok) {
          const errorText = await res.text();
          console.log("Error response: ", errorText);
          throw new Error("fallo en la peticion");
        }
        const data = await res.json();
        setUsuarios(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Error en la peticion: ", e);
          setError(e.message);
        }
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="p-4 mb-4 text-red-300 bg-red-900 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-black">
      {usuarios.length === 0 ? (
        <div className="flex items-center justify-center p-4 text-gray-400">
          Cargando usuarios...
        </div>
      ) : (
        <ul className="divide-y divide-gray-700">
          {usuarios.map((usuario: Usuario) => (
            <li
              key={usuario.id}
              className="py-4 flex items-center hover:bg-gray-900 px-4 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {usuario.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{usuario.name}</p>
                <p className="text-sm text-gray-400">ID: {usuario.id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
