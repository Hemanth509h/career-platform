// Real Indian Careers Database — CareerAI Mentor

export const mockUser = {
  name: "Rahul Sharma",
  profile: {
    personality: "Analytical Thinker (INTJ)",
    aptitudeScore: 88,
    interests: ["Technology", "Data Science", "Problem Solving"],
    learningStyle: "Visual Learner",
    academicStrengths: ["Mathematics", "Computer Science"],
  },
  careerMatches: [
    { id: "ind02", title: "Data Scientist", matchScore: 94, demand: "Very High", salary: "₹10L – ₹45L", description: "Extract insights from large datasets to drive business and social decisions using ML and statistics." },
    { id: "ind03", title: "AI/ML Engineer", matchScore: 91, demand: "Very High", salary: "₹12L – ₹60L", description: "Build and deploy machine learning models and AI systems for real-world applications." },
    { id: "ind17", title: "Product Manager", matchScore: 86, demand: "High", salary: "₹12L – ₹55L", description: "Drive the strategy and execution of digital products, bridging business, design, and engineering." },
  ],
  recommendedCourses: [
    { id: "cr1", title: "Data Science with Python", provider: "IIT Madras (NPTEL)", duration: "12 weeks", type: "Certification", matchReason: "Aligns with Data Scientist career path." },
    { id: "cr2", title: "Machine Learning Specialization", provider: "Stanford / Coursera", duration: "4 months", type: "Certification", matchReason: "Core requirement for AI/ML Engineer role." },
    { id: "cr3", title: "AI Product Management", provider: "Duke University (Coursera)", duration: "4 months", type: "Specialization", matchReason: "Bridges tech and product for PM role." },
  ],
};

