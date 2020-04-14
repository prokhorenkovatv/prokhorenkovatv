import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createPost } from 'state/posts';
import { SCREENS } from 'navigation/constants';
import PhotoPicker from 'components/PhotoPicker';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

const CreateScreen = ({ navigation }) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imgRef = useRef();

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      title: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(createPost(post));
    navigation.navigate(SCREENS.MAIN)
  };

  const photoPickHandler = uri => {
    imgRef.current = uri
  }
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.wrapper}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Create new post</Text>
          <TextInput
            style={[styles.textarea, {
              backgroundColor: theme.colors.border,
              color: theme.colors.text,
              borderColor: theme.colors.text

            }]}
            placeholder="Enter text of your post"

            value={text}
            onChangeText={setText}
            multiline
            mode='outlined'
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title="Create post"
            color={theme.colors.primary}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 20
  }
});

export default CreateScreen;
