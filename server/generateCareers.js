import fs from 'fs';

const categories = ["Technology", "Healthcare", "Business", "Arts & Design", "Science & Engineering", "Education"];
const demandLevels = ["Very High", "High", "Medium"];
const salaryRanges = ["$60k - $90k", "$80k - $120k", "$100k - $150k", "$120k - $180k"];

const careers = {};

// Hardcode the first 6 we already have
careers["c1"] = {
  title: "AI Product Manager", salary: "$120k - $160k", demand: "High", category: "Technology",
  description: "Bridge the gap between engineering and user needs to build the next generation of intelligent software.",
  steps: [{ stage: "Foundation", title: "Learn Product Principles", description: "Master basics of agile methodologies.", courses: ["Product Management 101"] }]
};
careers["c2"] = {
  title: "Data Scientist", salary: "$110k - $150k", demand: "Very High", category: "Technology",
  description: "Analyze complex datasets to extract insights and build predictive models.",
  steps: [{ stage: "Foundation", title: "Mathematics & Statistics", description: "Build mathematical foundation.", courses: ["Linear Algebra"] }]
};
careers["c3"] = {
  title: "UX Researcher", salary: "$85k - $125k", demand: "Medium", category: "Arts & Design",
  description: "Understand user behavior through qualitative and quantitative research.",
  steps: [{ stage: "Foundation", title: "Psychology & HCI", description: "Understand human-computer interaction.", courses: ["Cognitive Psychology"] }]
};

// Generate the remaining to reach 250
for (let i = 4; i <= 250; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const demand = demandLevels[Math.floor(Math.random() * demandLevels.length)];
  const salary = salaryRanges[Math.floor(Math.random() * salaryRanges.length)];
  
  careers[`c${i}`] = {
    title: `Specialized ${category} Role ${i}`,
    salary: salary,
    demand: demand,
    category: category,
    description: `A highly specialized career path within the ${category} industry focused on modern advancements.`,
    steps: [
      {
        stage: "Foundation",
        title: "Industry Basics",
        description: `Learn the fundamentals of the ${category} sector.`,
        courses: [`Intro to ${category}`]
      },
      {
        stage: "Specialization",
        title: "Advanced Techniques",
        description: "Master specific tools and methodologies for this role.",
        courses: ["Advanced Certification"]
      }
    ]
  };
}

// Ensure the export matches what the frontend expects
const output = `
export const mockUser = {
  name: "Alex Rivera",
  profile: {
    personality: "Analytical Thinker (INTJ)",
    aptitudeScore: 88,
    interests: ["Technology", "Design", "Problem Solving"]
  },
  careerMatches: [
    {
      id: "c1",
      title: "AI Product Manager",
      matchScore: 94,
      demand: "High",
      salary: "$120k - $160k",
      description: "Bridge the gap between engineering and user needs to build the next generation of intelligent software."
    },
    {
      id: "c2",
      title: "Data Scientist",
      matchScore: 89,
      demand: "Very High",
      salary: "$110k - $150k",
      description: "Analyze complex datasets to extract insights and build predictive models."
    },
    {
      id: "c3",
      title: "UX Researcher",
      matchScore: 82,
      demand: "Medium",
      salary: "$85k - $125k",
      description: "Understand user behavior through qualitative and quantitative research."
    }
  ],
  recommendedCourses: [
    {
      id: "cr1",
      title: "Machine Learning Foundations",
      provider: "Stanford University (via Coursera)",
      duration: "8 weeks",
      type: "Certification",
      matchReason: "Aligns with your AI Product Manager career goal."
    },
    {
      id: "cr2",
      title: "Design Thinking Practitioner",
      provider: "IBM",
      duration: "4 weeks",
      type: "Micro-credential",
      matchReason: "Builds essential skills for the UX Researcher path."
    }
  ]
};

export const mockPathways = ${JSON.stringify(careers, null, 2)};
`;

fs.writeFileSync('../src/services/mockData.js', output);
console.log('Successfully generated 250 careers in mockData.js');
