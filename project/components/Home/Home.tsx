import { Session } from '@supabase/supabase-js'
import { View, Text } from 'react-native'
import OrderButton from './OrderButton';
import RewardsButton from './RewardsButton';
import { styles } from './styles';

export default function Home({ session }: { session: Session }) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.welcometext}>Welcome, {session.user.email}!</Text>
        <RewardsButton />
        <OrderButton />
    </View>
    );
}
