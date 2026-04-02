import { SITE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-7xl mx-auto mb-6 flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base"
    >
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#4B5563]">›</span>}
          {i === items.length - 1 ? (
            <span className="text-[#F9FAFB] line-clamp-1">{item.name}</span>
          ) : (
            <a
              href={item.path}
              className="hover:text-[#00D4FF] transition-colors duration-200"
            >
              {item.name}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
