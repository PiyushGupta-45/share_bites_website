import dayjs from 'dayjs';

export const forumPosts = [
  {
    author: 'Priya - Waste Lab',
    topic: 'Zero-waste recipes',
    message: 'Fermented citrus peels work great for electrolyte drinks.',
    upvotes: 42,
    time: dayjs().subtract(3, 'hour').format('hh:mm A'),
  },
  {
    author: 'Chef Marco',
    topic: 'Buffet forecasting',
    message: 'Sharing my sheet that predicts covers vs surplus.',
    upvotes: 31,
    time: dayjs().subtract(6, 'hour').format('hh:mm A'),
  },
];

export const logisticsAlerts = [
  {
    donorName: 'Bloom Bistro',
    location: 'CBD Cluster',
    radiusKm: 5,
    urgencyTag: 'Perishable (2h)',
    expiryIn: '2h',
    requiresRefrigeration: true,
  },
  {
    donorName: 'Harvest Farm Co-op',
    location: 'North Agro Belt',
    radiusKm: 12,
    urgencyTag: 'Shelf-stable',
    expiryIn: '8h',
    requiresRefrigeration: false,
  },
];

export const gamificationStats = {
  co2SavedKg: 428.6,
  mealsServed: 1563,
  activeStreakDays: 24,
  badges: ['Cold Chain Guardian', 'Community Ally', 'Zero-Waste Sage'],
  leaderboard: [
    { user: 'Nourish Ninjas', mealsServed: 1800, rank: 1 },
    { user: 'Share Bites Riders', mealsServed: 1650, rank: 2 },
    { user: 'You', mealsServed: 1563, rank: 3 },
  ],
};

export const hungerSquadAlerts = [
  {
    groupName: 'Hunger Squad - Riverside',
    location: 'Ward 5',
    need: '200 meals for flood relief',
    peopleImpacted: 200,
    isEmergency: true,
  },
  {
    groupName: 'Hunger Squad - Midtown',
    location: 'Ward 2',
    need: 'Dry ration kits for seniors',
    peopleImpacted: 60,
    isEmergency: false,
  },
];

export const resourceBarters = [
  {
    requester: 'Community Kitchen X',
    offer: 'Heat-safe containers',
    request: 'Need insulated cambros',
    status: 'Negotiating',
  },
  {
    requester: 'SOS Collective',
    offer: 'Volunteer hours',
    request: 'Cold-chain van for 4h',
    status: 'Open',
  },
];

export const volunteerRequests = [
  {
    id: 'SOS-342',
    pickupPoint: 'Greenfield Deli',
    dropOffPoint: 'Lotus Shelter',
    payloadType: 'Mixed meals (18 trays)',
    distanceKm: 4.2,
    readyBy: dayjs().add(40, 'minute').format('hh:mm A'),
    highPriority: true,
  },
  {
    id: 'ADHOC-219',
    pickupPoint: 'Urban Farms Hub',
    dropOffPoint: 'Hunger Squad - Ward 7',
    payloadType: 'Fresh produce crates',
    distanceKm: 7.4,
    readyBy: dayjs().add(2, 'hour').format('hh:mm A'),
    highPriority: false,
  },
];
