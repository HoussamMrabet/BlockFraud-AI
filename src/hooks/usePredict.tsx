// usePredict.tsx
import { useState } from 'react'

type PredictionResult = {
  prediction: number
  probability: number
}

const usePredict = () => {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const predict = async (inputData: Record<string, any>, endpoint: string = 'http://localhost:5000/predict') => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Prediction failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, predict }
}

export default usePredict
