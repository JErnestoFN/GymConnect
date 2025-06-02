import Image from 'next/image';

/**
 * @function WelcomeBanner
 * @description Banner de bienvenida que muestra en la página principal
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario actual
 */
export default function WelcomeBanner({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ¡Bienvenido de nuevo, {user.name || 'Atleta'}!
            </h1>
            <p className="text-blue-100 text-lg">
              ¿Listo para un nuevo día de entrenamiento? Tu progreso sigue mejorando.
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="mr-8 text-center">
              <div className="bg-white/20 rounded-full p-4 mb-2">
                <span className="text-2xl font-bold">7</span>
              </div>
              <span className="text-sm text-blue-100">Días activos</span>
            </div>
            
            <div className="mr-8 text-center">
              <div className="bg-white/20 rounded-full p-4 mb-2">
                <span className="text-2xl font-bold">3</span>
              </div>
              <span className="text-sm text-blue-100">Grupos</span>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 mb-2">
                <span className="text-2xl font-bold">125</span>
              </div>
              <span className="text-sm text-blue-100">Puntos</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex space-x-4">
          <button className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            Registrar actividad
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
            Unirse a un reto
          </button>
        </div>
      </div>
    </div>
  );
} 