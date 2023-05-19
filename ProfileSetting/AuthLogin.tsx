import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountListScreen = () => {
  const [accountList, setAccountList] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    // getData();
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const existingAccounts = await AsyncStorage.getItem('ACCOUNTS');
      if (existingAccounts !== null) {
        const accountList = JSON.parse(existingAccounts);
        setAccountList(accountList);
      } else {
        console.log('No accounts found');
      }
    } catch (e) {
      console.log('Error retrieving accounts:', e);
    }
  };
  // console.log('List acc fetch' + fetchAccounts());
  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const accounts = await AsyncStorage.multiGet(keys);
      const accountList = accounts.map(account => {
        try {
          const parsedAccount = JSON.parse(account[1]);
          return {
            key: account[0],
            name: parsedAccount.name,
            email: parsedAccount.email,
            password: parsedAccount.password,
          };
        } catch (error) {
          console.warn(`Error parsing account: ${error}`);
          return null;
        }
      });
      setAccountList(accountList.filter(account => account !== null));
    } catch (error) {
      console.error(error);
    }
  };
  // console.log('List acc data' + getData());

  const handleDeleteAccount = async id => {
    try {
      const accounts = await AsyncStorage.getItem('ACCOUNTS');
      const parsedAccounts = JSON.parse(accounts);
      const updatedAccounts = parsedAccounts.filter(
        account => account.id !== id,
      );
      await AsyncStorage.setItem('ACCOUNTS', JSON.stringify(updatedAccounts));
      Alert.alert('Success', 'Account deleted successfully!');
      getData();
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to delete account!');
    }
  };

  const handleDeleteAllAccounts = async () => {
    try {
      await AsyncStorage.removeItem('ACCOUNTS');
      Alert.alert('Success', 'All accounts deleted successfully!');
      getData();
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to delete accounts!');
    }
  };

  const handleAddAccount = async () => {
    const {name, email, password} = newAccount;
    let isFormValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const isPasswordValid = passwordRegex.test(password);

    if (name == '' || email == '' || password == '') {
      Alert.alert('Ê', 'You need enter your information !');
      isFormValid = false;
    } else if (!isEmailValid) {
      Alert.alert('Ê', 'Invalid email format !');
      isFormValid = false;
    } else if (!isPasswordValid) {
      Alert.alert(
        'Ê',
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number !',
      );
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        const accounts = await AsyncStorage.getItem('ACCOUNTS');
        const parsedAccounts = JSON.parse(accounts);
        const id = Date.now().toString();
        const newAccountItem = {id, name, email, password};
        const updatedAccounts = parsedAccounts
          ? [...parsedAccounts, newAccountItem]
          : [newAccountItem];
        await AsyncStorage.setItem('ACCOUNTS', JSON.stringify(updatedAccounts));
        Alert.alert('Success', 'Account added successfully!');
        setAccountList(updatedAccounts);
        setNewAccount({name: '', email: '', password: ''});
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to add account!');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.addAccountContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newAccount.name}
          onChangeText={value => setNewAccount({...newAccount, name: value})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newAccount.email}
          onChangeText={value => setNewAccount({...newAccount, email: value})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={newAccount.password}
          onChangeText={value =>
            setNewAccount({...newAccount, password: value})
          }
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.addAccountButton}
          onPress={handleAddAccount}>
          <Text style={styles.deleteAllButtonText}>Add Account</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewAcc}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Gmail</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Password</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Action</Text>
        </View>
        {accountList.map((account, index) => (
          <View key={account.email} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableName]}>
              {account.name}
            </Text>
            <Text style={[styles.tableCell, styles.tableEmail]}>
              {account.email}
            </Text>
            <Text style={[styles.tableCell, styles.tablePass]}>
              {account.password}
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteAccount(account.email)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.deleteAllButton}
          onPress={handleDeleteAllAccounts}>
          <Text style={styles.deleteAllButtonText}>Delete All Accounts</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default AccountListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addAccountContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  scrollViewAcc: {
    borderRadius: 15,
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: '600',
    fontSize: 18,
  },
  tableName: {
    fontWeight: '600',
    fontSize: 16,
  },
  tableEmail: {
    fontSize: 16,
  },
  tablePass: {
    fontSize: 16,
  },
  addAccountButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addAccountButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteAllButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'blue',
    fontSize: 15,
  },
});