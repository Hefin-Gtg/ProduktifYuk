import theme from "../../config/theme";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const Pomodoro = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(25 * 60);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  
  
  useEffect(() => {
    if (time === 0) {
      setIsWorking(!isWorking);
      setTime(isWorking ? breakTime * 60 : workTime * 60);
    }
  }, [time]);
  

  const startTimer = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resetTimer = () => {
    stopTimer();
    setIsWorking(true);
    setTime(workTime * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleWorkTimeChange = (text) => {
    const minutes = parseInt(text) || 0;
    setWorkTime(minutes);
    if (isWorking) {
      setTime(minutes * 60);
      resetTimer();
    }
  };

  const handleBreakTimeChange = (text) => {
    const minutes = parseInt(text) || 0;
    setBreakTime(minutes);
    if (!isWorking) {
      setTime(minutes * 60);
      resetTimer();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isWorking ? 'Work' : 'Break'}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Work Time:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={workTime.toString()}
          onChangeText={handleWorkTimeChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Break Time:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={breakTime.toString()}
          onChangeText={handleBreakTimeChange}
        />
      </View>
      <View style={styles.row}>
      <Button style={styles.button} mode="contained" onPress={intervalId ? stopTimer : startTimer}>
        {intervalId ? 'Pause' : 'Start'}
      </Button>
      <Button style={styles.button} mode="contained" onPress={resetTimer}>
        Reset
      </Button>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: theme.colors.primary,
  },
  timer: {
    fontSize: 72,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    marginBottom: 6,
    minWidth: '30%',
    textAlign: 'center',
  },
  row:{
    flexDirection: 'row',
    flexWrap : 'wrap',
    marginTop: 15,
  },
  nav:{
    flex:0,
    flexDirection: 'row',
    flexAlignment: 'flex-end',
    justifyContent:'space-between',
    marginTop: 15,
  },
  buttonNav:{
    paddingHorizontal: 8,
    marginHorizontal: '5%',
    flexDirection: 'row',
    flexAlignment: 'flex-end',
    justifyContent:'space-between',
    flexWrap : 'wrap',
    marginTop: 15,
  },
  label:{
    fontSize: 25,
  },
  input:{
    height: 25,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },

});

export default Pomodoro;
