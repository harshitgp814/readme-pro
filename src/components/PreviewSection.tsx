import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileText, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PreviewSectionProps {
  markdownContent: string;
  isLoading: boolean;
}

const PreviewSection = ({ markdownContent, isLoading }: PreviewSectionProps) => {
  const [activeTab, setActiveTab] = useState("preview");
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      toast({
        title: "Copied!",
        description: "README content copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const downloadFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "README.md file has been downloaded",
      duration: 2000,
    });
  };

  const SkeletonLoader = () => (
    <div className="space-y-4 p-6">
      <div className="h-8 bg-muted rounded skeleton w-3/4"></div>
      <div className="h-4 bg-muted rounded skeleton w-full"></div>
      <div className="h-4 bg-muted rounded skeleton w-5/6"></div>
      <div className="h-6 bg-muted rounded skeleton w-1/2 mt-8"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded skeleton w-full"></div>
        <div className="h-4 bg-muted rounded skeleton w-4/5"></div>
        <div className="h-4 bg-muted rounded skeleton w-3/4"></div>
      </div>
      <div className="h-32 bg-muted rounded skeleton w-full mt-6"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <Card className="glass border-0 shadow-2xl animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold">Generating README...</h2>
          </CardHeader>
          <CardContent>
            <SkeletonLoader />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!markdownContent) return null;

  return (
    <div className="container px-4 py-8">
      <Card className="glass border-0 shadow-2xl animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Generated README</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadFile}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="preview" 
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger 
                value="markdown" 
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                Raw Markdown
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-0">
              <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
                <div dangerouslySetInnerHTML={{ 
                  __html: markdownContent
                    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/`(.+?)`/g, '<code>$1</code>')
                    .replace(/^\- (.+)$/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
                    .replace(/\n/g, '<br>')
                }} />
              </div>
            </TabsContent>
            
            <TabsContent value="markdown" className="mt-0">
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm whitespace-pre-wrap font-mono text-foreground overflow-x-auto">
                  {markdownContent}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewSection;