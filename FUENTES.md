# Distrito Barber Club: fuentes y datos editables

Distrito Barber Club es una marca provisional. Ninguna fotografía muestra el local,
el equipo ni clientes reales: son imágenes de referencia para el concepto.

## Datos de demostración

Todo lo que cambia de una barbería a otra está en `js/config.js`: nombre,
dirección, teléfono, email, horario, servicios (descripción, duración y precio),
equipo, enlace al sistema de reservas y número de WhatsApp.

- `demo: true` muestra un único aviso discreto en el pie. Pásalo a `false` con los datos reales.
- `reservas.sistemaUrl`: si la barbería usa Booksy, Treatwell, Fresha u otro sistema,
  el formulario envía a ese enlace. Vacío = mensaje de WhatsApp con la selección.
- `portadaVideo`: MP4 opcional para la portada (sin sonido, ligero). Solo se carga
  en escritorio y sin "reducir movimiento"; la foto queda como imagen alternativa.
- La sección de opiniones se omite a propósito: añádela solo con testimonios reales.

## Fotografías

Todas provienen de Unsplash y se usan bajo la [licencia Unsplash](https://unsplash.com/license).
Seleccionadas el 14 de octubre de 2026. Se cargan desde `images.unsplash.com` con
parámetros de tamaño (`w`, `h`, `q=70`, `auto=format`). Para publicar conviene
descargarlas a una carpeta `img/` y completar la autoría desde la página de cada una.

| Uso en la web | Identificador |
| --- | --- |
| Portada; imagen social | `photo-1503951914875-452162b0f3f1` |
| Servicio: corte | `photo-1657105052497-f996284ffff8` |
| Servicio: barba | `photo-1532710093739-9470acff878f` |
| Servicio: ritual completo | `photo-1567894340315-735d7c361db0` |
| Experiencia: el local | `photo-1585747860715-2ba37e788b70` |
| Experiencia: los detalles | `photo-1621605815971-fbc98d665033` |
| Experiencia: asesoría | `photo-1599011176306-4a96f1516d4d` |
| Oficio 1: lectura | `photo-1640301133857-c4bc5789c1bb` |
| Oficio 2: forma | `photo-1493256338651-d82f7acb2b38` |
| Oficio 3: detalle | `photo-1599351431202-1e0f0137899a` |
| Oficio 4: acabado | `photo-1605497788044-5a32c7078486` |
| Equipo: Álex | `photo-1717700921740-a1440f3b89a4` |
| Equipo: Marco | `photo-1595294572864-ddb46d169dbb` |
| Equipo: Dani | `photo-1720251354355-258ad9d1a6af` |
| Ubicación | `photo-1781925856343-c97d0d44f94c` |
| Galería (12) | `photo-1536520002442-39764a41e987`, `photo-1524230616393-d6229fcd2eff`, `photo-1533245270348-821d4d5c7514`, `photo-1568339434343-2a640a1a9946`, `photo-1773904215697-e6c21fc27ac2`, `photo-1761931403667-a6753db21f32`, `photo-1630827020718-3433092696e7`, `photo-1635273051839-003bf06a8751`, `photo-1759134198561-e2041049419c`, `photo-1788328155052-e02abe9ba983`, `photo-1772442088712-df1780cbb709`, `photo-1783908688260-0c47404926f3` |
