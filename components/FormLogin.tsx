import React, { useState } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { TextInput, Button, Headline } from 'react-native-paper'
import { Formik } from 'formik';
import { loginValidationSchema } from '../utils/validation'

interface IFormLoginProps {
    onSubmit: (isLogin: boolean, values: { email: string, password: string }) => void
}

const FormLogin = ({ onSubmit }: IFormLoginProps) => {
    const formInitial = { email: '', password: '' }
    const [activeLogin, setActiveLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputs = [
        { placeholder: 'Email', icon: 'email', stylesField: { ...styles.formInput }, field: 'email' },
        {
            placeholder: 'Password', icon: passwordVisible ? 'eye-off' : 'eye',
            stylesField: { ...styles.formInput, marginTop: 80 }, field: 'password'
        },
    ]

    const changeLogin = () => {
        setActiveLogin(!activeLogin);
    }

    const submitForm = (values: { email: string, password: string }) => {
        onSubmit(activeLogin, values)
    }

    return (
        <View style={styles.formContainer}>
            <Headline style={styles.headText}>Enter your data</Headline>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={formInitial}
                onSubmit={submitForm}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        {inputs.map((input, index) => {
                            const { placeholder, icon, stylesField, field } = input
                            return (
                                <View key={index}>
                                    <TextInput
                                        placeholder={placeholder}
                                        style={{ ...stylesField }}
                                        onBlur={handleBlur(field)}
                                        mode='outlined'
                                        secureTextEntry={field === 'password' && !passwordVisible}
                                        value={values[field]}
                                        onChangeText={handleChange(field)}
                                        right={<TextInput.Icon color='blue' name={icon}
                                            onPress={() => setPasswordVisible(!passwordVisible)} />}
                                    />
                                    {errors[field] &&
                                        <Text style={styles.errorText}>{errors[field]}</Text>
                                    }
                                </View>
                            )
                        }
                        )}
                        <Button style={styles.formButton} mode="contained" onPress={() => handleSubmit()}>
                            {activeLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                        <Text style={styles.formText}>{activeLogin ? 'Don\'t have an account?' : 'Already have an account?'}</Text>
                        <Button onPress={() => changeLogin()}>
                            {activeLogin ? 'Sign Up' : 'Sign In'} </Button>
                    </View>
                )}
            </Formik>
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
        marginBottom: 35
    },
    formText: {
        textAlign: 'center',
        marginTop: 25
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        marginTop: Platform.OS === 'web' ? 0 : -15
    }
})