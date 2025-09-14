# Affordability Calculator

## Overview
Single-page app (Next.js + Tailwind css) communicating with a Spring Boot backend that computes an affordability decision.

## Requirements
- Node 18+

## Live URLs
- Frontend: https://affordability-calculator-ui.vercel.app/
- Backend API: https://affordability-calculator-123136158650.us-central1.run.app/api/v1/affordability

## Local (without Docker)
### Frontend
- cd affordability-calculator-ui
- npm install
- npm run dev

## Logic
net_income = grossIncome - deductions
max_loan = 0.5 * net_income
eligible = max_loan >= 20000

## Client–Server Architecture

This project is built on a **client–server architecture**, ensuring a clear separation of concerns and maintainability.

### Frontend (Client)
- **Tech stack:** Next.js 15, TypeScript
- **Role:** Provides the user interface for the Affordability Calculator.
- **Responsibilities:**
  - Render a clean, responsive form for entering gross income and deductions.
  - Call the backend via server actions or REST API requests.
  - Display results: net income, maximum loan amount, eligibility status, and explanation.
  - Handle and display errors gracefully.

### Backend (Server)
- **Tech stack:** Spring Boot (Java 17).
- **Role:** Provides the business logic and data validation.
- **Responsibilities:**
  - Expose a REST endpoint (`POST /api/affordability`) that accepts JSON input.
  - Validate inputs (non-negative numbers, deductions ≤ gross).
  - Apply affordability rules:
    - `netIncome = grossIncome - deductions`
    - `maxLoan = 50% of netIncome`
    - `eligible = maxLoan >= 20,000`
  - Return structured JSON response with all calculated fields and explanation.

### Communication
- **Protocol:** JSON over HTTP.
- **Flow:**
  1. User submits data from the frontend form.
  2. Frontend sends a POST request to the backend API.
  3. Backend validates, computes, and returns the affordability decision.
  4. Frontend renders results.

### Diagram

```mermaid
flowchart TD
  A[User] --> B[Frontend (Next.js 15)]
  B -->|POST /api/affordability (JSON)| C[Backend (Spring Boot)]
  C -->|Response: JSON result| B
  B --> A
