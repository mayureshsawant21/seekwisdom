import { DilemmaResult, DailyReflection, QuickTheme } from "./types";

export const PRECOMPILED_DILEMMAS: Record<string, DilemmaResult> = {
  "failure": {
    query: "How to deal with professional failure or career setbacks?",
    synthesis: {
      commonalities: "Across all four teachings, failure is reframed not as an ultimate end, but as a crucial instrument for spiritual and personal growth. They agree that true peace comes from decoupling our self-worth from external outcomes.",
      distinctPerspectives: "While the Gita demands absolute focus on action while completely surrendering the results, the Bible encourages trusting in a loving Father's overarching plan. The Quran reminds us that ease is intrinsically interwoven with hardship under divine wisdom, and Buddhism views the setback as an opportunity to practice mindfulness of impermanence (Anicca).",
      essence: "Perform your duty with absolute dedication, but surrender the final outcome to the natural flow of life, trusting that adversity is a catalyst for inner refinement."
    },
    insights: [
      {
        id: "fail-gita",
        tradition: "Bhagavad Gita",
        bookTitle: "The Song of God",
        philosophy: "The principle of Nishkama Karma (selfless action). Focus on the effort, not the reward. Your jurisdiction is solely over your actions, never over their fruits. Worrying about the results dilutes the purity and power of your current execution.",
        quote: "Karmanye vadhikaraste ma phaleshu kadachana | Ma karma-phala-hetur bhur ma te sango ’stvakarmani",
        citation: "Chapter 2, Verse 47",
        guidance: "When a professional setback occurs, return immediately to your craft. Treat the task itself as an offering. Release the anxiety of reputation and success, which only paralyzes your potential."
      },
      {
        id: "fail-bible",
        tradition: "Holy Bible",
        bookTitle: "Scripture",
        philosophy: "Reframing trials as a crucible for character and faith. Setbacks are under God's sovereign care and are used to build endurance, humility, and eventual elevation.",
        quote: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        citation: "Romans 8:28",
        guidance: "A closed door is an invitation to exercise patience. Trust that your career journey is being guided by a higher providence, and use this period to serve others with humility."
      },
      {
        id: "fail-quran",
        tradition: "Noble Quran",
        bookTitle: "Divine Revelation",
        philosophy: "The concept of Sabr (patience) and Tawakkul (trust). God tests human beings with fear, loss, and hunger, but promises that struggle is always accompanied by divine relief.",
        quote: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
        citation: "Surah Ash-Sharh (94:5-6)",
        guidance: "Reframe failure as a temporary training ground. Pray for clarity, maintain steadfastness, and trust that if something was taken from you, God will replace it with something far better suited for your soul."
      },
      {
        id: "fail-buddhism",
        tradition: "Buddhism",
        bookTitle: "Dhammapada & Suttas",
        philosophy: "Impermanence (Anicca) and non-attachment. Professional status, wealth, and praise are part of the 'Eight Worldly Winds' (gain/loss, pleasure/pain, praise/blame, fame/disrepute). Equanimity (Upekkha) means remaining centered amidst these changes.",
        quote: "Just as a solid rock is not shaken by the storm, even so the wise are not affected by praise or blame.",
        citation: "Dhammapada, Verse 81",
        guidance: "Observe the grief or disappointment without judgment. Do not identify with it. Tell yourself, 'This too is passing.' Regain your footing by focusing on the present step with a clear, calm mind."
      }
    ],
    suggestedAction: "Write down three lessons learned from this setback. Draft a new action plan focusing solely on the quality of your work today, completely letting go of what others say or what happened yesterday."
  },
  "burnout": {
    query: "How to manage intense burnout and continuous professional stress?",
    synthesis: {
      commonalities: "All four traditions identify excessive mental attachment, unbalanced living, and the neglect of our internal sanctuary as the root causes of stress. They advocate for intentional pauses, self-discipline, and deep rest.",
      distinctPerspectives: "The Gita emphasizes finding moderation in all activities. The Bible urges us to lay down our burdens and find restorative rest in God. The Quran highlights regular, meditative prayer as the ultimate shelter from worldly anxieties, while Buddhism guides us to the Middle Path and the gentle observation of our breath.",
      essence: "Quiet the external noise, simplify your life, and reconnect daily with the stillness of your soul."
    },
    insights: [
      {
        id: "burn-gita",
        tradition: "Bhagavad Gita",
        bookTitle: "The Song of God",
        philosophy: "The path of moderation (Yukta-ahara-vihara). Spiritual and mental harmony is impossible for those who work too much, eat too much, or sleep too little. Over-exertion (Rajasic effort) driven by greed or fear results in fatigue.",
        quote: "Yuktahara-viharasya yukta-cheshtasya karmasu | Yukta-svapnavabodhasya yogo bhavati duhkha-ha",
        citation: "Chapter 6, Verse 17",
        guidance: "Review your work schedule and habits. Implement strict boundaries between labor and rest. Treat rest and self-care not as a luxury, but as a sacred duty to maintain your instrument."
      },
      {
        id: "burn-bible",
        tradition: "Holy Bible",
        bookTitle: "Scripture",
        philosophy: "The Sabbath principle and rest as a divine gift. Humans are not machines; they require spiritual renewal. True rest is found when we surrender our exhausting self-reliance to God.",
        quote: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
        citation: "Matthew 11:28-29",
        guidance: "Intentionally step away from screens and work for a dedicated time block. Spend quiet moments in prayer or nature, handing over your anxieties to God and trusting Him to sustain your needs."
      },
      {
        id: "burn-quran",
        tradition: "Noble Quran",
        bookTitle: "Divine Revelation",
        philosophy: "Remembrance (Dhikr) and regular prayer (Salah) as anchors. In a world of endless pursuits, the regular pauses of daily prayer serve as shields that re-center the heart and strip away worldly pressures.",
        quote: "Unquestionably, by the remembrance of Allah do hearts find rest.",
        citation: "Surah Ar-Ra'd (13:28)",
        guidance: "Create micro-sabbaths throughout your day. When feeling overwhelmed, stop, take a slow breath, and perform a brief meditation or prayer of gratitude, detaching entirely from your to-do list."
      },
      {
        id: "burn-buddhism",
        tradition: "Buddhism",
        bookTitle: "Dhammapada & Suttas",
        philosophy: "The Middle Way (Majjhima Patipada). Avoiding the extreme of self-mortification or obsessive striving. Burnout is the result of grasping (Tanha) for accomplishments or running from fear of failure.",
        quote: "There is no path to peace. Peace is the path.",
        citation: "Dhammapada Attributed",
        guidance: "Practice mindfulness of the present moment. Break tasks into tiny steps. Breathe consciously. Realize that most urgency is a mental projection. Slow down your physical movements to calm your nervous system."
      }
    ],
    suggestedAction: "Declare a 3-hour digital-free window. Engage in our interactive Box Breathing guide for 5 minutes right now to lower your cortisol levels and re-center."
  },
  "unethical": {
    query: "Should I speak up against unethical behavior at work if it risks my job?",
    synthesis: {
      commonalities: "There is complete alignment: standing up for truth, justice, and moral integrity is a non-negotiable spiritual duty. However, all traditions recommend acting with wisdom, compassion, and without personal malice.",
      distinctPerspectives: "The Gita demands courageous action as your cosmic duty (Dharma) regardless of personal loss. The Bible commands us to expose darkness and speak up for the vulnerable. The Quran establishes justice as a supreme witness to God, while Buddhism highlights Right Speech and the karmic weight of standing idly by in deceit.",
      essence: "Integrity is the bedrock of the soul; speaking truth in a constructive, ethical manner is always the right path, even if it carries personal cost."
    },
    insights: [
      {
        id: "eth-gita",
        tradition: "Bhagavad Gita",
        bookTitle: "The Song of God",
        philosophy: "The defense of Dharma. Avoiding a moral battle out of fear or personal comfort is considered a spiritual fall. One must fight for righteousness without being attached to personal survival or security.",
        quote: "Sreyan sva-dharmo vigunah para-dharmat sv-anusthitat | Sva-dharme nidhanam sreyah para-dharmo bhayavahah",
        citation: "Chapter 3, Verse 35",
        guidance: "Do not let cowardice masquerade as pragmatism. If you witness clear harm or injustice, address it through proper channels. Stand firm in your ethical responsibility, knowing that protecting your character is more vital than protecting a title."
      },
      {
        id: "eth-bible",
        tradition: "Holy Bible",
        bookTitle: "Scripture",
        philosophy: "Exposing the works of darkness and defending truth. Believers are called to be salt and light in a broken world, refusing to participate in or cover up deceit.",
        quote: "Speak up for those who cannot speak for themselves, for the rights of all who are destitute. Speak up and judge fairly; defend the rights of the poor and needy.",
        citation: "Proverbs 31:8-9",
        guidance: "Report the unethical activity with clear documentation and facts. Do it not out of vengeance, but out of a sincere desire to protect others and uphold righteousness. Trust that God honors those who walk with integrity."
      },
      {
        id: "eth-quran",
        tradition: "Noble Quran",
        bookTitle: "Divine Revelation",
        philosophy: "Upholding absolute justice. Speaking truth and preventing corruption on earth (Fasad) is a primary commandment. Justice must be maintained even if it goes against oneself or one's family.",
        quote: "O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives.",
        citation: "Surah An-Nisa (4:135)",
        guidance: "Do not remain a silent bystander to corruption. Speak out with truth and clarity. Use proper procedures to report misconduct, knowing that ultimate sustenance and security come from God, not from corporate masters."
      },
      {
        id: "eth-buddhism",
        tradition: "Buddhism",
        bookTitle: "Eightfold Path",
        philosophy: "Right Speech (Samma Vaca) and Right Livelihood (Samma Ajiva). Speech must be truthful, beneficial, and spoken at the right time. Right livelihood means earning a living in a way that does not cause harm or foster dishonesty.",
        quote: "Speak the truth, do not yield to anger; give, if you are asked for even a little... these three steps will lead you to the presence of the gods.",
        citation: "Dhammapada, Verse 224",
        guidance: "Assess the situation with cold, calm wisdom. Formulate your response in a way that minimizes egoic conflict and maximizes resolution. Speak truth gently but firmly, ensuring your motivation is pure compassion rather than self-righteousness."
      }
    ],
    suggestedAction: "Document the unethical behavior objectively with dates, times, and facts. Seek counsel from a trusted, independent mentor on the most effective, structured channel to voice these concerns."
  },
  "forgiveness": {
    query: "How to forgive someone who betrayed my trust but did not apologize?",
    synthesis: {
      commonalities: "All four traditions emphasize that forgiveness is not a favor we do for the offender, but a vital purification process for our own soul. It is the act of releasing toxic resentment to reclaim our inner peace.",
      distinctPerspectives: "The Gita presents forgiveness as a divine, noble virtue that frees us from anger. The Bible mandates forgiveness because we ourselves have been forgiven by God. The Quran praises the immense spiritual height of pardoning others even when we hold the power to retaliate, and Buddhism views resentment as holding a burning coal with the intent to throw it—you are the one who gets burned.",
      essence: "Forgive to liberate your own heart, not because they deserve it, but because your soul deserves peace."
    },
    insights: [
      {
        id: "forg-gita",
        tradition: "Bhagavad Gita",
        bookTitle: "The Song of God",
        philosophy: "Kshama (forgiveness) as a divine quality (Daivi Sampad). Holding on to anger, hatred, or resentment traps the mind in Rajas and Tamas (restlessness and darkness), destroying spiritual clarity.",
        quote: "Tejah kshama dhritih saucham adroho nati-manita | Bhavanti sampadam daivim abhijatasya bharata",
        citation: "Chapter 16, Verse 3",
        guidance: "Understand that holding a grudge binds you to the perpetrator in a cycle of suffering. Forgive them mentally to sever this emotional tie. You do not have to reconcile or trust them again, but you must let go of the anger."
      },
      {
        id: "forg-bible",
        tradition: "Holy Bible",
        bookTitle: "Scripture",
        philosophy: "The unconditional mandate of grace. Since we have received boundless grace and forgiveness for our own shortcomings, we are commanded to extend that same grace to others, releasing them from their debt.",
        quote: "Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        citation: "Ephesians 4:31-32",
        guidance: "Actively choose to release the offender from the emotional debt they owe you. Pray for their well-being. By doing so, you hand the situation over to God, who is the perfect judge, and open your heart to receive divine healing."
      },
      {
        id: "forg-quran",
        tradition: "Noble Quran",
        bookTitle: "Divine Revelation",
        philosophy: "Pardoning others as an act of piety. The Quran consistently praises those who restrain their anger and forgive humanity, noting that God loves the doers of good.",
        quote: "And let them pardon and overlook. Would you not like that Allah should forgive you? And Allah is Forgiving and Merciful.",
        citation: "Surah An-Nur (24:22)",
        guidance: "Override your ego’s desire for vengeance or an apology. Pardon them silently between you and God. Trust that your patience and forgiveness will be rewarded by God with an elevated level of spiritual wisdom."
      },
      {
        id: "forg-buddhism",
        tradition: "Buddhism",
        bookTitle: "Dhammapada & Metta Sutta",
        philosophy: "The futility of resentment. Hatred is never appeased by hatred; it is only appeased by loving-kindness (Metta). Grudges poison your own mind-state and accumulate negative karma.",
        quote: "'He abused me, he struck me, he defeated me, he robbed me'—in those who harbor such thoughts, hatred will never cease.",
        citation: "Dhammapada, Verse 3",
        guidance: "Perform a loving-kindness (Metta) meditation. Visualize the person who hurt you as a suffering being acting out of ignorance and pain. Wish them freedom from their suffering, knowing that healed people do not hurt others."
      }
    ],
    suggestedAction: "Take a quiet moment. Close your eyes, visualize the person, and silently say: 'I release you from my anger. I forgive you for my own peace. Go in peace.' Feel the weight leave your chest."
  }
};

