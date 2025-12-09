import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/constants/auth-context';
import { router } from 'expo-router';
import HomeScreen from '@/app/home-screen';
import AddEditCarModal from '@/app/add-edit-car-modal';

interface Car {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  details: string;
  year: number;
  color: string;
  userId: string;
}

export default function VrideHomeScreen() {
  const { logOut } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setShowAddModal(true);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCar(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="directions-car" size={28} color="#FF6B6B" />
          <Text style={styles.headerTitle}>Vride</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <HomeScreen onAddCar={handleAddCar} onEditCar={handleEditCar} />

      <AddEditCarModal
        visible={showAddModal}
        onClose={handleCloseModal}
        editingCar={editingCar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  logoutText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 12,
  },
});
