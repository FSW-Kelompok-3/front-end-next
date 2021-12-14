import Link from 'next/link'

export default () => {
      return (
        <div>
            <ul>
                <li>Welcome to Next.js!</li>
                <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
                </li>
            </ul>   
        </div>
        
      )
  }