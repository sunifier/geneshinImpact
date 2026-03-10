// ============================================================
// Silent Whale — Quest Dossier : DATA MODEL
// All analytical content from the final CRISP-DM notebook
// ============================================================

export interface BehaviorSegment {
  id: number;
  name: string;
  sharePct: number;
  signature: string;
  mainRisk: string;
  interpretation: string;
  recommendedUse: string;
}

export interface SurveySegment {
  id: number;
  name: string;
  sharePct: number;
  signature: string;
  mainRisk: string;
  interpretation: string;
  recommendedUse: string;
  avgBreakLikelihood: number;
  avgMotivation: number;
  avgDisengagementRisk: number;
}

export interface CrossViewArchetype {
  name: string;
  behaviorAnchor: string;
  surveyAnchor: string;
  coreStory: string;
  mainRisk: string;
  actionFamily: string;
}

export interface SyntheticHybrid {
  cluster: number;
  name: string;
  closestBehavior: string;
  closestSurvey: string;
  distanceBehavior: number;
  distanceSurvey: number;
}

export interface TopicData {
  id: number;
  topTerms: string;
  n: number;
  negRate: number;
  share: number;
  negLift: number;
  stdResidNeg: number;
}

export interface HypothesisAudit {
  id: string;
  status: string;
  evidence: string;
}

export interface EvaluationLayer {
  layer: string;
  status: 'Retained' | 'Not retained' | 'demo only';
  reason: string;
}

export interface NBARule {
  surveySegment: string;
  topMessageType: string;
  topChannel: string;
  topFrequency: string;
  objective: string;
  messageTone: string;
  recommendedAction: string;
  contactPressure: string;
  riskLevel: string;
  actionFamily: string;
}

export interface IntegrationStrategy {
  strategy: string;
  validity: string;
  strength: string;
  retained: string;
  reason: string;
}

// ============================================================
// DATA
// ============================================================

