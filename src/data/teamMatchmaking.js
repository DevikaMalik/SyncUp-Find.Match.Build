import React from 'react';

export const teammatesData = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'UI/UX', 'TypeScript'],
    experience: '3 years',
    location: 'San Francisco, CA',
    rating: 4.9,
    completedProjects: 12,
    bio: 'Passionate about creating user-friendly applications with clean, efficient code. Love working in collaborative environments.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    availability: 'Available',
    preferredRoles: ['Frontend', 'UI/UX'],
    hackathonsWon: 3
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
    experience: '5 years',
    location: 'New York, NY',
    rating: 4.8,
    completedProjects: 18,
    bio: 'Experienced in building ML models and extracting insights from complex datasets. Always excited about AI innovations.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    availability: 'Available',
    preferredRoles: ['Data Science', 'Backend'],
    hackathonsWon: 5
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Mobile Developer',
    skills: ['Flutter', 'React Native', 'Firebase', 'iOS', 'Android'],
    experience: '4 years',
    location: 'Austin, TX',
    rating: 4.7,
    completedProjects: 15,
    bio: 'Mobile-first developer with expertise in cross-platform solutions. Love creating smooth, intuitive mobile experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    availability: 'Busy',
    preferredRoles: ['Mobile', 'Frontend'],
    hackathonsWon: 2
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    experience: '6 years',
    location: 'Seattle, WA',
    rating: 4.9,
    completedProjects: 22,
    bio: 'Infrastructure and deployment specialist. Passionate about scalable, reliable systems and automation.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    availability: 'Available',
    preferredRoles: ['DevOps', 'Backend'],
    hackathonsWon: 4
  },
  {
    id: 5,
    name: 'Priya Patel',
    title: 'Product Designer',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    experience: '4 years',
    location: 'Los Angeles, CA',
    rating: 4.8,
    completedProjects: 20,
    bio: 'User-centered designer focused on creating meaningful digital experiences. Strong advocate for accessibility and inclusive design.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    availability: 'Available',
    preferredRoles: ['Design', 'UI/UX'],
    hackathonsWon: 3
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'Blockchain Developer',
    skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts', 'DeFi'],
    experience: '3 years',
    location: 'Miami, FL',
    rating: 4.6,
    completedProjects: 10,
    bio: 'Blockchain enthusiast building the future of decentralized applications. Experienced in DeFi and NFT projects.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    availability: 'Available',
    preferredRoles: ['Blockchain', 'Backend'],
    hackathonsWon: 1
  }
];

export const filtersData = [
  { id: 'all', label: 'All Developers' },
  { id: 'available', label: 'Available' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'blockchain', label: 'Blockchain' }
];