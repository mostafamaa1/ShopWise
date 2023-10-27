``` mermaid
graph TD

  subgraph "Web Application"
    A[Next.js] -->|HTTP Requests| B[Scraper API]
  end

  subgraph "Scraper API"
    B -->|Amazon Scraper| C[Scraping Engine]
  end

  subgraph "Scraping Engine"
    C -->|BrightData| D[Amazon Website]
  end

  subgraph "Data Storage"
    E[MongoDB] -->|Storing Data| C
  end

  subgraph "Scheduling"
    F[Cron Job] -->|Scheduled Triggers| B
  end

  A -->|Sends requests| B
  B -->|Coordinates scraping| C
  C -->|Fetches data| D
  C -->|Stores data| E
  F -->|Triggers scraping| B
  ```
