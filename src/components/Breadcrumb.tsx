import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: Array<{ label: string; to?: string }>;
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
      <Link to="/" className="hover:text-primary-foreground transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
