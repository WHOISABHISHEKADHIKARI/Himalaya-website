// Update FAQ data with bilingual content
const faqData = [
  // Government & Policy
  {
    questionNe: "नेपालमा कृषि सहयोग कसरी प्राप्त गर्ने?",
    questionEn: "How to get agriculture  in Nepal?",
    answerNe: "कृषि  र स्थानीय सरकारले प्रदान गर्ने विभिन्न सहयोग कार्यक्रमहरू छन्। हामी किसानहरूलाई आवेदन प्रक्रियामा सहयोग गर्छौं।",
    answerEn: "Various  are available through the Ministry of Agriculture and local governments. We assist farmers in the application process.",
    tags: ["", "subsidies", "government-support", "कृषि-सहयोग"]
  },
  {
    questionNe: "जैविक प्रमाणीकरण कसरी प्राप्त गर्ने?",
    questionEn: "How to obtain organic certification?",
    answerNe: "हामी किसानहरूलाई जैविक प्रमाणीकरणको लागि आवश्यक सबै प्रक्रियाहरूमा मार्गदर्शन गर्छौं।",
    answerEn: "We guide farmers through all necessary steps for organic certification.",
    tags: ["organic-certification", "standards", "जैविक-प्रमाणीकरण"]
  },
  // About Himalaya Krishi
  {
    question: "What is Himalaya Krishi's mission?",
    answer: "Our mission is to promote and advance organic farming across Nepal, fostering sustainable agricultural practices that benefit both farmers and the environment. We're committed to preserving traditional farming wisdom while integrating modern organic techniques.",
    tags: ["mission", "vision", "about"]
  },
  {
    question: "How long has Himalaya Krishi been promoting organic farming?",
    answer: "For over 15 years, we've been dedicated to organic farming in Nepal, working alongside 1000+ farmers and helping transform 5000+ hectares into thriving organic farmland.",
    tags: ["history", "experience", "impact"]
  },
  {
    question: "What regions of Nepal does Himalaya Krishi work in?",
    answer: "We work across Nepal's diverse geographical regions, from Terai to the mountains, promoting organic farming practices suited to each area's unique conditions.",
    tags: ["location", "coverage", "regions"]
  },

  // Organic Farming Knowledge
  {
    question: "What makes organic farming different from conventional farming?",
    answer: "Organic farming focuses on natural processes, soil health, and ecosystem balance without synthetic chemicals. It promotes biodiversity, sustainable resource use, and long-term environmental health.",
    tags: ["organic", "basics", "differences"]
  },
  {
    question: "What are the benefits of organic farming in Nepal?",
    answer: "Organic farming helps preserve soil fertility, reduces water pollution, supports biodiversity, produces healthier crops, and often provides better economic returns for farmers while preserving traditional agricultural knowledge.",
    tags: ["benefits", "advantages", "impact"]
  },

  // Community & Network
  {
    question: "How does Himalaya Krishi strengthen farming communities?",
    answer: "We facilitate knowledge sharing between farmers, organize community learning events, and promote traditional farming wisdom while introducing sustainable organic practices.",
    tags: ["community", "collaboration", "network"]
  },
  {
    question: "Can small-scale farmers adopt organic farming?",
    answer: "Absolutely! Organic farming is well-suited for small-scale farmers. It requires minimal external inputs, builds on traditional knowledge, and can be implemented gradually.",
    tags: ["small-scale", "adoption", "implementation"]
  },

  // Environmental Impact
  {
    question: "How does organic farming help protect Nepal's environment?",
    answer: "Organic farming preserves soil health, protects water sources, maintains biodiversity, and helps mitigate climate change through reduced carbon emissions and improved carbon sequestration.",
    tags: ["environment", "sustainability", "conservation"]
  },
  {
    question: "What role does biodiversity play in organic farming?",
    answer: "Biodiversity is crucial in organic farming. It helps with natural pest control, improves pollination, enhances soil fertility, and creates resilient farming systems.",
    tags: ["biodiversity", "ecosystem", "sustainability"]
  },

  // Traditional & Modern Methods
  {
    question: "How does Himalaya Krishi blend traditional and modern farming practices?",
    answer: "We honor Nepal's rich agricultural heritage while incorporating modern organic techniques. This approach preserves valuable traditional knowledge while enhancing productivity and sustainability.",
    tags: ["tradition", "modern", "methods"]
  },
  {
    question: "What organic techniques are most successful in Nepal?",
    answer: "Successful techniques include composting, crop rotation, mixed cropping, natural pest management, and water conservation methods adapted to Nepal's diverse climatic conditions.",
    tags: ["techniques", "practices", "success"]
  },
  
  // Organization Information
  {
    question: "Who founded Himalaya Krishi?",
    answer: "Himalaya Krishi was founded by Ram Krishna Shrestha in 2008, with a vision to promote organic farming across Nepal. Drawing from his family's farming background and agricultural expertise, he established this organization to preserve traditional farming methods while advancing sustainable practices.",
    tags: ["founder", "history", "organization"]
  },
  {
    question: "Where is Himalaya Krishi located and how can I contact you?",
    answer: "Our main office is located in Manahari-5, Makwanpur, Nepal. You can reach us at: Phone: +977-9823405140, Email: info@krishihimalaya.com",
    tags: ["location", "contact", "address"]
  },
  {
    question: "When is the best time to visit or contact Himalaya Krishi?",
    answer: "Our office is open Sunday through Friday, from 10:00 AM to 5:00 PM (Nepal Time). For the best experience, we recommend calling ahead at +977-9823405140 to schedule your visit. We're closed on Saturdays and national holidays.",
    tags: ["visiting", "hours", "timing"]
  },
  {
    question: "How can I get directions to your location?",
    answer: "We are located in Manahari-5, Makwanpur. If you're having trouble finding us, please call us at +977-9823405140 and our team will guide you with detailed directions based on your starting point.",
    tags: ["directions", "location", "visit"]
  },
  {
    question: "How can I arrange a visit to your demonstration farms?",
    answer: "Our demonstration farms can be visited by appointment. Please contact us at least 3 days in advance to arrange a visit. We offer guided tours every Wednesday and Friday morning.",
    tags: ["farm", "visit", "tour"]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9F1] to-[#EAEFE7]">
      <Helmet>
        <title>कृषि प्रश्नोत्तर | Agriculture FAQ - Himalaya Krishi</title>
        <meta name="description" content="कृषि सहयोग, जैविक खेती, सरकारी नीति र प्राविधिक सहयोग सम्बन्धी जानकारी। नेपालको कृषि क्षेत्रको विश्वसनीय मार्गदर्शन। | Expert guidance on agriculture support, organic farming, and government policies in Nepal." />
        <meta name="keywords" content="कृषि सहयोग नेपाल, agriculture support nepal, जैविक खेती, organic farming nepal, कृषि , agriculture ministry nepal, कृषि नीति, agricultural policies, सरकारी सहयोग, government subsidies nepal" />
        
        <link rel="alternate" hrefLang="ne" href="https://krishihimalaya.com/ne/faq" />
        <link rel="alternate" hrefLang="en" href="https://krishihimalaya.com/faq" />
        <meta property="og:locale" content="ne_NP" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Schema.org LD+JSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "inLanguage": ["ne-NP", "en-US"],
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": [
                { "@language": "ne", "@value": item.questionNe },
                { "@language": "en", "@value": item.questionEn }
              ],
              "acceptedAnswer": {
                "@type": "Answer",
                "text": [
                  { "@language": "ne", "@value": item.answerNe },
                  { "@language": "en", "@value": item.answerEn }
                ]
              },
              "keywords": item.tags.join(", ")
            })),
            "about": {
              "@type": ["Organization", "AgricultureService"],
              "name": "हिमालय कृषि | Himalaya Krishi",
              "knowsAbout": [
                "Agriculture ",
                "Organic Farming",
                "Agricultural Policies",
                "Government Subsidies"
              ]
            }
          })}
        </script>
      </Helmet>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span lang="ne" className="block mb-2">कृषि सम्बन्धी सामान्य जिज्ञासाहरू</span>
          <span>Frequently Asked Questions</span>
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                <span lang="ne" className="block mb-2">{faq.questionNe}</span>
                <span>{faq.questionEn}</span>
              </h2>
              <p className="text-gray-600">
                <span lang="ne" className="block mb-2">{faq.answerNe}</span>
                <span>{faq.answerEn}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;