import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import {
  getBranches,
  updateDeliveryPartnerProfile,
} from "@/service/deliveryService";
import { useAuthStore } from "@/state/authStore";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import CustomerText from "@/components/ui/CustomText";
import { Picker } from "@react-native-picker/picker";

type Branch = {
  _id: string;
  name: string;
};

const DeliveryProfileEdit = () => {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone?.toString() || "");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState(user?.branch || "");
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (error) {
      Alert.alert("Failed to load branches");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateDeliveryPartnerProfile({
        name,
        email,
        password,
        phone,
        branch: branchId,
      });
      setUser(updatedUser);
      Alert.alert("Success", "Profile updated!");
    } catch (error) {
      Alert.alert("Error", "Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomerText variants="h4">Update Profile</CustomerText>

        <CustomInput
          left={<View style={{ width: 10 }} />}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          left={<View style={{ width: 10 }} />}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />
        <CustomInput
          left={<View style={{ width: 10 }} />}
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomInput
          left={<View style={{ width: 10 }} />}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
        />

        <Picker
          selectedValue={branchId}
          onValueChange={(itemValue) => setBranchId(itemValue)}
          style={{ marginVertical: 10 }}
        >
          <Picker.Item label="Select Branch" value="" />
          {branches.map((branch) => (
            <Picker.Item
              key={branch._id}
              label={branch.name}
              value={branch._id}
            />
          ))}
        </Picker>

        <CustomButton
          title="Save Changes"
          onPress={handleUpdate}
          disabled={loading}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryProfileEdit;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
