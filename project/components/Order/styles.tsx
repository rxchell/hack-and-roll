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

  //category of menu items
  categoryContainer: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'column',
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#ffc89a',
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  selectedCategoryButton: {
    backgroundColor: '#ff9e4d',
  },
  categoryScrollView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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