import { StyleSheet, View, Text, Alert } from 'react-native'
import { TextInput, Button, Headline } from 'react-native-paper'
import React, { useState } from 'react'

interface IFormLoginProps {
    onSubmit: (isLogin: boolean, values: { email: string, password: string }) => void
}

const FormLogin = ({ onSubmit }: IFormLoginProps) => {
    const formInitial = { email: '', password: '' }
    const [form, setForm] = useState(formInitial);
    const [activeLogin, setActiveLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputs = [
        { placeholder: 'Email', icon: 'email', styles: { ...styles.formInput }, field: 'email' },
        { placeholder: 'Password', icon: passwordVisible ? 'eye-off' : 'eye', styles: { ...styles.formInput, marginTop: 80 }, field: 'password' },
    ]

    const changeLogin = () => {
        setActiveLogin(!activeLogin);
        setForm(formInitial)
    }

    const handleSubmit = () => {
        if (form.email.length > 0 && form.password.length > 0) {
            onSubmit(activeLogin, form)
        } else {
            Alert.alert('Error', 'Please fill all fields')
        }
    }

    return (
        <View style={styles.formContainer}>
            <Headline style={styles.headText}>Enter your data</Headline>
            {inputs.map((input, index) => {
                const { placeholder, icon, styles, field } = input
                return (
                    <TextInput
                        key={index}
                        placeholder={placeholder}
                        style={{ ...styles }}
                        mode='outlined'
                        secureTextEntry={field === 'password' && !passwordVisible}
                        value={form[field]}
                        onChangeText={text => setForm({ ...form, [field]: text })}
                        right={<TextInput.Icon color='blue' name={icon} onPress={() => setPasswordVisible(!passwordVisible)} />}
                    />
                )
            }
            )}
            <Button style={styles.formButton} mode="contained" onPress={() => handleSubmit()}>
                {activeLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Text style={styles.formText}>{activeLogin ? 'Don\'t have an account?' : 'Already have an account?'}</Text>
            <Button onPress={() => changeLogin()}>
                {activeLogin ? 'Sign Up' : 'Sign In'} </Button>
        </View >
    )
}

export default FormLogin

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 16,
    },
    formInput: {
        flex: 1,
    },
    formButton: {
        marginTop: 126,
    },
    headText: {
        textAlign: 'center',
        marginBottom: 25
    },
    formText: {
        textAlign: 'center',
        marginTop: 25
    }
})