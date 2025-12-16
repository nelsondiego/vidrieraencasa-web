#!/bin/bash

# Script to get Cloudflare D1 Database ID and update wrangler.toml
# Usage: ./scripts/get-database-id.sh

set -e

echo "🔍 Buscando base de datos D1..."
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

# List D1 databases
echo "📋 Listando bases de datos D1..."
echo ""
wrangler d1 list

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Instrucciones:"
echo ""
echo "1. Copia el Database ID de 'vidrieraencasa-db' de la tabla anterior"
echo "2. Abre el archivo wrangler.toml"
echo "3. Reemplaza 'your-database-id-here' con el ID real"
echo ""
echo "Ejemplo:"
echo "  database_id = \"abc123-def456-ghi789-jkl012-mno345\""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Para más información, ver: GET_DATABASE_ID.md"
echo ""
