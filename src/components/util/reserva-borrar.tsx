"use client";

import { Button } from "../ui/button";
import { borrarReservaq } from "@/helpers/funtions";

export function BorrarReservax({ id}: {id: number}) {
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            borrarReservaq(formData);
            window.location.reload();
        }}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" className="bg-red-500">Borrar</Button>
        </form>
    );
}