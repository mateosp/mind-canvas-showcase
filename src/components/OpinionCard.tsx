import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { Opinion } from "@/data/opinionData"

interface OpinionCardProps {
  opinion: Opinion;
}

export function OpinionCard({ opinion }: OpinionCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30 p-6 h-full">
      <CardContent className="p-0 space-y-4">
        {/* Quote Icon */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full bg-gradient-card flex items-center justify-center text-white">
            <Quote className="h-6 w-6" />
          </div>
          <div className="flex space-x-1">
            {renderStars(opinion.rating)}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            "{opinion.content}"
          </p>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-3 pt-4 border-t border-muted/30">
          <div className="w-10 h-10 rounded-full bg-gradient-card flex items-center justify-center text-white text-sm font-semibold">
            {opinion.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{opinion.author}</h4>
            <p className="text-xs text-muted-foreground">{opinion.role}</p>
            <p className="text-xs text-muted-foreground">{opinion.source}</p>
          </div>
        </div>

        {/* Date Badge */}
        <div className="flex justify-end">
          <Badge variant="secondary" className="text-xs bg-gradient-card text-white">
            {new Date(opinion.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
} 