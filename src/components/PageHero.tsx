import Breadcrumb from "@/components/Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{ label: string; to?: string }>;
}

const PageHero = ({ title, subtitle, breadcrumbs }: PageHeroProps) => {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full border border-primary-foreground" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full border border-primary-foreground" />
      </div>
      <div className="container pt-20 pb-10 md:pt-28 md:pb-14 relative z-10">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="font-display font-extrabold text-2xl md:text-5xl text-primary-foreground mt-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-foreground/80 text-lg mt-3 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
