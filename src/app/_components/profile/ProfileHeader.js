import Image from 'next/image';

/**
 * @function ProfileHeader
 * @description Encabezado para la página de perfil del usuario
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 */
export default function ProfileHeader({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'Usuario'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-gray-600">
                    {user.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {user.name || 'Usuario'}
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              {user.bio || 'Miembro de GymConnect'}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="mr-2 bg-blue-600 rounded-full p-2">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Nivel</p>
                  <p className="font-semibold">Intermedio</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-2 bg-blue-600 rounded-full p-2">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Activo desde</p>
                  <p className="font-semibold">Enero 2023</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-2 bg-blue-600 rounded-full p-2">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Puntos</p>
                  <p className="font-semibold">125</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:ml-auto mt-6 md:mt-0">
            <button className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 