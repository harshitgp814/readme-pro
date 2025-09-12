import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative py-20 px-4 animate-fade-in overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(213, 100%, 96%) 0%, hsla(0, 0%, 100%, 0.8) 50%, hsl(210, 13%, 97%) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
          Instantly Generate{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Beautiful READMEs
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Give us your GitHub repo → we'll create a professional README for you.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;