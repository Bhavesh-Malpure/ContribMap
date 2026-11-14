import { Link } from 'react-router-dom';
import { formatDate, githubPathFromUrl } from '../../utils/formatDate.js';
import MatchScore from './MatchScore.jsx';
import MatchExplanation from './MatchExplanation.jsx';

export default function IssueCard({ issue, onBookmark, bookmarked, statusSlot }) {
  const path = githubPathFromUrl(issue.htmlUrl);

  return (
    <article className="issue-card">
      <MatchScore score={issue.score ?? 0} />
      <div>
        <h3>{issue.title}</h3>
        <p className="muted">
          {issue.repository?.fullName} · updated {formatDate(issue.githubUpdatedAt)}
        </p>
        <div>
          {(issue.labels || []).map((label) => (
            <span className="badge" key={label}>
              {label}
            </span>
          ))}
        </div>
        <MatchExplanation lines={issue.matchExplanation} />
        <div className="btn-row">
          {path ? (
            <Link className="btn btn-primary" to={`/issues/${path}`}>
              Details
            </Link>
          ) : null}
          <a className="btn btn-ghost" href={issue.htmlUrl} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
          {onBookmark ? (
            <button className="btn btn-accent" type="button" onClick={() => onBookmark(issue)} disabled={bookmarked}>
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          ) : null}
          {statusSlot}
        </div>
      </div>
    </article>
  );
}
