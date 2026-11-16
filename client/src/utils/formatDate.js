export function formatDate(value) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function githubPathFromUrl(htmlUrl = '') {
  try {
    const url = new URL(htmlUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length >= 4 && parts[2] === 'issues') {
      return `${parts[0]}/${parts[1]}/${parts[3]}`;
    }
  } catch {
    return '';
  }
  return '';
}
