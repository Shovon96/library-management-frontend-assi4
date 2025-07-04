import { Card, CardContent } from "@/components/ui/card";
import { BookCheck, Users, NotepadText, Headset } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function FeatureCards() {
  const features = [
    { icon: <BookCheck className="h-8 w-8 text-yellow-400" />, count: 15000, suffix: "+", label: "Books" },
    { icon: <Users className="h-8 w-8 text-gray-300" />, count: 2400, suffix: "+", label: "Readers" },
    { icon: <NotepadText className="h-8 w-8 text-blue-600" />, count: 50, suffix: "+", label: "Categories" },
    { icon: <Headset className="h-8 w-8 text-yellow-400" />, count: 24, suffix: "/7", label: "Support" },
  ];

  const { ref, inView } = useInView({ triggerOnce: true });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-10">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg rounded-2xl hover:scale-105 transition-transform duration-300"
        >
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
            {feature.icon}
            <div className="text-2xl font-bold">
              {startCount ? (
                <CountUp end={feature.count} duration={2} suffix={feature.suffix} />
              ) : (
                `0${feature.suffix}`
              )}
            </div>
            <div className="text-sm">{feature.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
