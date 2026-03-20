# Genshin Impact Player Intelligence
**CRISP-DM analytics project for player segmentation, public sentiment analysis, churn-risk validation, and deployment-ready action design**

## Overview
This project is an end-to-end **CRISP-DM** analytics notebook built around **Genshin Impact** player intelligence. It combines **behavioral data**, **public review sentiment**, and **game-system context** to produce interpretable player segments, validate engagement-risk signals, and generate deployment-ready outputs for retention and Live Ops decision-making.

Rather than treating this as a simple clustering exercise, the project was designed as a **portfolio-grade analytics case study** with:
- clear business framing,
- multiple data sources,
- hypothesis-driven testing,
- robust model evaluation,
- stability and sensitivity checks,
- and actionable outputs for decision support.

The result is not just an analysis notebook, but a structured product-style dossier showing how data science can support **player understanding, monetization context, community intelligence, and retention strategy**.

---

## Business Objective
The goal of this project is to understand **player identity and engagement risk** through four complementary lenses:

1. **Game system incentives**  
   Rarity, release cadence, banner structure, and monetization context.

2. **Behavior**  
   Pull frequency, inactivity gaps, account activity span, rarity rates, and banner diversity.

3. **Public voice**  
   Review sentiment, topic pressure, negative friction themes, and volatility.

4. **Private intelligence (planned extension)**  
   Survey-based motivation, satisfaction, and churn intent signals.

This project answers practical questions such as:
- Which player groups are most at risk of drifting away?
- Which segments are highly engaged versus passive or unstable?
- Which pain points dominate public opinion?
- How can Live Ops or product teams tailor interventions by segment?
- How can descriptive segmentation be upgraded into something deployment-ready?

---

## Main Questions / Hypotheses
The notebook is structured around explicit hypotheses:

- **H1:** Review sentiment differs by topic.
- **H2:** Public review topics overrepresent negative experiences (“echo effect”).
- **H3:** Behavioral player segments differ in inactivity gaps, used here as a churn-risk proxy.
- **H4:** Integrated multi-view segmentation is more stable than single-view segmentation.
- **H5:** Monetization context correlates with system scarcity signals such as rarity and limited content.

This framing keeps the analysis disciplined and helps separate **descriptive insight**, **statistical evidence**, and **action design**.

---

## What This Project Does
### 1) Data ingestion and preparation
The notebook loads and prepares multiple datasets, including:
- Google Play review data,
- character metadata,
- banner / monetization context,
- and account-level gacha logs.

Preprocessing includes:
- cleaning text data,
- standardizing columns,
- handling missing values,
- parsing timestamps,
- and building reproducible intermediate tables.

---

### 2) Public voice analysis (NLP)
To capture how players talk about the game publicly, the project builds a lightweight but practical NLP pipeline using:

- **VADER sentiment scoring**
- **TF-IDF vectorization**
- **NMF topic modeling**
- topic labeling for interpretability
- public pressure / negativity summaries

This allows the notebook to identify:
- dominant complaint themes,
- high-pressure topics,
- sentiment concentration,
- and friction signals relevant to product and community teams.

The project also recognizes an important limitation: public reviews are not a perfect representation of the entire player base, since they tend to overrepresent strong positive or negative experiences.

---

### 3) Behavioral feature engineering
The notebook extracts account-level behavior from gacha history without relying on a single simplistic usage metric.

Engineered features include:
- total pulls,
- active days,
- account activity span,
- pulls per day,
- maximum inactivity gap,
- mean inactivity gap,
- 5★ rate,
- 4★ rate,
- banner diversity.

These features are designed to represent **intensity**, **consistency**, **rarity outcomes**, and **variety of participation**.

---

### 4) Behavioral segmentation
The first segmentation layer is built using **behavior-only clustering**.

Key methodological choices:
- standardized features,
- **K-Means clustering**,
- **silhouette-based model selection**,
- interpretability-first labeling,
- PCA diagnostics for structure inspection.

This step establishes a strong descriptive baseline:
who the players are, how active they are, how stable they are, and which groups show signs of disengagement.

---

### 5) Hybrid integration
A second layer integrates **public voice context** with behavior.

Because reviews are written per review while gacha logs are account-level, the notebook uses **global public voice indices** as contextual priors rather than pretending there is a perfect one-to-one join. This is a realistic design choice and keeps the hybrid modeling honest.

The hybrid layer augments player behavior with:
- average public sentiment context,
- negativity rate,
- topic pressure,
- sentiment volatility / friction context.

This turns segmentation into a more decision-relevant framework by linking player behavior with the broader environment players are reacting to.

---

### 6) Statistical testing
The project does not rely only on charts and intuition.

It includes hypothesis-driven statistical testing such as:
- **Kruskal–Wallis tests** for group differences,
- effect-size thinking,
- topic-level sentiment comparisons,
- and segment-level inactivity-gap validation.

This is important because it shows the project is not just visually persuasive — it is analytically defended.

---

### 7) Evaluation and rigor upgrades
A major strength of the notebook is that it treats segmentation as something that must be **validated**, not just produced.

Evaluation includes:
- **internal validity** via silhouette,
- **bootstrap co-assignment stability**,
- **bootstrap ARI stability**,
- **k-sweep sensitivity analysis**,
- **feature ablation sensitivity**,
- and **temporal risk validation**.

The temporal validation step upgrades the work beyond static descriptive analytics by testing whether a frozen risk formulation has useful predictive value on a later holdout period.

This makes the project much stronger from a recruiter perspective because it shows understanding of the difference between:
- descriptive clustering,
- stable segmentation,
- and operational predictive utility.

---

### 8) Deployment-oriented outputs
The final phase translates analysis into artifacts a business team could actually use.

Outputs include:
- **segment profiles**
- **topic pressure summaries**
- **weekly sentiment tables**
- **stability summary tables**
- **player radar outputs**
- **player identity cards**
- **next best action (NBA) engine outputs**
- optional JSON exports for a web dossier / visual layer

The **Next Best Action engine** blends:
- risk,
- motivation proxies,
- friction signals,
- and fatigue guardrails

to map players or segments into different intervention styles such as:
- rescue,
- reactivation,
- nurture,
- or growth.

This is one of the most valuable parts of the notebook because it shows how analytics can move from “interesting” to **decision-ready**.

---

## Methods and Tools
### Core analytics
- Python
- Jupyter Notebook
- pandas
- numpy
- scipy
- scikit-learn

### NLP
- NLTK / VADER
- TF-IDF
- NMF topic modeling

### Modeling / validation
- K-Means clustering
- PCA
- silhouette score
- bootstrap stability
- ARI
- sensitivity analysis
- temporal holdout validation

### Visualization / reporting
- matplotlib
- seaborn / notebook visual outputs if enabled
- CSV export tables
- optional JSON artifacts for web presentation

---

## Project Structure
A simplified view of the repository structure:

```text
.
├── notebooks/
│   └── crispdm-genshin-impact.ipynb
├── data/
│   ├── raw/
│   │   ├── reviews/
│   │   ├── gacha/
│   │   ├── revenue/
│   │   └── survey/              # planned extension
│   └── processed/
├── artifacts/
│   └── reports/
├── README.md
└── requirements.txt
