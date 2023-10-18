import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DetailsPayments({ openDetail, closeDetail, rowEdit }) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [openDetail, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);
  return (
    <div>
      <Dialog open={openDetail} onClose={closeDetail} maxWidth="sm">
        <DialogTitle>Detalles del Registro</DialogTitle>
        <DialogContent>
          {editedRow && (
            <div>
              <p>ID: {editedRow.id}</p>
              <p>Nombre: {editedRow.cliente_id}</p>
              <p>Cedula: {editedRow.cedula}</p>
              <p>Vehiculo: {editedRow.id_vehiculo}</p>
              <p>Poliza: {editedRow.numero_poliza}</p>
              <p>Monto Total: {editedRow.monto_total}</p>
              <p>Numero de cuotas: {editedRow.numero_cuotas}</p>
              <p>Dias Cuotas: {editedRow.dias_cuota}</p>
              <p>Fecha Inicio: {editedRow.fecha_inicio}</p>
              <p>Fecha Fin: {editedRow.fecha_fin}</p>
              <p>
                Estado:
                <span
                  style={{
                    color: editedRow.estado === "1" ? "green" : "red",
                    marginLeft: "5px",
                  }}
                >
                  {editedRow.estado === "1" ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