export const DATA = {
  CODE: "WHALES",
  APP_NAME: "Silent Whale — Quest Dossier",
  N_ACCOUNTS: 175,
  N_REVIEWS: 9422,
  N_SURVEY: 42,

  BEHAVIOR_SEGMENTS: [
    {
      id: 0,
      name: "Core Regulars",
      sharePct: 72.57,
      signature: "Consistent activity, moderate pull intensity, broad banner engagement",
      mainRisk: "Low immediate risk, but may contain hidden fatigue not visible in logs alone",
      interpretation: "Baseline healthy behavioral segment with stable engagement patterns",
      recommendedUse: "Maintain value through regular but non-intrusive content updates",
    },
    {
      id: 1,
      name: "Burst Pullers",
      sharePct: 9.14,
      signature: "Very high pull intensity concentrated in active bursts",
      mainRisk: "High intensity does not necessarily imply durable long-term engagement",
      interpretation: "Highly active when engaged, but structurally less stable than they first appear",
      recommendedUse: "Avoid over-targeting; monitor for fatigue or drop-off after activity spikes",
    },
    {
      id: 2,
      name: "Selective Regulars",
      sharePct: 4.57,
      signature: "Stable cadence with narrower, more selective banner focus",
      mainRisk: "Low structural risk; may disengage if preferred content cadence weakens",
      interpretation: "Disciplined and focused engagement profile",
      recommendedUse: "Use targeted, relevance-based updates aligned with specific interests",
    },
    {
      id: 3,
      name: "At-Risk Drifters",
      sharePct: 13.71,
      signature: "Low pull intensity and long inactivity gaps",
      mainRisk: "Highest behavioral disengagement risk",
      interpretation: "Clear drift-prone segment defined by unstable retention patterns",
      recommendedUse: "Prioritize gentle reactivation logic and low-pressure comeback messaging",
    },
  ] as BehaviorSegment[],

  SURVEY_SEGMENTS: [
    {
      id: 0,
      name: "Stable Light Engagers",
      sharePct: 16.67,
      signature: "Healthy motivation, low break risk, low monetization pressure",
      mainRisk: "Low",
      interpretation: "Privately stable players with sustainable engagement",
      recommendedUse: "Maintain with light-touch, positive, non-intrusive communication",
      avgBreakLikelihood: 2.429,
      avgMotivation: 8.143,
      avgDisengagementRisk: 1.619,
    },
    {
      id: 1,
      name: "Quiet Break Risks",
      sharePct: 14.29,
      signature: "Higher break likelihood, lower attachment, low monetization",
      mainRisk: "Silent disengagement",
      interpretation: "Players drifting away without necessarily showing dramatic visible signals",
      recommendedUse: "Use gentle comeback prompts tied to major improvements or updates",
      avgBreakLikelihood: 3.5,
      avgMotivation: 6.667,
      avgDisengagementRisk: 3.167,
    },
    {
      id: 2,
      name: "Fatigued Spenders",
      sharePct: 23.81,
      signature: "High activity/spend tendency with weaker motivation and rising fatigue",
      mainRisk: "Burnout under continued engagement",
      interpretation: "Active but emotionally strained players",
      recommendedUse: "Reduce pressure and emphasize value, friction reduction",
      avgBreakLikelihood: 2.5,
      avgMotivation: 5.1,
      avgDisengagementRisk: 2.133,
    },
    {
      id: 3,
      name: "Committed Enthusiasts",
      sharePct: 11.90,
      signature: "Very high motivation, low break risk, positive feeling",
      mainRisk: "Low",
      interpretation: "Strongest healthy player-state segment",
      recommendedUse: "Sustain enthusiasm through roadmap, lore, and community-oriented content",
      avgBreakLikelihood: 1.6,
      avgMotivation: 9.4,
      avgDisengagementRisk: 2.067,
    },
    {
      id: 4,
      name: "Detached High-Risk Players",
      sharePct: 9.52,
      signature: "Low motivation, high disengagement risk, high break likelihood",
      mainRisk: "Imminent withdrawal",
      interpretation: "Most fragile private-state profile in the survey layer",
      recommendedUse: "Use rare, respectful, high-signal comeback outreach only",
      avgBreakLikelihood: 4.75,
      avgMotivation: 4.0,
      avgDisengagementRisk: 4.75,
    },
    {
      id: 5,
      name: "Engaged but Cautious Players",
      sharePct: 23.81,
      signature: "Still engaged, but more selective and less emotionally attached",
      mainRisk: "Motivation drift if communication becomes excessive or irrelevant",
      interpretation: "Valuable but sensitive segment requiring careful communication",
      recommendedUse: "Use selective, relevant communication without oversaturation",
      avgBreakLikelihood: 2.2,
      avgMotivation: 7.6,
      avgDisengagementRisk: 2.267,
    },
  ] as SurveySegment[],

  CROSS_VIEW_ARCHETYPES: [
    {
      name: "Stable Selective Archetype",
      behaviorAnchor: "Selective Regulars",
      surveyAnchor: "Stable Light Engagers",
      coreStory: "Disciplined, stable engagement with relatively low private-state risk",
      mainRisk: "Low, but dependent on relevance of future content",
      actionFamily: "Maintain / Protect",
    },
    {
      name: "Drift-Risk Archetype",
      behaviorAnchor: "At-Risk Drifters",
      surveyAnchor: "Quiet Break Risks; Detached High-Risk Players",
      coreStory: "Behavioral disengagement and private withdrawal risk align clearly",
      mainRisk: "High churn / break risk",
      actionFamily: "Nudge / Reignite",
    },
    {
      name: "Active-but-Fatigued Archetype",
      behaviorAnchor: "Core Regulars; Burst Pullers",
      surveyAnchor: "Fatigued Spenders; Engaged but Cautious Players",
      coreStory: "Externally active players may still be privately strained or fatigue-exposed",
      mainRisk: "Burnout hidden beneath healthy behavioral activity",
      actionFamily: "Reassure / Protect",
    },
    {
      name: "Enthusiast Archetype",
      behaviorAnchor: "Selective Regulars; Core Regulars",
      surveyAnchor: "Committed Enthusiasts",
      coreStory: "Stable engagement reinforced by strong positive player-state",
      mainRisk: "Low immediate risk",
      actionFamily: "Maintain",
    },
  ] as CrossViewArchetype[],

  SYNTHETIC_HYBRIDS: [
    {
      cluster: 0,
      name: "Stable Selective Engagers",
      closestBehavior: "Core Regulars",
      closestSurvey: "Stable Light Engagers",
      distanceBehavior: 5.267,
      distanceSurvey: 1.073,
    },
    {
      cluster: 1,
      name: "Disengaging Drift-Risk Players",
      closestBehavior: "Burst Pullers",
      closestSurvey: "Quiet Break Risks",
      distanceBehavior: 12.015,
      distanceSurvey: 0.906,
    },
    {
      cluster: 2,
      name: "Active but Fatigue-Exposed Core",
      closestBehavior: "Core Regulars",
      closestSurvey: "Fatigued Spenders",
      distanceBehavior: 4.199,
      distanceSurvey: 1.96,
    },
  ] as SyntheticHybrid[],

  TOPICS: [
    { id: 6, topTerms: "update, shaders, compiling, fix, phone", n: 1642, negRate: 0.377, share: 0.174, negLift: 1.654, stdResidNeg: 12.645 },
    { id: 1, topTerms: "skip, button, skip button, add, dialogue", n: 560, negRate: 0.366, share: 0.059, negLift: 1.606, stdResidNeg: 6.844 },
    { id: 0, topTerms: "characters, story, playing, character", n: 3786, negRate: 0.269, share: 0.402, negLift: 1.182, stdResidNeg: 5.340 },
    { id: 4, topTerms: "like, like game, game like, good game", n: 1042, negRate: 0.130, share: 0.111, negLift: 0.568, stdResidNeg: -6.654 },
    { id: 7, topTerms: "fun, fun game, fun play, game fun", n: 727, negRate: 0.084, share: 0.077, negLift: 0.368, stdResidNeg: -8.136 },
    { id: 3, topTerms: "world, open, open world, world game", n: 595, negRate: 0.081, share: 0.063, negLift: 0.354, stdResidNeg: -7.525 },
    { id: 5, topTerms: "love game, really love, game play", n: 519, negRate: 0.075, share: 0.055, negLift: 0.330, stdResidNeg: -7.292 },
    { id: 2, topTerms: "best game, game played, game ve", n: 551, negRate: 0.038, share: 0.058, negLift: 0.167, stdResidNeg: -9.334 },
  ] as TopicData[],

  TOPIC_LABELS: {
    6: "Technical / Update Complaints",
    1: "UI / Skip Button Requests",
    0: "Characters & Story Discussion",
    4: "General Positive Sentiment",
    7: "Fun & Enjoyment",
    3: "Open World Appreciation",
    5: "Love & Attachment",
    2: "Best Game Endorsement",
  } as Record<number, string>,

  HYPOTHESIS_AUDIT: [
    { id: "H1", status: "Supported", evidence: "Behavioral segmentation reveals distinct account-level engagement profiles" },
    { id: "H2", status: "Supported", evidence: "Topic-sentiment association is significant and some topics overconcentrate negative review discourse" },
    { id: "H3", status: "Supported (descriptive/profiling)", evidence: "Behavioral segments differ meaningfully in inactivity-gap structure" },
    { id: "H4", status: "Not testable", evidence: "No valid respondent-level or temporally aligned fusion between public voice and behavior" },
    { id: "H5", status: "Partially supported / exploratory", evidence: "Survey and behavioral evidence suggest monetization-risk relationships, but no linked player-level confirmation" },
  ] as HypothesisAudit[],

  EVALUATION_LAYERS: [
    { layer: "Behavior segmentation", status: "Retained" as const, reason: "Strongest structure and clear account-level interpretability" },
    { layer: "Survey segmentation", status: "Retained" as const, reason: "Adds a valid private-state and communication-preference layer from real respondents" },
    { layer: "Cross-view synthesis (behavior + survey)", status: "Retained" as const, reason: "Best valid integration strategy under current data constraints" },
    { layer: "Public voice + behavior hybrid", status: "Not retained" as const, reason: "No temporal overlap and no respondent-level linkage" },
    { layer: "Synthetic hybrid (behavior + survey)", status: "demo only" as const, reason: "Artificial linkage and weak separation; workflow illustration only" },
  ] as EvaluationLayer[],

  NBA_RULES: [
    { surveySegment: "Committed Enthusiasts", topMessageType: "A reward / incentive-based message", topChannel: "Email", topFrequency: "2–3 times a month", objective: "Sustain enthusiasm", messageTone: "Excited, community-oriented, value-rich", recommendedAction: "Share previews, lore, roadmap, and premium community content", contactPressure: "Medium", riskLevel: "Low", actionFamily: "Maintain" },
    { surveySegment: "Detached High-Risk Players", topMessageType: "A reward / incentive-based message", topChannel: "In-game notification", topFrequency: "About once a week", objective: "Recover motivation without overload", messageTone: "Minimal, respectful, high-signal only", recommendedAction: "Use rare comeback outreach focused on major improvements", contactPressure: "Very low", riskLevel: "High", actionFamily: "Reignite" },
    { surveySegment: "Engaged but Cautious Players", topMessageType: "A reward / incentive-based message", topChannel: "In-game notification", topFrequency: "About once a week", objective: "Protect motivation and avoid fatigue drift", messageTone: "Targeted, relevant, selective", recommendedAction: "Send personalized updates matched to interests", contactPressure: "Low to medium", riskLevel: "Moderate", actionFamily: "Protect" },
    { surveySegment: "Fatigued Spenders", topMessageType: "A reward / incentive-based message", topChannel: "In-game notification", topFrequency: "2–3 times a month", objective: "Reduce burnout while preserving attachment", messageTone: "Supportive, non-exploitative, fatigue-aware", recommendedAction: "Highlight new content, meaningful rewards, or fatigue-reducing features", contactPressure: "Medium", riskLevel: "Moderate to high", actionFamily: "Reassure" },
    { surveySegment: "Quiet Break Risks", topMessageType: "Personalized recommendations", topChannel: "In-game notification", topFrequency: "Never (I do not want outreach)", objective: "Prevent silent disengagement", messageTone: "Gentle, reassuring, low-pressure", recommendedAction: "Send soft comeback prompts tied to major updates", contactPressure: "Low to medium", riskLevel: "Moderate", actionFamily: "Nudge" },
    { surveySegment: "Stable Light Engagers", topMessageType: "A short reminder of what's new", topChannel: "In-game notification", topFrequency: "2–3 times a month", objective: "Maintain engagement", messageTone: "Light, positive, non-intrusive", recommendedAction: "Send occasional content highlights or character teasers", contactPressure: "Low", riskLevel: "Low", actionFamily: "Maintain" },
  ] as NBARule[],

  INTEGRATION_STRATEGIES: [
    { strategy: "Cross-view synthesis (behavior + survey)", validity: "Valid", strength: "High", retained: "Yes", reason: "Profile-level comparison preserves both sources without forcing artificial row matches" },
    { strategy: "Public voice + behavior fusion", validity: "Not valid", strength: "None", retained: "No", reason: "No temporal overlap and no direct account-level linkage" },
    { strategy: "Synthetic hybrid (behavior + survey)", validity: "Illustrative only", strength: "Weak", retained: "demo only", reason: "Artificial linkage and weak cluster separation" },
    { strategy: "Future linked behavior + survey hybrid", validity: "Potentially valid", strength: "Future work", retained: "Not yet possible", reason: "Requires a respondent-level linkage key in the survey design" },
  ] as IntegrationStrategy[],

  DEPLOYMENT_LOGIC: [
    { inputLayer: "Behavior segmentation", signalType: "Observed behavior", exampleSignal: "Core Regulars / At-Risk Drifters", deploymentUse: "Identify activity and inactivity risk from account-level logs" },
    { inputLayer: "Survey segmentation", signalType: "Private player state", exampleSignal: "Committed Enthusiasts / Quiet Break Risks", deploymentUse: "Identify motivation, break propensity, and monetization posture" },
    { inputLayer: "Preference layer", signalType: "Communication preference", exampleSignal: "Preferred channel, message style, acceptable frequency", deploymentUse: "Adapt outreach style to segment-level preferences" },
    { inputLayer: "NBA layer", signalType: "Recommended action", exampleSignal: "Maintain / Nudge / Reassure / Reignite / Protect", deploymentUse: "Translate analytical profiles into action-oriented strategies" },
  ],

  BEHAVIOR_EVAL: {
    bestK: 4,
    silhouette: 0.3368,
    daviesBouldin: 1.1895,
    calinskiHarabasz: 40.0023,
    bootstrapMeanARI: 0.4755,
    bootstrapMedianARI: 0.4381,
  },

  SURVEY_EVAL: {
    bestK: 6,
    silhouette: 0.1574,
    daviesBouldin: 1.4624,
    calinskiHarabasz: 7.5081,
    bootstrapMeanARI: 0.4123,
    bootstrapMedianARI: 0.4138,
  },

  BEHAVIOR_FEATURES: [
    "pulls", "active_days", "span_days", "pulls_per_day",
    "max_gap_days", "mean_gap_days", "five_rate", "four_rate", "banner_diversity"
  ],

  KEY_LIMITATIONS: [
    "Survey export lacks respondent-level linkage key for direct behavior+survey fusion",
    "Public review corpus and gacha logs do not overlap in time",
    "Survey sample is relatively small (n=42), limiting some segment stability",
    "Several survey variables rely on ordinal/self-reported scales",
    "Synthetic hybrid is non-inferential, retained only as methodological demonstration",
  ],
};

export type ViewMode = 'client' | 'internal';
