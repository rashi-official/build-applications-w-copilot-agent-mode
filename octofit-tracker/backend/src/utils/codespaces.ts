/**
 * Utility helpers for building environment-aware URLs in GitHub Codespaces.
 */
export function getCodespaceBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (!codespaceName) {
    return 'http://localhost:8000';
  }

  return `https://${codespaceName}-8000.app.github.dev`;
}

export function buildCodespaceUrl(path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${getCodespaceBaseUrl()}${normalizedPath}`;
}
