# 🗂️ Cirosky: Almacena y Comparte desde un Solo Lugar 🚀

✨ **Cirosky** es la solución ideal para **almacenar** y **organizar** tus escritos, ideas, proyectos y documentación, ¡todo en un solo
lugar! Ya sea que prefieras mantenerlo privado o compartirlo con tu equipo, Cirosky hace que gestionar información personal y colaborativa
sea más fácil que nunca. 📚

## 🚀 Tecnologías Utilizadas

- 🖥️ **Next.js**: El framework de React para aplicaciones web rápidas y escalables.
- 📘 **TypeScript**: Aumenta la productividad y la seguridad en el código mediante tipado estático.

---

## 🌟 Descripción

Con **Cirosky**, puedes:

- 📝 Organizar tus escritos y proyectos en un solo lugar.
- 🛡️ Mantener tu información **privada** o compartirla con el mundo 🌍.
- 👨‍💻 Colaborar con tu equipo en tiempo real.
- 📂 Centralizar todo lo que necesitas en una interfaz sencilla y atractiva.

## 🎯 Características Principales

- 📋 **Gestión de Documentación**: Mantén todos tus archivos bien organizados y accesibles desde cualquier lugar.
- 🔐 **Privacidad y Control**: Decide si tus proyectos son privados o si deseas compartirlos con otros.
- 🤝 **Colaboración en Tiempo Real**: Comparte y trabaja con tu equipo de manera fluida.
- 🔍 **Búsqueda Inteligente**: Encuentra rápidamente lo que necesitas, incluso entre miles de documentos.

## 🚀 Empezando

### 🛠️ Instalación

1. **Clona este repositorio** en tu máquina local 🖥️:
   ```bash
   git clone https://github.com/yourusername/cirosky.git
   ```
2. Ve al directorio del proyecto 📂:

   ```bash
   cd cirosky
   ```

3. Instala las dependencias 📦:

   ```bash
   npm install

   ```

## 🧑‍💻 Ejecutar el Proyecto

1. Inicia el servidor de desarrollo 🚀:
   ```bash
   git clone https://github.com/yourusername/cirosky.git
   ```

# 🤝 Contribuyendo

¡Nos encanta recibir contribuciones de la comunidad! 🌟 Si tienes alguna idea o mejora, aquí está cómo puedes contribuir:

1. **Haz un fork del proyecto** 🍴.

2. **Crea una nueva rama** para tu función:

   ```bash
   git checkout -b feature/nueva-funcion
   ```

3. **Haz tus cambios** y **haz un commit** con un buen mensaje descriptivo 💪:

   ```bash
   git commit -m "💡 Añadir nueva funcionalidad de búsqueda"
   ```

4. **Haz push** de tu rama y **crea un pull request** 🚀:
   ```bash
   git push origin feature/nueva-funcion
   ```

## 💡 Ideas y Sugerencias

¿Tienes alguna idea genial? ¡Queremos escucharla! 💡 Puedes dejar tus sugerencias en nuestra sección de Discusiones o abrir un issue.

# Tareas Específicas del Proyecto

# Lista de Tareas del Proyecto

## 1. Cargar Datos Paginados al Hacer Scroll (Parcial Load)

- [x] Implementar un indicador de "cargando" cuando se esté solicitando más datos.
- [x] Implementar servicio de backend mocks para obtener datos paginados.
- [x] Añadir lógica en frontend para solicitar más datos al hacer scroll.
- [x] Ajustar el diseño de la UI para manejar la carga incremental de datos.

**Tiempo estimado**:

- Backend: 4-6 horas.
- Frontend: 4-6 horas.

## 2. Crear Secciones con Nombre Editable (Continuar con la tarea existente)

- [x] Implementar lógica de añadir sección.
- [x] Permitir edición del nombre de la sección después de su creación.

**Tiempo estimado**: 6-8 horas.

## 3. Eliminar Secciones y sus Páginas Asociadas

- [x] Implementar botón para eliminar una sección específica.
- [x] Asegurar que al eliminar una sección, se eliminen todas sus páginas asociadas por mensaje de alarma.

**Tiempo estimado**: 4-6 horas.

## 4. Crear Páginas Dentro de Cada Sección

- [x] Implementar funcionalidad para agregar páginas dentro de una sección específica.
- [x] Implementar lógica en botón dentro de cada sección para agregar nuevas páginas.
- [x] Mostrar indice numérico o de letra para paginas con el mismo nombre

**Tiempo estimado**: 3-4 horas.

## 5. Eliminar Páginas Individuales