export const DAILY_REFLECTIONS: DailyReflection[] = [
  {
    theme: "Patience",
    quote: "With patience, you will possess your souls.",
    citation: "Luke 21:19",
    source: "Holy Bible",
    meaning: "Patience is not passive waiting. It is the active preservation of inner tranquility and faith while external circumstances unfold in their own timing.",
    reflectionQuestion: "What is one area of your life where you are trying to rush the outcome? How can you practice letting go of control today?"
  },
  {
    theme: "Equanimity",
    quote: "Be steadfast in yoga, Arjuna. Perform your duty and abandon all attachment to success or failure. Such evenness of mind is called yoga.",
    citation: "Chapter 2, Verse 48",
    source: "Bhagavad Gita",
    meaning: "Equanimity is the capability to stand centered in the middle of praise and blame, victory and defeat. It keeps you calm and consistent in your efforts.",
    reflectionQuestion: "If you knew your work today would receive absolutely no praise, would you still do it with the same love? Focus purely on the craft today."
  },
  {
    theme: "Peace",
    quote: "He is the one who sent down tranquility into the hearts of the believers that they might add faith to their faith.",
    citation: "Surah Al-Fath (48:4)",
    source: "Noble Quran",
    meaning: "Tranquility (Sakina) is a divine gift. It is an unshakeable inner quietness that descends upon the heart, making it firm even during the heaviest storms.",
    reflectionQuestion: "Pause for three minutes during a busy work block today. Close your eyes, slow your breath, and allow tranquility to settle in your chest."
  },
  {
    theme: "Mindfulness",
    quote: "The mind is wavering, restless, difficult to guard and restrain. Let the wise person straighten it, as an archer straightens an arrow.",
    citation: "Dhammapada, Verse 33",
    source: "Buddhism",
    meaning: "An unexamined mind scatters in every direction, pulled by worries and desires. By practicing steady mindfulness, we sharpen our awareness and find ultimate peace.",
    reflectionQuestion: "Choose one routine activity today (drinking water, washing hands, typing an email). Do it with 100% focused attention and sensory awareness."
  },
  {
    theme: "Humility",
    quote: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace.",
    citation: "Surah Al-Furqan (25:63)",
    source: "Noble Quran",
    meaning: "Humility means walking through life without the burden of self-importance. It allows us to meet conflict with a gentle heart and speak peace to hostility.",
    reflectionQuestion: "Today, when someone disagrees with you or speaks abruptly, respond with a soft voice and a desire to understand rather than defend."
  },
  {
    theme: "Love & Charity",
    quote: "Let all that you do be done in love.",
    citation: "1 Corinthians 16:14",
    source: "Holy Bible",
    meaning: "Love is not merely an emotion, but a continuous decision to act in the best interest of others. It transforms standard professional chores into sacred acts of service.",
    reflectionQuestion: "Who is one difficult colleague or person you will interact with today? How can you perform a small act of kindness or show patience towards them?"
  }
];

export const QUICK_THEMES: QuickTheme[] = [
  { emoji: "🌱", label: "Career & Setbacks", query: "failure" },
  { emoji: "⚡", label: "Burnout & Stress", query: "burnout" },
  { emoji: "⚖️", label: "Ethical Dilemmas", query: "unethical" },
  { emoji: "🤝", label: "Forgiveness & Trust", query: "forgiveness" }
];