// 25 Real Indian Career Pathways
export const mockPathways = {

  // ─── TECHNOLOGY ────────────────────────────────────────
  ind01: {
    title: "Software Engineer",
    salary: "₹5L – ₹50L",
    demand: "Very High",
    category: "Technology",
    description: "Design, develop, and maintain software applications powering India's booming IT sector and startups.",
    topCompanies: ["TCS", "Infosys", "Wipro", "Google India", "Microsoft India", "Flipkart", "Swiggy", "Zomato"],
    skills: ["Data Structures & Algorithms", "Java / Python / C++", "System Design", "Git", "SQL / NoSQL"],
    steps: [
      { stage: "Foundation", title: "Programming Fundamentals", description: "Master data structures, algorithms, and at least one language (Python, Java, or C++).", courses: ["CS50 (Harvard / edX, Free)", "Data Structures (NPTEL, IIT)", "Python for Everybody (Coursera)"] },
      { stage: "Skill Building", title: "Full Stack & System Design", description: "Learn web development frameworks, databases, APIs, and basic system design principles.", courses: ["The Odin Project (Free)", "Full Stack Bootcamp (Scaler / Newton)", "System Design Primer (GitHub)"] },
      { stage: "Practical Experience", title: "Internships & Open Source", description: "Apply via internshala.com, contribute to GitHub open source projects, build a portfolio.", courses: ["Internshala Internship Programs", "GSoC (Google Summer of Code)", "LeetCode 150 DSA Problems"] },
      { stage: "Job Ready", title: "Crack Placements & Interviews", description: "Prepare for campus placements or off-campus drives at product companies and MNCs.", courses: ["NeetCode.io Interview Prep (Free)", "Mock Interviews (Pramp / InterviewBit)", "Resume building on LinkedIn"] },
    ],
  },

  ind02: {
    title: "Data Scientist",
    salary: "₹8L – ₹45L",
    demand: "Very High",
    category: "Technology",
    description: "Analyse large datasets using statistics and ML to uncover business insights. One of India's most sought-after roles.",
    topCompanies: ["Amazon", "Flipkart", "Mu Sigma", "Fractal Analytics", "IBM India", "Deloitte India", "PhonePe"],
    skills: ["Python (Pandas, NumPy)", "Machine Learning", "SQL", "Statistics", "Data Visualization (Tableau / Power BI)"],
    steps: [
      { stage: "Foundation", title: "Statistics & Python", description: "Build strong statistical thinking and learn Python data libraries: Pandas, NumPy, Matplotlib.", courses: ["Statistics for Data Science (NPTEL, Free)", "Python Data Science Handbook (Free)", "Khan Academy Statistics (Free)"] },
      { stage: "Skill Building", title: "Machine Learning & SQL", description: "Master ML algorithms, model evaluation, and SQL for data extraction.", courses: ["Machine Learning Specialization – Stanford / Coursera", "SQL for Data Analysis – Mode Analytics (Free)", "Kaggle ML Courses (Free)"] },
      { stage: "Practical Experience", title: "Kaggle Competitions & Projects", description: "Participate in Kaggle competitions, build an end-to-end ML project portfolio.", courses: ["Kaggle Competitions (Free)", "Data Science Projects on GitHub", "Great Learning Project Courses"] },
      { stage: "Job Ready", title: "Certifications & Job Applications", description: "Earn recognised certificates and apply to Mu Sigma, Fractal, Amazon India.", courses: ["IBM Data Science Certificate (Coursera)", "Google Data Analytics Certificate", "IIT Madras BS Data Science Programme"] },
    ],
  },

  ind03: {
    title: "AI / ML Engineer",
    salary: "₹12L – ₹65L",
    demand: "Very High",
    category: "Technology",
    description: "Build, train, and deploy machine learning models and AI systems for Indian and global tech companies.",
    topCompanies: ["Google India", "Microsoft India", "NVIDIA India", "Ola", "CRED", "ShareChat", "Razorpay"],
    skills: ["Deep Learning (TensorFlow / PyTorch)", "Python", "MLOps", "Computer Vision / NLP", "Cloud (AWS/GCP/Azure)"],
    steps: [
      { stage: "Foundation", title: "Math & Python for AI", description: "Linear algebra, calculus, probability — the mathematical core of all ML. Master Python.", courses: ["3Blue1Brown: Essence of Linear Algebra (YouTube, Free)", "Mathematics for ML (Coursera, Imperial College)", "Fast.ai Practical Deep Learning (Free)"] },
      { stage: "Skill Building", title: "Deep Learning Frameworks", description: "Learn TensorFlow or PyTorch, build neural networks for image, text, and tabular data.", courses: ["Deep Learning Specialization – deeplearning.ai", "PyTorch for Deep Learning (Zero to Mastery)", "Hugging Face NLP Course (Free)"] },
      { stage: "Practical Experience", title: "Research Papers & Projects", description: "Implement research papers, build an NLP or computer vision project, contribute to AI-for-India initiatives.", courses: ["Papers With Code (Free)", "Kaggle AI Competitions", "AI4Bharat Datasets & Projects"] },
      { stage: "Job Ready", title: "MLOps & Deployment Skills", description: "Learn to deploy models with Docker, FastAPI, and cloud ML services for production.", courses: ["MLOps Specialization (DeepLearning.ai, Coursera)", "Full Stack Deep Learning (Free)", "AWS SageMaker Workshop"] },
    ],
  },

  ind04: {
    title: "Cybersecurity Analyst",
    salary: "₹6L – ₹35L",
    demand: "Very High",
    category: "Technology",
    description: "Protect India's growing digital infrastructure — banks, startups, and government systems — from cyber threats.",
    topCompanies: ["Tata Consultancy Services", "HCL Technologies", "Quick Heal", "Wipro CyberSec", "CERT-In", "Deloitte", "KPMG India"],
    skills: ["Network Security", "Ethical Hacking (CEH)", "SIEM Tools", "Linux", "Incident Response"],
    steps: [
      { stage: "Foundation", title: "Networking & Linux Basics", description: "Learn TCP/IP, networking protocols, Linux command line — the backbone of all security work.", courses: ["CompTIA Network+ (Study Guide, Free on YouTube)", "Linux Fundamentals for Hackers (TryHackMe)", "Networking Basics – Cisco NetAcad (Free)"] },
      { stage: "Skill Building", title: "Ethical Hacking & Security Tools", description: "Learn Kali Linux, Metasploit, Wireshark, and penetration testing methodologies.", courses: ["CEH (Certified Ethical Hacker) – EC-Council", "TryHackMe / HackTheBox (Free + Paid)", "Cybersecurity Specialization – Google (Coursera)"] },
      { stage: "Practical Experience", title: "CTF Competitions & Bug Bounties", description: "Participate in Capture-The-Flag competitions and bug bounty programs on HackerOne / Bugcrowd.", courses: ["CTF101 by picoCTF (Free)", "HackerOne Bug Bounty Program", "OWASP Top 10 (Free Documentation)"] },
      { stage: "Job Ready", title: "Industry Certifications", description: "Earn CEH, CompTIA Security+, or OSCP for credibility with Indian employers.", courses: ["CompTIA Security+ (Exam prep)", "OSCP (Offensive Security)", "EC-Council CEH India Training"] },
    ],
  },

  ind05: {
    title: "Cloud Solutions Architect",
    salary: "₹15L – ₹60L",
    demand: "Very High",
    category: "Technology",
    description: "Design and manage cloud infrastructure for India's enterprises and unicorn startups on AWS, Azure, or GCP.",
    topCompanies: ["Amazon Web Services India", "Microsoft Azure India", "Infosys", "Cognizant", "Capgemini India", "Wipro", "Swiggy"],
    skills: ["AWS / Azure / GCP", "Terraform (IaC)", "Docker & Kubernetes", "System Design", "CI/CD Pipelines"],
    steps: [
      { stage: "Foundation", title: "Cloud Fundamentals", description: "Understand cloud computing concepts — IaaS, PaaS, SaaS — and get started on AWS or Azure.", courses: ["AWS Cloud Practitioner (Free Digital Training)", "Microsoft Azure Fundamentals (AZ-900, Free)", "Google Cloud Fundamentals (Coursera)"] },
      { stage: "Skill Building", title: "DevOps & Containerisation", description: "Learn Docker, Kubernetes, Terraform for infrastructure-as-code, and CI/CD with GitHub Actions.", courses: ["Docker & Kubernetes: The Complete Guide (Udemy)", "HashiCorp Terraform Associate Prep", "DevOps Bootcamp (KodeKloud)"] },
      { stage: "Practical Experience", title: "Hands-on Cloud Projects", description: "Build and deploy real-world cloud architectures — host a scalable web app or serverless API.", courses: ["AWS Free Tier Projects (Free)", "Cloud Resume Challenge (Free)", "Azure DevOps Labs (Free)"] },
      { stage: "Job Ready", title: "AWS / Azure Certifications", description: "Earn AWS Solutions Architect Associate or Azure Administrator to land high-paying roles.", courses: ["AWS Certified Solutions Architect – Associate", "AZ-104 Microsoft Azure Administrator", "Google Professional Cloud Architect"] },
    ],
  },

  ind23: {
    title: "Mobile App Developer",
    salary: "₹5L – ₹35L",
    demand: "High",
    category: "Technology",
    description: "Build apps for India's 800M+ smartphone users on Android (Kotlin) or cross-platform (Flutter / React Native).",
    topCompanies: ["BYJU'S", "Paytm", "PhonePe", "Meesho", "Nykaa", "Dream11", "Razorpay", "Urban Company"],
    skills: ["Flutter / React Native", "Kotlin / Swift", "REST APIs", "Firebase", "App Store Deployment"],
    steps: [
      { stage: "Foundation", title: "Programming & UI Basics", description: "Learn Dart (for Flutter) or JavaScript (for React Native), understand mobile UI principles.", courses: ["Flutter & Dart – The Complete Guide (Udemy)", "React Native – The Practical Guide (Udemy)", "Android Development with Kotlin (Udacity, Free)"] },
      { stage: "Skill Building", title: "Backend Integration & Firebase", description: "Connect apps to REST APIs and Firebase for auth, database, and storage.", courses: ["Firebase Fundamentals (Google Codelabs, Free)", "API Integration in Flutter (YouTube, Free)", "Full Stack Flutter (Coursera)"] },
      { stage: "Practical Experience", title: "Build & Publish an App", description: "Build a real-world app (e.g., budget tracker, local business directory) and publish on Play Store.", courses: ["Play Store Developer Guide (Google, Free)", "Internshala Android / Flutter Internship", "Build 15 Flutter Apps (Udemy)"] },
      { stage: "Job Ready", title: "Portfolio & Job Hunting", description: "Showcase apps on GitHub and LinkedIn, apply to Indian startups via AngelList / LinkedIn Jobs.", courses: ["Google Android Developer Certification", "Meta React Native Certificate (Coursera)", "LinkedIn Learning: Mobile UX Design"] },
    ],
  },

  ind24: {
    title: "DevOps / SRE Engineer",
    salary: "₹8L – ₹45L",
    demand: "Very High",
    category: "Technology",
    description: "Bridge development and operations to build reliable, scalable systems at Indian tech companies and MNCs.",
    topCompanies: ["Razorpay", "CRED", "Zepto", "Wipro", "HCL", "TCS Digital", "IBM India"],
    skills: ["Linux / Shell Scripting", "CI/CD (Jenkins / GitHub Actions)", "Docker & Kubernetes", "Monitoring (Prometheus / Grafana)", "Ansible / Terraform"],
    steps: [
      { stage: "Foundation", title: "Linux & Scripting", description: "Master Linux administration, Bash scripting, and networking fundamentals for DevOps.", courses: ["Linux Fundamentals (Linux Foundation, Free intro)", "Shell Scripting Tutorial (YouTube, edureka)", "Networking for DevOps (KodeKloud, Free)"] },
      { stage: "Skill Building", title: "CI/CD & Infrastructure as Code", description: "Build automated pipelines with Jenkins or GitHub Actions; manage infra with Terraform and Ansible.", courses: ["Jenkins Pipeline Full Course (YouTube, Free)", "Terraform Associate Prep (HashiCorp Learn)", "Ansible for DevOps (Jeff Geerling, Free)"] },
      { stage: "Practical Experience", title: "Kubernetes & Monitoring", description: "Deploy containerised apps on Kubernetes, set up monitoring with Prometheus and Grafana.", courses: ["Certified Kubernetes Application Developer (CKAD)", "Prometheus & Grafana Tutorial (YouTube)", "DevOps Projects Bootcamp (KodeKloud)"] },
      { stage: "Job Ready", title: "Certifications & Job Hunt", description: "CKA / CKAD or AWS DevOps Engineer certificate positions you for senior DevOps roles.", courses: ["CKA – Certified Kubernetes Administrator", "AWS Certified DevOps Engineer – Professional", "Linux Foundation DevOps Bootcamp"] },
    ],
  },

  // ─── FINANCE & BUSINESS ────────────────────────────────
  ind06: {
    title: "Chartered Accountant (CA)",
    salary: "₹7L – ₹40L",
    demand: "High",
    category: "Finance",
    description: "India's most prestigious finance qualification. CAs audit accounts, handle taxation, and lead finance at top firms.",
    topCompanies: ["Big 4 (Deloitte, PwC, EY, KPMG)", "TCS Finance", "Reliance Industries", "HDFC Bank", "SEBI", "Indian PSUs"],
    skills: ["Financial Reporting (Ind AS)", "Taxation (GST / Income Tax)", "Auditing", "Corporate Law", "Excel & Tally ERP"],
    steps: [
      { stage: "Foundation", title: "CA Foundation", description: "Clear the CA Foundation exam (4 papers: Accounting, Business Law, Economics, Maths).", courses: ["ICAI Study Material (Official, Free)", "CA Foundation by Unacademy / CA Wallah", "Khan Academy Accounting Basics (Free)"] },
      { stage: "Skill Building", title: "CA Intermediate", description: "8 papers covering advanced accounting, taxation, auditing, and strategic management.", courses: ["CA Intermediate – ICAI Coaching", "Vinod Gupta Classes (CA Intermediate, India)", "CA Gurukul App"] },
      { stage: "Practical Experience", title: "3-Year Articleship", description: "Mandatory 3-year articleship under a practicing CA — gain real-world audit, tax, and compliance experience.", courses: ["ICAI Articleship Training (Required)", "Industrial Training Modules (ICAI)", "CA Articles Network India"] },
      { stage: "Job Ready", title: "CA Final & Placement", description: "Clear CA Final (8 papers), register with ICAI, and attend campus placements at Big 4 or join industry.", courses: ["CA Final Study Material (ICAI)", "ICAI Campus Placement 2025", "Bloomberg Essentials Certificate"] },
    ],
  },

  ind07: {
    title: "Investment Banker",
    salary: "₹15L – ₹1Cr+",
    demand: "High",
    category: "Finance",
    description: "Facilitate mergers, IPOs, and capital raising for India's top corporates. One of the highest-paying careers in finance.",
    topCompanies: ["Goldman Sachs India", "Morgan Stanley India", "Kotak Investment Banking", "Axis Capital", "ICICI Securities", "JM Financial"],
    skills: ["Financial Modelling (DCF, LBO)", "Valuation", "Excel / PowerPoint", "Capital Markets", "M&A Analysis"],
    steps: [
      { stage: "Foundation", title: "Finance & Accounting Basics", description: "Master balance sheets, income statements, DCF valuation, and how capital markets work.", courses: ["Financial Markets – Yale (Coursera, Free Audit)", "Introduction to Corporate Finance (Wharton, Coursera)", "NSE Academy Capital Markets Certificate"] },
      { stage: "Skill Building", title: "Financial Modelling", description: "Build complex 3-statement models, DCF, LBO, and merger models in Excel.", courses: ["Financial Modelling & Valuation (WSP India)", "Breaking Into Wall Street India (BIWS)", "CFI Financial Modelling (Free Intro)"] },
      { stage: "Practical Experience", title: "Internships & Networking", description: "Secure summer internships at investment banks or boutique advisory firms via your MBA/commerce network.", courses: ["Internshala Finance Internships", "Wall Street Prep IB Prep Program", "Bloomberg Market Concepts (BMC, Free for students)"] },
      { stage: "Job Ready", title: "MBA / CFA & IB Placement", description: "An MBA from IIM or a CFA qualification dramatically increases IB placement chances.", courses: ["CFA Level 1 (CFA Institute)", "IIM Ahmedabad / Bangalore MBA (CAT)", "XLRI BM Finance Programme"] },
    ],
  },

  ind08: {
    title: "Management Consultant",
    salary: "₹12L – ₹60L",
    demand: "High",
    category: "Business",
    description: "Solve complex business problems for India's top companies. McKinsey, BCG, and Bain actively recruit in India.",
    topCompanies: ["McKinsey & Company India", "Boston Consulting Group", "Bain & Company", "Deloitte Consulting", "Accenture Strategy", "Kearney India"],
    skills: ["Structured Problem Solving", "Case Frameworks (MECE)", "Excel & PowerPoint", "Business Strategy", "Data Analysis"],
    steps: [
      { stage: "Foundation", title: "Business Acumen", description: "Understand business models, economics, and the fundamentals of strategy and operations.", courses: ["Business Strategy – University of Virginia (Coursera)", "Microeconomics (IIT Delhi, NPTEL, Free)", "HBR Case Studies (Free Articles)"] },
      { stage: "Skill Building", title: "Case Interview Preparation", description: "Master consulting frameworks: profitability, market sizing, M&A, and operations cases.", courses: ["Case in Point – Marc Cosentino (Book)", "MConsulting Prep Case Library (Free)", "PrepLounge Practice Cases (Free + Paid)"] },
      { stage: "Practical Experience", title: "Consulting Internships", description: "Intern at a consulting firm or participate in case competitions (Deloitte, BCG, Accenture on campus).", courses: ["Internshala / LinkedIn Consulting Internships", "BCG Platinion Case Competition", "Accenture Campus Case Challenge"] },
      { stage: "Job Ready", title: "MBA from Top IIM / ISB", description: "IIM A/B/C or ISB Hyderabad are the top recruiting grounds for McKinsey, BCG, and Bain in India.", courses: ["CAT Exam Preparation (IMS / TIME)", "ISB PGP Programme (Hyderabad / Mohali)", "GMAT Preparation (GMAT Club, Free Resources)"] },
    ],
  },

  ind09: {
    title: "Digital Marketer",
    salary: "₹3L – ₹25L",
    demand: "High",
    category: "Business",
    description: "Drive online growth for India's booming e-commerce, D2C, and startup ecosystem through data-driven marketing.",
    topCompanies: ["Nykaa", "Mamaearth", "boAt", "Meesho", "Swiggy", "Zomato", "Housing.com", "Dentsu India"],
    skills: ["SEO / SEM", "Social Media Marketing", "Google & Meta Ads", "Email Marketing", "Google Analytics / Meta Pixel"],
    steps: [
      { stage: "Foundation", title: "Digital Marketing Basics", description: "Learn the full digital marketing ecosystem: SEO, SEM, social media, content, and email.", courses: ["Google Digital Garage – Fundamentals of Digital Marketing (Free)", "HubSpot Academy Inbound Marketing (Free)", "Meta Social Media Marketing Certificate (Coursera)"] },
      { stage: "Skill Building", title: "Paid Ads & Analytics", description: "Run real Google and Meta ad campaigns, master Google Analytics 4 and conversion tracking.", courses: ["Google Ads Certifications (Google Skillshop, Free)", "Meta Blueprint Digital Marketing (Free)", "GA4 for Beginners (Google Analytics Academy, Free)"] },
      { stage: "Practical Experience", title: "Freelancing & Live Campaigns", description: "Manage small business pages, run performance campaigns, build a case study portfolio.", courses: ["Internshala Digital Marketing Internship", "Fiverr / Upwork (start freelancing)", "DigitalDeepak Internship Programme (India)"] },
      { stage: "Job Ready", title: "Specialisation & Placement", description: "Specialise in performance marketing, SEO, or content strategy and apply at D2C brands.", courses: ["upGrad Digital Marketing PG Certificate", "MICA School of Communication – Digital Marketing", "LinkedIn Marketing Solutions Certification (Free)"] },
    ],
  },

  ind22: {
    title: "Financial Analyst",
    salary: "₹5L – ₹30L",
    demand: "High",
    category: "Finance",
    description: "Analyse financial data to guide investment decisions at banks, NBFCs, and corporate finance teams across India.",
    topCompanies: ["HDFC Bank", "ICICI Bank", "Axis Bank", "Motilal Oswal", "Kotak Mahindra", "Reliance Capital", "JP Morgan India"],
    skills: ["Financial Modelling", "Excel / Power BI", "Equity Research", "Valuation", "Financial Statements Analysis"],
    steps: [
      { stage: "Foundation", title: "Accounting & Finance Basics", description: "Understand financial statements, ratio analysis, and basic capital markets.", courses: ["Financial Accounting – Wharton (Coursera, Free Audit)", "NSE Academy Capital Markets Module (Free)", "Khan Academy Personal Finance & Markets (Free)"] },
      { stage: "Skill Building", title: "Excel & Financial Modelling", description: "Build 3-statement financial models, DCF valuations, and equity research reports in Excel.", courses: ["Excel & VBA for Finance (CFI, Free Intro)", "Equity Research Foundation (NSE Academy)", "Financial Modelling (Udemy / WSP India)"] },
      { stage: "Practical Experience", title: "Equity Research Internship", description: "Join a broking house or NBFC as an intern, write equity research reports on Indian listed companies.", courses: ["Internshala – Finance / Research Internships", "SEBI Investor Education Programme", "NSE / BSE Certification in Securities Markets (NCFM/BCAP)"] },
      { stage: "Job Ready", title: "CFA / MBA & Placement", description: "CFA Level 1 is a strong differentiator. Apply to banks, AMCs, and research firms.", courses: ["CFA Level 1 (CFA Institute)", "FRM Certification (GARP)", "IIM Indore / Shillong Finance MBA"] },
    ],
  },

  // ─── GOVERNMENT & PUBLIC SERVICE ────────────────────
  ind10: {
    title: "IAS / Civil Services Officer",
    salary: "₹7L – ₹18L (+ perks)",
    demand: "Stable",
    category: "Government",
    description: "Join India's elite IAS, IPS, IFS, or other Central Services through UPSC — the most prestigious career in public administration.",
    topCompanies: ["Government of India (DoPT)", "State Governments", "IAS Cadres", "IPS Cadres", "IRS / IFS"],
    skills: ["General Studies (Polity, History, Economy)", "Essay Writing", "Current Affairs", "CSAT (Aptitude)", "Ethics & Integrity"],
    steps: [
      { stage: "Foundation", title: "UPSC Syllabus & NCERT Base", description: "Read all NCERT textbooks (Class 6–12) for History, Geography, Polity, Science, and Economics.", courses: ["NCERT Textbooks (Free Download from ncert.nic.in)", "Vision IAS Foundation Course", "Unacademy UPSC Foundation Batch (Free Live Classes)"] },
      { stage: "Skill Building", title: "GS Mains & Optional Subject", description: "Master all 4 GS papers and select an optional subject (Public Administration, Geography, Sociology, etc.).", courses: ["Drishti IAS Mains Programme", "BYJU'S IAS Comprehensive Study Material", "Insights on India Daily Prelims Quiz (Free)"] },
      { stage: "Practical Experience", title: "Test Series & Previous Papers", description: "Solve 10 years of UPSC Previous Year Papers, join a serious test series for Prelims and Mains.", courses: ["IASbaba Test Series (Free + Paid)", "Vajiram & Ravi Test Series", "Vision IAS Prelims Test Series"] },
      { stage: "Job Ready", title: "Personality Interview (DAF)", description: "Prepare your Detailed Application Form (DAF), practice mock interviews, and work on communication and current affairs.", courses: ["Chanakya IAS Interview Guidance", "Khan Study Group Interview Prep", "Forum IAS Mock Interview Program"] },
    ],
  },

  // ─── HEALTHCARE ────────────────────────────────────────
  ind11: {
    title: "Doctor (MBBS / MD)",
    salary: "₹8L – ₹1Cr+",
    demand: "Very High",
    category: "Healthcare",
    description: "India's most respected career. Serve patients in government hospitals, private clinics, or specialise through MD/MS.",
    topCompanies: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Health Services", "Manipal Hospitals"],
    skills: ["Clinical Medicine", "Patient Diagnosis", "Medical Ethics", "Anatomy & Physiology", "Pharmacology"],
    steps: [
      { stage: "Foundation", title: "NEET-UG Preparation", description: "Crack NEET-UG (Physics, Chemistry, Biology) to enter MBBS at government or private medical colleges.", courses: ["Aakash / Allen NEET Coaching (India)", "NEET PYQ Practice (YouTube – Unacademy)", "NCERT Biology Class 11–12 (Free)"] },
      { stage: "Skill Building", title: "MBBS (5.5 Years)", description: "Complete pre-clinical (Anatomy, Physiology, Biochemistry) and clinical rotations in all major specialties.", courses: ["MBBS Curriculum – MCI / NMC Guidelines", "First Aid for USMLE (Reference for clinical concepts)", "Marrow / Prepladder for MBBS Exams"] },
      { stage: "Practical Experience", title: "Internship (1 Year)", description: "Mandatory rotating internship across Medicine, Surgery, Paediatrics, OBG, and Community Medicine.", courses: ["NMC Internship Training Guidelines", "Clinical Skills Lab Modules (NMC)", "Emergency Medicine Protocols (WHO, Free)"] },
      { stage: "Job Ready", title: "NEET-PG & MD/MS Specialisation", description: "Clear NEET-PG to enter specialisation. AIIMS, PGI, and JIPMER residencies are top choices.", courses: ["Marrow NEET-PG Course (India's Top Platform)", "Dr. Sajjan's Clinical Surgery", "AIIMS PG Preparation – Dams India"] },
    ],
  },

  ind12: {
    title: "Physiotherapist",
    salary: "₹3L – ₹15L",
    demand: "High",
    category: "Healthcare",
    description: "Help patients recover from injuries, surgeries, and chronic conditions. Booming career in India's sports and eldercare sectors.",
    topCompanies: ["Apollo Hospitals", "Kokilaben Hospital", "Fortis", "Indian Cricket Board (BCCI)", "Aster DM Healthcare", "Private Clinics"],
    skills: ["Manual Therapy", "Exercise Prescription", "Patient Assessment", "Neurological Rehab", "Sports Physiotherapy"],
    steps: [
      { stage: "Foundation", title: "BPT (Bachelor of Physiotherapy)", description: "4.5-year degree with internship. Entrance via NEET or state-level PT entrance exams.", courses: ["BPT Entrance Preparation – Aakash", "Allied Health Sciences Guide – NMC", "Khan Academy Biology (Free, for entrance prep)"] },
      { stage: "Skill Building", title: "Clinical Specialisation", description: "Choose a specialisation: orthopaedic, neuro, sports, paediatric, or cardiopulmonary physiotherapy.", courses: ["Indian Association of Physiotherapists Workshops (IAP)", "Sports Physiotherapy Certification (SPORTS PT India)", "Kinesiology Taping Workshop (Kinesio India)"] },
      { stage: "Practical Experience", title: "Hospital Rotations & Sports Teams", description: "Work at hospitals, fitness centres, or apply to be a physio for IPL teams or state sports boards.", courses: ["IAP Clinical Training Programme", "BCCI Sports Science Workshops", "FITKARI Sports Physio Workshop"] },
      { stage: "Job Ready", title: "MPT & Private Practice", description: "Pursue MPT (Master of Physiotherapy) for specialisation or open a private clinic.", courses: ["MPT Entrance Preparation (Manipal, SRM)", "Clinic Management & Billing India", "FICCI Healthcare Entrepreneur Programme"] },
    ],
  },

  // ─── ENGINEERING ─────────────────────────────────────
  ind13: {
    title: "Civil Engineer",
    salary: "₹4L – ₹25L",
    demand: "High",
    category: "Engineering",
    description: "Design and oversee India's massive infrastructure — roads, bridges, buildings, metros, and smart cities.",
    topCompanies: ["L&T Construction", "NHAI", "RITES", "Tata Projects", "Shapoorji Pallonji", "Gammon India", "DLF", "CPWD"],
    skills: ["AutoCAD / Revit", "Structural Analysis (STAAD.Pro)", "Project Management", "Soil Testing", "Building Codes (IS Standards)"],
    steps: [
      { stage: "Foundation", title: "B.Tech in Civil Engineering", description: "4-year degree from IIT, NIT, or state engineering college. JEE Main / JEE Advanced for top colleges.", courses: ["JEE Mains Preparation – Aakash / FIITJEE", "Engineering Drawing Basics (NPTEL, Free)", "Civil Engineering Fundamentals (MIT OpenCourseWare, Free)"] },
      { stage: "Skill Building", title: "Design Software & Structural Analysis", description: "Learn AutoCAD, STAAD.Pro, and ETABS. Understand IS codes for design of beams, slabs, and foundations.", courses: ["AutoCAD Civil 3D (Udemy / Autodesk Training)", "STAAD.Pro Tutorial (YouTube, Free)", "IS Code Handbook (BIS India, Paid)"] },
      { stage: "Practical Experience", title: "Site Internships & GATE Prep", description: "Intern at construction firms; GATE score opens doors to PSU jobs and M.Tech from IITs.", courses: ["Internshala Civil Engineering Internships", "GATE CE Preparation – Made Easy / ACE", "L&T Construction Internship Programme"] },
      { stage: "Job Ready", title: "PSU Recruitment & Private Sector", description: "GATE → RITES, NHAI, IRCON, BHEL. Private: L&T, Tata Projects, and real estate developers.", courses: ["GATE 2025 Civil Engineering (Made Easy India)", "Project Management Professional PMP (PMI)", "RERA / Construction Law Basics (India)"] },
    ],
  },

  ind14: {
    title: "Mechanical Engineer",
    salary: "₹4L – ₹22L",
    demand: "High",
    category: "Engineering",
    description: "Design machines, automotive systems, and industrial equipment powering India's manufacturing and EV revolution.",
    topCompanies: ["Tata Motors", "Mahindra & Mahindra", "Bharat Forge", "ISRO", "DRDO", "L&T", "BHEL", "Bajaj Auto"],
    skills: ["SolidWorks / CATIA", "Thermodynamics", "Manufacturing Processes", "FEA (ANSYS)", "Lean / Six Sigma"],
    steps: [
      { stage: "Foundation", title: "B.Tech Mechanical Engineering", description: "4-year engineering degree. Strong focus on thermodynamics, mechanics, and materials science.", courses: ["JEE Advanced / Mains Preparation", "Engineering Mechanics (NPTEL, IIT Kharagpur, Free)", "Mechanical Engineering Basics (MIT OCW, Free)"] },
      { stage: "Skill Building", title: "CAD/CAM & FEA Tools", description: "Master SolidWorks or CATIA for design. Learn ANSYS for structural and thermal simulations.", courses: ["SolidWorks Essentials (SOLIDWORKS India, Certified)", "CATIA V5 Tutorial (YouTube, Free)", "ANSYS Fluent Tutorial for Beginners (SimuTech)"] },
      { stage: "Practical Experience", title: "Internships & GATE Exam", description: "Intern at automobile OEMs or manufacturing companies. GATE → BHEL, ISRO, DRDO, ONGC PSU jobs.", courses: ["GATE ME Preparation – Made Easy / Gateforum", "Internshala Mechanical Engineering Internships", "ISRO/DRDO CEPTAM Written Exam Prep"] },
      { stage: "Job Ready", title: "Automotive / EV Sector & PSUs", description: "India's EV revolution needs mechanical engineers. Tata Motors, Ola Electric, and startups hire aggressively.", courses: ["Electric Vehicle Technology – IIT Madras (NPTEL)", "Lean Manufacturing Certification (NIPM India)", "Six Sigma Green Belt – ASQ / KPMG India"] },
    ],
  },

  // ─── ARCHITECTURE & DESIGN ───────────────────────────
  ind15: {
    title: "Architect",
    salary: "₹4L – ₹25L",
    demand: "Medium",
    category: "Design",
    description: "Design buildings, public spaces, and cities shaping India's rapid urbanisation — from smart cities to luxury residences.",
    topCompanies: ["Morphogenesis", "Hafeez Contractor", "CP Kukreja Architects", "RSP Architects", "DLF", "Godrej Properties", "Smart Cities Mission (Govt)"],
    skills: ["AutoCAD / Revit / SketchUp", "BIM (Building Information Modelling)", "Urban Design", "Construction Technology", "Design Thinking"],
    steps: [
      { stage: "Foundation", title: "B.Arch (5 Years)", description: "5-year professional degree via NATA or JEE Paper 2 entrance. Covers architecture history, design studios, and structures.", courses: ["NATA Preparation – Career Launcher / Aakash", "Architecture Drawing Basics (YouTube, Free)", "History of Architecture (MIT OCW, Free)"] },
      { stage: "Skill Building", title: "Digital Design Tools", description: "Master AutoCAD for drafting, Revit for BIM, Lumion or V-Ray for 3D visualisation.", courses: ["Revit Architecture (Autodesk Certified Courses)", "Lumion 11 3D Rendering Tutorial (YouTube)", "Rhino + Grasshopper for Parametric Design (ShapeDiver)"] },
      { stage: "Practical Experience", title: "Internship at Firms & Building Portfolio", description: "Complete mandatory training under a registered architect; work on live residential or commercial projects.", courses: ["COA Practical Training Guidelines", "AAPKA Architecture Internship (India)", "ArchDaily Inspiration & Case Studies (Free)"] },
      { stage: "Job Ready", title: "COA Registration & Practice", description: "Register with the Council of Architecture (COA) to practice independently. Pursue M.Arch for academic or research roles.", courses: ["COA Examination & Registration (India)", "M.Arch – SPA Delhi / CEPT Ahmedabad", "Real Estate & Urban Planning Law (India)"] },
    ],
  },

  ind16: {
    title: "UX / UI Designer",
    salary: "₹5L – ₹30L",
    demand: "High",
    category: "Design",
    description: "Design intuitive digital experiences for India's growing base of apps, e-commerce, and fintech platforms.",
    topCompanies: ["Swiggy", "CRED", "Groww", "Razorpay", "Paytm", "Urban Company", "Zepto", "IBM iX India"],
    skills: ["Figma", "User Research", "Wireframing & Prototyping", "Interaction Design", "Design Systems"],
    steps: [
      { stage: "Foundation", title: "Design Principles & Figma Basics", description: "Learn visual hierarchy, typography, colour theory, and master Figma for UI design.", courses: ["Google UX Design Certificate (Coursera, 6 months)", "Figma Masterclass – DesignCourse (YouTube, Free)", "Design for Non-Designers – Canva Academy (Free)"] },
      { stage: "Skill Building", title: "User Research & Prototyping", description: "Conduct user interviews, usability tests, and build interactive prototypes in Figma.", courses: ["UX Research & Strategy (Interaction Design Foundation)", "Usability Testing – Nielsen Norman Group (Free Articles)", "Figma Interactive Prototyping Tutorial (YouTube, Free)"] },
      { stage: "Practical Experience", title: "Build Portfolio & Freelance", description: "Redesign 2–3 popular Indian apps (critique + solution), document case studies, freelance on Upwork.", courses: ["UX Portfolio Workshop (ADP List, Free)", "Internshala UI/UX Internship", "DesignBoat Masterclass Mumbai (Hybrid)"] },
      { stage: "Job Ready", title: "Senior Roles & Specialisation", description: "Specialise in DesignOps, Design Systems, or Product Design. Target product companies and unicorns.", courses: ["UX Management: Strategy & Tactics (IDF)", "Motion Design for UX (After Effects – School of Motion)", "Systems Thinking in Design (IDEO U)"] },
    ],
  },

  // ─── LAW ────────────────────────────────────────────
  ind18: {
    title: "Corporate Lawyer",
    salary: "₹6L – ₹50L",
    demand: "High",
    category: "Law",
    description: "Advise on mergers, IPOs, contracts, and regulatory compliance for India's top corporates and law firms.",
    topCompanies: ["Cyril Amarchand Mangaldas", "AZB & Partners", "Trilegal", "Shardul Amarchand", "Khaitan & Co.", "J. Sagar Associates (JSA)", "Linklaters India"],
    skills: ["Contract Drafting", "Company Law", "SEBI Regulations", "M&A Law", "Legal Research (Manupatra / SCC Online)"],
    steps: [
      { stage: "Foundation", title: "LLB / BA LLB (5 Years)", description: "Enter via CLAT (NLUs) or AILET (NLU Delhi) for the 5-year integrated programme. Covers constitutional, criminal, and civil law.", courses: ["CLAT Preparation – Career Launcher / Aakash", "Constitution of India (Bare Acts, Free)", "Legal Reasoning Practice (CL CLAT Series)"] },
      { stage: "Skill Building", title: "Corporate Law & Company Law", description: "Study Companies Act 2013, SEBI LODR, FEMA, and arbitration law — the pillars of corporate practice.", courses: ["Corporate Law by M&A Insiders (YouTube, Free)", "SEBI Investor Education Online Modules (Free)", "iCourts – International Law Courses (Free Audit)"] },
      { stage: "Practical Experience", title: "Internships at Top Law Firms", description: "Complete at least 4 internships at top-tier firms (Tier 1/2), courts, and in-house legal teams during LLB.", courses: ["LawSikho Practical Legal Skills Courses (India)", "Bar & Bench Internship Listings (Free)", "InLegalEd Company Law Clinic (India)"] },
      { stage: "Job Ready", title: "NLU Placement / LLM", description: "Top NLU placements at Tier 1 firms hit ₹18–25 LPA+. LLM from NLU, UK, or US opens global opportunities.", courses: ["LLM at NLU Delhi / NLSIU Bangalore", "Bar Council of India Enrollment", "LawSikho Mergers & Acquisitions Certificate"] },
    ],
  },

  // ─── MANAGEMENT & HR ─────────────────────────────────
  ind19: {
    title: "HR Manager",
    salary: "₹5L – ₹25L",
    demand: "Medium",
    category: "Business",
    description: "Manage talent acquisition, employee engagement, L&D, and people strategy for India's top organisations.",
    topCompanies: ["Infosys", "Wipro", "HDFC Bank", "Tata Group HR", "HUL (Hindustan Unilever)", "Mahindra Group", "Swiggy", "Zomato"],
    skills: ["Talent Acquisition", "HRIS (SAP SuccessFactors)", "Employee Engagement", "Labour Law", "L&D Strategy"],
    steps: [
      { stage: "Foundation", title: "MBA (HR) or MA HRM", description: "Enter HR via MBA-HR from XLRI, TISS, Symbiosis, or a PG Diploma in HRM.", courses: ["XAT / TISS-MAT Preparation for XLRI/TISS", "TISS Mumbai Masters in HRM", "Symbiosis Institute of Business Management HR Program"] },
      { stage: "Skill Building", title: "Recruitment & Labour Law", description: "Learn talent acquisition tools (Naukri, LinkedIn Recruiter), employment law (Industrial Disputes Act), and compensation structuring.", courses: ["HR Analytics on Coursera (Wharton)", "Labour Law Fundamentals – LawSikho (India)", "LinkedIn Talent Solutions Training (Free for Recruiters)"] },
      { stage: "Practical Experience", title: "HR Internships & Projects", description: "Intern at MNCs or startups; run campus recruiting drives, design onboarding, or create L&D frameworks.", courses: ["Internshala HR Internship", "SHRM Essentials of HR (Global Certificate)", "People Analytics – Google (Coursera)"] },
      { stage: "Job Ready", title: "Specialise & Advance", description: "Specialise in HRBP, TA, Total Rewards, or Learning & Development to reach CHRO track faster.", courses: ["XLRI PGCHRM Executive Programme", "SHRM-CP / SHRM-SCP Certification", "SAP SuccessFactors HCM Certification"] },
    ],
  },

  ind17: {
    title: "Product Manager",
    salary: "₹12L – ₹55L",
    demand: "Very High",
    category: "Business",
    description: "Drive product strategy, roadmaps, and cross-functional execution at India's unicorns and tech companies.",
    topCompanies: ["Flipkart", "Swiggy", "Razorpay", "CRED", "Meesho", "Google India", "Microsoft India", "PhonePe"],
    skills: ["Product Strategy", "User Research", "Agile / Scrum", "Data Analytics (SQL / Mixpanel)", "Stakeholder Management"],
    steps: [
      { stage: "Foundation", title: "Understand Products & Users", description: "Study product thinking — how apps like Swiggy, Paytm, and Groww are built, priced, and iterated.", courses: ["Product Management Fundamentals – PM School India (Free)", "Inspired: How to Create Tech Products – Marty Cagan (Book)", "Lenny's Newsletter PM Resources (Free)"] },
      { stage: "Skill Building", title: "Data, A/B Testing & Roadmapping", description: "Learn SQL for product analytics, Mixpanel or Amplitude for user funnels, and create roadmaps with Jira.", courses: ["Become a Product Manager (Udemy)", "SQL for Product Managers (Mode Analytics, Free)", "Reforge Product Strategy Program (Premium)"] },
      { stage: "Practical Experience", title: "APM Programmes & Case Competitions", description: "Apply for APM (Associate PM) programmes at Flipkart, Swiggy, and Google India. Build product case studies.", courses: ["PM School India Case Competitions (Free)", "Swiggy APM Programme", "Google PMBC (Product Manager Building Challenge)"] },
      { stage: "Job Ready", title: "MBA or Direct PM Track", description: "MBA from IIM (or IIT tech MBA) supercharges PM transitions. Senior IC track works for engineers with 3+ years.", courses: ["IIM Bangalore Executive PGP in Product Management", "ISB Product Leadership (ISB, Hyderabad)", "Product Alliance – PM Interview Prep"] },
    ],
  },

  // ─── EDUCATION ───────────────────────────────────────
  ind21: {
    title: "Teacher / Educator",
    salary: "₹3L – ₹12L (Govt) / ₹5L – ₹20L (Private EdTech)",
    demand: "High",
    category: "Education",
    description: "Shape India's next generation as a school teacher, college professor, or EdTech content creator.",
    topCompanies: ["BYJU'S", "Unacademy", "Vedantu", "Narayana Group", "Kendriya Vidyalaya", "NVS", "State Education Departments"],
    skills: ["Subject Expertise", "Curriculum Design", "EdTech Tools (Zoom, Google Classroom)", "Assessment Design", "Communication"],
    steps: [
      { stage: "Foundation", title: "Degree + B.Ed", description: "Complete your subject degree (B.Sc / B.A / B.Com) + B.Ed (1 year). CTET/TET qualification required for Govt jobs.", courses: ["IGNOU B.Ed Programme (Distance, Affordable)", "NCTE Guidelines for B.Ed (ncte.gov.in)", "Khan Academy Subject Content (Free)"] },
      { stage: "Skill Building", title: "Digital Teaching Tools", description: "Learn Zoom, Google Meet, Google Classroom, Canva for Education, and online assessment tools.", courses: ["Google for Education Certified Educator (Free)", "Microsoft Educator Centre (Free)", "EdX: Teaching in the Digital Age (Free Audit)"] },
      { stage: "Practical Experience", title: "School Internship & Content Creation", description: "Complete B.Ed practicum at govt or private schools. Start a YouTube channel or teach on Unacademy / Vedantu.", courses: ["Unacademy Educator Onboarding (Free to apply)", "Vedantu WAVE Teacher Programme", "Internshala Teaching Internship"] },
      { stage: "Job Ready", title: "CTET / TET & Recruitment", description: "Clear CTET for Kendriya Vidyalayas; state TET for state govt schools. Private schools and EdTech hire directly.", courses: ["CTET Preparation – KVS (Free Practice Sets)", "NVS TGT / PGT Recruitment Preparation", "NET / SET Exam for Assistant Professor (UGC)"] },
    ],
  },

  // ─── ENVIRONMENT & SUSTAINABILITY ───────────────────
  ind20: {
    title: "Environmental Scientist",
    salary: "₹4L – ₹18L",
    demand: "High",
    category: "Science",
    description: "Monitor pollution, assess environmental impacts, and drive India's sustainability transition in industry and government.",
    topCompanies: ["TERI (The Energy & Resources Institute)", "CPCB (Central Pollution Control Board)", "IL&FS Environment", "DNV India", "Tata Sustainability Group", "KPMG ESG India"],
    skills: ["Environmental Impact Assessment (EIA)", "GIS Mapping (ArcGIS)", "Air / Water Quality Analysis", "ESG Reporting", "Environmental Law (EP Act)"],
    steps: [
      { stage: "Foundation", title: "B.Sc / B.Tech in Environmental Science", description: "Undergraduate degree in Environmental Science, Ecology, or Environmental Engineering from any recognised university.", courses: ["Environmental Science Fundamentals – IIT Kharagpur (NPTEL, Free)", "Introduction to Sustainability (University of Illinois, Coursera, Free Audit)", "Ecology Basics (Khan Academy, Free)"] },
      { stage: "Skill Building", title: "GIS, EIA & ESG", description: "Learn ArcGIS or QGIS for spatial analysis, conduct Environmental Impact Assessments, and understand ESG reporting frameworks.", courses: ["QGIS for Beginners (YouTube, Free)", "ESG & Sustainability Reporting (GRI, Free Online)", "Environmental Impact Assessment (CPCB Training, India)"] },
      { stage: "Practical Experience", title: "Government & NGO Projects", description: "Intern at CPCB, state PCBs, or NGOs like WWF India, Greenpeace, and TERI. Join MoEFCC consultancy projects.", courses: ["TERI University PG Courses (India)", "WWF India Conservation Internship", "IGBC Green Building Certification Intern Programme"] },
      { stage: "Job Ready", title: "M.Sc / Certifications", description: "M.Sc in Environmental Science or MBA in Sustainability from TERI / XLRI for leadership roles.", courses: ["M.Sc Environmental Science – TERI School of Advanced Studies", "CEM – Certified Environmental Manager (India)", "IGBC Accredited Professional (AP) Certification"] },
    ],
  },

  // ─── JOURNALISM & MEDIA ──────────────────────────────
  ind25: {
    title: "Journalist / Content Creator",
    salary: "₹3L – ₹20L",
    demand: "Medium",
    category: "Media",
    description: "Report stories, create content, and build audiences across digital media, TV, and social platforms in India.",
    topCompanies: ["The Hindu", "NDTV", "Times of India Digital", "The Wire", "Scroll.in", "Quint Digital", "Moj / ShareChat"],
    skills: ["Investigative Reporting", "Digital Storytelling", "Video Editing (Premiere / DaVinci)", "Social Media Management", "SEO for Content"],
    steps: [
      { stage: "Foundation", title: "Degree in Journalism / Mass Comm", description: "Pursue BA in Journalism, Mass Communication, or English from IIMC, ACJ, or reputed state universities.", courses: ["IIMC Entrance Preparation (India)", "Coursera: English Composition (Free Audit)", "Introduction to Journalism – Knight Foundation (Free)"] },
      { stage: "Skill Building", title: "Digital Tools & Video Production", description: "Learn video editing in DaVinci Resolve or Premiere Pro, podcast production, and digital writing for SEO.", courses: ["DaVinci Resolve Full Tutorial (BlackMagic, Free)", "Google News Initiative Training (Free)", "Poynter Online Journalism Courses (Free)"] },
      { stage: "Practical Experience", title: "Internships & Freelancing", description: "Intern at digital publications (The Wire, Scroll, Quint), freelance articles to Indian newspapers, build a content portfolio.", courses: ["Internshala Journalism Internship", "The Hoot Media Studies Resources (Free)", "Start a newsletter on Substack (Free)"] },
      { stage: "Job Ready", title: "Specialise & Build Audience", description: "Specialise in business, political, sports, or tech journalism. Build a YouTube / Instagram following for content creator path.", courses: ["IIMC New Delhi PG Diploma (Journalism)", "Reuters Journalism Course (Free Certification)", "YouTube Creator Academy (Free)"] },
    ],
  },

};
