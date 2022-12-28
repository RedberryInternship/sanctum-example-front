import React, {useState} from 'react'
import Head from 'next/head'
import {login} from '../services'
import {useRouter} from 'next/router'
import {useAuth} from '../hooks'

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useAuth();

    const loginHandler = () => {
        (async () => {
            try {
                const {data} = await login({email, password})
                console.log(data);
                router.push('/admin');
            } catch (error: any) {
                setError(error.response.data.message)
            }
        })();
    }

    return (
        <div>
        <Head>
          <title>God of War - Ragnarök!</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
  
        <main className='flex justify-center items-center pt-4 flex-col'>
          <h1 className='text-white text-center text-4xl mb-10'>God of war - Ragnarök!</h1>
          <div className='grid grid-cols-1 gap-10 pb-10'>
            <div className='bg-white rounded-lg shadow-lg p-4 w-96 h-60'>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className='bg-gray-100 rounded-lg w-full h-12 mb-4 pl-4' 
                    onChange={e => setEmail(e.target.value)} 
                />
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    className='bg-gray-100 rounded-lg w-full h-12 mb-4 pl-4' 
                    onChange={e => setPassword(e.target.value)} 
                />

                <button className='bg-red-500 text-white rounded-lg w-full h-12 mb-4' onClick={loginHandler}>Login</button>

                {error && <span className='text-red-500 text-center inline-block w-full'>{error}</span>}
            </div>
          </div>
        </main>
      </div>
    )
}

export default Login