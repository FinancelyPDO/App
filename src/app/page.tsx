import Link from 'next/link';
import Header from '../components/header'
import Image from 'next/image';
export default function Home() {
  return (
    <div className='bg-indigo-500 bg-opacity-5'>
      <div className=' backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <section className="w-full h-64 left-[93px] top-[266px] absolute">
          <button className="w-52 h-20 left-[63px] top-[187px] absolute bg-blue-800 rounded-lg">
            <div className="w-52 h-20 left-0 top-6 absolute text-center text-white text-3xl font-bold font-['DM Sans']">Discover</div>
          </button>
          <div className="left-0 top-0 absolute">
            <span className="text-slate-800 text-5xl font-bold font-['DM Sans']">Get different types of </span>
            <span className="text-blue-800 text-5xl font-bold font-['DM Sans']">Proof !</span>
          </div>
          <p className="left-0 top-[90px] absolute text-slate-800 text-2xl font-medium font-['DM Sans']">You want to prove you have a certain amount of money on your bank<br />account, of you paid for a service ? Use Financely to get the proof.</p>
        </section>

        <section className="w-full h-96 left-[259px] top-[670px] absolute">
          <h3 className="left-[266px] top-0 absolute text-center text-blue-800 text-4xl font-bold font-['DM Sans']">3 ways to use Financely</h3>
          <div className="w-72 h-96 left-0 top-[142px] absolute bg-white rounded-lg shadow">
            <h4 className="left-[25px] top-[132px] absolute text-blue-800 text-2xl font-bold font-['DM Sans']">Proof of reserve</h4>
            <p className="w-56 left-[25px] top-[186px] absolute text-violet-950 text-sm font-light font-['Montserrat']">Connect your bank account to the app to prove you have a certain amount on it.</p>
            <div className="w-14 h-14 left-[25px] top-[40px] absolute bg-indigo-500 bg-opacity-10 rounded-full">
              <div className="w-7 h-7 left-[15px] top-[15px] absolute" />
            </div>
            <Link href="/page-amount">
              <button className="w-32 h-10 left-[25px] top-[306px] absolute bg-blue-800 rounded-2xl">
                <div className="w-32 h-10 left-0 top-2 absolute text-center text-white text-base font-bold font-['DM Sans']">Select</div>
              </button>
            </Link>


          </div>
          <div className="w-72 h-96 left-[316px] top-[142px] absolute bg-white rounded-lg shadow">
            <h4 className="left-[25px] top-[132px] absolute text-blue-800 text-2xl font-bold font-['DM Sans']">Proof of payment</h4>
            <p className="left-[25px] top-[186px] absolute text-violet-950 text-sm font-light font-['Montserrat']">Connect your bank account and <br />and a transaction you want to<br />prove you did.</p>
            <div className="w-14 h-14 left-[25px] top-[40px] absolute">
              <div className="w-14 h-14 left-0 top-0 absolute bg-indigo-500 bg-opacity-10 rounded-full" />
              <div className="w-7 h-7 left-[15px] top-[15px] absolute">
                <div className="w-6 h-7 left-[2.39px] top-[0.94px] absolute">
                </div>
              </div>
            </div>
            <Link href="/page-amount">
              <button className="w-32 h-10 left-[26px] top-[306px] absolute bg-blue-800 rounded-2xl">
                <div className="w-32 h-10 left-0 top-2 absolute text-center text-white text-base font-bold font-['DM Sans']">Select</div>
              </button>
            </Link>
          </div>
          <div className="w-72 h-96 left-[632px] top-[142px] absolute bg-white rounded-lg shadow">
            <h4 className="left-[25px] top-[132px] absolute text-blue-800 text-2xl font-bold font-['DM Sans']">Proof of insurance</h4>
            <p className="left-[25px] top-[186px] absolute text-violet-950 text-sm font-light font-['Montserrat']">Connect your bank account to <br />prove you really subscribe to <br />an incurance.</p>
            <div className="w-14 h-14 left-[25px] top-[40px] absolute">
              <div className="w-14 h-14 left-0 top-0 absolute bg-indigo-500 bg-opacity-10 rounded-full" />
              <div className="w-7 h-7 left-[15px] top-[15px] absolute" />
            </div>
            <Link href="/page-amount">
              <button className="w-32 h-10 left-[25px] top-[306px] absolute bg-blue-800 rounded-2xl">
                <div className="w-32 h-10 left-0 top-2 absolute text-center text-white text-base font-bold font-['DM Sans']">Select</div>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}