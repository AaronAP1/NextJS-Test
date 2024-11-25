"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function enviarReserva(formData: FormData) {
  "use server";
  const nombre = formData.get('name')?.toString();
  const telefono = formData.get('phone')?.toString();
  const direccion = formData.get('address')?.toString();
  const cantidad = formData.get('cantidad')?.toString() || '';
  const fecha = formData.get('date')?.toString();
  const hora = formData.get('time')?.toString();
  console.log({ nombre, telefono, direccion, fecha, hora });

  if (!nombre || !telefono || !direccion || !fecha || !hora) {
    throw new Error('Por favor, complete todos los campos');
  }

  try {
    const fechaHora = new Date(`${fecha}T${hora}`);
    console.log('Fecha y hora combinadas:', fechaHora);
    const newReserva = await prisma.reservas.create({
      data: {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        cantidad: cantidad,
        fecha: fechaHora,
        hora: fechaHora
       
      },
    });
    console.log('Reserva creada:', newReserva);
    revalidatePath('/');
    return newReserva;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw new Error('Error al crear la reserva');
  }
  
}

export async function borrarReservaq(formData: FormData) {
  "use server";
  const id = formData.get('id')?.toString();
  

  if (!id) {
    throw new Error('No se ha proporcionado un ID de reserva');
  }

  await prisma.reservas.delete({
    where: {
      id: parseInt(id),
    },
  });

  revalidatePath('/');
  
}

export async function editarReserva(formData: FormData) {
  "use server";
  const id = formData.get('id')?.toString();
  const estado = formData.get('estado')?.toString();

  if (!id || !estado) {
    throw new Error('Por favor, complete todos los campos');
  }

  try {
    const updatedReserva = await prisma.reservas.update({
      where: { id: parseInt(id) },
      data: { estado },
    });
    console.log('Reserva actualizada:', updatedReserva);
    revalidatePath('/');
    return updatedReserva;
    
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    throw new Error('Error al actualizar la reserva');
  }
}

export async function listarreservas(formData: FormData) {
  const estado = formData.get('estado')?.toString();

  if (!estado) {
    throw new Error('No se ha proporcionado un estado de reserva');
  }

  const reservas = estado === 'todos'
    ? await prisma.reservas.findMany()
    : await prisma.reservas.findMany({
        where: { estado },
      });

  return reservas;
}