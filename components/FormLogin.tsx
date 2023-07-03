import React, { useRef, useState, useCallback } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { TextInput, Button, Headline } from 'react-native-paper'
import { Formik } from 'formik';
import { loginValidationSchema } from '../utils/validation'
import { useFocusEffect } from '@react-navigation/native';

interface IFormLoginProps {
    onSubmit: (isLogin: boolean, values: { email: string, password: string }) => void
    isLoading: boolean
}

const FormLogin = ({ onSubmit, isLoading }: IFormLoginProps) => {
    const formikRef = useRef<any>(null)
    const formInitial = { email: '', password: '' }
    const [activeLogin, setActiveLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputs = [
        { placeholder: 'Email', icon: 'email', stylesField: { ...styles.formInput }, field: 'email' },
        {
            placeholder: 'Password', icon: passwordVisible ? 'eye-off' : 'eye',
            stylesField: { ...styles.formInput, marginTop: 60 }, field: 'password'
        },
    ]

    const changeLogin = () => {
        setActiveLogin(!activeLogin);
    }

    const submitForm = (values: { email: string, password: string }) => {
        onSubmit(activeLogin, values)
    }

    useFocusEffect(
        useCallback(() => {
            formikRef.current?.resetForm()

            return () => {
                setPasswordVisible(false)
            }
        }, [])
    )

    return (
        <View style={styles.formContainer}>
            <Headline style={styles.headText}>Enter your data</Headline>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={formInitial}
                onSubmit={submitForm}
                innerRef={formikRef}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        {inputs.map((input, index) => {
                            const { placeholder, icon, stylesField, field } = input
                            return (
                                <View key={index}>
                                    <TextInput
                                        // placeholder={placeholder}
                                        style={{ ...stylesField, color: '#2c2c2c' }}
                                        onBlur={handleBlur(field)}
                                        error={errors[field] ? true : false}
                                        mode='flat'
                                        label={placeholder}
                                        secureTextEntry={field === 'password' && !passwordVisible}
                                        value={values[field]}
                                        onChangeText={handleChange(field)}
                                        right={<TextInput.Icon color='#2c2c2c' name={icon}
                                            onPress={() => setPasswordVisible(!passwordVisible)} />}
                                    />
                                    {errors[field] &&
                                        <Text style={styles.errorText}>{errors[field]}</Text>
                                    }

                                </View>
                            )
                        }
                        )}
                        <Button
                            style={styles.formButton}
                            mode="contained"
                            onPress={() => handleSubmit()}
                            loading={isLoading}
                        >
                            {activeLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                        <Text style={styles.formText}>{activeLogin ? 'Don\'t have an account?' : 'Already have an account?'}</Text>
                        <Button onPress={() => changeLogin()} mode='outlined' labelStyle={{ color: '#2c2c2c', paddingVertical: 5 }}>
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
        height: '100%',
        paddingTop: 50,
    },
    formInput: {
        // flex: 1,
    },
    formButton: {
        marginTop: 60,
        backgroundColor: '#2c2c2c',
        paddingVertical: 5,
    },
    headText: {
        textAlign: 'center',
        marginBottom: 35
    },
    formText: {
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 10
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        marginTop: Platform.OS === 'web' ? 0 : 15
    }
})