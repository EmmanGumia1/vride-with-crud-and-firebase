import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
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

interface AddEditCarModalProps {
  visible: boolean;
  onClose: () => void;
  editingCar?: Car | null;
}

const COLORS = [
  'Red',
  'Blue',
  'Black',
  'White',
  'Silver',
  'Gray',
  'Gold',
  'Green',
  'Orange',
  'Purple',
];

const COLOR_MAP: { [key: string]: string } = {
  Red: '#FF6B6B',
  Blue: '#4A90E2',
  Black: '#333333',
  White: '#FFFFFF',
  Silver: '#C0C0C0',
  Gray: '#808080',
  Gold: '#FFD700',
  Green: '#2ECC71',
  Orange: '#FF9500',
  Purple: '#9B59B6',
};

export default function AddEditCarModal({ visible, onClose, editingCar }: AddEditCarModalProps) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [details, setDetails] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('Red');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (editingCar) {
      setName(editingCar.name);
      setModel(editingCar.model);
      setManufacturer(editingCar.manufacturer);
      setDetails(editingCar.details);
      setYear(editingCar.year.toString());
      setColor(editingCar.color);
    } else {
      resetForm();
    }
  }, [editingCar, visible]);

  const resetForm = () => {
    setName('');
    setModel('');
    setManufacturer('');
    setDetails('');
    setYear('');
    setColor('Red');
    setError('');
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError('Car Name is required');
      return false;
    }
    if (!model.trim()) {
      setError('Model is required');
      return false;
    }
    if (!manufacturer.trim()) {
      setError('Manufacturer is required');
      return false;
    }
    if (!year.trim()) {
      setError('Year is required');
      return false;
    }
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      setError('Enter a valid year');
      return false;
    }
    if (!color) {
      setError('Color is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    // Ensure user is signed in before attempting to save
    if (!user) {
      setError('You must be signed in to add or edit a car.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const carData = {
        name: name.trim(),
        model: model.trim(),
        manufacturer: manufacturer.trim(),
        details: details.trim(),
        year: parseInt(year, 10),
        color,
      };

      if (editingCar) {
        await updateDoc(doc(db, 'cars', editingCar.id), carData);
      } else {
        await addDoc(collection(db, 'cars'), {
          ...carData,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} disabled={loading}>
            <MaterialIcons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingCar ? 'Edit Car' : 'Add New Car'}
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Car Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Tesla Model 3"
            value={name}
            onChangeText={setName}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Manufacturer *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Tesla"
            value={manufacturer}
            onChangeText={setManufacturer}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Model *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Model 3"
            value={model}
            onChangeText={setModel}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Year *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2024"
            value={year}
            onChangeText={setYear}
            keyboardType="number-pad"
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Color *</Text>
          <View style={styles.colorGrid}>
            {COLORS.map((col) => (
              <TouchableOpacity
                key={col}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: COLOR_MAP[col],
                    borderWidth: color === col ? 3 : 0,
                    borderColor: color === col ? '#333' : 'transparent',
                  },
                ]}
                onPress={() => setColor(col)}
                disabled={loading}
              >
                {color === col && (
                  <MaterialIcons name="check" size={20} color={col === 'White' ? '#333' : '#FFF'} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Car Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., Well-maintained, low mileage, excellent condition..."
            value={details}
            onChangeText={setDetails}
            multiline
            numberOfLines={4}
            editable={!loading}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                {editingCar ? 'Update Car' : 'Add Car'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    paddingVertical: 10,
    minHeight: 100,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  colorOption: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginHorizontal: 4,
    marginTop: 4,
  },
});
