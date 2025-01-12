import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'

interface Vouchers {
    id: number
    name: string
    description: string
    type_id: number 
    image: string
}

interface UserVouchers {
    id: number
    behaviour: 
}

export default function Voucher({ session }: { session: Session }) {


    return (
        <div>
            Hi
        </div>
    )
}