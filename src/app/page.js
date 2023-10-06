"use client"
import Head from 'next/head';
import CatFeed from './components/CatFeed';

export default function Home() {
  return (
    <div>
      <main>
        <CatFeed />
      </main>
    </div>
  );
}
