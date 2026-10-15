# A Professora · Yogue-se

Página de homenagem de **Dia do Professor** para uma professora de yoga — feita no
estilo da identidade visual do studio **Yogue-se** (o pato que medita).

Site estático (HTML + CSS + JS), sem build, pronto para o **GitHub Pages**.
Feito *mobile-first*, porque a homenageada vai abrir no celular.

## Ver localmente

Basta abrir o `index.html` no navegador. Ou, para simular um servidor:

```bash
npx serve .
```

## Estrutura

```
index.html          página única (as 5 seções + rodapé)
styles.css          estilos (mobile-first, tokens no :root)
script.js           animações: reveal no scroll + pato que reage ao rolar
assets/
  brand/duck.svg    mascote (o mesmo pato do logo, redesenhado em SVG)
  img/              fotos otimizadas (WebP + fallback JPG) e og-cover
source/             fotos originais em alta (fora do site, p/ reprocessar)
build/              ferramentas (sharp/puppeteer) — não vai pro site
.github/workflows/  publicação automática no GitHub Pages
```

## O que editar antes de publicar

- **Nome dela:** procure por `[nome dela]` no `index.html` (aparece na legenda da
  carta, no hero).
- **Texto da carta:** seção `#carta-aberta` no `index.html`.
- Seu nome já está preenchido como **Leo**.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba este projeto:

   ```bash
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git branch -M main
   git push -u origin main
   ```

2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O workflow em `.github/workflows/deploy.yml` publica automaticamente a cada push
na branch `main`. A URL aparece em **Settings → Pages**.

## Reprocessar as fotos

Se trocar/adicionar fotos em `source/`, edite o mapa em `build/optimize.mjs` e rode:

```bash
cd build && npm install && node optimize.mjs
```
