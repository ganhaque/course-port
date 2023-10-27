/* import Image from 'next/image' */
/* import styles from './page.module.css' */
import MainContainer from './Components/CoursePort/MainContainer'
import Toolbar from './Components/CoursePort/Toolbar'
import './styles.css'

export default function Home() {
  return (
    <main>
      <div style={{
        display:'flex',
        flexDirection:'column',
        gap:'0.5rem',
        height:'calc(100vh - 1rem)',
        /* padding:'0.2rem' */
        /* alignItems:'center', */
      }}
        className=""
      >
        <Toolbar/>
        <MainContainer/>
      </div>
    </main>
  )
}
