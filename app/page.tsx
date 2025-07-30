'use client'

import { useState } from 'react'
import Image from 'next/image'

const examplePrompts = [
  "Diverse team collaborating in a modern office",
  "Businesspeople shaking hands on a deal", 
  "Woman laughing alone with a salad",
  "Professional giving a presentation to colleagues",
  "Team celebrating success with raised fists",
  "Executive typing on laptop in bright office",
  "Group of coworkers brainstorming with sticky notes"
]

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [weirdDetail, setWeirdDetail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async (customPrompt?: string) => {
    const selectedPrompt = customPrompt || prompt
    if (!selectedPrompt.trim()) return
    
    setLoading(true)
    setError('')
    setImageUrl('')
    setWeirdDetail('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: selectedPrompt }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setImageUrl(data.imageUrl)
      setWeirdDetail(data.weirdDetail)
      if (customPrompt) setPrompt(customPrompt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Slightly Off Stock Photos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate perfect corporate stock photos with one hilariously wrong detail. 
            98% professional, 2% completely unusable.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your stock photo
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Diverse team collaborating in a modern office"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
          
          <button
            onClick={() => generateImage()}
            disabled={loading || !prompt.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating Your Perfectly Imperfect Image...' : 'Generate Stock Photo'}
          </button>

          {/* Example Prompts */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Need inspiration? Try these:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => generateImage(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Creating your beautifully broken stock photo...</p>
          </div>
        )}

        {/* Results */}
        {imageUrl && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Image
                src={imageUrl}
                alt="Generated stock photo"
                width={1024}
                height={1024}
                className="max-w-lg max-h-64 object-contain mx-auto"
                priority
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                The Plot Twist:
              </h3>
              <p className="text-gray-700 italic">
                "{weirdDetail}"
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>Original prompt: "{prompt}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Perfect for presentations you want people to remember for all the wrong reasons.</p>
        </div>
      </div>
    </div>
  )
}
