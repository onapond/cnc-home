interface StatsCardProps {
  label: string;
  value: number;
  color: string;
}

export function StatsCard({ label, value, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-[var(--shadow-sm)] p-6 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
        style={{ backgroundColor: color }}
      >
        {value}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-dark-roast">{value}</p>
      </div>
    </div>
  );
}
