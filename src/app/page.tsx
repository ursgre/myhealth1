"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Targets from '@/components/Targets/Targets'


export default function Home() {
  return (
    <main className={styles.main}>
      <Targets />
      
    </main>
  )
}
