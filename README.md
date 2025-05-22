#  NASA Explorer

NASA Explorer es una aplicación **web y móvil** desarrollada con **React Native**, **Expo** y **TypeScript** que consume múltiples APIs públicas de la NASA para visualizar información científica de forma interactiva y educativa. El proyecto sigue una arquitectura **CLEAN + MVVM**, incorpora **principios SOLID** y se apoya en herramientas modernas como **Redux Toolkit**, **AsyncStorage** y **Reanimated** para una experiencia fluida, offline y escalable.

---

## Tecnologías Utilizadas

- **React Native + Expo CLI**
- **TypeScript**
- **Redux Toolkit** + Persistencia con **AsyncStorage**
- **React Navigation (Drawer + Stack)**
- **Reanimated 3 (animaciones fluidas)**
- **React Hook Form (formularios dinámicos)**
- **Axios (peticiones HTTP)**
- **Arquitectura CLEAN + MVVM**
- **Principios SOLID, DRY, KISS, YAGNI**

---

## APIs de la NASA Integradas

| Módulo              | Descripción                                                                 |
|---------------------|------------------------------------------------------------------------------|
| **APOD**            | Astronomy Picture of the Day, muestra imágenes astronómicas diarias.        |
| **EONET**           | Eventos naturales activos (terremotos, huracanes, incendios, etc.).         |
| **DONKI**           | Eventos de clima espacial (eyecciones de masa coronal - CME).               |
| **NEO**             | Asteroides cercanos a la Tierra.                                             |
| **Image Library**   | Biblioteca de imágenes y videos espaciales de la NASA.                      |

---

##  Estructura del Proyecto
├── assets/
├── src/
│ ├── data/ # Datasources, repositories, DTOs
│ ├── domain/ # Entidades y casos de uso
│ ├── presentation/ # ViewModels, Slices, Hooks
│ ├── ui/ # Componentes y pantallas
│ ├── navigation/ # Navegadores (Stack, Drawer, Tabs)
│ ├── service/ # Servicios globales (Storage, API, etc.)
│ └── redux/ # Configuración de Redux Toolkit
├── App.tsx

### 1. Clona el repositorio
git clone https://github.com/diego1216/Nasaexplorer.git
cd Nasaexplorer
npm install
NASA_API_KEY=TU_CLAVE_AQUI
Puedes obtenerla gratis desde: https://api.nasa.gov
npx expo start






