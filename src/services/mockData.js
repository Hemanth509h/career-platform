
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

export const mockPathways = {
  "c1": {
    "title": "AI Product Manager",
    "salary": "$120k - $160k",
    "demand": "High",
    "category": "Technology",
    "description": "Bridge the gap between engineering and user needs to build the next generation of intelligent software.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Learn Product Principles",
        "description": "Master basics of agile methodologies.",
        "courses": [
          "Product Management 101"
        ]
      }
    ]
  },
  "c2": {
    "title": "Data Scientist",
    "salary": "$110k - $150k",
    "demand": "Very High",
    "category": "Technology",
    "description": "Analyze complex datasets to extract insights and build predictive models.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Mathematics & Statistics",
        "description": "Build mathematical foundation.",
        "courses": [
          "Linear Algebra"
        ]
      }
    ]
  },
  "c3": {
    "title": "UX Researcher",
    "salary": "$85k - $125k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "Understand user behavior through qualitative and quantitative research.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Psychology & HCI",
        "description": "Understand human-computer interaction.",
        "courses": [
          "Cognitive Psychology"
        ]
      }
    ]
  },
  "c4": {
    "title": "Specialized Arts & Design Role 4",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c5": {
    "title": "Specialized Science & Engineering Role 5",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c6": {
    "title": "Specialized Healthcare Role 6",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c7": {
    "title": "Specialized Education Role 7",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c8": {
    "title": "Specialized Science & Engineering Role 8",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c9": {
    "title": "Specialized Science & Engineering Role 9",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c10": {
    "title": "Specialized Education Role 10",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c11": {
    "title": "Specialized Science & Engineering Role 11",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c12": {
    "title": "Specialized Science & Engineering Role 12",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c13": {
    "title": "Specialized Technology Role 13",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c14": {
    "title": "Specialized Business Role 14",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c15": {
    "title": "Specialized Arts & Design Role 15",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c16": {
    "title": "Specialized Arts & Design Role 16",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c17": {
    "title": "Specialized Business Role 17",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c18": {
    "title": "Specialized Healthcare Role 18",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c19": {
    "title": "Specialized Education Role 19",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c20": {
    "title": "Specialized Science & Engineering Role 20",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c21": {
    "title": "Specialized Arts & Design Role 21",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c22": {
    "title": "Specialized Arts & Design Role 22",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c23": {
    "title": "Specialized Science & Engineering Role 23",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c24": {
    "title": "Specialized Business Role 24",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c25": {
    "title": "Specialized Healthcare Role 25",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c26": {
    "title": "Specialized Arts & Design Role 26",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c27": {
    "title": "Specialized Education Role 27",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c28": {
    "title": "Specialized Technology Role 28",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c29": {
    "title": "Specialized Science & Engineering Role 29",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c30": {
    "title": "Specialized Business Role 30",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c31": {
    "title": "Specialized Education Role 31",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c32": {
    "title": "Specialized Business Role 32",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c33": {
    "title": "Specialized Business Role 33",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c34": {
    "title": "Specialized Science & Engineering Role 34",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c35": {
    "title": "Specialized Education Role 35",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c36": {
    "title": "Specialized Business Role 36",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c37": {
    "title": "Specialized Education Role 37",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c38": {
    "title": "Specialized Arts & Design Role 38",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c39": {
    "title": "Specialized Science & Engineering Role 39",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c40": {
    "title": "Specialized Arts & Design Role 40",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c41": {
    "title": "Specialized Science & Engineering Role 41",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c42": {
    "title": "Specialized Business Role 42",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c43": {
    "title": "Specialized Healthcare Role 43",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c44": {
    "title": "Specialized Technology Role 44",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c45": {
    "title": "Specialized Education Role 45",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c46": {
    "title": "Specialized Business Role 46",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c47": {
    "title": "Specialized Business Role 47",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c48": {
    "title": "Specialized Business Role 48",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c49": {
    "title": "Specialized Science & Engineering Role 49",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c50": {
    "title": "Specialized Arts & Design Role 50",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c51": {
    "title": "Specialized Education Role 51",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c52": {
    "title": "Specialized Education Role 52",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c53": {
    "title": "Specialized Business Role 53",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c54": {
    "title": "Specialized Technology Role 54",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c55": {
    "title": "Specialized Education Role 55",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c56": {
    "title": "Specialized Education Role 56",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c57": {
    "title": "Specialized Business Role 57",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c58": {
    "title": "Specialized Business Role 58",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c59": {
    "title": "Specialized Business Role 59",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c60": {
    "title": "Specialized Healthcare Role 60",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c61": {
    "title": "Specialized Arts & Design Role 61",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c62": {
    "title": "Specialized Technology Role 62",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c63": {
    "title": "Specialized Technology Role 63",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c64": {
    "title": "Specialized Healthcare Role 64",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c65": {
    "title": "Specialized Technology Role 65",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c66": {
    "title": "Specialized Technology Role 66",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c67": {
    "title": "Specialized Science & Engineering Role 67",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c68": {
    "title": "Specialized Healthcare Role 68",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c69": {
    "title": "Specialized Science & Engineering Role 69",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c70": {
    "title": "Specialized Science & Engineering Role 70",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c71": {
    "title": "Specialized Healthcare Role 71",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c72": {
    "title": "Specialized Arts & Design Role 72",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c73": {
    "title": "Specialized Business Role 73",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c74": {
    "title": "Specialized Science & Engineering Role 74",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c75": {
    "title": "Specialized Arts & Design Role 75",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c76": {
    "title": "Specialized Education Role 76",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c77": {
    "title": "Specialized Arts & Design Role 77",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c78": {
    "title": "Specialized Healthcare Role 78",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c79": {
    "title": "Specialized Business Role 79",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c80": {
    "title": "Specialized Technology Role 80",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c81": {
    "title": "Specialized Science & Engineering Role 81",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c82": {
    "title": "Specialized Education Role 82",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c83": {
    "title": "Specialized Healthcare Role 83",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c84": {
    "title": "Specialized Healthcare Role 84",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c85": {
    "title": "Specialized Technology Role 85",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c86": {
    "title": "Specialized Healthcare Role 86",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c87": {
    "title": "Specialized Education Role 87",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c88": {
    "title": "Specialized Education Role 88",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c89": {
    "title": "Specialized Education Role 89",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c90": {
    "title": "Specialized Education Role 90",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c91": {
    "title": "Specialized Science & Engineering Role 91",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c92": {
    "title": "Specialized Arts & Design Role 92",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c93": {
    "title": "Specialized Arts & Design Role 93",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c94": {
    "title": "Specialized Business Role 94",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c95": {
    "title": "Specialized Technology Role 95",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c96": {
    "title": "Specialized Business Role 96",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c97": {
    "title": "Specialized Healthcare Role 97",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c98": {
    "title": "Specialized Science & Engineering Role 98",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c99": {
    "title": "Specialized Arts & Design Role 99",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c100": {
    "title": "Specialized Healthcare Role 100",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c101": {
    "title": "Specialized Education Role 101",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c102": {
    "title": "Specialized Technology Role 102",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c103": {
    "title": "Specialized Healthcare Role 103",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c104": {
    "title": "Specialized Technology Role 104",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c105": {
    "title": "Specialized Education Role 105",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c106": {
    "title": "Specialized Healthcare Role 106",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c107": {
    "title": "Specialized Arts & Design Role 107",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c108": {
    "title": "Specialized Business Role 108",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c109": {
    "title": "Specialized Technology Role 109",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c110": {
    "title": "Specialized Education Role 110",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c111": {
    "title": "Specialized Arts & Design Role 111",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c112": {
    "title": "Specialized Education Role 112",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c113": {
    "title": "Specialized Arts & Design Role 113",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c114": {
    "title": "Specialized Technology Role 114",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c115": {
    "title": "Specialized Science & Engineering Role 115",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c116": {
    "title": "Specialized Science & Engineering Role 116",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c117": {
    "title": "Specialized Science & Engineering Role 117",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c118": {
    "title": "Specialized Healthcare Role 118",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c119": {
    "title": "Specialized Education Role 119",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c120": {
    "title": "Specialized Business Role 120",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c121": {
    "title": "Specialized Science & Engineering Role 121",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c122": {
    "title": "Specialized Science & Engineering Role 122",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c123": {
    "title": "Specialized Education Role 123",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c124": {
    "title": "Specialized Business Role 124",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c125": {
    "title": "Specialized Science & Engineering Role 125",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c126": {
    "title": "Specialized Technology Role 126",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c127": {
    "title": "Specialized Business Role 127",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c128": {
    "title": "Specialized Education Role 128",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c129": {
    "title": "Specialized Technology Role 129",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c130": {
    "title": "Specialized Healthcare Role 130",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c131": {
    "title": "Specialized Arts & Design Role 131",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c132": {
    "title": "Specialized Business Role 132",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c133": {
    "title": "Specialized Education Role 133",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c134": {
    "title": "Specialized Business Role 134",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c135": {
    "title": "Specialized Business Role 135",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c136": {
    "title": "Specialized Science & Engineering Role 136",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c137": {
    "title": "Specialized Arts & Design Role 137",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c138": {
    "title": "Specialized Healthcare Role 138",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c139": {
    "title": "Specialized Technology Role 139",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c140": {
    "title": "Specialized Technology Role 140",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c141": {
    "title": "Specialized Science & Engineering Role 141",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c142": {
    "title": "Specialized Technology Role 142",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c143": {
    "title": "Specialized Science & Engineering Role 143",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c144": {
    "title": "Specialized Arts & Design Role 144",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c145": {
    "title": "Specialized Arts & Design Role 145",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c146": {
    "title": "Specialized Business Role 146",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c147": {
    "title": "Specialized Science & Engineering Role 147",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c148": {
    "title": "Specialized Healthcare Role 148",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c149": {
    "title": "Specialized Arts & Design Role 149",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c150": {
    "title": "Specialized Healthcare Role 150",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c151": {
    "title": "Specialized Education Role 151",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c152": {
    "title": "Specialized Business Role 152",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c153": {
    "title": "Specialized Science & Engineering Role 153",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c154": {
    "title": "Specialized Business Role 154",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c155": {
    "title": "Specialized Arts & Design Role 155",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c156": {
    "title": "Specialized Arts & Design Role 156",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c157": {
    "title": "Specialized Healthcare Role 157",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c158": {
    "title": "Specialized Business Role 158",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c159": {
    "title": "Specialized Arts & Design Role 159",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c160": {
    "title": "Specialized Technology Role 160",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c161": {
    "title": "Specialized Business Role 161",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c162": {
    "title": "Specialized Arts & Design Role 162",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c163": {
    "title": "Specialized Healthcare Role 163",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c164": {
    "title": "Specialized Technology Role 164",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c165": {
    "title": "Specialized Healthcare Role 165",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c166": {
    "title": "Specialized Technology Role 166",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c167": {
    "title": "Specialized Business Role 167",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c168": {
    "title": "Specialized Science & Engineering Role 168",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c169": {
    "title": "Specialized Arts & Design Role 169",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c170": {
    "title": "Specialized Arts & Design Role 170",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c171": {
    "title": "Specialized Arts & Design Role 171",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c172": {
    "title": "Specialized Science & Engineering Role 172",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c173": {
    "title": "Specialized Arts & Design Role 173",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c174": {
    "title": "Specialized Technology Role 174",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c175": {
    "title": "Specialized Technology Role 175",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c176": {
    "title": "Specialized Healthcare Role 176",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c177": {
    "title": "Specialized Technology Role 177",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c178": {
    "title": "Specialized Healthcare Role 178",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c179": {
    "title": "Specialized Arts & Design Role 179",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c180": {
    "title": "Specialized Education Role 180",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c181": {
    "title": "Specialized Business Role 181",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c182": {
    "title": "Specialized Healthcare Role 182",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c183": {
    "title": "Specialized Technology Role 183",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c184": {
    "title": "Specialized Technology Role 184",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c185": {
    "title": "Specialized Science & Engineering Role 185",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c186": {
    "title": "Specialized Education Role 186",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c187": {
    "title": "Specialized Education Role 187",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c188": {
    "title": "Specialized Business Role 188",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c189": {
    "title": "Specialized Education Role 189",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c190": {
    "title": "Specialized Education Role 190",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c191": {
    "title": "Specialized Healthcare Role 191",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c192": {
    "title": "Specialized Arts & Design Role 192",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c193": {
    "title": "Specialized Science & Engineering Role 193",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c194": {
    "title": "Specialized Arts & Design Role 194",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c195": {
    "title": "Specialized Technology Role 195",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c196": {
    "title": "Specialized Technology Role 196",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c197": {
    "title": "Specialized Business Role 197",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c198": {
    "title": "Specialized Science & Engineering Role 198",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c199": {
    "title": "Specialized Technology Role 199",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c200": {
    "title": "Specialized Education Role 200",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c201": {
    "title": "Specialized Healthcare Role 201",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c202": {
    "title": "Specialized Education Role 202",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c203": {
    "title": "Specialized Technology Role 203",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c204": {
    "title": "Specialized Healthcare Role 204",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c205": {
    "title": "Specialized Education Role 205",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c206": {
    "title": "Specialized Science & Engineering Role 206",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c207": {
    "title": "Specialized Business Role 207",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c208": {
    "title": "Specialized Arts & Design Role 208",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c209": {
    "title": "Specialized Arts & Design Role 209",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c210": {
    "title": "Specialized Business Role 210",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c211": {
    "title": "Specialized Arts & Design Role 211",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c212": {
    "title": "Specialized Education Role 212",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c213": {
    "title": "Specialized Education Role 213",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c214": {
    "title": "Specialized Business Role 214",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c215": {
    "title": "Specialized Education Role 215",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c216": {
    "title": "Specialized Healthcare Role 216",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c217": {
    "title": "Specialized Science & Engineering Role 217",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c218": {
    "title": "Specialized Business Role 218",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c219": {
    "title": "Specialized Arts & Design Role 219",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c220": {
    "title": "Specialized Technology Role 220",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c221": {
    "title": "Specialized Education Role 221",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c222": {
    "title": "Specialized Business Role 222",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c223": {
    "title": "Specialized Education Role 223",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c224": {
    "title": "Specialized Education Role 224",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c225": {
    "title": "Specialized Business Role 225",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c226": {
    "title": "Specialized Technology Role 226",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c227": {
    "title": "Specialized Healthcare Role 227",
    "salary": "$120k - $180k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c228": {
    "title": "Specialized Arts & Design Role 228",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c229": {
    "title": "Specialized Education Role 229",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c230": {
    "title": "Specialized Arts & Design Role 230",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c231": {
    "title": "Specialized Healthcare Role 231",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c232": {
    "title": "Specialized Education Role 232",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c233": {
    "title": "Specialized Arts & Design Role 233",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c234": {
    "title": "Specialized Healthcare Role 234",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c235": {
    "title": "Specialized Technology Role 235",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c236": {
    "title": "Specialized Arts & Design Role 236",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c237": {
    "title": "Specialized Healthcare Role 237",
    "salary": "$100k - $150k",
    "demand": "Very High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c238": {
    "title": "Specialized Arts & Design Role 238",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c239": {
    "title": "Specialized Technology Role 239",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c240": {
    "title": "Specialized Education Role 240",
    "salary": "$100k - $150k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c241": {
    "title": "Specialized Education Role 241",
    "salary": "$80k - $120k",
    "demand": "High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c242": {
    "title": "Specialized Technology Role 242",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c243": {
    "title": "Specialized Arts & Design Role 243",
    "salary": "$60k - $90k",
    "demand": "Very High",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c244": {
    "title": "Specialized Science & Engineering Role 244",
    "salary": "$80k - $120k",
    "demand": "Very High",
    "category": "Science & Engineering",
    "description": "A highly specialized career path within the Science & Engineering industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Science & Engineering sector.",
        "courses": [
          "Intro to Science & Engineering"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c245": {
    "title": "Specialized Business Role 245",
    "salary": "$100k - $150k",
    "demand": "Medium",
    "category": "Business",
    "description": "A highly specialized career path within the Business industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Business sector.",
        "courses": [
          "Intro to Business"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c246": {
    "title": "Specialized Education Role 246",
    "salary": "$120k - $180k",
    "demand": "Very High",
    "category": "Education",
    "description": "A highly specialized career path within the Education industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Education sector.",
        "courses": [
          "Intro to Education"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c247": {
    "title": "Specialized Healthcare Role 247",
    "salary": "$80k - $120k",
    "demand": "Medium",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c248": {
    "title": "Specialized Arts & Design Role 248",
    "salary": "$60k - $90k",
    "demand": "Medium",
    "category": "Arts & Design",
    "description": "A highly specialized career path within the Arts & Design industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Arts & Design sector.",
        "courses": [
          "Intro to Arts & Design"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c249": {
    "title": "Specialized Healthcare Role 249",
    "salary": "$60k - $90k",
    "demand": "High",
    "category": "Healthcare",
    "description": "A highly specialized career path within the Healthcare industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Healthcare sector.",
        "courses": [
          "Intro to Healthcare"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  },
  "c250": {
    "title": "Specialized Technology Role 250",
    "salary": "$120k - $180k",
    "demand": "Medium",
    "category": "Technology",
    "description": "A highly specialized career path within the Technology industry focused on modern advancements.",
    "steps": [
      {
        "stage": "Foundation",
        "title": "Industry Basics",
        "description": "Learn the fundamentals of the Technology sector.",
        "courses": [
          "Intro to Technology"
        ]
      },
      {
        "stage": "Specialization",
        "title": "Advanced Techniques",
        "description": "Master specific tools and methodologies for this role.",
        "courses": [
          "Advanced Certification"
        ]
      }
    ]
  }
};
