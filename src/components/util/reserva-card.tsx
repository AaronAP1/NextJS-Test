import React from "react";
import { ModalEdit } from "@/components/util/modalEdit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { reservas as PrismaReservas } from "@prisma/client";

interface reservas extends PrismaReservas {
  estado: "pendiente" | "confirmada" | "cancelada" | "completada";
}
import clsx from "clsx";
import { Badge } from "../ui/badge";
import { BorrarReservax } from "./reserva-borrar";


export function ReservaCard({ reserva }: { reserva: reservas }) {
  return (
    <Card  className="w-[350px] border-2 border-gray-800">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Reserva</CardTitle>
        <CardDescription>
          Fecha de Registro <p>{new Date(reserva.fecha).toLocaleDateString()}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="w-1/3">
            <img src="https://firebasestorage.googleapis.com/v0/b/geosimages-2d114.appspot.com/o/logo.png?alt=media&token=df2e0c59-be6d-41a5-bcb5-07a305fd3da6" alt="Placeholder" className="w-full h-auto rounded-lg" />
          </div>
          <div className="w-2/3 pl-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Label id="name">{reserva.nombre}</Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="telefono">Teléfono</Label>
                <Label id="telefono">{reserva.telefono}</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
      <Badge
          className={clsx({
            "bg-red-500 text-white": reserva.estado === "cancelada",
            "bg-yellow-500": reserva.estado  === "pendiente",
            "bg-green-500": reserva.estado  === "completada",
            "bg-blue-500": reserva.estado  === "confirmada",
          })}
        >
          {reserva.estado}
        </Badge>
        <BorrarReservax id={reserva.id} />
        <ModalEdit id={reserva.id} currentStatus={reserva.estado}/>
      </CardFooter>
    </Card>
  );
};

export default ReservaCard;