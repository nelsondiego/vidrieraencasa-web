#!/bin/bash

# Script to run database migrations on Cloudflare D1
# Usage: ./scripts/run-migrations.sh

set -e

DATABASE_NAME="vidrieraencasa-db"

echo "🗄️  Ejecutando migraciones en D1..."
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: Wrangler CLI no está instalado"
    echo ""
    echo "Instala Wrangler con:"
    echo "  npm install -g wrangler"
    echo ""
    exit 1
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "❌ Error: No estás autenticado en Cloudflare"
    echo ""
    echo "Inicia sesión con:"
    echo "  wrangler login"
    echo ""
    exit 1
fi

echo "✅ Wrangler CLI instalado y autenticado"
echo ""

# Check if migration files exist
if [ ! -d "drizzle/migrations" ]; then
    echo "❌ Error: No se encontró el directorio drizzle/migrations"
    echo ""
    exit 1
fi

echo "📁 Archivos de migración encontrados:"
ls -1 drizzle/migrations/*.sql 2>/dev/null || echo "  (ninguno)"
echo ""

# Confirm before running
echo "⚠️  ADVERTENCIA: Esto modificará la base de datos en producción"
echo ""
read -p "¿Deseas continuar? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operación cancelada"
    exit 0
fi

echo ""
echo "🚀 Aplicando migraciones a $DATABASE_NAME..."
echo ""

# Run migrations
wrangler d1 migrations apply "$DATABASE_NAME" --remote

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Migraciones aplicadas exitosamente"
echo ""
echo "🔍 Verificando tablas creadas..."
echo ""

# Verify tables
wrangler d1 execute "$DATABASE_NAME" --command "SELECT name FROM sqlite_master WHERE type='table'" --remote

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Tablas esperadas:"
echo "  - users"
echo "  - sessions"
echo "  - plans"
echo "  - addons"
echo "  - images"
echo "  - analyses"
echo "  - payments"
echo "  - credit_transactions"
echo "  - _cf_KV (tabla interna)"
echo "  - d1_migrations (tabla interna)"
echo ""
echo "✅ Si todas las tablas aparecen arriba, la migración fue exitosa"
echo ""
echo "📖 Para más información, ver: GET_DATABASE_ID.md"
echo ""
