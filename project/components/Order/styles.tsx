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
    width: 85,
    height: 85,
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
  row: {
    flexDirection: 'row',
    paddingEnd: 1,
    justifyContent: 'space-between',
  },
  cost: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 28,
    marginRight: 16,
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
    marginHorizontal: 10
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: 0
  },
});