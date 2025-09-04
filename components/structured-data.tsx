import * as React from "react"

/**
 * 結構化資料組件
 * 用於在頁面中注入 JSON-LD 結構化資料
 */

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export default function StructuredData({ data }: StructuredDataProps) {
  const structuredDataArray = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {structuredDataArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0)
          }}
        />
      ))}
    </>
  )
}
