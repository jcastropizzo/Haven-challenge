'use client';

import { AIAnalyzerOption } from '@/utils/ai-analysis/aiAnalyzerOption';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AIAnalyzerProps = {
  currentBookId: string;
};


export const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ currentBookId }) => {
  const router = useRouter();

  const [option, setOption] = useState<string>('bookId');

  const [loading, setLoading] = useState<boolean>(false);

  const [llmAnalysis, setLlmAnalysis] = useState<keyof typeof AIAnalyzerOption | null>(null);


  const handleAnalyze = async () => {
    setLoading(true);
    const analysis
      = await fetch(`/api/llm-analyzer/${currentBookId}?analysisType=${llmAnalysis}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const data = await analysis.text();
    console.log(data);
    setLoading(false);
  }

  return (
    <div className="py-5">
      {/* Label Above Both Elements */}
      <p className="block text-sm font-medium text-gray-900 mb-2">LLM Analysis to do:</p>

      {/* Select Box & Button Aligned Side by Side */}
      <div className="flex items-center gap-2">
        <div className="relative w-1/2">
          <Listbox value={llmAnalysis} onChange={setLlmAnalysis}>
            <div className="relative">
              <ListboxButton className="w-full cursor-default rounded-md bg-white py-2 pr-10 pl-3 text-left text-gray-900 border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600">
                <span className="block truncate">{llmAnalysis ? AIAnalyzerOption[llmAnalysis] : "Select an option"}</span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
                />
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none">
                {Object.entries(AIAnalyzerOption).map(([key, value]) => (
                  <ListboxOption
                    key={key}
                    value={key}
                    className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {value}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                            <CheckIcon aria-hidden="true" className="w-5 h-5" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        {/* Analyze Button - Same Height as Select Box */}
        <button
          type="button"
          className="h-[42px] px-5 py-2 rounded-md bg-blue-500 font-semibold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          disabled={loading && llmAnalysis === null}
          onClick={handleAnalyze}
        >
          Analyze
        </button>
      </div>
      <div className='mt-5'>
        <p>{llmAnalysis === null ? "No analysis selected yet!" :
          loading ? (<>loading</>) : llmAnalysis}</p>
      </div>
    </div>
  );
};
