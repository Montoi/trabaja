import type { User, SpecialOffer, Service, PopularService } from '../types/home';

export const USER_DATA: User = {
    name: 'Andrew Ainsley',
    avatar: 'https://i.pravatar.cc/150?img=12',
    greeting: 'Good Morning',
    role: 'worker', // 'user' or 'worker'
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
    // Cleaning
    { id: '1', title: 'Full House Cleaning', category: 'Cleaning', provider: 'Kylee Danford', price: 25, rating: 4.8, reviewCount: 8289, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', isBookmarked: true },
    { id: '2', title: 'Deep Office Cleaning', category: 'Cleaning', provider: 'Alfonzo Schuessler', price: 30, rating: 4.7, reviewCount: 4210, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', isBookmarked: false },
    // Repairing
    { id: '3', title: 'AC Repair & Service', category: 'Repairing', provider: 'Sarah Johnson', price: 45, rating: 4.9, reviewCount: 5120, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', isBookmarked: true },
    { id: '4', title: 'Fridge Maintenance', category: 'Repairing', provider: 'Bennie Woodbury', price: 35, rating: 4.6, reviewCount: 2150, image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400', isBookmarked: false },
    // Painting
    { id: '5', title: 'Wall Painting', category: 'Painting', provider: 'Maricela Sullins', price: 22, rating: 4.8, reviewCount: 3120, image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400', isBookmarked: false },
    { id: '6', title: 'Full House Painting', category: 'Painting', provider: 'Frederic Denney', price: 150, rating: 4.9, reviewCount: 1205, image: 'https://images.unsplash.com/photo-1589939705384-5185138a047a?w=400', isBookmarked: false },
    // Laundry
    { id: '7', title: 'Dry Cleaning', category: 'Laundry', provider: 'Janetta Rotolo', price: 15, rating: 4.7, reviewCount: 2341, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400', isBookmarked: true },
    { id: '8', title: 'Premium Ironing', category: 'Laundry', provider: 'Clinton McClure', price: 10, rating: 4.5, reviewCount: 1560, image: 'https://images.unsplash.com/photo-1545173168-9f19dd7eadc4?w=400', isBookmarked: false },
    // Appliance
    { id: '9', title: 'TV Installation', category: 'Appliance', provider: 'Lauralee Quintera', price: 40, rating: 4.8, reviewCount: 5670, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', isBookmarked: false },
    { id: '10', title: 'Washing Machine Fix', category: 'Appliance', provider: 'Rayford Chenail', price: 35, rating: 4.7, reviewCount: 3410, image: 'https://images.unsplash.com/photo-1626806819282-2c1dc61a0e05?w=400', isBookmarked: true },
    // Plumbing
    { id: '11', title: 'Pipe Leakage Fix', category: 'Plumbing', provider: 'Titus Kitamura', price: 28, rating: 4.9, reviewCount: 4320, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', isBookmarked: false },
    { id: '12', title: 'Tap Replacement', category: 'Plumbing', provider: 'Slyvia Hardie', price: 20, rating: 4.6, reviewCount: 1890, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', isBookmarked: false },
    // Shifting
    { id: '13', title: 'Local Moving', category: 'Shifting', provider: 'Freida Varnes', price: 120, rating: 4.8, reviewCount: 890, image: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=400', isBookmarked: true },
    { id: '14', title: 'Office Relocation', category: 'Shifting', provider: 'Jenny Wilson', price: 350, rating: 4.9, reviewCount: 450, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400', isBookmarked: false },
    // Beauty
    { id: '15', title: 'Full Makeup', category: 'Beauty', provider: 'Rosalina Kleyer', price: 60, rating: 4.9, reviewCount: 1240, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', isBookmarked: false },
    { id: '16', title: 'Facial & Skin Care', category: 'Beauty', provider: 'Phoebe Venturi', price: 45, rating: 4.7, reviewCount: 980, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?w=400', isBookmarked: false },
    // AC Repair
    { id: '17', title: 'AC Gas Refill', category: 'AC Repair', provider: 'Darcel Allsop', price: 55, rating: 4.8, reviewCount: 3670, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', isBookmarked: false },
    { id: '18', title: 'Split AC Install', category: 'AC Repair', provider: 'Chaya Scurry', price: 80, rating: 4.9, reviewCount: 1560, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', isBookmarked: false },
    // Vehicle
    { id: '19', title: 'Full Car Service', category: 'Vehicle', provider: 'Freida Varnes', price: 150, rating: 4.9, reviewCount: 2310, image: 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?w=400', isBookmarked: false },
    { id: '20', title: 'Bike Repairing', category: 'Vehicle', provider: 'Clinton McClure', price: 25, rating: 4.7, reviewCount: 1890, image: 'https://images.unsplash.com/photo-1485903594399-52264883445e?w=400', isBookmarked: false },
    // Electronics
    { id: '21', title: 'Laptop Screen Fix', category: 'Electronics', provider: 'Kylee Danford', price: 90, rating: 4.8, reviewCount: 890, image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400', isBookmarked: false },
    { id: '22', title: 'Phone Battery Swap', category: 'Electronics', provider: 'Janetta Rotolo', price: 30, rating: 4.5, reviewCount: 2340, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', isBookmarked: false },
    // Massage
    { id: '23', title: 'Thai Massage', category: 'Massage', provider: 'Maricela Sullins', price: 70, rating: 4.9, reviewCount: 1560, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400', isBookmarked: false },
    { id: '24', title: 'Relaxing Spa', category: 'Massage', provider: 'Frederic Denney', price: 50, rating: 4.7, reviewCount: 3120, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=400', isBookmarked: false },
    // Men's Salon
    { id: '25', title: 'Haircut & Beard', category: "Men's Salon", provider: 'Sarah Johnson', price: 25, rating: 4.8, reviewCount: 5670, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', isBookmarked: false },
    { id: '26', title: 'Executive Grooming', category: "Men's Salon", provider: 'Kylee Danford', price: 40, rating: 4.9, reviewCount: 1240, image: 'https://images.unsplash.com/photo-1621605815841-28dc7f7178c1?w=400', isBookmarked: false },
];

export const MOCK_BOOKMARKS: PopularService[] = POPULAR_SERVICES.filter(s => s.isBookmarked);

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
