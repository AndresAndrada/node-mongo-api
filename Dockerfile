FROM node:20.17.0

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm@9.7.0

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN pnpm run build

# Exponer el puerto configurado
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]