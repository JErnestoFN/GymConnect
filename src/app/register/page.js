import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import AuthForm from "../_components/AuthForm";

/**
 * @function RegisterPage
 * @description Página de registro de nuevos usuarios
 */
export default async function RegisterPage() {
  const session = await auth();
  
  // Redirigir a home si ya hay sesión
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{
        backgroundImage: `url('/images/register-bg.jpg')`,
        backgroundSize: 'cover'
      }}>
        <div className="flex items-center h-full w-full bg-blue-900/70 p-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-6">Únete a GymConnect</h1>
            <p className="text-xl mb-4">Crea una cuenta y comienza tu viaje fitness con nosotros.</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Acceso gratuito a herramientas de seguimiento</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Conecta con una comunidad activa</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Participa en retos motivadores</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Recibe análisis personalizados</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h1>
            <p className="text-gray-600">Regístrate para empezar tu experiencia</p>
          </div>
          
          <AuthForm mode="register" />
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Inicia Sesión
              </Link>
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 