export function getRunsTabConfig(role) {
  if (role === 'restaurant') {
    return { label: 'NGO Needs', path: '/runs' };
  }

  if (role === 'ngo_admin') {
    return { label: 'Create Demand', path: '/runs' };
  }

  return { label: 'Volunteer', path: '/runs' };
}

export function getPrimaryNav(role) {
  const runsTab = getRunsTabConfig(role);
  const base = [
    { to: '/', label: 'Share Bites' },
    { to: runsTab.path, label: runsTab.label },
    { to: '/impact', label: 'Activity' },
    { to: '/community', label: 'Community' },
    { to: '/profile', label: 'Profile' },
  ];

  if (role !== 'restaurant' && role !== 'ngo_admin') {
    base.splice(4, 0, { to: '/trust-safety', label: 'Trust & Safety' });
  }

  return base;
}
