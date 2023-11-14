/* import Image from 'next/image' */
/* import styles from './page.module.css' */
import { Provider } from 'react'
import MainContainer from './Components/CoursePort/MainContainer'
import Toolbar from './Components/CoursePort/Toolbar'
import { ScheduleProvider } from './Components/CoursePort/ScheduleProvider'
import './styles.css'

export default function Home() {
  return (
    <main>
      <div style={{
        display:'flex',
        flexDirection:'column',
        padding: "0.5rem",
        gap:'1rem',
        height:'calc(100vh - 1rem)',
        /* padding:'0.2rem' */
        /* alignItems:'center', */
      }}
        className=""
      >
        <ScheduleProvider>
          <Toolbar/>
          <MainContainer/>
        </ScheduleProvider>
      </div>
    </main>
  )
}
