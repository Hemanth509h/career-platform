# Career Matching Algorithm (6-Dimension Profile)

Our platform uses a sophisticated matching engine that combines heuristic scoring with AI-driven analysis to provide high-accuracy career recommendations.

## The 6 Dimensions of Your Profile

Each assessment you take is mapped across these six core areas:

### 1. Personality & Mindset
- **Structured vs. Fluid:** Measures your preference for planning vs. adaptability.
- **Introversion vs. Extroversion:** Identifies your energy sources in workplace social settings.
- **Leadership Orientation:** Gauges your comfort with taking charge and making group decisions.
- **Resilience:** Evaluates your composure under high-pressure scenarios.

### 2. Aptitude & Skills
- **Analytical Reasoning:** Your ability to spot patterns and sequences.
- **Communication:** How well you can simplify complex topics.
- **Tech Literacy:** Your speed in adopting and applying new digital tools.
- **Numerical Ability:** Financial management and data comfort.
- **Spatial Awareness:** 3D visualization and structural thinking.

### 3. Interest Domains
Users rate their passion for 8 key industry sectors (Technology, Healthcare, Design, Finance, etc.). These ratings act as "boosters" for specific career categories.

### 4. Academic Strengths
Maps 10+ core subjects (Mathematics, Biology, Economics, etc.) to industry requirements. *Example: A strength in Biology significantly boosts the match score for Healthcare roles.*

### 5. Learning Style
Identifies your primary learning mode (Visual, Auditory, Kinesthetic, or Reading/Writing). This helps align you with career paths that offer compatible training formats.

### 6. Contextual Alignment
Factors in practical goals including:
- **Budget:** Free vs. Paid education pathways.
- **Location:** Geographic constraints or opportunities.
- **Study Mode:** Online, Offline, or Hybrid preferences.

---

## How Matching Happens

### Stage 1: Heuristic Scoring (Base)
A weighted algorithm calculates a base "Match Score" across 11 industry categories. 
- **Formula:** `Base Score = (Dimension Weight * Answer) + Interest Boost + Academic Bonus`.

### Stage 2: AI Analysis (Refinement)
We feed the full 6-dimension profile into **Google Gemini (1.5 Flash)**. The AI performs a "holistic read" that simple math might miss, such as:
- Identifying "Hidden Strengths" where your aptitude and personality suggest a fit for a career you haven't rated highly yet.
- Generating a **Personalized Explanation** for why a specific role (e.g., "AI Product Manager") fits your specific background.

### Stage 3: Ranking & Final Match
The system picks the top 5 highest-scoring careers and provides a detailed roadmap for each.
