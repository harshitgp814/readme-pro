import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputForm from "@/components/InputForm";
import PreviewSection from "@/components/PreviewSection";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (data: {
    repoUrl: string;
    provider: string;
    sections: string[];
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock README content based on the repository URL
      const repoName = data.repoUrl.split('/').pop() || 'Your Project';
      const username = data.repoUrl.split('/').slice(-2, -1)[0] || 'username';
      
      const mockContent = generateMockReadme(repoName, username, data.sections);
      setMarkdownContent(mockContent);
      
      toast({
        title: "README Generated!",
        description: "Your professional README has been created successfully.",
        duration: 3000,
      });
    } catch (err) {
      const errorMessage = "Failed to generate README. Please check your repository URL and try again.";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockReadme = (repoName: string, username: string, sections: string[]) => {
    let content = "";
    
    if (sections.includes("title")) {
      content += `# ${repoName}\n\n`;
      content += `> A modern and elegant project built with passion\n\n`;
    }
    
    if (sections.includes("description")) {
      content += `## 📝 Description\n\n`;
      content += `${repoName} is an innovative project that demonstrates modern development practices and clean architecture. Built with attention to detail and user experience in mind.\n\n`;
    }
    
    if (sections.includes("features")) {
      content += `## ⭐ Features\n\n`;
      content += `- 🚀 **Fast & Lightweight** - Optimized for performance\n`;
      content += `- 🎨 **Beautiful UI** - Clean and modern design\n`;
      content += `- 📱 **Responsive** - Works on all devices\n`;
      content += `- 🔧 **Easy Setup** - Quick installation and configuration\n`;
      content += `- 🌙 **Dark Mode** - Built-in theme support\n\n`;
    }
    
    if (sections.includes("tech-stack")) {
      content += `## 🛠️ Tech Stack\n\n`;
      content += `- **Frontend:** React, TypeScript, Tailwind CSS\n`;
      content += `- **Backend:** Node.js, Express\n`;
      content += `- **Database:** PostgreSQL\n`;
      content += `- **Tools:** Vite, ESLint, Prettier\n\n`;
    }
    
    if (sections.includes("installation")) {
      content += `## 📦 Installation\n\n`;
      content += `\`\`\`bash\n`;
      content += `# Clone the repository\n`;
      content += `git clone https://github.com/${username}/${repoName}.git\n\n`;
      content += `# Navigate to project directory\n`;
      content += `cd ${repoName}\n\n`;
      content += `# Install dependencies\n`;
      content += `npm install\n\n`;
      content += `# Start development server\n`;
      content += `npm run dev\n`;
      content += `\`\`\`\n\n`;
    }
    
    if (sections.includes("usage")) {
      content += `## 🚀 Usage\n\n`;
      content += `\`\`\`javascript\n`;
      content += `import { ${repoName} } from './${repoName.toLowerCase()}';\n\n`;
      content += `// Initialize the application\n`;
      content += `const app = new ${repoName}();\n\n`;
      content += `// Start the application\n`;
      content += `app.start();\n`;
      content += `\`\`\`\n\n`;
    }
    
    if (sections.includes("api")) {
      content += `## 📚 API Documentation\n\n`;
      content += `### Endpoints\n\n`;
      content += `- \`GET /api/data\` - Fetch all data\n`;
      content += `- \`POST /api/data\` - Create new entry\n`;
      content += `- \`PUT /api/data/:id\` - Update entry\n`;
      content += `- \`DELETE /api/data/:id\` - Delete entry\n\n`;
    }
    
    if (sections.includes("contributing")) {
      content += `## 🤝 Contributing\n\n`;
      content += `1. Fork the repository\n`;
      content += `2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)\n`;
      content += `3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)\n`;
      content += `4. Push to the branch (\`git push origin feature/AmazingFeature\`)\n`;
      content += `5. Open a Pull Request\n\n`;
    }
    
    if (sections.includes("license")) {
      content += `## 📄 License\n\n`;
      content += `This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.\n\n`;
    }
    
    if (sections.includes("roadmap")) {
      content += `## 🗺️ Roadmap\n\n`;
      content += `- [x] Initial release\n`;
      content += `- [x] Basic functionality\n`;
      content += `- [ ] Advanced features\n`;
      content += `- [ ] Mobile app\n`;
      content += `- [ ] API v2\n\n`;
    }
    
    if (sections.includes("screenshots")) {
      content += `## 📸 Screenshots\n\n`;
      content += `![App Screenshot](https://via.placeholder.com/800x600?text=App+Screenshot)\n\n`;
    }
    
    content += `---\n\n`;
    content += `<div align="center">\n`;
    content += `  <p>Made with ❤️ by <a href="https://github.com/${username}">${username}</a></p>\n`;
    content += `  <p>⭐ Star this repo if you find it useful!</p>\n`;
    content += `</div>`;
    
    return content;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InputForm 
          onGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
        />
        <PreviewSection 
          markdownContent={markdownContent}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;