# CHANGELOG

## 20210116 Release v0.0.7

Los cambios de esta version son:

- Se genera un registro en el log con la fecha y el nombre del usuario que se logea
- Si el acceso es invalido se devuelve codigo de error 401

## 20210112 Release v0.0.1

Libero la primer version para testing

Incluye:
- Endpoint para establecer un login valido y generar un token
- Middleware para el resto de los endpoints que valida el token de autorizacion
- Endpoints para gestionar un CRUD de la tabla de marcas

Chequear el README.md para ver que variables de entorno son requeridas

## 20210104

Inicialización del proyecto.
Se actualiza la documentación, nombres de repositorios, se configura la app y se despliega un borrador basado en el ejemplo para principiantes que brinda heroku.

Se tratara de montar una base de datos principal y comenzar a construirla. Luego se planea implementar una estrategia de autenticación para administrar las futuras solicitudes a la api.