# README Pro

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/harshitgp814/readme-pro/tree/main)

README Pro is an elegant web application that instantly generates beautiful and professional README files for your GitHub repositories. Simply provide a repository URL, select your desired sections, choose an AI provider, and let the magic happen.

The application is built with a modern tech stack, featuring a clean, responsive UI with both light and dark modes, inspired by the design principles of Vercel, Linear, and Notion.

## Features

-   **AI-Powered Generation**: Leverages AI providers like Google Gemini and OpenAI to analyze your repository and generate relevant content.
-   **Customizable Sections**: Choose which sections to include in your README, such as Title & Description, Features, Tech Stack, Installation, and more.
-   **Live Preview**: Instantly view the generated content in both rendered and raw Markdown formats using a tabbed interface.
-   **Modern UI/UX**: A sleek, responsive, and intuitive interface built with shadcn/ui and Tailwind CSS.
-   **Dark & Light Mode**: Seamlessly switch between themes to suit your preference.
-   **Easy Export**: Copy the generated Markdown to your clipboard or download it as a `README.md` file with a single click.
-   **Client-Side Processing**: Fast and efficient, with a mock API demonstrating the core functionality (can be extended to a full backend).

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **UI Components**: shadcn/ui, Radix UI
-   **Styling**: Tailwind CSS
-   **Form Management**: React Hook Form, Zod
-   **Routing**: React Router
-   **State Management**: React Query, Zustand (implied by `use-toast` custom hook structure)

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/harshitgp814/readme-pro.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd readme-pro
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

## Project Structure

The project follows a component-based architecture, with a clear separation of concerns.

```
/src
├── assets/          # Static assets like images
├── components/      # Reusable application components
│   ├── ui/          # Core UI components from shadcn/ui
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── InputForm.tsx
│   └── PreviewSection.tsx
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── pages/           # Application pages/routes
```

-   `src/pages/Index.tsx`: The main entry point of the application, orchestrating the state and interactions between different components.
-   `src/components/InputForm.tsx`: Handles user input for the repository URL, AI provider, and desired sections.
-   `src/components/PreviewSection.tsx`: Manages the display of the generated README, including the skeleton loader, live preview, and export options.
-   `src/index.css`: Defines the custom design system, including CSS variables for light and dark themes.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add new features, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
