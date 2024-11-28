# AluraGeek

AluraGeek es un proyecto creado para el curso **Alura | ONE**. Es una aplicación de una sola página que muestra una lista de productos geek y permite a los usuarios agregar nuevos productos a través de un formulario. El proyecto utiliza **HTML**, **CSS**, **JavaScript** y **json-server** para manejar el envío de nuevos productos.

## Características

- **Diseño Responsivo**: Totalmente compatible con dispositivos móviles, se adapta a diferentes tamaños de pantalla.
- **Modo Oscuro/Claro**: Alterna entre temas oscuro y claro para una mejor experiencia de usuario.
- **Lista de Productos**: Muestra una colección de productos geek con elementos interactivos.
- **Formulario para Agregar Producto**: Los usuarios pueden agregar nuevos productos a la lista a través de un formulario.
- **Funcionalidad del Lado del Servidor**: El envío del formulario se procesa a través de **json-server**, que simula un back-end para manejar los productos.

## Tecnologías

- **HTML5**: Estructura y maquetado de las páginas web.
- **CSS3**: Estilos y diseño (usando Flexbox).
- **JavaScript**: Interactividad, manipulación del DOM y manejo de formularios.
- **json-server**: Herramienta para simular un back-end y manejar el almacenamiento de productos.

## Instalación

Para poder correr el proyecto localmente y probar su funcionalidad, sigue estos pasos:

1. **Clonar el repositorio**

    Primero, clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/DavidFPR/alura-geek.git
    cd alura-geek
    ```

2. **Instalar Dependencias**

    Asegúrate de tener Node.js y npm instalados en tu máquina. Si no los tienes, puedes descargarlos desde [aquí](https://nodejs.org).

    Luego, instala las dependencias necesarias ejecutando:

    ```bash
    npm install
    ```

3. **Ejecutar json-server**

    Para simular el back-end y permitir la funcionalidad de agregar productos, usa **json-server**. Si no lo tienes instalado globalmente, puedes instalarlo con el siguiente comando:

    ```bash
    npm install -g json-server
    ```

    Luego, ejecuta **json-server** en la carpeta del proyecto:

    ```bash
    json-server --watch db.json --port 3000
    ```

4. **Ejecutar el proyecto**

    En una nueva terminal, ejecuta el proyecto con el siguiente comando:

    ```bash
    npm start
    ```

    Esto abrirá la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000), donde podrás ver la lista de productos y agregar nuevos usando el formulario.

## Uso

Una vez que el proyecto esté en ejecución localmente, puedes:

- Navegar por la lista de productos geek.
- Agregar nuevos productos a la lista usando el formulario proporcionado.
- Alternar entre el modo oscuro y el modo claro para una experiencia de visualización más cómoda.

## Licencia

Este proyecto es para fines educativos como parte del curso **Alura | ONE** y está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para preguntas o comentarios, contáctame en GitHub.

- GitHub: [https://github.com/DavidFPR](https://github.com/DavidFPR)
