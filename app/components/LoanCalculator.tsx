"use client";

import { useState } from "react";
import { calculateAffordability } from "@/app/api/actions";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AffordabilityResponse } from "../types/types";

export default function LoanCalculator() {
  const [gross, setGross] = useState(50000);
  const [deductions, setDeductions] = useState(10000);
  const [result, setResult] = useState<AffordabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (gross === 0) {
            setError("Gross cannot be zero");
            setResult(null);
            return;
        }
         if (deductions < 0) {
           setError("Deductions cannot be less than zero");
           setResult(null);
           return;
         }
        setLoading(true);
    setError(null);
    try {
      const resp = await calculateAffordability({
        grossIncome: gross,
        deductions,
      });
      setResult(resp);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-10 border border-gray-200 dark:border-gray-700 pl-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-green-400 dark:text-green-300">
          Loan Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
          Enter your gross income and deductions to check loan eligibility.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Gross monthly income (KES)
          </label>
          <input
            type="number"
 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-100 text-base appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            placeholder="e.g. 50,000"
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            min={0}
            step={1000}
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Total monthly deductions (KES)
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-100 text-base"
            placeholder="e.g. 10,000"
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            min={0}
            step={1000}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-green-400 text-white font-semibold rounded-lg shadow hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 dark:text-red-400 mt-4 text-sm">
          ⚠️ {error}
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Result
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                result.eligible
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {result.eligible ? (
                <CheckCircleIcon className="h-5 w-5 mr-1" />
              ) : (
                <XCircleIcon className="h-5 w-5 mr-1" />
              )}
              {result.eligible ? "Eligible" : "Not Eligible"}
            </span>
          </div>

          <dl className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <div className="flex justify-between">
              <dt>Gross income</dt>
              <dd className="font-medium">
                KES {result?.grossIncome?.toLocaleString() ?? 0}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Deductions</dt>
              <dd className="font-medium">
                KES {result?.deductions?.toLocaleString() ?? 0}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Net income</dt>
              <dd className="font-medium">
                KES {result?.netIncome?.toLocaleString() ?? 0}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Max loan (50%)</dt>
              <dd className="font-medium">
                KES {result?.maxLoan?.toLocaleString() ?? 0}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm italic">
            {result.explanation}
          </p>
        </div>
      )}
    </div>
  );
}