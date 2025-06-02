'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FeatureCards from '../_components/boards/FeatureCards.js';
import ProgressTracker from '../_components/boards/ProgressTracker.js';
import SendNudgeModal from '../_components/nudge/SendNudgeModal.js';

// POO: Clase User mock
class User {
  constructor({ id, name, email, avatar }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}

export default function DashboardPage() {
  const [checking, setChecking] = useState(true);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '/login';
      } else {
        setChecking(false);
      }
    }
  }, []);

  if (checking) return null;

  // Usuario mock para demo
  const user = new User({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <SendNudgeModal open={showNudge} onClose={() => setShowNudge(false)} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2" onClick={() => setShowNudge(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            Send Nudge
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Track Your <span className="text-green-300">Fitness</span> Journey <span className="block mt-2">With Precision</span>
              </h2>
              <p className="text-green-100 mb-8 max-w-md">
                Connect with friends, track workouts, and achieve your fitness goals with GymConnect's powerful tracking and analytics.
              </p>
              <div className="flex gap-4">
                <Link href="/activities" className="bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Started
                </Link>
                <Link href="/features" className="border border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg flex items-center transition-colors">
                  Learn More
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex items-center">
              <div className="bg-white rounded-lg shadow w-full p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Dashboard Preview</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-100 rounded p-3">
                    <div className="text-xs mb-1">Today's Progress</div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0%</span>
                      <span>70%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <div className="text-xs mb-1">Group Activity</div>
                    <div className="flex justify-between mt-2 text-sm">
                      <div className="text-center"><div>J</div><div className="text-xs">M</div></div>
                      <div className="text-center"><div>A</div><div className="text-xs">T</div></div>
                      <div className="text-center"><div>M</div><div className="text-xs">W</div></div>
                      <div className="text-center text-green-600"><div>+3</div><div className="text-xs">&nbsp;</div></div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <div className="text-xs mb-1">Upcoming</div>
                    <div className="text-xs">
                      <div className="flex justify-between"><span>Cardio Session</span><span>10:00</span></div>
                      <div className="flex justify-between mt-1"><span>Team Workout</span><span>15:30</span></div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <div className="text-xs mb-1">Weekly Stats</div>
                    <div className="flex items-end justify-between h-10 mt-2">
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '30%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '45%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '60%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '30%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '75%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '85%' }}></div>
                      <div className="bg-green-500 w-2 rounded-sm" style={{ height: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeatureCards />
        <div className="mt-8" />
        <ProgressTracker />
        {/* Call to Action */}
        <section className="bg-[#04B04B] rounded-2xl p-10 mt-12 text-white flex flex-col items-center justify-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Ready to Transform Your Fitness Journey?</h3>
          <p className="mb-8 text-lg text-center max-w-2xl">
            Join thousands of users who are tracking their progress, connecting with fitness partners, and achieving their goals with GymConnect.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/activities" className="bg-white text-[#04B04B] hover:bg-green-50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors border-2 border-white">
              Get Started Now
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 