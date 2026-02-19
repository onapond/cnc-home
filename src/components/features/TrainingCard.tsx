import Image from "next/image";
import { TrainingProgram } from "@/types";

interface TrainingCardProps {
  program: TrainingProgram;
}

export function TrainingCard({ program }: TrainingCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-[var(--shadow-sm)] overflow-hidden text-center transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <Image
          src={program.image}
          alt={program.alt}
          width={400}
          height={200}
          className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-dark-roast/0 group-hover:bg-dark-roast/20 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-roast mb-3">
          {program.title}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed">
          {program.description}
        </p>
      </div>
    </div>
  );
}
