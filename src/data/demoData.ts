export const METRICS = {
  clients: 60,
  unapprovedPosts: 14,
  penalty: 8000,
  platforms: 4
};

export const UPCOMING_POSTS = [
  { id: 1, content: "Product launch teaser", platform: "Instagram", date: "Tomorrow, 10:00 AM", status: "Approved" },
  { id: 2, content: "Q3 Industry Report", platform: "LinkedIn", date: "Oct 15, 09:30 AM", status: "Pending" },
  { id: 3, content: "Customer Spotlight", platform: "Facebook", date: "Oct 18, 02:00 PM", status: "Needs Changes" },
];

export const APPROVAL_ACTIVITY = [
  { id: 101, action: "Approved 'Product launch teaser'", user: "Sarah J. (Client)", time: "2 hours ago" },
  { id: 102, action: "Requested changes on 'Customer Spotlight'", user: "Mark T. (Client)", time: "4 hours ago" },
];
