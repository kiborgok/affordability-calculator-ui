"use server";

import { AffordabilityRequest, AffordabilityResponse } from "../types/types";

export async function calculateAffordability(
  data: AffordabilityRequest
): Promise<AffordabilityResponse> {
  const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/v1";

  try {
    const res = await fetch(`${BASE_URL}/affordability`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!res.ok) {
      // Try to parse error details if backend returns JSON
      let errorDetail: string | undefined;
      try {
        const errData = await res.json();
        errorDetail = errData?.message || JSON.stringify(errData);
      } catch {
        errorDetail = await res.text();
      }

      throw new Error(
        `API error (${res.status} ${res.statusText}): ${errorDetail}`
      );
    }

    const result: AffordabilityResponse = await res.json();
    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to calculate affordability: ${err.message}`);
    }
    throw new Error("Unknown error occurred while calculating affordability.");
  }
}