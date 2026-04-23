
Hii Recuiters:)

This project is a visual workflow designer built with React. I built it to let users easily map out HR processes, like onboarding sequences or approval chains, using a smooth drag-and-drop interface. Once a workflow is designed, you can run a quick simulation to see exactly how it would execute.

My main focus here was to build a clean, modular system that is easy to extend, while making sure the core functionality works flawlessly.

Features

1. Workflow Canvas
   • You can drag and drop nodes onto the canvas.
   • Connect nodes to define the flow of your process.
   • Easily update or delete nodes and edges.

2. Custom Node Types
   The designer supports the following nodes:
   • Start Node
   • Task Node
   • Approval Node
   • Automated Step Node
   • End Node

3. Node Configuration Panel
   • You can select any node to edit its specific configuration.
   • Different forms dynamically render depending on the node type.
   • There is full support for dynamic fields, like automation parameters.

4. Workflow Simulation
   • The app serializes the entire workflow graph into JSON.
   • Sends it over to a mock API.
   • Displays step-by-step execution logs so you can follow along.
   • Performs basic validation to catch missing connections or infinite cycles.

5. State Management
   • Everything is tied together using Zustand for simple, predictable state updates.


How to Run

To try it out locally, simply open your terminal and run the following commands in order:
1. npm install
2. npm run dev

Tech Stack

The project uses the following technologies:
• React via Vite for speed.
• TypeScript for strict typing and safety.
• React Flow for the canvas engine.
• Zustand for state management.
• Tailwind CSS for styling.

Design Choices

• React Flow: I went with React Flow instead of building a canvas from scratch so I could focus entirely on the workflow business logic rather than the math of panning and zooming.
• Zustand: Chosen over Redux for its incredibly lightweight state management and minimal boilerplate. It plays nicely with the reactive canvas.
• TypeScript: Used extensively across the project to ensure better type safety, especially for node schemas, and to catch errors at compile time instead of runtime.

Future Improvements

If I had more time, I would love to add:
1. A real backend integration to actually save and persist workflows.
2. Conditional branching, like decision gateways or XOR nodes.
3. An undo and redo stack for the canvas.
4. Better visual validation, like showing red error borders directly on invalid nodes.
5. An auto-layout feature to magically tidy up messy graphs.

Summary

At its core, this project focuses on building a structured and extensible workflow system where UI, state, and logic are clearly separated. The goal was always to prioritize clean architecture and reliable functionality over unnecessary UI complexity.
