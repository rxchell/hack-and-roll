import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'

interface Vouchers {
    id: number
    name: string
    description: string
    type: string 
    discount_value: number
    image: string
}

interface UserVouchers {
    id: number
    user_id: number
    voucher_id: number
    is_used: boolean
}

export default function Voucher({ session }: { session: Session }) {
    const [vouchers, setVouchers] = useState<UserVouchers[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUserVouchers(); 
    }, []);


    async function fetchUserVouchers() {
        if (!session?.user) throw new Error('No user on the session!')
        try {
            const user_id = session.user.id
            const {data, error} = await supabase.from('UserVouchers').select('*')
            .eq('user_id', user_id)

            if (error) throw new Error(error.message)
            
            // Fetch images?!

            setVouchers(data)    
        } catch (error) {
            console.error('Error updating quantity:', error);
        }   
    }


    return (
        <div>
            Hi
        </div>
    )
}