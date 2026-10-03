# PMPE | AOCP PREP

Aplicativo de estudo para preparação ao concurso PMPE com foco na banca AOCP.

## Como executar

Você pode abrir o `index.html` diretamente no navegador, mas a recomendação é usar um servidor local.

### Opção 1: Python
```bash
python -m http.server 8000
```

Depois acesse:
```text
http://localhost:8000
```

### Opção 2: Live Server
Abra a pasta no VS Code e use a extensão Live Server.

## Funcionalidades
- Simulado com timer
- Filtro por disciplina
- Banco de questões em JSON
- Resultado final com percentual
- Layout responsivo
- PWA com cache/offline
- Estrutura pronta para expansão

## Estrutura
- `index.html`
- `src/app.js`
- `src/styles.css`
- `data/edital.json`
- `data/questions.json`
- `manifest.webmanifest`
- `sw.js`

## Observação
O aplicativo já está pronto para receber centenas e milhares de questões; basta inserir novos itens no arquivo `data/questions.json`.
