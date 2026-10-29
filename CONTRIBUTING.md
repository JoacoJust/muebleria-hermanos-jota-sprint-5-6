# Guía de Contribución

Gracias por tu interés en contribuir a Mueblería Hermanos Jota. Este documento describe el proceso de desarrollo y los estándares que seguimos.

## Filosofía de Trabajo

Desarrollamos en colaboración: la inteligencia artificial genera propuestas de código, y el equipo humano audita, corrige y aprueba cada cambio. Esto asegura calidad técnica y alineación con los objetivos del proyecto.

## Flujo de Trabajo

### 1. Creación de Rama

```bash
git checkout main
git pull origin main
git checkout -b feat/descripcion-corta  # o fix/, docs/, refactor/, etc.
```

**Convención de nombres de ramas:**

- `feat/`: nueva funcionalidad
- `fix/`: corrección de errores
- `docs/`: cambios en documentación
- `refactor/`: reestructuración de código
- `test/`: adición o modificación de tests
- `chore/`: tareas de mantenimiento

### 2. Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) para estandarizar los mensajes de commit:

```
<tipo>[alcance opcional]: descripción

[opcional] cuerpo del commit

[opcional] pie de página
```

**Tipos permitidos:**

- `feat`: nueva funcionalidad
- `fix`: corrección de bug
- `docs`: cambios en documentación
- `style`: formateo, puntos y coma, etc. (sin lógica)
- `refactor`: reestructuración de código
- `test`: adición o modificación de tests
- `chore`: actualización de dependencias, configuración
- `ci`: cambios en CI/CD
- `build`: cambios en sistema de build

**Ejemplos:**

```
feat(api): agregar endpoint de búsqueda
fix(client): corregir cálculo de envío en carrito
docs: actualizar README con instrucciones de instalación
```

### 3. Código Limpio

Antes de hacer commit, asegúrate de:

```bash
npm run lint      # Verificar estilo de código
npm test         # Ejecutar tests
npm run build    # Verificar que compile
```

Los hooks de Husky ejecutan ESLint y Prettier automáticamente en el pre-commit, y validan el formato del mensaje de commit.

### 4. Pull Request

1. Sube tu rama: `git push origin feat/descripcion-corta`
2. Abre un Pull Request desde GitHub
3. Completa la plantilla con descripción de cambios
4. Solicita revisión a otro integrante del equipo
5. Espera aprobación antes de mergear

## Configuración del Entorno de Desarrollo

```bash
# Instalar dependencias
npm run install:all

# Configurar variables de entorno
cp backend/.env.example backend/.env
cp client/.env.example client/.env

# Iniciar servicios
npm run dev
```

**Endpoints disponibles:**

- Frontend: http://localhost:3000
- API: http://localhost:4000

## Verificación de Cambios

Antes de solicitar merge, verifica que:

- [ ] Todos los tests pasan (`npm test`)
- [ ] No hay errores de linting (`npm run lint`)
- [ ] El build se genera correctamente (`npm run build`)
- [ ] La funcionalidad nueva está testeada
- [ ] La documentación relevante está actualizada

## Contrato de API

El contrato de la API es la fuente de verdad para el backend. Cualquier cambio en rutas, métodos HTTP o formatos de respuesta requiere:

1. Actualización de `docs/api-contract.md`
2. Acuerdo con el equipo
3. Actualización de tests correspondientes

## Estándares de Código

### Backend (Node.js/CommonJS)

- Uso de `const` por defecto, `let` solo cuando se reasigna
- `async/await` con `try/catch` en lugar de `.then()/.catch()`
- Validación explícita de inputs
- Logs solo mediante el logger configurado

### Frontend (React/ES Modules)

- Componentes funcionales con hooks
- Sin componentes de clase
- Props inmutables
- Estilos con Tailwind CSS (sin estilos inline)
- Accesibilidad: HTML semántico, labels asociados, foco visible

### General

- Sin `var`, `==`, o antipatrones documentados en `AGENTS.md`
- Sin `console.log` de depuración (logger del backend exceptuado)
- Sin secretos hardcodeados (usar variables de entorno)
- Sin dependencias sin aprobación previa

## Comunicación

Para dudas o discusiones sobre arquitectura o implementación, utiliza los canales de comunicación del equipo o crea un issue en el repositorio.

## Licencia

Al contribuir, aceptas que tus cambios se licencien bajo la misma licencia del proyecto (MIT).
