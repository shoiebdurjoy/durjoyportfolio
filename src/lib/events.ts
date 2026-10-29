// Cross-section requests (story chapters, recruiter view → case studies) without prop drilling.
export const QUICK_VIEW_EVENT = 'open-quick-view';
export const OPEN_PROJECT_EVENT = 'open-project';

export function openQuickView() {
  window.dispatchEvent(new Event(QUICK_VIEW_EVENT));
}

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id }));
}

export const OPEN_CERTIFICATE_EVENT = 'open-certificate';

export function openCertificate(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CERTIFICATE_EVENT, { detail: id }));
}
