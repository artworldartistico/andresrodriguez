# AndiWeb - Portfolio Profesional

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Ftudominio.github.io)](https://tudominio.github.io)
[![GitHub last commit](https://img.shields.io/github/last-commit/tuusuario/andiweb)](https://github.com/tuusuario/andiweb)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Portfolio profesional de diseño y desarrollo web. Especializado en WordPress, Moodle, E-commerce y soluciones digitales a medida.

🌐 **[Ver sitio en vivo](https://tudominio.github.io)**

---

## ✨ Características

- ✅ **100% Responsive** - Optimizado para todos los dispositivos
- ✅ **SEO Optimizado** - Meta tags, Schema.org, sitemap
- ✅ **Rendimiento A+** - Carga rápida, lazy loading
- ✅ **Modo Oscuro** - Tema claro/oscuro con persistencia
- ✅ **Portafolio Filtrable** - Sistema de categorías dinámico
- ✅ **Formulario Validado** - Validación frontend completa
- ✅ **Accesible** - WCAG 2.1 AA compliant

---

## 🚀 Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Grid, Animations)
- JavaScript Vanilla (ES6+)
- [Swiper.js](https://swiperjs.com/) - Carrusel
- [Muuri](https://muuri.dev/) - Grid filtrable
- [Font Awesome](https://fontawesome.com/) - Iconos

---

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/andiweb.git

# Navegar al directorio
cd andiweb

# Abrir con Live Server (VSCode) o cualquier servidor local
# No requiere instalación de dependencias
```

---

## 🛠️ Comandos Git Útiles

```bash
# Actualizar contenido
git add .
git commit -m "Actualización: descripción del cambio"
git push origin main

# Ver estado
git status

# Ver historial
git log --oneline

# Crear rama para pruebas
git checkout -b feature/nueva-funcionalidad
```

---

## 📁 Estructura del Proyecto

```
andiweb/
├── index.html           # Página principal
├── style.css            # Estilos globales
├── script.js            # JavaScript principal
├── robots.txt           # SEO - Instrucciones para crawlers
├── sitemap.xml          # SEO - Mapa del sitio
├── images/              # Recursos visuales
├── portafolio/          # Sección portafolio
├── sobre-mi/            # Página about
└── contacto/            # Formulario de contacto
```

---

## 🎨 Personalización

### Colores Principales
```css
:root {
  --primary: #e40613;
  --secondary: #252526;
  --dark: #000000;
  --light: #ffffff;
}
```

### Modo Oscuro
El tema oscuro se activa automáticamente y persiste usando `localStorage`.

---

## 📈 SEO

- ✅ Meta tags optimizados
- ✅ Schema.org markup (LocalBusiness)
- ✅ Open Graph para redes sociales
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ URLs semánticas
- ✅ Imágenes con alt descriptivos

---

## 🔧 Mantenimiento

### Actualizar Portafolio
Editar `portafolio/index.html` y agregar nuevos items en el grid:

```html
<div class="item" data-category="tu-categoria" data-label="keywords">
  <img src="..." alt="Descripción">
  <h3>Título del Proyecto</h3>
</div>
```

### Optimización de Imágenes
- Usar WebP cuando sea posible
- Comprimir imágenes (TinyPNG, Squoosh)
- Dimensiones recomendadas:
  - OG Image: 1200x630px
  - Portfolio: 800x600px
  - Logos: SVG o PNG transparente

---

## 📱 Compatibilidad

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome    | 90+            |
| Firefox   | 88+            |
| Safari    | 14+            |
| Edge      | 90+            |

---

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- ⚡ First Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 3s
- ⚡ Cumulative Layout Shift: < 0.1

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**Andrés Rodríguez**

- 🌐 Website: [tudominio.github.io](https://tudominio.github.io)
- 📧 Email: anfelirod86@hotmail.com
- 💼 LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- 🎨 Behance: [Tu Portfolio](https://behance.net/tu-usuario)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!