import { Dispatch, SetStateAction } from "react"
import { TextInput, View, Text } from "react-native"

interface UserFormProps {
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
}

export default function UserForm({ setEmail, setPassword }: UserFormProps) {
  return (
    <View>
      <View>
        <Text>Email</Text>
        <TextInput onChangeText={(text) => setEmail(text)} />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput onChangeText={(text) => setPassword(text)} />
      </View>
    </View>
  )
}