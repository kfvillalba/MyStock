# Etapa 1: Construcción de la aplicación
FROM node:16-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto en el que el servidor Nginx se ejecutará
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
