# Ele & Davi - Sito Web Matrimonio

Sito web del matrimonio di Eleonora e Davide - 6 Giugno 2026, Corte Maddalena, Capoterra, Sardegna.

## Setup

```bash
npm install
npm run dev
```

Il sito sara' disponibile su `http://localhost:5173`.

## Build per produzione

```bash
npm run build
npm run preview  # anteprima locale della build
```

I file di output saranno nella cartella `dist/`.

## Deploy

Il progetto e' pronto per il deploy su **Netlify** o **Vercel**:

### Netlify
1. Connetti il repository GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Importa il repository
2. Framework preset: Vite
3. Deploy automatico

## Struttura del progetto

```
src/
  components/     # Componenti React (Hero, Gallery, RSVP, ecc.)
  data/
    content.json  # Tutti i contenuti del sito (facile da modificare)
  hooks/          # Custom hooks (countdown, intersection observer)
  styles/
    globals.css   # Stili globali e design tokens Tailwind
public/
  images/         # Immagini del sito
    gallery/      # Foto della galleria
    watercolor/   # Elementi decorativi
```

## Personalizzazione contenuti

Tutti i testi, date, contatti e informazioni sono nel file `src/data/content.json`. Puoi modificare:

- **Informazioni coppia**: nomi, data, location
- **Timeline evento**: orari della giornata
- **La nostra storia**: momenti chiave della relazione
- **Galleria**: foto (placeholder, sostituire con foto reali)
- **Alloggi**: hotel convenzionati
- **Lista nozze**: esperienze e metodi di pagamento
- **FAQ**: domande e risposte
- **Contatti**: email e WhatsApp

## Aggiungere foto reali

1. Metti le foto nella cartella `public/images/gallery/`
2. Aggiorna i riferimenti in `src/data/content.json` nella sezione `gallery`
3. Per la gallery dei componenti, aggiorna anche `src/components/Gallery.jsx` sostituendo i placeholder

## Collegare il form RSVP

Il form RSVP e' pronto con validazione. Per collegarlo a un backend:

- **Formspree**: Cambia l'handler in `RSVP.jsx` per fare POST a `https://formspree.io/f/YOUR_ID`
- **Google Forms**: Usa un endpoint Google Forms
- **Airtable**: Integra con l'API di Airtable

## Stack tecnologico

- React 19 + Vite 7
- Tailwind CSS 4
- Framer Motion (animazioni)
- React Hook Form (gestione form)
- Lucide React (icone)

## Funzionalita'

- Countdown in tempo reale
- Navigazione responsive con menu mobile
- Sezioni lazy-loaded per performance
- Galleria con lightbox e filtri
- Form RSVP con validazione
- Lista nozze con esperienze acquistabili (redirect PayPal)
- FAQ con accordion
- Guest book digitale
- Easter egg (Konami code)
- Design elegante con palette pastello
