import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center px-6 py-20 text-center">
      <div>
        <p className="font-mono text-7xl font-semibold text-cyan-electric">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          Ruta no encontrada
        </h1>

        <p className="mt-3 text-foreground/70">
          La dirección solicitada no forma parte del portafolio.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-cyan-electric px-5 py-3 font-mono text-sm font-semibold text-background"
        >
          Regresar al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;