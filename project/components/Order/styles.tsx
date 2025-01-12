import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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