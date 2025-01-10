import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
//import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, } from 'react-native';


interface MenuItem {
    id: string;
    name: string;
    description: string;
    image: string;
}

export default function Menu({ session }: { session: Session }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [imageCache, setImageCache] = useState<{ [key: string]: string }>({})
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})



  useEffect(() => { fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
  if (!session?.user) throw new Error('No user on the session!')
    try {
      const { data, error } = await supabase.from('Menu').select('*');
      if (error) throw new Error(error.message);

      // Fetch URLs for images
      const itemsWithUrls = await Promise.all(
        data.map(async (item: MenuItem) => {
          const { data: imageUrl, error: imageError } = await supabase.storage
            .from('MenuItemImages')
            .getPublicUrl(item.image);

          if (imageError) throw new Error(imageError.message);

          return {
            ...item,
            imageUrl: imageUrl.publicUrl,
          };
        })
      );

      setMenuItems(itemsWithUrls);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return; // Prevent negative quantities

    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));

    try {
      if (newQuantity === 0) {
        await supabase.from('OrderItems_testing').delete().eq('menuItem_id', itemId);
      } else {
        await supabase.from('OrderItems_testing').upsert({
          menuItem_id: itemId,
          quantity: newQuantity,
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const createOrder = async () => {
    try {
      // Step 1: Create a new order in the `orders` table
      const { data: orderData, error: orderError } = await supabase
        .from('Orders_testing')
        .insert({ user_id: session.user.id, created_at: new Date() })
        .select();
  
      if (orderError) throw new Error(orderError.message);
  
      const orderId = orderData[0].id;
  
      // Step 2: Add each item with a quantity > 0 to the `orderitems` table
      const orderItems = Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => ({
          menuItem_id: itemId,
          order_id: orderId,
          quantity,
        }));
  
      if (orderItems.length > 0) {
        const { error: itemsError } = await supabase.from('OrderItems_testing').insert(orderItems);
        if (itemsError) throw new Error(itemsError.message);
      }
  
      Alert.alert('Order Created', `Order ID: ${orderId}`);
      setQuantities({});
    } catch (error) {
      console.error('Error creating order:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const renderMenuItem = ({ item }: { item: MenuItem & { imageUrl: string } }) => {
    const quantity = quantities[item.id] || 0;

    return (
      <View style={styles.menuItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => updateQuantity(item.id, quantity - 1)} />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button title="+" onPress={() => updateQuantity(item.id, quantity + 1)} />
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Text>Loading menu...</Text>;
  }

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMenuItem}
      contentContainerStyle={styles.container}
      ListFooterComponent={
        <Button title="Create Order" onPress={createOrder} color="#28a745" />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },

  //order quantity setters
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },

});

/*
  useEffect(() => {
    if (session) getMenu()
  }, [session])

    useEffect(() => {
        getMenu();
    }, []);
  async function getMenu() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error } = await supabase.from('Menu').select('id, name, description, image')
      console.debug(data)
      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
        console.error('Error fetching menu items:', error)
    } finally {
        setLoading(false)
    }
  }

  async function fetchImageUrl(imagePath: string): Promise<string> {
    if (imageCache[imagePath]) {
      return imageCache[imagePath] // Return cached URL if available
    }
    try {
      const { data } = supabase.storage.from('MenuItemImages').getPublicUrl(imagePath);
      const publicUrl = data.publicUrl
      setImageCache((prevCache) => ({ ...prevCache, [imagePath]: publicUrl }));
      console.error(publicUrl);
      return publicUrl
    } catch (error) {
      console.error('Error fetching image URL:', error)
      return ''
    }
  }

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
      (async () => {
        const url = await fetchImageUrl(item.image);
        setImageUrl(url);
      })();
    }, [item.image]);

    return (
      <TouchableOpacity style={styles.itemContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.itemImage} />
        ) : (
          <ActivityIndicator size="small" color="#000" />
        )}
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200, // Adjust height for menu
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: 150,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
*/