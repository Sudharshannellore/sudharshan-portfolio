# SUDHARSHAN® — Portfolio

React + Vite + Tailwind CSS + Framer Motion. Runs entirely in the browser, with no backend.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Editing content

All the text and links live in `src/data/`. You don't need to touch the components to change content.

| What | Where |
| --- | --- |
| Name, email, LinkedIn, **GitHub URL** (placeholder for now), section copy, experience, education | `src/data/portfolio.js` |
| Selected projects (currently placeholders) | `src/data/projects.js` |

Each project entry supports `title`, `category`, `description`, `stack`, `github`, `live`, an optional `image` (put files in `public/`), and `visual`. `visual` picks a built-in mockup: `dashboard`, `editor`, `api`, `workflow`, `subscription` or `dataviz`. Set `placeholder: false` once an entry holds real details. That removes the "Placeholder" tag.

## Structure

- `src/components/`: one component per section, plus shared pieces (`SectionHeading`, `AnimatedText`, `MagneticButton`, `TiltCard`, `CustomCursor`, `ScrollProgress`, `TechnicalGrid`, `OrbitalVisual`, `NeuralNetwork`)
- `src/components/visuals/`: the custom illustrations: the canvas 3D wireframe sphere, the architecture diagram, the expertise visuals and the project mockups
- `src/hooks/`: `useActiveSection`, `useReducedMotion`, `usePointer`
- `src/styles/animations.css`: keyframes, plus the global reduced-motion override
