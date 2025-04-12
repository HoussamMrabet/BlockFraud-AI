// useData.tsx
import { useState, useEffect } from 'react'
import Papa from 'papaparse'

type CsvRecord = {
  [key: string]: string
}

const useData = (csvUrl: string) => {
  const [data, setData] = useState<CsvRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl)
        const csvText = await response.text()

        Papa.parse<CsvRecord>(csvText, {
          header: true, // Use the first line as headers
          skipEmptyLines: true,
          complete: (result: Papa.ParseResult<CsvRecord>) => {
            const parsedData = result.data as CsvRecord[]
            setData(parsedData)
            setLoading(false)
          },
          error: (err: Error) => {
            setError(err)
            setLoading(false)
          }
        })
      } catch (err: any) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [csvUrl])

  return { data, loading, error }
}

export default useData
