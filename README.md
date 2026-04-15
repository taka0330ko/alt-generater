# Green Sabon

A simple web app that generates alt text from images. Upload an image or drag and drop one into the app, then generate descriptive alternative text with Puter.js AI.

## Features

- Image file selection
- Drag-and-drop image upload
- Uploaded image preview
- AI-generated alt text
- Copy generated text
- Light and dark theme toggle
- Loading animation

## Tech Stack

- HTML
- TypeScript
- Tailwind CSS v4
- Puter.js

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

After the build, JavaScript and CSS files are generated in `dist/`.

### Development

You can watch TypeScript and CSS changes separately.

```bash
npm run watch:ts
```

```bash
npm run watch:css
```

This project loads `dist/main.js` and `dist/style.css` from `index.html`. During development, run the watch commands and open `index.html` in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Build TypeScript, CSS, and static files |
| `npm run build:ts` | Build TypeScript into `dist/` |
| `npm run build:css` | Build Tailwind CSS into `dist/style.css` |
| `npm run build:static` | Process static files for the build |
| `npm run watch:ts` | Watch TypeScript changes |
| `npm run watch:css` | Watch CSS changes |

## Project Structure

```text
.
├── assets/
│   └── icons/
├── dist/
├── public/
├── scripts/
│   └── build-static.mjs
├── src/
│   ├── alt-generator.ts
│   ├── clipboard.ts
│   ├── file-preview.ts
│   ├── file-state.ts
│   ├── loadingAnimation.ts
│   ├── main.ts
│   ├── style.css
│   └── theme.ts
├── index.html
├── package.json
├── tsconfig.json
└── vercel.json
```

## Main Files

- `index.html`: App markup
- `src/main.ts`: Initializes app features
- `src/alt-generator.ts`: Generates alt text with Puter.js
- `src/file-preview.ts`: Handles file selection, drag and drop, and image preview
- `src/clipboard.ts`: Copies generated text
- `src/theme.ts`: Handles theme switching
- `src/style.css`: Tailwind CSS and custom styles

## Deployment

The Vercel configuration is defined in `vercel.json`.

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Notes

- AI generation depends on Puter.js, which is loaded in `index.html`.
- `dist/` contains build output. Most source changes should be made in `src/`.
- Select an image file, then click `Generate alt text` to start generation.


## References

- CSS linear() easing reference  
  https://ics.media/en/entry/260402/

- Blob keyframe animation inspiration  
  https://codepen.io/markmiscavage/pen/NoJEYG

- Theme switch spring animation reference  
  https://github.com/ics-creative/260402_spring_animation/blob/main/examples/01_switch.html
