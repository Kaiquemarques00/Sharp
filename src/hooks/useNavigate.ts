export function useNavigate() {
  return (path: string) => {
    window.location.hash = path;
  };
}

export function useLocation() {
  return {
    hash: window.location.hash,
    pathname: window.location.hash.slice(1) || '/'
  };
}
