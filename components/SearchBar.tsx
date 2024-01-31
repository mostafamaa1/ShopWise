'use client'

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;

    if(hostName.includes('amazon.com') ||
     hostName.includes('amazon.') ||
      hostName.includes('amazon')) {
        return true
      }
  } catch (error) {
    return false
  }
}

const SearchBar = () => {

  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setisLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isValidLink = isValidAmazonProductUrl(searchPrompt);
     if(!isValidLink) return alert('Please provide a valid Amazon link')

     try {
      setisLoading(true)

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt)
     } catch (error) {
      console.log(error)
     } finally {
      setisLoading(false)
     }
    }

  return (
<form className='flex flex-wrap gap-4 mt-12'
onSubmit={handleSubmit}>

    <input
    type="text"
    value={searchPrompt}
    onChange={(e) => setSearchPrompt(e.target.value)}
    placeholder="Enter product link (only Amazon Products)"
    className="searchbar-input"
    />

<button 
type="submit" 
className="searchbar-btn"
disabled={searchPrompt === ''}
>
{isLoading ? 'Searching...' : 'Search'}
</button>
</form>
  )
}

export default SearchBar