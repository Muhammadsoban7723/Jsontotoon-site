'use client'

import { useState, useEffect } from 'react'
import { FaCopy, FaRedo, FaExchangeAlt, FaCheck, FaCog, FaRegClock } from 'react-icons/fa'
import { jsonToTOON, toonToJSON, sampleData, TOONDelimiter, TOONIndentation, TOONKeyFolding } from '@/utils/toonConverter'
import { countTokens, calculateReduction } from '@/utils/tokenCounter'

type HistoryEntry = {
  id: number
  timestamp: string
  direction: 'JSON_TO_TOON'
  input: string
  output: string
  reduction: number
}

export default function TOONConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [inputTokens, setInputTokens] = useState(0)
  const [outputTokens, setOutputTokens] = useState(0)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const [indentation, setIndentation] = useState<TOONIndentation>(2)
  const [delimiter, setDelimiter] = useState<TOONDelimiter>(',')
  const [keyFolding, setKeyFolding] = useState<TOONKeyFolding>('disabled')
  const [allowDuplicates, setAllowDuplicates] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyPage, setHistoryPage] = useState(0)

  useEffect(() => {
    setInputTokens(countTokens(input))
  }, [input])

  useEffect(() => {
    setOutputTokens(countTokens(output))
  }, [output])

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem('json-to-toon-history')
      if (!raw) return
      const parsed = JSON.parse(raw) as HistoryEntry[]
      if (Array.isArray(parsed)) {
        setHistory(parsed)
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e)
    }
  }, [])

  // Persist history changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('json-to-toon-history', JSON.stringify(history))
    } catch (e) {
      console.error('Failed to save history to localStorage', e)
    }
  }, [history])

  const handleConvert = () => {
    setError('')
    try {
      const toon = jsonToTOON(input, {
        indentation,
        delimiter,
        keyFolding,
        allowDuplicates,
      })
      setOutput(toon)

      const reductionNow = calculateReduction(
        countTokens(input),
        countTokens(toon)
      )

      const entry: HistoryEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        direction: 'JSON_TO_TOON',
        input,
        output: toon,
        reduction: reductionNow,
      }

      setHistory((prev) => [entry, ...prev].slice(0, 50))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
      setOutput('')
    }
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const handleSwap = () => {
    const temp = input
    setInput(output)
    setOutput(temp)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const loadSample = (sampleKey: keyof typeof sampleData) => {
    setInput(sampleData[sampleKey])
    setError('')
  }

  const openHistory = () => {
    setShowHistory(true)
    requestAnimationFrame(() => {
      setIsHistoryOpen(true)
    })
  }

  const closeHistory = () => {
    setIsHistoryOpen(false)
  }

  useEffect(() => {
    if (!isHistoryOpen && showHistory) {
      const timeout = setTimeout(() => {
        setShowHistory(false)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isHistoryOpen, showHistory])

  const handleLoadHistory = (entry: HistoryEntry) => {
    setInput(entry.input)
    setOutput(entry.output)
    closeHistory()
  }

  const handleClearHistory = () => {
    setHistory([])
    setHistoryPage(0)
  }

  const handleRemoveHistory = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const HISTORY_PAGE_SIZE = 5
  const totalHistoryPages = Math.max(1, Math.ceil(history.length / HISTORY_PAGE_SIZE))
  const currentHistoryPage = Math.min(historyPage, totalHistoryPages - 1)
  const paginatedHistory = history.slice(
    currentHistoryPage * HISTORY_PAGE_SIZE,
    (currentHistoryPage + 1) * HISTORY_PAGE_SIZE
  )

  const handleHistoryPrev = () => {
    setHistoryPage((prev) => Math.max(0, prev - 1))
  }

  const handleHistoryNext = () => {
    setHistoryPage((prev) =>
      Math.min(totalHistoryPages - 1, prev + 1)
    )
  }

  const reduction = calculateReduction(inputTokens, outputTokens)

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top toolbar: samples + advanced + history */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          onChange={(e) => e.target.value && loadSample(e.target.value as keyof typeof sampleData)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          defaultValue=""
        >
          <option value="" disabled>Try Sample...</option>
          <option value="simple">Simple Object</option>
          <option value="arrayOfObjects">Array of Objects</option>
          <option value="nested">Nested Structure</option>
        </select>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-medium transition-colors ${
              showAdvanced
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaCog className="h-4 w-4" />
            <span className="gradient-text-strong">Advanced Options</span>
            <span className="inline-flex items-center rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              NEW
            </span>
          </button>

          <button
            type="button"
            onClick={openHistory}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>History</span>
            {history.length > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-semibold text-white">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced options panel */}
      {showAdvanced && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 text-sm space-y-4">
          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Advanced formatting options
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-2 font-semibold text-gray-800">Indentation</div>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={indentation === 2}
                  onChange={() => setIndentation(2)}
                />
                <span>2 spaces</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={indentation === 4}
                  onChange={() => setIndentation(4)}
                />
                <span>4 spaces</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={indentation === 0}
                  onChange={() => setIndentation(0)}
                />
                <span>No indentation</span>
              </label>
            </div>
          </div>

          <div>
            <div className="mb-2 font-semibold text-gray-800">Delimiter</div>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={delimiter === ','}
                  onChange={() => setDelimiter(',')}
                />
                <span>Comma (,)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={delimiter === '\t'}
                  onChange={() => setDelimiter('\t')}
                />
                <span>Tab (\t)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={delimiter === '|'}
                  onChange={() => setDelimiter('|')}
                />
                <span>Pipe (|)</span>
              </label>
            </div>
          </div>

          <div>
            <div className="mb-2 font-semibold text-gray-800">Key Folding</div>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={keyFolding === 'disabled'}
                  onChange={() => setKeyFolding('disabled')}
                />
                <span>Disabled</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-primary-600"
                  checked={keyFolding === 'safe'}
                  onChange={() => setKeyFolding('safe')}
                />
                <span>Safe folding</span>
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Collapses single-key wrapper chains into dotted paths (e.g. <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">data.user.name</code>).
              Only applies when each nested level has one key.
            </p>
          </div>
        </div>

          <div className="flex items-center justify-between text-gray-700">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
              />
              <span>Allow Duplicates</span>
            </label>
            <p className="text-xs text-gray-500">
              JSON parsing may still collapse duplicate keys; this option is reserved for future TOON parsing enhancements.
            </p>
          </div>
        </div>
      )}

      {/* Main editor grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">JSON Input</h3>
            <span className="text-sm text-gray-600">{inputTokens} tokens</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON data here..."
            className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">TOON Output</h3>
            <span className="text-sm text-gray-600">{outputTokens} tokens</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="TOON format will appear here..."
            className="w-full h-80 p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={handleConvert}
          disabled={!input}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
        >
          Convert to TOON
        </button>

        <button
          onClick={handleSwap}
          disabled={!input || !output}
          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Swap input and output"
        >
          <FaExchangeAlt />
        </button>

        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <FaRedo />
          Reset
        </button>

        {inputTokens > 0 && outputTokens > 0 && (
          <div className="ml-auto text-lg font-semibold text-green-600">
            {reduction}% token reduction
          </div>
        )}
      </div>
      {/* History drawer */}
      {showHistory && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div
            className={`absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ${
              isHistoryOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeHistory}
          />
          <div
            className={`relative z-[70] flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl transform transition-transform duration-300 ease-out ${
              isHistoryOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FaRegClock className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-semibold text-gray-800">
                  Conversion History
                </span>
                {history.length > 0 && (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-semibold text-white">
                    {history.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label="Close history"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={closeHistory}
              >
                ✕
              </button>
            </div>

            <div className="border-b border-gray-200 px-4 py-3 mt-1 sm:mt-2">
              <button
                type="button"
                className="w-full rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleClearHistory}
                disabled={history.length === 0}
              >
                Clear All History
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-xs text-gray-800">
              {history.length === 0 && (
                <p className="mt-4 text-center text-xs text-gray-500">
                  No conversions yet. Run a conversion to start building history.
                </p>
              )}

              {paginatedHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="space-y-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                        JSON  TOON
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                        {entry.reduction}%
                      </span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-primary-700"
                      onClick={() => handleLoadHistory(entry)}
                    >
                      Load
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveHistory(entry.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-2 space-y-1 text-[11px]">
                    <div>
                      <div className="mb-1 font-semibold text-gray-700">Input</div>
                      <pre className="max-h-20 overflow-hidden rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-800">
                        {entry.input}
                      </pre>
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-gray-700">Output</div>
                      <pre className="max-h-20 overflow-hidden rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-800">
                        {entry.output}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-600 flex items-center justify-between bg-white/80 backdrop-blur-sm">
              <button
                type="button"
                onClick={handleHistoryPrev}
                disabled={currentHistoryPage === 0 || history.length === 0}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <div className="text-[11px] font-medium text-gray-500">
                Page {currentHistoryPage + 1} of {totalHistoryPages}
              </div>
              <button
                type="button"
                onClick={handleHistoryNext}
                disabled={currentHistoryPage >= totalHistoryPages - 1 || history.length === 0}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
