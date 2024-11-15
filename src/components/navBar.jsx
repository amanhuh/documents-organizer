"use client";
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons' */
import { useTheme } from 'next-themes'

export default function NavBar(props) {
  const { resolvedTheme } = useTheme();
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flex py-4 md:py-6 px-5 md:px-8 border-b border-neutral-600/50 bg-neutral-100 dark:bg-neutral-800">    
      <button className='md:px-4 md:py-3 md:-ml-2 mr-5 md:mr-6 md:hover:bg-gray-300/80 dark:hover:bg-neutral-700/30 rounded-full justify-center items-center'>
        <i className='text-neutral-700 dark:text-neutral-300 text-2xl fas fa-bars pt-0.5'></i>
      </button>
      <a href="/">
        <img src="/tsdc-logo.webp" alt="TSDC Logo" className="w-12 h-12" />
      </a>
      <button onClick={() => { resolvedTheme == 'dark' ? setTheme('light') : setTheme('dark') }} className={`ml-auto md:mr-6 md:hover:bg-gray-300/80 md:dark:hover:bg-neutral-700/30 rounded-full justify-center items-center ${resolvedTheme == 'dark' ? 'md:px-4 md:py-2' : 'md:px-4.5 md:py-1.5' }`}>
        { resolvedTheme == 'dark' ? <i className="text-neutral-700 dark:text-neutral-300 text-2xl fa-regular fa-sun mt-1"></i> : <i className="text-neutral-700 dark:text-neutral-300 text-2xl fa-regular fa-moon pt-0.5"></i>}
      </button>
    </nav>
  )
};