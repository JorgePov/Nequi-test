
# Prueba Tecnica[Nequi] - Jorge Poveda



## Breve explicacion

Realizacion de Prueba tecnica para nequi, se solicito un backend que permita la creacion de franquicias, sucurcursales y productos, adicional un reporte que los productos com mas unidades dentro de cada una de las sucursales que pertenece a una franquicia en especifico

## Documentacion de endpoints

La documentacion se puede encontrar en el siguiente enlace: [Postman]


## Modelo DB aplicado
<p align="center">
 <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR4PhnWOXfc3pJilsa8EtS2anLtpgPtUb3VJPU7V32rjJGUamCT976vWUL-i5hkoDrsJC3EAmxlUbYGQ9-rQxMIDL3nkw=w3024-h1648" width="400" alt="modelo db" /></a>
</p>



## Requerimientos

**1:**  agregar una nueva franquicia.
**2:**  agregar una nueva sucursal a una franquicia.
**3:**  agregar un nuevo producto a una sucursal.
**4:**  modificar el stock de un producto.
**5:**  mostrar cual es el producto que más stock tiene por sucursal para una franquicia puntual.
**6:**  Persistencia de datos

## Vesiones 

**Backend:** Nest.js, node v18

**DataBase:** MySQL:8.3


## Instalaccion Docker

Inicializacion con dockers en la raiz del proyecto ejecutar

```bash
  docker-compose up -d --build
```

Este comando deberia permitir ya el ingreso a toda la prueba

- Endpoint front: http://localhost:3000
- Conexion a bd http://localhost:3306


## Instalaccion Manual
Instalacion manual usar node v18

en la carpeta raiz del proyecto ejecutamos los siguientes comandos.

Backend 
- Lista de comandos
```bash
  cd backend
  yarn install || npm install
  yarn start:dev || npm start:dev
```

Base de datos
```bash
  docker-compose start mysql
```


## Tests


No se implementaron test, pero en futura version se agregaran.



[Postman]: <https://documenter.getpostman.com/view/3188599/2s9YymFQ6i>