/** The Aedis keystone mark. Decorative: the wordmark next to it carries the name. */
export function Keystone({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <polygon points="8,8 56,8 47,58 17,58" fill="#C8A24C" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="56,8 47,58 40,8" fill="#9C7C2C" />
      <circle cx="32" cy="27" r="6.5" fill="#0E1626" />
      <rect x="29.5" y="29" width="5" height="15" rx="1.5" fill="#0E1626" />
    </svg>
  );
}
