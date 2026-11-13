# BioCaquetá

Aplicación de avistamientos con Node.js, Express, Express-Handlebars y MongoDB Atlas.

## Preparación

1. Abrir esta carpeta en VS Code.
2. Ejecutar `npm install`.
3. Copiar `.env.example` como `.env` y configurar la cadena personal de MongoDB Atlas.
4. Ejecutar `npm start`.
5. Abrir http://localhost:3000.

## API para Postman

- `GET http://localhost:3000/api/avistamientos`
- `GET http://localhost:3000/api/avistamientos?categoria=Ave`
- `POST http://localhost:3000/api/avistamientos` con Body > raw > JSON:

```json
{
  "nombreComun": "Danta amazónica",
  "nombreCientifico": "Tapirus terrestris",
  "categoria": "Mamífero",
  "zona": "El Caraño",
  "estadoConservacion": "Vulnerable",
  "investigador": "Estudiante"
}
```

- `PUT http://localhost:3000/api/avistamientos/ID` con JSON, por ejemplo `{"zona":"Río Hacha"}`.
- `DELETE http://localhost:3000/api/avistamientos/ID`.

Los botones de la interfaz utilizan `POST` para editar o borrar porque los formularios HTML no envían PUT/DELETE por sí solos.

**Seguridad:** no subir `.env` a GitHub ni pegar contraseñas en el código.
