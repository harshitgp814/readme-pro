import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Github, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InputFormProps {
  onGenerate: (data: {
    repoUrl: string;
    provider: string;
    sections: string[];
  }) => void;
  isLoading: boolean;
  error: string | null;
}

const InputForm = ({ onGenerate, isLoading, error }: InputFormProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [provider, setProvider] = useState("gemini");
  const [selectedSections, setSelectedSections] = useState([
    "title",
    "description",
    "features", 
    "installation",
    "usage",
    "tech-stack"
  ]);

  const availableSections = [
    { id: "title", label: "📝 Title & Description" },
    { id: "features", label: "⭐ Features" },
    { id: "tech-stack", label: "🛠️ Tech Stack" },
    { id: "installation", label: "📦 Installation" },
    { id: "usage", label: "🚀 Usage" },
    { id: "api", label: "📚 API Documentation" },
    { id: "contributing", label: "🤝 Contributing" },
    { id: "license", label: "📄 License" },
    { id: "roadmap", label: "🗺️ Roadmap" },
    { id: "screenshots", label: "📸 Screenshots" }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      repoUrl,
      provider,
      sections: selectedSections
    });
  };

  const isValidGitHubUrl = (url: string) => {
    return /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url);
  };

  return (
    <div className="container px-4 -mt-10 relative z-10">
      <Card className="max-w-2xl mx-auto glass shadow-2xl border-0 animate-scale-in">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            Generate Your README
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="animate-slide-up">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Repository URL Input */}
            <div className="space-y-2">
              <Label htmlFor="repo-url" className="text-sm font-medium">
                GitHub Repository URL
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repo-url"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="pl-10 h-12 focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* LLM Provider Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">AI Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select AI provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                  <SelectItem value="openai">OpenAI GPT</SelectItem>
                  <SelectItem value="custom">Custom Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sections Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">README Sections</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableSections.map((section) => (
                  <div key={section.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={section.id}
                      checked={selectedSections.includes(section.id)}
                      onCheckedChange={() => handleSectionToggle(section.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor={section.id}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {section.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedSections.map((sectionId) => {
                  const section = availableSections.find(s => s.id === sectionId);
                  return section ? (
                    <Badge key={sectionId} variant="secondary" className="text-xs">
                      {section.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              type="submit"
              variant="premium"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading || !repoUrl || !isValidGitHubUrl(repoUrl)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating README...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate README
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputForm;