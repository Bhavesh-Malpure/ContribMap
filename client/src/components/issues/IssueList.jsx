import IssueCard from './IssueCard.jsx';

export default function IssueList({ issues, onBookmark, bookmarkedUrls = [] }) {
  if (!issues.length) {
    return <p className="empty">No matching open issues yet. Try different skills or turn off the beginner filter.</p>;
  }

  return (
    <div className="issue-list">
      {issues.map((issue) => (
        <IssueCard
          key={issue.htmlUrl || issue.githubIssueId}
          issue={issue}
          onBookmark={onBookmark}
          bookmarked={bookmarkedUrls.includes(issue.htmlUrl)}
        />
      ))}
    </div>
  );
}
