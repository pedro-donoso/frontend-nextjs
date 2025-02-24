### FRONTEND NEXTJS

#### 1. Creo un Proyecto Next.js:

```
npx create-next-app frontend-nextjs
```

opciones SI:

* TypeScript
* Tailwind CSS
* src directory
* App Router

#### 2. Abrir con WindSurf y Crear repositorio Github

#### 3. Definir puerto diferente 3001, modificar package.json

```
"scripts": {
  "dev": "next dev -p 3001",
  ...
}
```

#### 4. Probar puerto:

```
npm run dev
```

#### 5. Configurar tsconfig.json (ubicado en carpeta del proyecto)

```
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "target": "ES2017"
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    "src/**/*",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### CONEXIÓN CON PROYECTO ANTERIOR BACKEND (backend-nestjs)

* Debe estar corriendo backend

```
http://localhost:3000/users
```

#### 6. Creo carpeta types con archivo usuario.ts

```
// Definición del tipo de usuario
interface Usuario {
  id: number
  name: string
}

export type { Usuario }
```

#### 7. Creo un componente para mostrar usuarios, manejo de errores (src/components/Lista-Usuario.tsx) y verifico respuesta

```
"use client";
import { useEffect, useState } from "react";

interface Usuario {
  userId: number;
  username: string;
  apellido: string;
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
```








