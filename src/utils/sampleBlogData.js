import BLOG_CONFIG from '../config/api';

// Sample blog posts for demonstration
const samplePosts = [
    {
        id: 1,
        title: "Sustainable Farming Practices in the Himalayas",
        content: `The Himalayan region presents unique challenges and opportunities for sustainable farming. With its diverse climate zones and rich biodiversity, farmers in this region have developed innovative techniques that work in harmony with nature.

Traditional farming methods passed down through generations include:

• Terraced farming to prevent soil erosion
• Crop rotation to maintain soil fertility
• Use of organic compost and natural fertilizers
• Water conservation through traditional irrigation systems

Modern sustainable practices that complement traditional methods:

• Integrated pest management
• Precision agriculture techniques
• Renewable energy solutions for farming operations
• Climate-smart agriculture practices

By combining traditional wisdom with modern technology, Himalayan farmers can achieve better yields while preserving the environment for future generations.`,
        excerpt: "Discover how traditional Himalayan farming techniques combined with modern sustainable practices create a perfect harmony between productivity and environmental conservation.",
        slug: "sustainable-farming-practices-himalayas",
        featuredImage: null,
        category: { id: 2, name: "Sustainable Agriculture", slug: "sustainable-agriculture" },
        tags: [{ id: 4, name: "Sustainable", slug: "sustainable" }, { id: 2, name: "Himalayan Farming", slug: "himalayan-farming" }],
        author: "Dr. Rajesh Sharma",
        date: new Date('2024-01-15').toISOString(),
        modified: new Date('2024-01-15').toISOString(),
        status: "published",
        views: 245
    },
    {
        id: 2,
        title: "Organic Vegetable Cultivation: A Complete Guide",
        content: `Organic vegetable cultivation is becoming increasingly popular among Himalayan farmers. This comprehensive guide covers everything you need to know about growing healthy, chemical-free vegetables.

Soil Preparation:
• Test soil pH and nutrient levels
• Add organic compost and well-rotted manure
• Ensure proper drainage
• Create raised beds for better root development

Seed Selection:
• Choose disease-resistant varieties
• Use certified organic seeds
• Consider local climate conditions
• Plan for succession planting

Natural Pest Control:
• Companion planting
• Beneficial insect habitats
• Organic sprays and treatments
• Physical barriers and traps

Harvesting and Storage:
• Harvest at optimal ripeness
• Proper post-harvest handling
• Natural preservation methods
• Value addition techniques

Organic farming not only produces healthier food but also improves soil health and supports biodiversity.`,
        excerpt: "Learn the complete process of organic vegetable cultivation, from soil preparation to harvest, with practical tips for Himalayan conditions.",
        slug: "organic-vegetable-cultivation-guide",
        featuredImage: null,
        category: { id: 1, name: "Organic Farming", slug: "organic-farming" },
        tags: [{ id: 3, name: "Organic", slug: "organic" }, { id: 1, name: "Nepal", slug: "nepal" }],
        author: "Priya Thapa",
        date: new Date('2024-01-10').toISOString(),
        modified: new Date('2024-01-10').toISOString(),
        status: "published",
        views: 189
    },
    {
        id: 3,
        title: "Climate-Smart Agriculture for Mountain Regions",
        content: `Climate change poses significant challenges for mountain agriculture. Climate-smart agriculture (CSA) offers solutions that help farmers adapt to changing conditions while maintaining productivity.

Key Principles of Climate-Smart Agriculture:

1. Adaptation: Building resilience to climate variability
2. Mitigation: Reducing greenhouse gas emissions
3. Productivity: Maintaining or increasing agricultural yields

Practical CSA Techniques:

• Drought-resistant crop varieties
• Efficient water management systems
• Agroforestry practices
• Soil carbon sequestration
• Renewable energy integration

Benefits for Mountain Farmers:

• Reduced vulnerability to weather extremes
• Improved soil health and fertility
• Diversified income sources
• Enhanced food security
• Environmental conservation

Case Studies:
Several successful CSA implementations in the Himalayas have shown remarkable results, with farmers reporting 20-30% increase in yields and improved resilience to climate shocks.

The future of mountain agriculture depends on our ability to adapt and implement these climate-smart practices effectively.`,
        excerpt: "Explore climate-smart agriculture techniques that help mountain farmers adapt to climate change while maintaining productivity and environmental sustainability.",
        slug: "climate-smart-agriculture-mountain-regions",
        featuredImage: null,
        category: { id: 5, name: "Technology", slug: "technology" },
        tags: [{ id: 5, name: "Innovation", slug: "innovation" }, { id: 4, name: "Sustainable", slug: "sustainable" }],
        author: "Dr. Karma Lama",
        date: new Date('2024-01-05').toISOString(),
        modified: new Date('2024-01-05').toISOString(),
        status: "published",
        views: 312
    },
    {
        id: 4,
        title: "Traditional Seed Preservation Techniques",
        content: `Seed preservation is crucial for maintaining agricultural biodiversity and ensuring food security. Traditional techniques developed over centuries remain highly effective and relevant today.

Importance of Seed Preservation:
• Maintains genetic diversity
• Preserves local varieties
• Ensures food security
• Reduces dependency on external inputs
• Supports cultural heritage

Traditional Preservation Methods:

1. Natural Drying:
• Sun drying on mats
• Air drying in ventilated spaces
• Proper moisture content maintenance

2. Storage Containers:
• Clay pots with tight lids
• Bamboo containers
• Wooden boxes with natural preservatives

3. Natural Preservatives:
• Neem leaves and powder
• Ash from specific plants
• Turmeric powder
• Mustard oil treatment

4. Environmental Control:
• Cool, dry storage areas
• Protection from pests
• Regular monitoring

Modern Adaptations:
• Improved storage containers
• Better moisture control
• Scientific testing methods
• Community seed banks

By combining traditional wisdom with modern techniques, we can ensure the preservation of our valuable seed heritage for future generations.`,
        excerpt: "Discover time-tested traditional seed preservation techniques that maintain genetic diversity and ensure sustainable agriculture in mountain regions.",
        slug: "traditional-seed-preservation-techniques",
        featuredImage: null,
        category: { id: 3, name: "Crop Management", slug: "crop-management" },
        tags: [{ id: 2, name: "Himalayan Farming", slug: "himalayan-farming" }, { id: 3, name: "Organic", slug: "organic" }],
        author: "Grandmother Dolma",
        date: new Date('2023-12-28').toISOString(),
        modified: new Date('2023-12-28').toISOString(),
        status: "published",
        views: 156
    },
    {
        id: 5,
        title: "How to Stay Safe from Lumpy Skin Disease",
        content: `Lumpy Skin Disease (LSD) is a viral infection that affects cattle and buffalo, causing significant economic losses for farmers. Understanding prevention and management strategies is crucial for protecting livestock and maintaining farm productivity.

What is Lumpy Skin Disease?
Lumpy Skin Disease is caused by a virus belonging to the capripoxvirus genus. It primarily affects cattle and water buffalo, causing characteristic skin nodules, fever, and reduced milk production.

Symptoms to Watch For:
• Firm, round nodules on the skin (2-5 cm diameter)
• High fever (40-41°C)
• Reduced appetite and milk production
• Swollen lymph nodes
• Discharge from eyes and nose
• Lameness in severe cases

Prevention Strategies:

1. Vaccination:
• Use approved LSD vaccines
• Follow vaccination schedules
• Maintain cold chain during transport
• Keep vaccination records

2. Vector Control:
• Control flies, mosquitoes, and ticks
• Use insect repellents
• Maintain clean farm environment
• Remove stagnant water sources

3. Biosecurity Measures:
• Quarantine new animals
• Restrict visitor access
• Disinfect equipment and vehicles
• Separate sick animals immediately

4. Farm Management:
• Maintain proper nutrition
• Ensure adequate water supply
• Reduce stress factors
• Regular health monitoring

Treatment Approaches:
• Supportive care with antibiotics for secondary infections
• Anti-inflammatory medications
• Wound care for skin lesions
• Nutritional support
• Isolation of affected animals

Economic Impact:
• Reduced milk production (up to 50%)
• Weight loss in affected animals
• Treatment costs
• Trade restrictions
• Potential mortality in severe cases

Reporting and Response:
• Report suspected cases to veterinary authorities
• Follow quarantine guidelines
• Cooperate with disease surveillance programs
• Implement movement restrictions

By implementing these comprehensive prevention and management strategies, farmers can significantly reduce the risk and impact of Lumpy Skin Disease on their livestock operations.`,
        excerpt: "Learn essential prevention and management strategies to protect your livestock from Lumpy Skin Disease, including vaccination, biosecurity measures, and early detection methods.",
        slug: "-how-to-stay-safe-from-lumpy-skin-disease",
        featuredImage: null,
        category: { id: 4, name: "Animal Health", slug: "animal-health" },
        tags: [{ id: 6, name: "Livestock", slug: "livestock" }, { id: 7, name: "Disease Prevention", slug: "disease-prevention" }, { id: 8, name: "Cattle Care", slug: "cattle-care" }],
        author: "Dr. Suman Pradhan",
        date: new Date('2024-01-20').toISOString(),
        modified: new Date('2024-01-20').toISOString(),
        status: "published",
        views: 423
    }
];

// Function to initialize sample data
export const initializeSampleData = () => {
    // Check if posts already exist
    const existingPosts = BLOG_CONFIG.getPosts();
    
    if (existingPosts.length === 0) {
        // Save sample posts to localStorage
        BLOG_CONFIG.savePosts(samplePosts);
        console.log('Sample blog data initialized');
    }
};

export default samplePosts;