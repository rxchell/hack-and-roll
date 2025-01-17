import { Session } from '@supabase/supabase-js'
import { View, Text } from 'react-native'
import OrderButton from './OrderButton';
import RewardsButton from './RewardsButton';
import { styles } from './styles';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';

export default function Home({ session }: { session: Session }) {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsername = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('username')
                .eq('id', session.user.id)
                .single(); // The users name

            if (error) {
                console.error(error);
                return;
            }

            // Set the username if available
            setUsername(data?.username || null);
        };

        fetchUsername();
    }, [session.user.id]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.welcometext}>
                {username ? `Welcome, ${username}!` : `Welcome user ${session.user.id}!`}
            </Text>
            <RewardsButton />
            <OrderButton />
        </View>
    );
}