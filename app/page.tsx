import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import { getAllProducts } from '@/lib/actions'
import React from 'react'
import { Product } from '@/types'; 

// Add other product properties as needed
type HomeProps = {
  allProducts: Product[];
};

export async function getServerSideProps() {
  const allProducts = await getAllProducts();
  return {
    props: {
      allProducts,
    },
  };
}

const Home: React.FC<HomeProps> = ({ allProducts }) => {
  return (
    <>
      <section className='px-6 md:px-20 py-24 border-2 border-black-800'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text capitalize'>
              Smart Shopping starts Here:
            </p>
            <h1 className='head-text capitalize'>
              unleash the power of 
              <span className='text-primary-blue'> ShopWise</span>
            </h1>
            <p className='mt-6 '>
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home