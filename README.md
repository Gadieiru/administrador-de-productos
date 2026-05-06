# Administrador de Productos Pro

¡Bienvenido! Este es un Dashboard CRUD de alto rendimiento desarrollado con un stack moderno. No es solo una lista de productos; es una implementación enfocada en la Experiencia de Usuario (UX), utilizando estrategias avanzadas de manejo de estado y sincronización de datos.


# Tecnologías Core

1) Frontend: React + Vite (Velocidad de desarrollo instantánea).

2) Lenguaje: TypeScript (Tipado estricto para un código sin errores).

3) Estilos: Tailwind CSS (Diseño responsivo y estética Dark/Cyan).

4) Navegación: React Router DOM (Manejo de rutas y estados vía URL).

# Estado y Datos (El cerebro del proyecto)

1) TanStack Query (React Query): El corazón de la aplicación. Maneja el almacenamiento en caché, sincronización y estados de carga.

2) Axios: Cliente HTTP para un consumo limpio de la API externa (DummyJSON).

3) Optimistic UI: Los cambios (edición y borrado) se reflejan instantáneamente en la pantalla. Si la API falla, la interfaz vuelve a su estado anterior automáticamente para evitar datos inconsistentes.

4) Prefetching: La aplicación "predice" el movimiento del usuario. Al estar en la página actual, ya estamos descargando la siguiente en segundo plano para una navegación sin pantallas de carga.

# Formularios y ValidaciónReact 

1) Hook Form: Manejo de formularios ligero y sin re-renderizados innecesarios.

2) Zod: Esquemas de validación de datos para asegurar que lo que enviamos a la API sea exactamente lo que se espera.

# UX / UI

1) React Hot Toaster: Notificaciones elegantes y no intrusivas para confirmar acciones o reportar errores.

2) Modales Custom: Ventanas de edición y confirmación de borrado con efectos de desenfoque (backdrop-blur) y transiciones de color dinámicas.

# Instalación y Uso

1) Clonar el repositorio:git clone https://github.com
2) cd administrador-de-productos
3) Instalar dependencias: npm install.
4) Correr en modo desarrollo: npm run dev
 

# Características Principales Implementadas

1) Consumo de API: Integración completa con DummyJSON.

2) Paginación Inteligente: Controlada por URL para que puedas compartir el link de una página específica.

3) Búsqueda con Debounce: Optimización de peticiones al servidor mientras el usuario escribe.

4) CRUD Completo: Crear, Leer, Actualizar y Borrar con retroalimentación inmediata.

Gestión de Errores: Reversión de cambios (rollback) en mutaciones fallidas.📬 ContactoDesarrollado con ❤️ por Gadieiru.¡Siéntete libre de revisar el código y dar feedback!

