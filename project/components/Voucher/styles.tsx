import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  voucher: {
    flexDirection: 'column',
    marginBottom: 16,
    alignItems: 'left',
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 10
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
  discount: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 28,
    marginRight: 16,
  },
  
  redeembutton: {
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: 5
  },
});