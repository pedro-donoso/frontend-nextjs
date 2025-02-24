"use client";
import React from "react";
import ListaUsuario from "@/components/Lista-Usuario";

// Componente de la pagina principal
const Home = () => {
  // Renderizar el componente ListaUsuario
  return (
    // Contenedor principal
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-white mb-8">Lista de Usuarios</h1>
          <ListaUsuario />
        </div>
      </div>
    </div>
  );
};

// Exportar el componente Home
export default Home;
