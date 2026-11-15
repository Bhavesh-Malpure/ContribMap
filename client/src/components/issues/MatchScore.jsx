export default function MatchScore({ score = 0 }) {
  return (
    <div className="score" aria-label={`Match score ${score} out of 100`}>
      {score}
    </div>
  );
}
