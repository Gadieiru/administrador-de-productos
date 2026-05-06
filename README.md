# Administrador de Productos Pro

¡Bienvenido! Este es un Dashboard CRUD de alto rendimiento desarrollado con un stack moderno. No es solo una lista de productos; es una implementación enfocada en la Experiencia de Usuario (UX), utilizando estrategias avanzadas de manejo de estado y sincronización de datos.


# Tecnologías Core

1) Frontend: React + Vite (Velocidad de desarrollo instantánea).

2) Lenguaje: TypeScript (Tipado estricto para un código sin errores).

3) Estilos: Tailwind CSS (Diseño responsivo y estética Dark/Cyan).

4) Navegación: React Router DOM (Manejo de rutas y estados vía URL).

# Arquitectura y Patrones

* El proyecto sigue un patrón de Separación de Responsabilidades (SoC):

1) Custom Hooks: Toda la lógica de negocio y llamadas a TanStack Query están encapsuladas en hooks reutilizables.

2) Servicios: Capa de abstracción para Axios, centralizando las URLs y configuraciones de la API.

3) Componentes UI vs. Contenedores: Los componentes de presentación son puros y reciben datos vía props, facilitando su testeo y reutilización.

4) Single Source of Truth (URL): El estado de la paginación y búsqueda reside en la URL, garantizando consistencia y permitiendo "Deep Linking".

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

# Retos Técnicos y Soluciones

1) Sincronización Bidireccional: Logré que los inputs de búsqueda y filtros no solo escriban en la URL, sino que lean de ella al cargar la página. Esto previene que el estado de la UI se pierda al recargar.

2) Optimistic Updates & Rollback: Implementé un flujo donde, al editar un precio, la caché de TanStack Query se actualiza antes de recibir respuesta del servidor. Si la petición falla, utilicé el contexto de onMutate para revertir los cambios al estado anterior (Snapshot), asegurando una experiencia sin lag para el usuario.

3) Prevención de Race Conditions: Utilicé el sistema de queryKeys dinámicas para asegurar que las peticiones de búsqueda con debounce no se mezclen si el usuario escribe demasiado rápido.

# Criterio Tecnológico

1) React 19/18: Aprovechamiento de las últimas optimizaciones de renderizado y soporte nativo para metadatos.

2) Zod sobre validación manual: Elegí Zod para tener un "Contrato de Datos" único que sirve tanto para la validación del formulario como para el tipado de TypeScript, reduciendo la duplicidad de código.

3) Vite vs CRA: Optimización del tiempo de compilación y recarga en caliente (HMR), fundamental para la productividad en entornos de desarrollo modernos.

# Características Principales Implementadas

1) Consumo de API: Integración completa con DummyJSON.

2) Paginación Inteligente: Controlada por URL para que puedas compartir el link de una página específica.

3) Búsqueda con Debounce: Optimización de peticiones al servidor mientras el usuario escribe.

4) CRUD Completo: Crear, Leer, Actualizar y Borrar con retroalimentación inmediata.

5) Gestión de Errores: Reversión de cambios (rollback) en mutaciones fallidas.

# Instalación y Uso

1) Clonar el repositorio: git clone https://github.com/Gadieiru/administrador-de-productos

2) cd administrador-de-productos

3) Instalar dependencias: npm install.

4) Correr en modo desarrollo: npm run dev
 
5) Variables de Entorno: No se requieren configuraciones adicionales, el proyecto consume la API pública de DummyJSON de forma directa.

Este proyecto nació como una prueba técnica de alto nivel autoimpuesta, diseñada para demostrar el dominio de las tecnologías más demandadas del mercado en 2026. Se desarrolló bajo condiciones de tiempo real limitadas, enfocándome en entregar código de grado de producción.

Desarrollado con ❤️ por Gadiel.¡Siéntete libre de revisar el código y dar feedback!

