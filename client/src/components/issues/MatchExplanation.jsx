export default function MatchExplanation({ lines = [] }) {
  if (!lines.length) return null;
  return (
    <blockquote>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </blockquote>
  );
}
