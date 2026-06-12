## 📁 Estructura del Proyecto y Ubicación de las Pruebas

# Pruebas Front Automation Challenge 🚀 
# PokeAPI Test Automation Challenge 🚀

Para revisar el código de automatización de las pruebas front y las validaciones de los endpoints, puedes dirigirte directamente a la siguiente ruta dentro del repositorio:

Juan-Araya-QA-Engineer-Challenge/
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   ├── PruebasApi.cy.js   <-- 🎯 Test API
│   │   └── PruebasFront.cy.js <-- 🎯 Test Front
│   ├── 📁 fixtures/
│   └── 📁 support/
├── .gitignore
├── cypress.config.js
└── package.json

## 🛠️ Tecnologías y Herramientas
* **Framework Principal:** [Cypress](https://cypress.io) (v13+)
* **Lenguaje de Programación:** JavaScript (ES6+)
* **Gestor de Paquetes:** npm / Node.js
* **Control de Versiones:** Git y GitHub

---
## 🚀 Instrucciones de Ejecución Local

pasos para clonar, instalar y ejecutar las pruebas en local:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org) (versión LTS recomendada) en tu sistema.

### 2. Clonar el Repositorio
Abre tu terminal y ejecuta el siguiente comando:
```bash
git clone https://github.com
```

### 3. Instalar Dependencias
Navega a la carpeta del proyecto e instala los paquetes necesarios:
```bash
cd Juan-Araya-QA-Engineer-Challenge
npm install
```

### 4. Ejecutar las Pruebas
Puedes correr los tests de dos formas diferentes según tus necesidades:

* **Modo Interactivo (Cypress Runner):** Ideal para ver el paso a paso visual y depurar la consola.
  ```bash
  npx cypress open
  ```
* **Modo Consola (Headless):** Ideal para ejecuciones rápidas o integración continua (CI).
  ```bash
  npx cypress run
  ```
---

## 🧑‍💻 Autor
* ** Juan Araya ** - *QA Automation Engineer*

