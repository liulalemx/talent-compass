

# TalentAI — AI-Powered HR Decision Support Tool

## Overview
A modern, enterprise-grade web application for senior HR managers to evaluate and compare candidates for high-stakes hiring decisions. Clean, minimal design with a neutral blue/grey palette, emphasizing transparency and decision support.

## Design System
- **Colors**: Neutral greys with blue accents (slate/blue palette), light mode default
- **Typography**: Clear hierarchy — xl/2xl headers, base body text, muted secondary text
- **Components**: Cards with subtle shadows, rounded-lg/2xl corners, generous spacing
- **Style**: Workday/Linear inspired — professional, analytical, trustworthy

## Pages & Features

### 1. Dashboard (Landing Page)
- Sidebar navigation: Dashboard, Hiring Cases, Candidates, Settings
- Stats overview cards (Active Cases, Total Candidates, Recently Evaluated)
- "Create New Hiring Case" primary CTA button
- Hiring cases list as cards showing role title, department, status badge (Draft/Criteria Defined/Scored), last updated date

### 2. Hiring Case Creation
- Centered, distraction-free form layout
- Large textarea for job description input
- Dropdowns for Department, Seniority Level
- Hiring urgency selector (Low/Medium/High)
- "Generate Criteria with AI" primary CTA

### 3. Criteria Definition (AI Chat + Criteria Panel)
- Split layout: left chat interface, right live-updating criteria panel
- Chat panel with conversational UI, suggested quick-reply chips
- Criteria panel showing structured list with name, description, weight sliders, type tags (must-have/preferred/behavioral)
- Weight total indicator (must sum to 100%)
- "Approve Criteria" button

### 4. Candidate Evaluation
- Top: Role title + summary with filter controls (Internal/External/All, experience range)
- Left: Sortable candidate table (Name, Role, Source, Score, Rank)
- Right: Detail panel with summary, strengths, risks, experience, score breakdown per criterion with rationale, progress bars
- "Why selected" explanation section for transparency

### 5. Comparison View
- Side-by-side horizontal comparison table
- Columns = candidates, Rows = criteria
- Scores with visual emphasis on differences (color coding, bolding)
- Sticky candidate headers
- Radar chart comparison

### 6. Job Description Rewrite
- "Refine Job Description" button triggers modal
- AI-generated revised description in editable textarea
- "Apply and Re-run Evaluation" CTA

## Mock Data
- 1 hiring case (Senior Software Engineering Manager, Autonomous Driving)
- 8 candidates (mix of internal/external) with full scoring data
- Pre-defined criteria with weights

## Navigation
- Persistent sidebar with collapsible icon mode
- Routes: `/` (Dashboard), `/cases/new` (Create), `/cases/:id/criteria` (Criteria), `/cases/:id/candidates` (Evaluation), `/cases/:id/compare` (Comparison)