- [x] Implementar funcionalidad para eliminar páginas individuales dentro de una sección.
- [x] Añadir botón de eliminación a cada página.
- [x] Asegurar que la eliminación de una página no afecte a otras páginas o secciones.

**Tiempo estimado**: 3-4 horas.

## 6. Crear Editor de Texto para el Contenido de la Página

- [x] 7.1 Elegir un editor de texto enriquecido (como Quill, Slate, o Draft.js).
- [x] 7.2 Integrar el editor de texto enriquecido en la UI.
- [x] 7.3 Añadir opciones de formato básico (negrita, cursiva, listas, title, bloque de cita, bloque de código)
- [x] 7.4 Implementar funcionalidad para guardar el contenido del editor.

**Tiempo estimado**: 8-10 horas.

## 7. Editar Contenido de Página

- [x] 6.1 Implementar redirection al editor al crear o seleccionar una página. y mostrar la pagina seleccionada
- [ ] 6.2 Desarrollar editor para modificar el contenido de la página.
- [ ] 6.3 Implementar funcionalidad para guardar cambios realizados en la página.
- [ ] 6.4 Habilitar modo vista y modo editor

**Tiempo estimado**: 6-8 horas.

## 8. Funcionalidad general del editor

- [ ] 8.1 Formato de texto (negrita, cursiva, subrayado, tachado) - 4 horas
- [ ] 8.2 Niveles de encabezado (H1, H2, H3) - 2 horas
- [ ] 8.3 Listas (viñetas, numeradas, checkboxes) - 4 horas
- [ ] 8.4 Tablas básicas (crear, editar, eliminar filas/columnas) - 6 horas
- [ ] 8.5 Bloques de código con resaltado de sintaxis - 6 horas
- [ ] 8.6 Incrustar enlaces - 2 horas
- [ ] 8.7 Incrustar imágenes - 4 horas
- [ ] 8.8 Adjuntar archivos - 4 horas
- [ ] 8.9 Funcionalidad de deshacer/rehacer - 4 horas
- [ ] 8.10 Colaboración en tiempo real y comentarios - 10 horas
- [ ] 8.11 Bloques de cita (quotes) - 2 horas
- [ ] 8.12 Bloque divisor (línea horizontal) - 1 hora
- [ ] 8.13 Movimiento de bloques de texto de forma draggable - 4 horas
- [ ] 8.14 Exportar en formato PDF - 4 horas
- [ ] 8.15 Cambiar tipo y formato de fuente - 4 horas
- [ ] 8.16 Alternar entre tema oscuro y claro - 4 horas
- [ ] 8.17 Permite tener paginas publicas y paginas privada

**Tiempo estimado**: 4-6 horas.

## 9. Cambiar el Idioma de la Aplicación (i18n)

- [ ] 9.1 Implementar un sistema de internacionalización (i18n) en la aplicación.
- [ ] 9.2 Añadir soporte para español e inglés.
- [ ] 9.3 Crear un botón o selector para cambiar de idioma en tiempo real.

**Tiempo estimado**: 6-8 horas.

### Extensiones

- Paginas embebidas
- Plantillas de pagina (doc,cv,horario, etc)
- Reparar Eslint para que solo trabaje con typescript y no con javascript
- Poner un botón, section o page en loading mode, ya sea para delete o update según si determino si es necesario o no
- Limpiar store redux
- Añadir comandos del teclado para funcionalidades especificas, como crear paginas eliminar paginas etc
- Añadir transiciones para una experiencia de usuario que transmita mas suavidad
- Code refactor: añadir custom hooks para funciones que están muy cargadas de metodos y código y boilerplate
- Code refactor: recordar que puedo usar useeffects mas de una ves en un componente aplicarlo solo cuando sea necesario
- Code refactor: utilizar usecallbacks y use memo cuando sea necesario, para mejorar el performance
- Integración con bases de datos mostrar datos en tablas desde bases de datos
- Añadir funcionalizad para darle bordes redondos a algunos componentes del editor como por ejemplo el blockquote que sea parametrizable
- Refactorizar componentes que tiene mucho código y que son muy grandes lo que tienen comentario TODO
- Añadir el buscador de paginas y secciones
- Extender buscador al contenido de pagina
- Añadir contador de letras en pagina
- Definir limite de caracteres por pagina

### Progreso General:

- [x] Tarea 1 completada
- [x] Tarea 2 completada
- [x] Tarea 3 completada
- [x] Tarea 4 completada
- [x] Tarea 5 completada
- [x] Tarea 6 completada
- [ ] Tarea 7 completada
- [ ] Tarea 8 completada
- [ ] Tarea 9 completada
