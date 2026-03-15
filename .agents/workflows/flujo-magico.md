---
description: Flujo mágico — commit, push y PR hacia main en GitHub
---

# Flujo Mágico con GitHub

Este workflow automatiza el proceso completo de subir cambios a GitHub desde la rama activa.

## Pasos

1. Verificar la rama actual y el estado del repositorio:
```bash
cd "/Users/luisjimenez/Library/Mobile Documents/com~apple~CloudDocs/Proyecto VantaxDigital/website" && git status && git branch
```

// turbo
2. Añadir todos los cambios al staging area:
```bash
cd "/Users/luisjimenez/Library/Mobile Documents/com~apple~CloudDocs/Proyecto VantaxDigital/website" && git add -A
```

3. Hacer el commit con un mensaje descriptivo (sustituir MESSAGE por el mensaje real):
```bash
cd "/Users/luisjimenez/Library/Mobile Documents/com~apple~CloudDocs/Proyecto VantaxDigital/website" && git commit -m "MESSAGE"
```

// turbo
4. Hacer push de la rama al remoto:
```bash
cd "/Users/luisjimenez/Library/Mobile Documents/com~apple~CloudDocs/Proyecto VantaxDigital/website" && git push -u origin $(git rev-parse --abbrev-ref HEAD)
```

5. (Opcional) Abrir GitHub para crear el Pull Request manualmente, o usar gh CLI si está disponible:
```bash
gh pr create --base main --head $(git rev-parse --abbrev-ref HEAD) --title "TITLE" --body "BODY"
```
