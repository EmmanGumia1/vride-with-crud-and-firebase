import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/constants/firebase';
import { useAuth } from '@/constants/auth-context';
import { MaterialIcons } from '@expo/vector-icons';

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

export default function HomeScreen({
  onAddCar,
  onEditCar,
}: {
  onAddCar: () => void;
  onEditCar: (car: Car) => void;
}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'cars'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData: Car[] = [];
      snapshot.forEach((doc) => {
        carsData.push({ ...doc.data(), id: doc.id } as Car);
      });
      setCars(carsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCars(cars);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = cars.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.manufacturer.toLowerCase().includes(query)
      );
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  const handleDelete = (carId: string) => {
    Alert.alert('Delete Car', 'Are you sure you want to delete this car?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'cars', carId));
          } catch (error) {
            Alert.alert('Error', 'Failed to delete car');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderCarItem = ({ item }: { item: Car }) => (
    <View style={styles.carCard}>
      <View style={styles.carHeader}>
        <View style={styles.carTitleContainer}>
          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.carModel}>
            {item.manufacturer} • {item.model}
          </Text>
        </View>
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{item.year}</Text>
        </View>
      </View>

      <View style={styles.colorRow}>
        <View style={styles.colorDot} style={{ backgroundColor: item.color }} />
        <Text style={styles.colorText}>{item.color}</Text>
      </View>

      <Text style={styles.details}>{item.details}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEditCar(item)}>
          <MaterialIcons name="edit" size={18} color="#FF6B6B" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <MaterialIcons name="delete" size={18} color="#FFF" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by brand, model..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : filteredCars.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="directions-car" size={64} color="#DDD" />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No cars found' : 'No cars yet'}
          </Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search' : 'Add your first car!'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={onAddCar}>
        <MaterialIcons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  carCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carTitleContainer: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  carModel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  yearBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  yearText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  colorText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  details: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
    gap: 4,
  },
  editButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
    gap: 4,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
