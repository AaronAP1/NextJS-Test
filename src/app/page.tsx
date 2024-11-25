"use client";

import React, { useState, useEffect } from 'react';

import { ReservaCard } from "@/components/util/reserva-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listarreservas } from '@/helpers/funtions';

const Homepage = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");


  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const formData = new FormData();
        formData.append('estado', estadoFiltro);
        const data = await listarreservas(formData);
        setReservas(data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, [estadoFiltro]);

  return (
    <div>
      <div className="flex flex-col justify-between items-start px-4 py-2">
        <h1 className="mb-1">Hola!</h1>
        <p>Bienvenido al área de Reservas de UPPEREAT Restaurant</p>
      </div>
      <div className="flex justify-between items-center px-4 py-2">
        <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <br />
      <div className="grid grid-cols-3 gap-3">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaCard reserva={reserva} key={reserva.id} />
          ))
        ) : (
          <p>No hay reservas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;