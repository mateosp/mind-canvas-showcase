export interface Opinion {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  source: string;
  avatar?: string;
}

export const pressOpinions: Opinion[] = [
  {
    id: "1",
    author: "María González",
    role: "Crítica de Arte",
    content: "Una experiencia artística excepcional que redefine los límites de la creatividad contemporánea. La exposición presenta una visión fresca y audaz del arte moderno.",
    rating: 5,
    date: "2024-01-15",
    source: "El País Cultural",
    avatar: "/avatars/maria.jpg"
  },
  {
    id: "2",
    author: "Carlos Ruiz",
    role: "Editor de Arte",
    content: "La muestra demuestra una madurez artística extraordinaria. Cada pieza cuenta una historia única que resuena con el espectador de manera profunda y significativa.",
    rating: 5,
    date: "2024-01-12",
    source: "Arte y Cultura Magazine",
    avatar: "/avatars/carlos.jpg"
  },
  {
    id: "3",
    author: "Ana Martínez",
    role: "Periodista Cultural",
    content: "Una propuesta innovadora que combina técnicas tradicionales con tecnología moderna. El resultado es una experiencia visual que no se puede olvidar.",
    rating: 4,
    date: "2024-01-10",
    source: "Cultura Digital",
    avatar: "/avatars/ana.jpg"
  },
  {
    id: "4",
    author: "Luis Fernández",
    role: "Crítico Independiente",
    content: "La exposición representa un hito en el panorama artístico actual. La calidad técnica y la profundidad conceptual son simplemente excepcionales.",
    rating: 5,
    date: "2024-01-08",
    source: "Arte Contemporáneo",
    avatar: "/avatars/luis.jpg"
  },
  {
    id: "5",
    author: "Sofia Herrera",
    role: "Directora de Galería",
    content: "Una muestra que desafía las convenciones y establece nuevos estándares en el mundo del arte. La creatividad y originalidad son admirables.",
    rating: 4,
    date: "2024-01-05",
    source: "Galería Moderna",
    avatar: "/avatars/sofia.jpg"
  }
];

export const columnOpinions: Opinion[] = [
  {
    id: "1",
    author: "Dr. Elena Vargas",
    role: "Historiadora del Arte",
    content: "Esta exposición representa un momento crucial en la evolución del arte contemporáneo. La fusión de elementos clásicos con innovación tecnológica crea un diálogo fascinante entre pasado y presente.",
    rating: 5,
    date: "2024-01-20",
    source: "Revista de Historia del Arte",
    avatar: "/avatars/elena.jpg"
  },
  {
    id: "2",
    author: "Prof. Miguel Torres",
    role: "Teórico del Arte",
    content: "La obra presenta una reflexión profunda sobre la condición humana en la era digital. Cada pieza invita a una contemplación meditativa que trasciende lo meramente visual.",
    rating: 5,
    date: "2024-01-18",
    source: "Teoría del Arte Contemporáneo",
    avatar: "/avatars/miguel.jpg"
  },
  {
    id: "3",
    author: "Dra. Carmen López",
    role: "Curadora Independiente",
    content: "Una propuesta curatorial excepcional que logra crear una narrativa coherente y emocionante. La selección de obras demuestra un criterio refinado y una visión clara.",
    rating: 4,
    date: "2024-01-16",
    source: "Curaduría y Museología",
    avatar: "/avatars/carmen.jpg"
  },
  {
    id: "4",
    author: "Dr. Roberto Silva",
    role: "Filosofo del Arte",
    content: "La exposición plantea preguntas fundamentales sobre la naturaleza del arte en nuestro tiempo. La respuesta que ofrece es tanto provocativa como profundamente satisfactoria.",
    rating: 5,
    date: "2024-01-14",
    source: "Filosofía del Arte",
    avatar: "/avatars/roberto.jpg"
  },
  {
    id: "5",
    author: "Prof. Isabel Moreno",
    role: "Crítica de Arte",
    content: "Una muestra que redefine los límites de lo posible en el arte contemporáneo. La audacia conceptual se combina con una ejecución técnica impecable.",
    rating: 4,
    date: "2024-01-12",
    source: "Crítica Artística",
    avatar: "/avatars/isabel.jpg"
  }
]; 