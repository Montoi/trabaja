import type { User, SpecialOffer, Service, PopularService } from '../types/home';

export const USER_DATA: User = {
    name: 'Andrew Ainsley',
    avatar: 'https://i.pravatar.cc/150?img=12',
    greeting: 'Good Morning',
};

export const SPECIAL_OFFERS: SpecialOffer[] = [
    {
        id: '1',
        discount: '50%',
        title: 'Emergency Services!',
        description: 'Professional firefighters ready 24/7 for your safety',
        bgColor: '#FF3B30',
        image: 'https://images.unsplash.com/photo-1510515134701-443372c0cc95?w=400&q=80',
    },
    {
        id: '2',
        discount: '40%',
        title: 'Tech Experts!',
        description: 'Certified technicians for all your repair needs',
        bgColor: '#007AFF',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    },
    {
        id: '3',
        discount: '30%',
        title: 'Deep Cleaning!',
        description: 'Professional cleaning service for your home or office',
        bgColor: '#7210FF',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    },
    {
        id: '4',
        discount: '35%',
        title: 'Health Care!',
        description: 'Licensed nurses for home healthcare services',
        bgColor: '#34C759',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=400&q=80',
    },
    {
        id: '5',
        discount: '45%',
        title: 'Construction!',
        description: 'Expert builders for all your construction projects',
        bgColor: '#FF9500',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    },
];

export const SERVICES: Service[] = [
    { id: '1', name: 'Cleaning', icon: 'brush-outline', bgColor: '#EDE9FE', iconColor: '#7C3AED' },
    { id: '2', name: 'Repairing', icon: 'build-outline', bgColor: '#FFEDD5', iconColor: '#EA580C' },
    { id: '3', name: 'Painting', icon: 'color-fill-outline', bgColor: '#DBEAFE', iconColor: '#2563EB' },
    { id: '4', name: 'Laundry', icon: 'water-outline', bgColor: '#FEF9C3', iconColor: '#CA8A04' },
    { id: '5', name: 'Appliance', icon: 'tv-outline', bgColor: '#FEE2E2', iconColor: '#DC2626' },
    { id: '6', name: 'Plumbing', icon: 'construct-outline', bgColor: '#D1FAE5', iconColor: '#059669' },
    { id: '7', name: 'Shifting', icon: 'bus-outline', bgColor: '#CFFAFE', iconColor: '#0891B2' },
    { id: '8', name: 'Beauty', icon: 'cut-outline', bgColor: '#FCE7F3', iconColor: '#DB2777' },
    { id: '9', name: 'AC Repair', icon: 'snow-outline', bgColor: '#DCFCE7', iconColor: '#16A34A' },
    { id: '10', name: 'Vehicle', icon: 'car-outline', bgColor: '#E0E7FF', iconColor: '#4F46E5' },
    { id: '11', name: 'Electronics', icon: 'laptop-outline', bgColor: '#FEF3C7', iconColor: '#D97706' },
    { id: '12', name: 'Massage', icon: 'leaf-outline', bgColor: '#FFE4E6', iconColor: '#E11D48' },
    { id: '13', name: "Men's Salon", icon: 'person-outline', bgColor: '#F5F3FF', iconColor: '#7C3AED' },
    { id: '14', name: 'More', icon: 'ellipsis-horizontal', bgColor: '#F8FAFC', iconColor: '#64748B' },
];

export const POPULAR_SERVICES: PopularService[] = [
    {
        id: '1',
        title: 'Full House Cleaning',
        category: 'House Cleaning',
        provider: 'Kylee Danford',
        price: 25,
        rating: 4.8,
        reviewCount: 8289,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        isBookmarked: false,
    },
    {
        id: '2',
        title: 'AC Repair & Service',
        category: 'Repairing',
        provider: 'Sarah Johnson',
        price: 45,
        rating: 4.9,
        reviewCount: 5120,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
        isBookmarked: true,
    },
];

export const MOCK_BOOKMARKS: PopularService[] = [
    {
        id: '1',
        title: 'House Cleaning',
        category: 'Cleaning',
        provider: 'Jenny Wilson',
        price: 24,
        rating: 4.8,
        reviewCount: 8289,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500',
        isBookmarked: true,
    },
    {
        id: '2',
        title: 'AC Repairing',
        category: 'Repairing',
        provider: 'Rayford Chenail',
        price: 26,
        rating: 4.9,
        reviewCount: 6182,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=500',
        isBookmarked: true,
    },
    {
        id: '3',
        title: 'Laundry Services',
        category: 'Laundry',
        provider: 'Janetta Rotolo',
        price: 19,
        rating: 4.7,
        reviewCount: 7938,
        image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=500',
        isBookmarked: true,
    },
    {
        id: '4',
        title: 'Motorcycle Repairing',
        category: 'Repairing',
        provider: 'Freida Varnes',
        price: 23,
        rating: 4.9,
        reviewCount: 6182,
        image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=500',
        isBookmarked: true,
    },
];

export const CATEGORIES = ['All', 'Cleaning', 'Repairing', 'Painting', 'Laundry', 'Appliance', 'Plumbing', 'Shifting'];

export const MOCK_REVIEWS = [
    {
        id: 'r1',
        user: 'Lauralee Quintera',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        time: '3 weeks ago',
        content: 'Awesome! this is what I was looking for, I recommend to everyone ❤️❤️❤️',
        likes: 724,
    },
    {
        id: 'r2',
        user: 'Clinton McClure',
        avatar: 'https://i.pravatar.cc/150?img=2',
        rating: 4,
        time: '1 week ago',
        content: 'The workers are very professional and the results are very satisfying! I like it very much! 💯💯',
        likes: 118,
    },
];

export const MOCK_PHOTOS = [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
];
