import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <nav className="p-2 w-full flex flex-row items-center justify-evenly">
      <ul className="flex flex-row items-center gap-4">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <Separator orientation="vertical" className="h-6" />
        <li>
          <Link href="/tareas">Tareas</Link>
        </li>
        <Separator orientation="vertical" className="h-6" />
        <li>
          <Link href="/cuentas">Cuentas</Link>
        </li>
      </ul>
      <div className="flex flex-row gap-8 items-center">
        <ModeToggle />
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
