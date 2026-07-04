import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metrics?: Array<{ label: string; value: string }>;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  metrics = [],
  className = '',
}: ServiceCardProps) {
  return (
    <div
      className={`
        group relative rounded-2xl p-8 bg-card border border-border
        transition-all duration-300 ease-out
        hover:border-secondary hover:shadow-2xl hover:-translate-y-2
        ${className}
      `}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-secondary to-accent" />

      {/* Icon */}
      <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-secondary group-hover:text-accent transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
          {metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-lg font-bold text-gradient">{metric.value}</div>
              <div className="text-xs text-muted-foreground label-sm">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative glow */}
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-secondary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default ServiceCard;
