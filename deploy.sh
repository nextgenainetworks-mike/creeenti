#!/bin/bash

# 1. Compilar el proyecto
echo "📦 Compilando el proyecto..."
npm run build

# 2. Guardar cambios en la rama principal (main)
echo "💾 Guardando cambios en Git (rama main)..."
git add .
read -p "Introduce el mensaje del cambio (ej: 'Ajuste de textos'): " message
if [ -z "$message" ]; then
  message="Actualización automática"
fi

git commit -m "$message"
git push origin main

# 3. Empujar la carpeta compilada (dist) a la rama de despliegue (deploy)
echo "🚀 Subiendo compilación a la rama 'deploy' para Hostinger..."
git subtree push --prefix dist origin deploy

echo "✅ ¡Listo! Despliegue completado."
