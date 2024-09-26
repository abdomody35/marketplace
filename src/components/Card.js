export function Card({ children }) {
  return <div className="border rounded-lg shadow-md">{children}</div>
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}