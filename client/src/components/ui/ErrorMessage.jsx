import { Button } from "./Button";

export function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-md border border-brand-rosa bg-white p-6 text-red-700">
      <p>{message}</p>
      {onRetry ? (
        <Button className="mt-4" onClick={onRetry}>
          Reintentar
        </Button>
      ) : null}
    </div>
  );
}
