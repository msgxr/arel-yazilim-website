import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'workshop' | 'hackathon' | 'seminar' | 'panel' | 'training' | 'social' | 'active' | 'development' | 'completed' | 'upcoming' | 'past';

const variantClasses: Record<BadgeVariant, string> = {
  default:     'bg-slate-100 text-slate-600',
  workshop:    'bg-orange-soft text-orange-DEFAULT',
  hackathon:   'bg-purple-100 text-purple-700',
  seminar:     'bg-blue-100 text-blue-700',
  panel:       'bg-cyan-100 text-cyan-700',
  training:    'bg-teal-100 text-teal-700',
  social:      'bg-pink-100 text-pink-700',
  active:      'bg-green-100 text-green-700',
  development: 'bg-yellow-100 text-yellow-700',
  completed:   'bg-slate-100 text-slate-500',
  upcoming:    'bg-orange-soft text-orange-DEFAULT',
  past:        'bg-slate-100 text-slate-500',
};

type EventType = 'Workshop' | 'Hackathon' | 'Seminar' | 'Panel' | 'Training' | 'Social';

// Map event types to badge variants
export const eventTypeBadge: Record<EventType, BadgeVariant> = {
  Workshop:  'workshop',
  Hackathon: 'hackathon',
  Seminar:   'seminar',
  Panel:     'panel',
  Training:  'training',
  Social:    'social',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string | undefined;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

// Category announcement badge
type AnnouncementCategory = 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel';

const catVariant: Record<AnnouncementCategory, BadgeVariant> = {
  'Üyelik':   'upcoming',
  'Yarışma':  'hackathon',
  'Workshop': 'workshop',
  'Etkinlik': 'seminar',
  'Genel':    'default',
};

export function AnnouncementBadge({ category }: { category: AnnouncementCategory }) {
  return <Badge variant={catVariant[category]}>{category}</Badge>;
}
