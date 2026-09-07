import { CommonModule } from "@angular/common";
import { Component, signal, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly correo = signal("estudiante@uta.edu.ec");
  readonly password = signal("");
  readonly correoTouched = signal(false);
  readonly cargando = signal(false);
  readonly errorMsg = signal("");

  get correoValido(): boolean {
    return this.validarCorreo(this.correo()).length === 0;
  }

  get correoMensaje(): string[] {
    return this.validarCorreo(this.correo());
  }

  validarCorreo(value: string): string[] {
    const trimmed = value.trim();
    const errores: string[] = [];

    if (!trimmed) {
      return ["Ingresa tu correo institucional."];
    }

    if (!trimmed.includes("@")) {
      errores.push("Falta @ en el correo.");
    }

    const [usuario, dominio] = trimmed.split("@");

    if (!usuario || !dominio) {
      errores.push("El correo necesita usuario y dominio.");
    }

    if (dominio && (!dominio.includes(".") || dominio.startsWith(".") || dominio.endsWith("."))) {
      errores.push("Usa un dominio válido, por ejemplo: uta.edu.ec");
    }

    return errores;
  }

  onSubmit(): void {
    this.correoTouched.set(true);

    if (!this.correoValido) {
      this.errorMsg.set("Revisa tu correo institucional antes de continuar.");
      return;
    }

    this.errorMsg.set("");
    this.cargando.set(true);

    this.auth.login(this.correo(), this.password()).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(["/horario"]);
      },
      error: (err) => {
        this.cargando.set(false);
        this.errorMsg.set(
          err.status === 401 ? "Correo o contraseña incorrectos." : "No se pudo conectar con el servidor."
        );
      },
    });
  }
}
