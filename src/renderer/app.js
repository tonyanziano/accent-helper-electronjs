import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

// The esbuild bundler doesn't like "import React from 'react'"-style import statements
// so we expose React as a global on the window here to make it available.
window.React = React;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
