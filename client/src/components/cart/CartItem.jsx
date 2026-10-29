import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency, imageUrl } from "../../utils/format";

export function CartItem({ item, onUpdate, onRemove }) {
  return (
    <tr className="border-b border-brand-borde">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(item.imagen)}
            alt=""
            width="64"
            height="48"
            className="h-12 w-16 object-cover"
          />
          <span>{item.nombre}</span>
        </div>
      </td>
      <td>{formatCurrency(item.precio)}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Restar ${item.nombre}`}
            onClick={() => onUpdate(item.id, item.cantidad - 1)}
            className="rounded border border-brand-borde p-1"
          >
            <Minus size={16} />
          </button>
          <span>{item.cantidad}</span>
          <button
            type="button"
            aria-label={`Sumar ${item.nombre}`}
            onClick={() => onUpdate(item.id, item.cantidad + 1)}
            className="rounded border border-brand-borde p-1"
          >
            <Plus size={16} />
          </button>
        </div>
      </td>
      <td>{formatCurrency(item.precio * item.cantidad)}</td>
      <td>
        <button
          type="button"
          aria-label={`Eliminar ${item.nombre}`}
          onClick={() => onRemove(item.id)}
          className="rounded p-1 text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
