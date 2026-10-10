/**
 * EduVerse AI - Persistent In-Memory Data Store with Rich Seed Data
 * Supports Students, Teachers, School Admins, Tutors, Parents, Curricula,
 * Textbooks, Quizzes, Assessments, Improvement Evidence, Agent Studio,
 * Competitions, Meetings, Focus Sessions, and Institutional Procurement.
 */

export const eduverseStore = {
  schools: [
    {
      id: 'sch_1',
      name: 'Global International Academy - Dubai Campus',
      code: 'GIA-DXB-2025',
      country: 'United Arab Emirates',
      curriculum: 'Cambridge International & IB MYP',
      plan: 'Large School Institutional Plan',
      licensedStudents: 1200,
      activeStudents: 980,
      aiUsageQuota: '500,000 / 1,000,000 tokens',
      sponsorshipStatus: 'School Funded',
      logo: '🏫'
    },
    {
      id: 'sch_2',
      name: 'Delhi Public School Network - Delhi East',
      code: 'DPS-DEL-104',
      country: 'India',
      curriculum: 'NCERT / CBSE',
      plan: 'District Ministry Deployment',
      licensedStudents: 3500,
      activeStudents: 3410,
      aiUsageQuota: '1,800,000 / 3,000,000 tokens',
      sponsorshipStatus: 'Government Sponsored',
      logo: '🏛️'
    }
  ],

  demoAccounts: {
    student: {
      id: 'usr_student',
      role: 'student',
      name: 'Aaryan Sharma',
      email: 'student@eduverse.ai',
      schoolId: 'sch_1',
      schoolName: 'Global International Academy - Dubai Campus',
      grade: 'Grade 8',
      curriculum: 'NCERT / CBSE & Cambridge IGCSE',
      avatar: '👨‍🎓',
      preferredLanguage: 'English',
      streakDays: 14,
      points: 1250,
      level: 'Novice Explorer',
      badges: ['Fractions Master', 'Python Pioneer', 'Daily Focus Champ', 'Global League Contender']
    },
    teacher: {
      id: 'usr_teacher',
      role: 'teacher',
      name: 'Dr. Sarah Al-Maktoum',
      email: 'teacher@eduverse.ai',
      schoolId: 'sch_1',
      schoolName: 'Global International Academy - Dubai Campus',
      department: 'Mathematics & STEM Lead',
      classesHandled: ['Grade 8 - Math Alpha', 'Grade 9 - Physics Beta'],
      avatar: '👩‍🏫'
    },
    admin: {
      id: 'usr_admin',
      role: 'admin',
      name: 'Principal Marcus Vance',
      email: 'admin@eduverse.ai',
      schoolId: 'sch_1',
      schoolName: 'Global International Academy - Dubai Campus',
      title: 'Head of School & AI Innovation Lead',
      avatar: '👔'
    },
    tutor: {
      id: 'usr_tutor',
      role: 'tutor',
      name: 'Elena Rostova',
      email: 'tutor@eduverse.ai',
      assignedStudents: ['usr_student'],
      specialization: 'Higher Mathematics & Physics Tutor',
      avatar: '👩‍🔬'
    },
    parent: {
      id: 'usr_parent',
      role: 'parent',
      name: 'Rajesh Sharma',
      email: 'parent@eduverse.ai',
      childId: 'usr_student',
      childName: 'Aaryan Sharma',
      relation: 'Father',
      avatar: '👨‍👧'
    }
  },

  curricula: [
    {
      id: 'cur_ncert',
      code: 'NCERT_CBSE',
      name: 'NCERT / CBSE (India National)',
      grades: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
      subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science']
    },
    {
      id: 'cur_cambridge',
      code: 'CAMBRIDGE',
      name: 'Cambridge International (Primary, Lower Sec, IGCSE, A Levels)',
      grades: ['Stage 6', 'Stage 7', 'Stage 8', 'IGCSE Year 10', 'IGCSE Year 11', 'AS Level', 'A Level'],
      subjects: ['Mathematics Extended', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English First Language']
    },
    {
      id: 'cur_ib',
      code: 'IB_MYP_DP',
      name: 'International Baccalaureate (PYP, MYP, DP)',
      grades: ['MYP 1', 'MYP 2', 'MYP 3', 'MYP 4', 'MYP 5', 'DP 1', 'DP 2'],
      subjects: ['Mathematics Analysis & Approaches', 'Sciences', 'Language & Literature', 'Individuals & Societies']
    },
    {
      id: 'cur_us_cc',
      code: 'US_COMMON_CORE',
      name: 'US Common Core & AP Curriculum',
      grades: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'AP Prep'],
      subjects: ['Algebra I', 'Geometry', 'Algebra II', 'Physical Science', 'Biology', 'English Language Arts']
    }
  ],

  libraryBooks: [
    {
      id: 'bk_math_g8',
      title: 'NCERT Grade 8 Mathematics Official Textbook',
      author: 'National Council of Educational Research and Training',
      curriculum: 'NCERT_CBSE',
      grade: 'Grade 8',
      subject: 'Mathematics',
      license: 'Official Open Educational Resource (OER)',
      verifiedSourceUrl: 'https://ncert.nic.in/textbook.php?hemh1=0-16',
      chapters: [
        { chapterNum: 1, title: 'Rational Numbers', summary: 'Properties of rational numbers, representation on number line, and finding rational numbers between two numbers.' },
        { chapterNum: 2, title: 'Linear Equations in One Variable', summary: 'Solving algebraic equations with variables on one side and both sides.' },
        { chapterNum: 6, title: 'Squares and Square Roots', summary: 'Square patterns, finding square roots by prime factorization and division method.' },
        { chapterNum: 7, title: 'Fractions and Rational Operations', summary: 'Addition, subtraction, multiplication, and conversion of unlike fractions and decimals.' }
      ]
    },
    {
      id: 'bk_sci_cambridge',
      title: 'Cambridge Lower Secondary Science Stage 8 Learner Guide',
      author: 'Cambridge International Education OER Core',
      curriculum: 'CAMBRIDGE',
      grade: 'Stage 8',
      subject: 'Science',
      license: 'Authorized Educational Resource',
      verifiedSourceUrl: 'https://www.cambridgeinternational.org',
      chapters: [
        { chapterNum: 1, title: 'Respiration and Energy', summary: 'Aerobic and anaerobic respiration in living organisms.' },
        { chapterNum: 4, title: 'Electric Circuits and Resistance', summary: 'Current, voltage, series and parallel circuits, Ohm Law basics.' }
      ]
    }
  ],

  customAgents: [
    {
      id: 'agt_1',
      name: 'Math Mentor - Fractions & Algebra Expert',
      avatar: '📐',
      creatorRole: 'teacher',
      creatorName: 'Dr. Sarah Al-Maktoum',
      schoolId: 'sch_1',
      supportedSubject: 'Mathematics',
      gradeBand: 'Grade 6 - Grade 9',
      explanationStyle: 'Visual step-by-step with real-world analogies',
      toolsAllowed: ['Search Textbook', 'Generate Practice Quiz', 'Analyze Weakness', 'Schedule Focus Session'],
      published: true,
      evalStatus: 'PASSED (100% Accuracy, Safety Verified)',
      evalReport: {
        subjectAccuracy: 'Passed (10/10)',
        curriculumAlignment: 'Passed (Aligned to NCERT & Cambridge)',
        promptInjectionResistance: 'Passed',
        privacyProtection: 'Passed (No student personal data leaked)'
      }
    },
    {
      id: 'agt_2',
      name: 'Python & Robotics Code Mentor',
      avatar: '🤖',
      creatorRole: 'admin',
      creatorName: 'Principal Marcus Vance',
      schoolId: 'sch_1',
      supportedSubject: 'Coding & Robotics',
      gradeBand: 'Grade 7 - Grade 12',
      explanationStyle: 'Interactive code hints, safety execution sandbox, micro:bit circuit tips',
      toolsAllowed: ['Run Sandbox Code', 'Circuit Simulation', 'Generate Coding Challenge'],
      published: true,
      evalStatus: 'PASSED (100% Accuracy)',
      evalReport: {
        subjectAccuracy: 'Passed (10/10)',
        curriculumAlignment: 'Passed (Open Academy Standard)',
        promptInjectionResistance: 'Passed',
        privacyProtection: 'Passed'
      }
    }
  ],

  quizzesAndBaselineEvidence: [
    {
      id: 'quiz_frac_base',
      title: 'Grade 8 Mathematics Diagnostic Baseline Assessment',
      subject: 'Mathematics',
      topic: 'Fractions and Rational Operations',
      learningObjective: 'Converting unlike fractions to a common denominator & simplifying rational expressions',
      maxScore: 10,
      questions: [
        { id: 'q1', text: 'What is 3/4 + 2/5?', options: ['5/9', '23/20 or 1 3/20', '1/20', '6/20'], correctIndex: 1 },
        { id: 'q2', text: 'Simplify 12/36 to its lowest terms:', options: ['1/3', '2/6', '3/9', '4/12'], correctIndex: 0 },
        { id: 'q3', text: 'Subtract 5/8 - 1/3:', options: ['4/5', '7/24', '2/5', '14/24'], correctIndex: 1 },
        { id: 'q4', text: 'Find the lowest common denominator for 1/6 and 3/8:', options: ['14', '24', '48', '12'], correctIndex: 1 }
      ]
    }
  ],

  studentAssessmentsHistory: [
    {
      id: 'att_101',
      studentId: 'usr_student',
      quizId: 'quiz_frac_base',
      subject: 'Mathematics',
      learningObjective: 'Converting unlike fractions to a common denominator',
      type: 'BASELINE_DIAGNOSTIC',
      scoreObtained: 4,
      maxScore: 10,
      percentage: 40,
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
      status: 'Weakness Identified',
      identifiedGaps: [
        'Difficulty finding Lowest Common Denominator (LCD) for unlike fractions',
        'Errors during numerator scaling after LCD conversion'
      ]
    }
  ],

  learningImprovementRecords: [
    {
      id: 'imp_1',
      studentId: 'usr_student',
      studentName: 'Aaryan Sharma',
      subject: 'Mathematics',
      topic: 'Fractions and Rational Operations',
      learningObjective: 'Converting unlike fractions to a common denominator',
      baselineScore: 40,
      baselineDate: new Date(Date.now() - 86400000 * 3).toISOString(),
      followupScore: 75,
      followupDate: new Date().toISOString(),
      percentagePointImprovement: 35,
      interventionsCompleted: [
        'Reviewed NCERT Ch 7 Fractions OER section',
        'Nova Guided Step-by-Step LCD Practice (3 activities completed)',
        'Completed targeted follow-up quiz'
      ],
      status: 'MEASURED_IMPROVEMENT'
    }
  ],

  classes: [
    {
      id: 'cls_1',
      name: 'Grade 8 Alpha - Mathematics',
      teacherId: 'usr_teacher',
      teacherName: 'Dr. Sarah Al-Maktoum',
      subject: 'Mathematics',
      grade: 'Grade 8',
      enrolledStudentCount: 28,
      recentNotes: 'Published notes on Rational Numbers & Fractions simplify rules.',
      nextAssignmentDue: 'Tomorrow, 5:00 PM'
    },
    {
      id: 'cls_2',
      name: 'Grade 8 Alpha - General Science',
      teacherId: 'usr_teacher',
      teacherName: 'Dr. Sarah Al-Maktoum',
      subject: 'Science',
      grade: 'Grade 8',
      enrolledStudentCount: 28,
      recentNotes: 'Respiration and cell mitochondria breakdown diagram uploaded.',
      nextAssignmentDue: 'Friday, 11:59 PM'
    }
  ],

  assignments: [
    {
      id: 'asg_1',
      classId: 'cls_1',
      title: 'Rational Expressions & Unlike Fraction Worksheet',
      subject: 'Mathematics',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      maxMarks: 20,
      submittedByStudent: true,
      studentMarks: 18,
      feedback: 'Excellent progress shown after Nova revision session!'
    }
  ],

  competitions: [
    {
      id: 'comp_1',
      title: 'EduVerse Global Mathematics Cup 2025',
      category: 'Mathematics',
      type: 'Inter-School Tournament',
      participatingSchools: 42,
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'ACTIVE_SEASON',
      topLeaders: [
        { rank: 1, name: 'Dubai Global Academy - Team Alpha', score: 3850 },
        { rank: 2, name: 'DPS Delhi East - Math Wizards', score: 3720 },
        { rank: 3, name: 'Aaryan Sharma (Student)', score: 3450 }
      ]
    },
    {
      id: 'comp_2',
      title: 'Global Code & Robotics Sprint',
      category: 'Coding & Robotics',
      type: 'Open Academy Challenge',
      participatingSchools: 18,
      startDate: '2025-03-10',
      endDate: '2025-03-25',
      status: 'UPCOMING',
      topLeaders: [
        { rank: 1, name: 'Singapore STEM Academy', score: 2900 },
        { rank: 2, name: 'Cairo Robotics Team', score: 2750 }
      ]
    }
  ],

  meetings: [
    {
      id: 'meet_1',
      title: 'Grade 8 Live Math Remedial Session: Master Fractions',
      hostName: 'Dr. Sarah Al-Maktoum',
      provider: 'Microsoft Teams',
      joinUrl: 'https://teams.microsoft.com/l/meetup-join/demo-eduverse-session',
      scheduledTime: new Date(Date.now() + 3600000 * 4).toISOString(),
      agenda: 'Breakdown of lowest common multiples, guided fraction additions, and Nova practice Q&A.',
      preMeetingNotes: 'Review NCERT Chapter 7 OER page 112 before joining.',
      postMeetingAiSummary: 'Session completed. Covered LCD calculation rules and 3 worked examples.'
    },
    {
      id: 'meet_2',
      title: 'Virtual Science Lab: Electric Circuits',
      hostName: 'Dr. Sarah Al-Maktoum',
      provider: 'Google Meet',
      joinUrl: 'https://meet.google.com/demo-eduverse-lab',
      scheduledTime: new Date(Date.now() + 86400000 * 1).toISOString(),
      agenda: 'Simulating series and parallel circuits using the EduVerse Robotics simulator.',
      preMeetingNotes: 'Bring digital circuit simulator workspace ready.',
      postMeetingAiSummary: 'Pending session execution.'
    }
  ],

  openAcademyCourses: {
    languages: [
      { id: 'lang_ar', title: 'Arabic for Beginners & Academic Conversation', learners: 14200, level: 'Beginner to Intermediate', flag: '🇦🇪' },
      { id: 'lang_es', title: 'Spanish Global Communication', learners: 18900, level: 'Beginner', flag: '🇪🇸' },
      { id: 'lang_fr', title: 'French Fluency & Grammar Coach', learners: 11500, level: 'Intermediate', flag: '🇫🇷' },
      { id: 'lang_hi', title: 'Hindi Literature & Conversational Skills', learners: 16300, level: 'All Levels', flag: '🇮🇳' },
      { id: 'lang_de', title: 'German Science & Academic Vocabulary', learners: 8900, level: 'Beginner', flag: '🇩🇪' }
    ],
    coding: [
      { id: 'code_py', title: 'Python Programming from Zero to AI Master', lessons: 18, exercises: 45, language: 'python' },
      { id: 'code_js', title: 'JavaScript & Web App Creation', lessons: 15, exercises: 38, language: 'javascript' },
      { id: 'code_scratch', title: 'Scratch Block Coding for Game Design', lessons: 10, exercises: 25, language: 'block' },
      { id: 'code_sql', title: 'SQL & Database Architecture Fundamentals', lessons: 12, exercises: 30, language: 'sql' }
    ],
    robotics: [
      { id: 'rob_micro', title: 'BBC micro:bit Sensors & Logic Blocks', level: 'Beginner', simulationSupported: true },
      { id: 'rob_ard', title: 'Arduino Electronics Safety & Motor Control', level: 'Intermediate', simulationSupported: true },
      { id: 'rob_pi', title: 'Raspberry Pi & Python Robotics Logic', level: 'Advanced', simulationSupported: true }
    ]
  }
};
